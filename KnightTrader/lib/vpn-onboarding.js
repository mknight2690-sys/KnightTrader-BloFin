'use strict';

// In-app VPN + signup onboarding. Automates geo detection, WireGuard/ProtonVPN
// install, and WireGuard tunnel connect. Account creation stays in embedded
// browser windows — Proton/Google block fully automated signup (CAPTCHA/TOS).

const { spawn, execFile } = require('child_process');
const fs = require('fs');
const path = require('path');
const vpn = require('../vpn');

const FREE_TRY_ORDER = [
  { code: 'NL', name: 'Netherlands' },
  { code: 'JP', name: 'Japan' },
  { code: 'RO', name: 'Romania' },
  { code: 'PL', name: 'Poland' },
];

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function run(cmd, args, opts = {}) {
  return new Promise((resolve, reject) => {
    execFile(cmd, args, { windowsHide: true, timeout: opts.timeout || 300000, ...opts }, (err, stdout, stderr) => {
      if (err) return reject(new Error(stderr || err.message || String(err)));
      resolve(String(stdout || ''));
    });
  });
}

class VpnOnboarding {
  constructor({ userDataPath, emit }) {
    this.userDataPath = userDataPath;
    this.protonHome = path.join(userDataPath, 'proton');
    this.installerDir = path.join(this.protonHome, 'installers');
    this.emit = emit || (() => {});
    this._pollTimer = null;
  }

  status(step, message, extra = {}) {
    this.emit({ step, message, at: Date.now(), ...extra });
  }

  ensureDirs() {
    fs.mkdirSync(this.installerDir, { recursive: true });
    fs.mkdirSync(vpn.VPN_CONFIG_DIR, { recursive: true });
    return this.protonHome;
  }

  async checkLocation() {
    this.status('detect', 'Checking your internet location…');
    const ipInfo = await vpn.getExternalIpInfo();
    const allowed = !!ipInfo.allowed;
    if (allowed) {
      this.status('ready', `You are in a BloFin-allowed country (${ipInfo.countryName || ipInfo.country}). VPN is optional.`, {
        ipInfo, allowed: true, needsVpn: false,
      });
    } else {
      const where = ipInfo.countryName || ipInfo.country || 'unknown';
      this.status('needs-vpn', `Your location (${where}) is not BloFin-allowed. The app will guide you through free ProtonVPN setup.`, {
        ipInfo, allowed: false, needsVpn: true,
      });
    }
    return { ok: true, allowed, ipInfo };
  }

  async installWireGuard() {
    if (vpn.findWireGuard()) {
      this.status('wireguard', 'WireGuard is already installed.');
      return { ok: true, alreadyInstalled: true, path: vpn.findWireGuard() };
    }
    this.status('wireguard', 'Installing WireGuard (required for automated VPN tunnels)…');
    try {
      await run('winget', [
        'install', '--id', 'WireGuard.WireGuard', '-e',
        '--accept-source-agreements', '--accept-package-agreements',
        '--silent',
      ], { timeout: 600000 });
    } catch (e) {
      this.status('wireguard-warn', `WireGuard install via winget failed: ${e.message}. Install WireGuard manually if needed.`, { error: e.message });
    }
    const wg = vpn.findWireGuard();
    if (wg) {
      this.status('wireguard', 'WireGuard installed.');
      return { ok: true, path: wg };
    }
    return { ok: false, error: 'WireGuard not found after install attempt' };
  }

  async cacheProtonInstaller() {
    const marker = path.join(this.installerDir, 'proton-vpn-installed.marker');
    if (fs.existsSync(marker)) return marker;
    this.status('proton-cache', 'Caching ProtonVPN installer in app sandbox…');
    try {
      await run('winget', [
        'download', '--id', 'Proton.ProtonVPN', '-e',
        '--accept-source-agreements', '--accept-package-agreements',
        '--download-directory', this.installerDir,
      ], { timeout: 600000 });
      fs.writeFileSync(marker, String(Date.now()), 'utf8');
      this.status('proton-cache', `Installer cached under ${this.protonHome}`);
    } catch (e) {
      this.status('proton-cache-warn', `Could not cache installer: ${e.message}`, { error: e.message });
    }
    return marker;
  }

