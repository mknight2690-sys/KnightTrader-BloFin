'use strict';

// Ensures traffic exits through a BloFin-allowed country before trading/VPN is marked OK.
// Never reports success unless geo IP is verified (twice, stable) as allowed.

const vpn = require('../vpn');
const { VpnOnboarding, FREE_TRY_ORDER } = require('./vpn-onboarding');

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

function buildNewUserNotify(ipInfo, cycle) {
  const code = String(ipInfo?.country || '').toUpperCase();
  const where = formatLocation(ipInfo);
  const base = {
    cycle,
    ipInfo,
    blocked: BLOCKED_COUNTRIES.has(code) || (code && !vpn.isAllowedCountry(code)),
    notifyUser: true,
    steps: [
      'ProtonVPN should open — if not, click Open ProtonVPN in the VPN tab.',
      'Sign in with your free Proton account (create one in Credentials if needed).',
      'Tap Connect and choose a FREE server in Netherlands, Japan, Romania, or Poland.',
      'Wait 1–2 minutes after connecting. KnightTrader keeps checking automatically — you do not need to click anything else.',
    ],
    cycleLabel: `Auto-check #${cycle} — KnightTrader is still waiting for an allowed country…`,
  };

  if (code === 'US') {
    return {
      ...base,
      title: 'You are in the United States — VPN required',
      body: `BloFin is blocked in the US. KnightTrader is working to fix this automatically, but you must connect ProtonVPN to a free overseas server (Netherlands, Japan, Romania, or Poland).`,
      voice: cycle === 1
        ? 'Attention. BloFin is blocked in the United States. Please open Proton VPN and connect to Netherlands, Japan, Romania, or Poland. Knight Trader will continue automatically when your connection is ready.'
        : null,
      urgent: true,
    };
  }
  if (code === 'CA') {
    return {
      ...base,
      title: 'Canada is blocked for BloFin — VPN required',
      body: `${where} cannot access BloFin directly. Connect ProtonVPN to NL, JP, RO, or PL.`,
      urgent: true,
    };
  }
  if (code === 'SG') {
    return {
      ...base,
      title: 'Singapore is blocked for BloFin — VPN required',
      body: `${where} cannot access BloFin directly. Connect ProtonVPN to NL, JP, RO, or PL.`,
      urgent: true,
    };
  }
  return {
    ...base,
    title: 'Wrong country for BloFin — connect VPN',
    body: `Detected ${where}. KnightTrader is cycling until you reach a BloFin-allowed country.`,
    urgent: !!code,
  };
}

function pickCycleCountry(cycle, preferredCountry) {
  if (preferredCountry && preferredCountry !== 'random') {
    return String(preferredCountry).toUpperCase();
  }
  const order = FREE_TRY_ORDER.map((c) => c.code);
  return order[(cycle - 1) % order.length];
}

