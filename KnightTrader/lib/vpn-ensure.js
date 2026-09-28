'use strict';

// Ensures traffic exits through a BloFin-allowed country before trading/VPN is marked OK.
// Never reports success unless geo IP is verified (twice, stable) as allowed.

const vpn = require('../vpn');
const { VpnOnboarding, FREE_TRY_ORDER } = require('./vpn-onboarding');
const { ensureProtonSandbox } = require('./proton-sandbox');
const { writeCountryConfig } = require('./proton-auto');

const SWITCH_WAIT_MS = 110 * 1000;

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
    notifyUser: cycle === 1,
    steps: [
      'The ProtonVPN desktop app will open (not a browser — use the app window).',
      'First time only: sign in with your free Proton account and complete CAPTCHA in the signup popup if you have not yet.',
      'In ProtonVPN click Quick Connect or pick Netherlands, Japan, Romania, or Poland (free).',
      'Enable “Auto-connect on launch” in ProtonVPN settings once — after that KnightTrader reconnects automatically.',
      'Wait 1–2 minutes. KnightTrader keeps checking — no more clicks needed on future launches.',
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
  credentials,
  userDataPath,
  maxWaitMs = 30 * 60 * 1000,
  pollMs = 10000,
} = {}) {
  const deadline = Date.now() + maxWaitMs;
  let cycle = 0;
  let lastWrong = null;
  let noticeSent = false;
  let activeCountry = null;
  let serverIndex = 0;
  let connectedAt = 0;
  const order = FREE_TRY_ORDER.map((c) => c.code);

  function countryFor(step) {
    if (step === 0 && preferredCountry && preferredCountry !== 'random') {
      return String(preferredCountry).toUpperCase();
    }
    return order[step % order.length];
  }

  emitStatus(emit, 'please-wait', 'Please wait. Connecting and switching servers until a BloFin-allowed country is reached.', {
    notifyUser: true,
    title: 'Please wait',
    body: 'KnightTrader is connecting and will change server after 1 minute 50 seconds if BloFin still blocks this country.',
    cycle: 1,
  });

  while (Date.now() < deadline) {
    cycle += 1;
    const ipInfo = await vpn.getExternalIpInfo();

    if (ipInfo.allowed) {
      emitStatus(emit, 'verify', `Detected ${formatLocation(ipInfo)} — confirming this country is BloFin-allowed…`, { ipInfo, quiet: true });
      const stable = await verifyAllowedStable(2, 2500);
      if (stable.allowed) {
        emitStatus(emit, 'user-notify-dismiss', 'BloFin-allowed country confirmed.', { dismiss: true, ipInfo: stable.ipInfo });
        emitStatus(emit, 'connected', `Connected country: ${formatLocation(stable.ipInfo)}. BloFin: allowed.`, {
          ipInfo: stable.ipInfo,
          allowed: true,
        });
        return { ok: true, allowed: true, ipInfo: stable.ipInfo, method: 'wireguard', country: stable.ipInfo?.country };
      }
      await sleep(pollMs);
      continue;
    }

    lastWrong = ipInfo;
    if (!noticeSent) {
      noticeSent = true;
      emitStatus(emit, 'user-notify', 'Please wait', {
        notifyUser: true,
        title: 'Please wait',
        body: 'Connecting and switching servers until a BloFin-allowed country is reached. Watch the VPN tab for the country.',
        cycle: 1,
        ipInfo,
        quiet: false,
      });
    }

    const elapsed = connectedAt ? Date.now() - connectedAt : SWITCH_WAIT_MS;
    const shouldSwitch = !activeCountry || elapsed >= SWITCH_WAIT_MS;
    if (shouldSwitch) {
      const next = countryFor(serverIndex);
      serverIndex += 1;
      emitStatus(emit, 'cycling', `Changing server to ${next}. The previous server was held for the full 1:50.`, {
        ipInfo,
        cycle,
        tryCode: next,
        quiet: true,
      });
      try {
        if (credentials?.email && credentials?.password && userDataPath) {
          await writeCountryConfig({
            userDataPath,
            email: credentials.email,
            password: credentials.password,
            country: next,
            serverIndex,
          });
        }
      } catch (err) {
        emitStatus(emit, 'retry', `Could not prepare ${next}: ${err.message}`, { ipInfo, cycle, quiet: true });
      }
      if (onboarding) {
        await onboarding.connectWithConfigs(next);
      } else {
        await vpn.connectCountry(next);
      }
      activeCountry = next;
      connectedAt = Date.now();
    } else {
      const left = Math.max(1, Math.ceil((SWITCH_WAIT_MS - elapsed) / 1000));
      emitStatus(emit, 'polling', `Still ${formatLocation(ipInfo)}. Staying on ${activeCountry} for ${left}s before the next server change.`, {
        ipInfo,
        cycle,
        quiet: true,
      });
    }
    await sleep(pollMs);
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

async function ensureBlofinAllowedRoute({
  preferredCountry,
  userDataPath,
  emit,
  waitForUser = true,
  credentials,
} = {}) {
  const onboarding = new VpnOnboarding({ userDataPath, emit });

  onboarding.ensureDirs();
  ensureProtonSandbox(userDataPath, (payload) => emitStatus(emit, payload.step, payload.message)).catch(() => {});
  const loc = await onboarding.checkLocation();
  if (loc.allowed) {
    const stable = await verifyAllowedStable(2, 2000);
    if (stable.allowed) {
      return { ok: true, allowed: true, ipInfo: stable.ipInfo, method: 'direct', needsVpn: false };
    }
  }

  if (!credentials?.email || !credentials?.password) {
    emitStatus(emit, 'account-required', 'Create a Proton account or sign in to an existing one. After that, KnightTrader connects by itself.', {
      ipInfo: loc.ipInfo,
    });
    return { ok: false, allowed: false, waitingForAccount: true, ipInfo: loc.ipInfo };
  }

  await onboarding.installWireGuard();

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
      emitStatus(emit, 'retry', 'Tunnel is up but the country is still blocked. Holding 1:50, then changing server.', { ipInfo: stable.ipInfo, quiet: true });
      await vpn.disconnect().catch(() => {});
    }
  } else {
    emitStatus(
      emit,
      'configs-missing',
      'Preparing a KnightTrader WireGuard profile from the saved Proton login. The system Proton app is not opened.',
      { quiet: true }
    );
  }

  if (!waitForUser) {
    return { ok: true, allowed: false, waitingForUser: true, ipInfo: loc.ipInfo };
  }

  return waitForAllowedCountry({
    emit,
    onboarding,
    preferredCountry,
    credentials,
    userDataPath,
  });
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
