'use strict';

// Ensures traffic exits through a BloFin-allowed country before trading/VPN is marked OK.
// Never reports success unless geo IP is verified (twice, stable) as allowed.

const vpn = require('../vpn');
const { VpnOnboarding } = require('./vpn-onboarding');

const BLOCKED_COUNTRIES = new Set(['US', 'CA', 'SG']);
const FREE_TIER_CODES = ['NL', 'JP', 'RO', 'PL'];

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function emitStatus(emit, step, message, extra = {}) {
  if (emit) emit({ step, message, at: Date.now(), ...extra });
}

async function verifyAllowedStable(samples = 2, gapMs = 2500) {
  let lastInfo = null;
  for (let i = 0; i < samples; i += 1) {
    const ipInfo = await vpn.getExternalIpInfo();
    lastInfo = ipInfo;
    if (!ipInfo.allowed) return { allowed: false, ipInfo };
    if (i < samples - 1) await sleep(gapMs);
  }
  return { allowed: true, ipInfo: lastInfo };
}

function formatLocation(ipInfo) {
  if (!ipInfo) return 'unknown';
  const name = ipInfo.countryName || ipInfo.country || 'unknown';
  return ipInfo.country ? `${name} (${ipInfo.country})` : name;
}

function wrongCountryMessage(ipInfo) {
  const where = formatLocation(ipInfo);
  const code = String(ipInfo?.country || '').toUpperCase();
  if (BLOCKED_COUNTRIES.has(code)) {
    return `${where} is blocked for BloFin. In ProtonVPN, disconnect and connect to Netherlands, Japan, Romania, or Poland (free tier). Wait ~2 minutes after switching, then verify again.`;
  }
  if (code && !vpn.isAllowedCountry(code)) {
    return `${where} is not BloFin-allowed. Switch ProtonVPN to Netherlands, Japan, Romania, or Poland. Wait for the connection to settle before trading.`;
  }
  return `Location could not be confirmed as BloFin-allowed (${where}). Connect ProtonVPN to NL, JP, RO, or PL.`;
}

async function waitForAllowedCountry({ emit, maxWaitMs = 25 * 60 * 1000, pollMs = 12000 } = {}) {
  const deadline = Date.now() + maxWaitMs;
  let lastWrong = null;
  let lastAnnounced = '';

  emitStatus(emit, 'polling', 'Waiting for VPN route to reach a BloFin-allowed country (NL, JP, RO, PL)…');

  while (Date.now() < deadline) {
    const ipInfo = await vpn.getExternalIpInfo();

    if (ipInfo.allowed) {
      emitStatus(emit, 'verify', `Detected ${formatLocation(ipInfo)} — confirming route is stable…`, { ipInfo });
      const stable = await verifyAllowedStable(2, 2500);
      if (stable.allowed) {
        emitStatus(emit, 'connected', `BloFin route confirmed: ${formatLocation(stable.ipInfo)}`, {
          ipInfo: stable.ipInfo,
          allowed: true,
        });
        return { ok: true, allowed: true, ipInfo: stable.ipInfo, method: 'protonvpn-app' };
      }
      emitStatus(emit, 'retry', 'Route flickered — still verifying…', { ipInfo: stable.ipInfo });
      await sleep(pollMs);
      continue;
    }

    const msg = wrongCountryMessage(ipInfo);
    if (msg !== lastAnnounced) {
      emitStatus(emit, 'wrong-country', msg, { ipInfo, allowed: false });
      lastAnnounced = msg;
    } else {
      emitStatus(emit, 'polling', `Still ${formatLocation(ipInfo)} — change ProtonVPN server to NL, JP, RO, or PL…`, { ipInfo });
    }
    lastWrong = ipInfo;
    await sleep(pollMs);
  }

  const err = `Timed out after ${Math.round(maxWaitMs / 60000)} min — still not in a BloFin-allowed country.`;
  emitStatus(emit, 'poll-timeout', err, { ipInfo: lastWrong, allowed: false });
  return { ok: false, allowed: false, error: err, ipInfo: lastWrong };
}

async function ensureBlofinAllowedRoute({ preferredCountry, userDataPath, emit, waitForUser = true } = {}) {
  const onboarding = new VpnOnboarding({ userDataPath, emit });

  onboarding.ensureDirs();
  const loc = await onboarding.checkLocation();
  if (loc.allowed) {
    const stable = await verifyAllowedStable(2, 2000);
    if (stable.allowed) {
      return { ok: true, allowed: true, ipInfo: stable.ipInfo, method: 'direct', needsVpn: false };
    }
  }

  await onboarding.installWireGuard();
  await onboarding.installProtonVpnApp();

  const configs = vpn.listConfigs().filter((c) => c.allowed);
  if (configs.length) {
    emitStatus(emit, 'configs', `Found ${configs.length} WireGuard config(s) — trying BloFin-allowed routes…`);
    const connected = await onboarding.connectWithConfigs(preferredCountry);
    if (connected.ok) {
      const stable = await verifyAllowedStable(2, 2500);
      if (stable.allowed) {
        return {
          ok: true,
          allowed: true,
          ipInfo: stable.ipInfo,
          method: 'wireguard',
          country: connected.country,
          needsVpn: true,
        };
      }
      emitStatus(emit, 'retry', 'WireGuard connected but geo check failed — trying ProtonVPN app…', { ipInfo: stable.ipInfo });
      await vpn.disconnect().catch(() => {});
    }
  } else {
    emitStatus(
      emit,
      'configs-missing',
      'No WireGuard configs in ~/.knighttrader/vpn — open ProtonVPN and pick a free server in NL, JP, RO, or PL.'
    );
  }

  if (!waitForUser) {
    await onboarding.launchProtonApp();
    return { ok: true, allowed: false, waitingForUser: true, ipInfo: loc.ipInfo };
  }

  await onboarding.launchProtonApp();
  return waitForAllowedCountry({ emit });
}

module.exports = {
  BLOCKED_COUNTRIES,
  FREE_TIER_CODES,
  verifyAllowedStable,
  waitForAllowedCountry,
  ensureBlofinAllowedRoute,
  formatLocation,
  wrongCountryMessage,
};