async function waitForAllowedCountry({
  emit,
  onboarding,
  preferredCountry,
  maxWaitMs = 30 * 60 * 1000,
  pollMs = 10000,
} = {}) {
  const deadline = Date.now() + maxWaitMs;
  let cycle = 0;
  let lastWrong = null;
  let voiceDone = false;

  emitStatus(emit, 'polling', 'Waiting for VPN route to reach a BloFin-allowed country (NL, JP, RO, PL)…');

  while (Date.now() < deadline) {
    cycle += 1;
    const ipInfo = await vpn.getExternalIpInfo();
    const code = String(ipInfo?.country || '').toUpperCase();
    const isHardBlocked = BLOCKED_COUNTRIES.has(code);

    if (ipInfo.allowed) {
      emitStatus(emit, 'verify', `Detected ${formatLocation(ipInfo)} — confirming route is stable…`, { ipInfo });
      const stable = await verifyAllowedStable(2, 2500);
      if (stable.allowed) {
        emitStatus(emit, 'user-notify-dismiss', 'VPN ready — BloFin region confirmed.', { dismiss: true });
        emitStatus(emit, 'connected', `BloFin route confirmed: ${formatLocation(stable.ipInfo)}`, {
          ipInfo: stable.ipInfo,
          allowed: true,
        });
        return { ok: true, allowed: true, ipInfo: stable.ipInfo, method: 'protonvpn-app' };
      }
      emitStatus(emit, 'retry', 'Route flickered — still verifying…', { ipInfo: stable.ipInfo, cycle });
      await sleep(pollMs);
      continue;
    }

    lastWrong = ipInfo;
    const notify = buildNewUserNotify(ipInfo, cycle);
    emitStatus(emit, 'user-notify', notify.title, {
      ...notify,
      message: notify.body,
    });

    if (notify.voice && !voiceDone) {
      emitStatus(emit, 'voice', notify.voice, { speak: notify.voice });
      voiceDone = true;
    } else if (isHardBlocked && cycle % 5 === 0) {
      const reminder = `Still detecting ${code}. Please connect Proton VPN to Netherlands, Japan, Romania, or Poland.`;
      emitStatus(emit, 'voice', reminder, { speak: reminder });
    }

    emitStatus(emit, 'wrong-country', wrongCountryMessage(ipInfo), { ipInfo, allowed: false, cycle });

    // Cycle WireGuard attempts when configs exist.
    if (onboarding) {
      const tryCode = pickCycleCountry(cycle, preferredCountry);
      const hasCfg = vpn.listConfigs().some((c) => c.code === tryCode);
      if (hasCfg) {
        emitStatus(emit, 'cycling', `Attempt ${cycle}: trying WireGuard ${tryCode}…`, { ipInfo, cycle, tryCode });
        const connected = await onboarding.connectWithConfigs(tryCode);
        if (connected.ok) {
          const stable = await verifyAllowedStable(2, 2500);
          if (stable.allowed) {
            emitStatus(emit, 'user-notify-dismiss', 'VPN connected — BloFin region OK.', { dismiss: true });
            return { ok: true, allowed: true, ipInfo: stable.ipInfo, method: 'wireguard', country: tryCode };
          }
        }
        await vpn.disconnect().catch(() => {});
      }
    }

    // Re-open ProtonVPN periodically so brand-new users see the app.
    if (onboarding && (cycle === 1 || cycle % 3 === 0)) {
      emitStatus(emit, 'cycling', `Attempt ${cycle}: opening ProtonVPN — connect to NL, JP, RO, or PL…`, { ipInfo, cycle });
      await onboarding.launchProtonApp();
    }

    const waitMs = isHardBlocked ? 8000 : pollMs;
    emitStatus(emit, 'polling', `Still ${formatLocation(ipInfo)} — rechecking in ${Math.round(waitMs / 1000)}s (attempt ${cycle})…`, {
      ipInfo,
      cycle,
    });
    await sleep(waitMs);
  }

  const err = `Timed out after ${Math.round(maxWaitMs / 60000)} min — still not in a BloFin-allowed country.`;
  emitStatus(emit, 'poll-timeout', err, { ipInfo: lastWrong, allowed: false, cycle });
  emitStatus(emit, 'user-notify', 'VPN setup timed out', {
    notifyUser: true,
    title: 'VPN setup timed out',
    body: err,
    dismiss: false,
    urgent: true,
    cycle,
  });
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
      'No WireGuard configs yet — KnightTrader will open ProtonVPN. Connect to a free server in NL, JP, RO, or PL.'
    );
  }

  if (!waitForUser) {
    await onboarding.launchProtonApp();
    return { ok: true, allowed: false, waitingForUser: true, ipInfo: loc.ipInfo };
  }

  await onboarding.launchProtonApp();
  return waitForAllowedCountry({ emit, onboarding, preferredCountry });
}

module.exports = {
  BLOCKED_COUNTRIES,
  FREE_TIER_CODES,
  verifyAllowedStable,
  waitForAllowedCountry,
  ensureBlofinAllowedRoute,
  formatLocation,
  wrongCountryMessage,
  buildNewUserNotify,
};