  async installProtonVpnApp() {
    const existing = vpn.findProtonVpnApp();
    if (existing) {
      this.status('proton-app', 'ProtonVPN app is already installed.');
      return { ok: true, alreadyInstalled: true, path: existing };
    }
    await this.cacheProtonInstaller();
    this.status('proton-app', 'Installing ProtonVPN app (managed by KnightTrader)…');
    try {
      await run('winget', [
        'install', '--id', 'Proton.ProtonVPN', '-e',
        '--accept-source-agreements', '--accept-package-agreements',
        '--silent',
      ], { timeout: 600000 });
    } catch (e) {
      this.status('proton-app-warn', `ProtonVPN winget install failed: ${e.message}`, { error: e.message });
    }
    const app = vpn.findProtonVpnApp();
    if (app) {
      this.status('proton-app', 'ProtonVPN installed. Sign in with your free account next.');
      return { ok: true, path: app };
    }
    return { ok: false, error: 'ProtonVPN app not found after install attempt' };
  }

  async connectWithConfigs(preferredCode) {
    const codes = preferredCode && preferredCode !== 'random'
      ? [{ code: String(preferredCode).toUpperCase(), name: preferredCode }]
      : FREE_TRY_ORDER;

    for (const c of codes) {
      if (!vpn.isAllowedCountry(c.code)) continue;
      const cfg = vpn.listConfigs().find((x) => x.code === c.code);
      if (!cfg) continue;
      this.status('connecting', `Connecting WireGuard tunnel for ${c.name}…`, { country: c.code });
      const res = await vpn.connectCountry(c.code);
      if (res.ok && res.routedThroughAllowed) {
        this.status('connected', `Routed through ${c.name} (${res.ipInfo?.ip || 'ok'}).`, { country: c.code, ipInfo: res.ipInfo });
        return { ok: true, country: c.code, ipInfo: res.ipInfo };
      }
      if (res.ok) {
        this.status('retry', `${c.name} connected but geo still not allowed — trying next…`, { ipInfo: res.ipInfo });
      } else {
        this.status('retry', `${c.name}: ${res.error || 'connect failed'}`, { error: res.error });
      }
      await vpn.disconnect().catch(() => {});
      await sleep(1500);
    }
    return { ok: false, error: 'No WireGuard config reached a BloFin-allowed country' };
  }

  async launchProtonApp() {
    const app = vpn.findProtonVpnApp();
    if (!app) return { ok: false, error: 'ProtonVPN app not installed' };
    this.status('proton-ui', 'Opening ProtonVPN — sign in and pick a free server in Netherlands, Japan, Romania, or Poland.');
    spawn(app, [], { detached: true, stdio: 'ignore', windowsHide: false }).unref();
    return { ok: true, path: app };
  }

  startGeoPoll(intervalMs = 15000, maxMs = 20 * 60 * 1000) {
    this.stopGeoPoll();
    const started = Date.now();
    this.status('polling', 'Waiting for VPN route to reach a BloFin-allowed country…');
    this._pollTimer = setInterval(async () => {
      if (Date.now() - started > maxMs) {
        this.stopGeoPoll();
        this.status('poll-timeout', 'Still not in an allowed country. Try a different free ProtonVPN server.');
        return;
      }
      const ipInfo = await vpn.getExternalIpInfo();
      if (ipInfo.allowed) {
        this.stopGeoPoll();
        this.status('connected', `VPN route confirmed: ${ipInfo.countryName || ipInfo.country} (${ipInfo.ip})`, { ipInfo, allowed: true });
      } else {
        this.status('polling', `Current location: ${ipInfo.countryName || ipInfo.country || 'unknown'} — keep ProtonVPN connected to a free allowed country…`, { ipInfo });
      }
    }, intervalMs);
    this._pollTimer.unref?.();
  }

  stopGeoPoll() {
    if (this._pollTimer) {
      clearInterval(this._pollTimer);
      this._pollTimer = null;
    }
  }

  // Full guided flow: detect → install deps → connect configs if present → else Proton app + poll
  async runAutoSetup({ preferredCountry } = {}) {
    this.ensureDirs();
    const loc = await this.checkLocation();
    if (loc.allowed) return { ok: true, allowed: true, ipInfo: loc.ipInfo };

    await this.installWireGuard();
    await this.installProtonVpnApp();

    const configs = vpn.listConfigs().filter((c) => c.allowed);
    if (configs.length) {
      this.status('configs', `Found ${configs.length} WireGuard config(s) — connecting automatically…`);
      const connected = await this.connectWithConfigs(preferredCountry);
      if (connected.ok) return { ok: true, allowed: true, ...connected };
    } else {
      this.status('configs-missing', 'No WireGuard configs yet. Create a free Proton account in-app, then download OpenVPN/WireGuard configs from account.protonvpn.com/downloads.');
    }

    await this.launchProtonApp();
    this.startGeoPoll();
    return { ok: true, allowed: false, waitingForUser: true };
  }
}

module.exports = { VpnOnboarding, FREE_TRY_ORDER };
