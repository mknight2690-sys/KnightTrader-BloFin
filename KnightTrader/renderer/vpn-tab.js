// VPN tab + global VPN wait overlay for brand-new users (US / blocked regions).
(() => {
  const $ = (id) => document.getElementById(id);

  const el = {
    orb: $('vpn-tab-orb'),
    title: $('vpn-tab-status-title'),
    detail: $('vpn-tab-status-detail'),
    verify: $('vpn-tab-verify'),
    updated: $('vpn-tab-updated'),
    warn: $('vpn-tab-warn'),
    countryDisplay: $('vpn-tab-country-display'),
    blofinBadge: $('vpn-tab-blofin-badge'),
    countrySelect: $('vpn-tab-country'),
    grid: $('vpn-tab-country-grid'),
    log: $('vpn-tab-log'),
    navBadge: $('vpn-nav-badge'),
    btnEnsure: $('btn-vpn-tab-ensure'),
    btnVerify: $('btn-vpn-tab-verify'),
    btnProton: $('btn-vpn-tab-proton'),
    btnSignin: $('btn-vpn-tab-signin'),
    btnCreate: $('btn-vpn-tab-create'),
    btnDisconnect: $('btn-vpn-tab-disconnect'),
    waitOverlay: $('vpn-wait-overlay'),
    waitTitle: $('vpn-wait-title'),
    waitCountry: $('vpn-wait-country'),
    waitBody: $('vpn-wait-body'),
    waitSteps: $('vpn-wait-steps'),
    waitCycle: $('vpn-wait-cycle'),
    btnWaitProton: $('vpn-wait-open-proton'),
    btnWaitSignin: $('vpn-wait-signin'),
    btnWaitCreate: $('vpn-wait-create'),
    btnWaitTab: $('vpn-wait-show-tab'),
  };

  const FLAGS = { NL: '🇳🇱', JP: '🇯🇵', RO: '🇷🇴', PL: '🇵🇱', MX: '🇲🇽', US: '🇺🇸', CA: '🇨🇦', SG: '🇸🇬' };
  const HARD_BLOCKED = new Set(['US', 'CA', 'SG']);
  let pollTimer = null;
  let ensureRunning = false;
  let autoEnsureStarted = false;
  let usNoticeShown = false;

  function appendLog(line) {
    if (!el.log) return;
    const ts = new Date().toLocaleTimeString();
    el.log.textContent = `${el.log.textContent ? el.log.textContent + '\n' : ''}[${ts}] ${line}`;
    el.log.scrollTop = el.log.scrollHeight;
  }

  function setNavBadge(show) {
    el.navBadge?.classList.toggle('hidden', !show);
  }

  function showWaitOverlay(payload = {}) {
    if (!el.waitOverlay) return;
    el.waitOverlay.classList.remove('hidden');
    if (payload.title && el.waitTitle) el.waitTitle.textContent = payload.title;
    if (payload.body && el.waitBody) el.waitBody.textContent = payload.body;
    const code = payload.ipInfo?.country || '';
    const name = payload.ipInfo?.countryName || code || 'unknown';
    const flag = FLAGS[code] || '🌍';
    if (el.waitCountry) {
      el.waitCountry.textContent = code
        ? `Currently detected: ${flag} ${name} (${code})`
        : 'Checking your location…';
    }
    if (Array.isArray(payload.steps) && el.waitSteps) {
      el.waitSteps.innerHTML = payload.steps.map((s) => `<li>${s}</li>`).join('');
    }
    if (el.waitCycle) {
      el.waitCycle.textContent = payload.cycleLabel
        || (payload.cycle ? `Auto-check #${payload.cycle} — retrying until allowed country…` : 'Auto-check in progress…');
    }
    try {
      document.querySelector('.nav-item[data-tab="vpn"]')?.classList.add('nav-attention');
    } catch (_) {}
  }

  function hideWaitOverlay() {
    el.waitOverlay?.classList.add('hidden');
    try {
      document.querySelector('.nav-item[data-tab="vpn"]')?.classList.remove('nav-attention');
    } catch (_) {}
  }

  function renderStatus(ipInfo, stable = false) {
    const allowed = !!ipInfo?.allowed;
    setNavBadge(!allowed);

    if (el.orb) {
      el.orb.classList.remove('ok', 'warn', 'err');
      if (allowed) el.orb.classList.add('ok');
      else if (HARD_BLOCKED.has(ipInfo?.country)) el.orb.classList.add('err');
      else el.orb.classList.add('warn');
    }
    el.warn?.classList.toggle('hidden', allowed);

    const code = ipInfo?.country || '—';
    const name = ipInfo?.countryName || code;
    const flag = FLAGS[code] || '🌍';

    if (el.countryDisplay) el.countryDisplay.textContent = code === '—' ? '—' : `${flag} ${name}`;
    if (el.title) {
      el.title.textContent = allowed
        ? (stable ? 'BloFin route verified' : 'Allowed country detected')
        : (HARD_BLOCKED.has(code) ? 'Blocked region — VPN required' : 'Not BloFin-allowed');
    }
    if (el.detail) {
      el.detail.textContent = allowed
        ? `Traffic exits through ${name} (${code}) — safe for BloFin.`
        : `Traffic exits through ${name} (${code}) — switch ProtonVPN to NL, JP, RO, or PL.`;
    }
    if (el.blofinBadge) {
      el.blofinBadge.textContent = allowed
        ? '✓ BloFin status: allowed region'
        : '✗ BloFin status: blocked or unknown region';
      el.blofinBadge.style.color = allowed ? 'var(--accent)' : 'var(--warn, #f5a623)';
    }
    if (el.verify) {
      el.verify.textContent = ipInfo?.ip
        ? `External IP: ${ipInfo.ip} (via ${ipInfo.source || 'geo'})`
        : 'External IP: unavailable';
    }
    if (el.updated) el.updated.textContent = `Last checked: ${new Date().toLocaleTimeString()}`;

    if (allowed) hideWaitOverlay();
  }

  window.handleVpnUserNotify = function handleVpnUserNotify(payload) {
    if (payload?.dismiss) {
      hideWaitOverlay();
      return;
    }
    if (payload?.step === 'user-notify-dismiss' || payload?.dismiss === true) {
      hideWaitOverlay();
      return;
    }
    if (payload?.step === 'connected' || payload?.step === 'ready') {
      hideWaitOverlay();
      if (payload?.ipInfo) renderStatus(payload.ipInfo, true);
      return;
    }
    if (payload?.step === 'user-notify' || payload?.notifyUser) {
      if ((payload.cycle || 1) <= 1 && !usNoticeShown) showUsNoticeOnce(payload.ipInfo, payload);
      if (payload.message) appendLog(payload.message);
      return;
    }
    if (payload?.step === 'wrong-country' || payload?.step === 'cycling' || payload?.step === 'polling') {
      if (!usNoticeShown && payload.ipInfo && !payload.ipInfo.allowed) showUsNoticeOnce(payload.ipInfo);
      if (payload.message) appendLog(payload.message);
      if (payload.ipInfo) renderStatus(payload.ipInfo, false);
    }
  };

  async function refreshStatus(stable = false) {
    try {
      if (stable) {
        const res = await window.kt.vpnVerifyStable();
        renderStatus(res?.ipInfo || {}, res?.allowed);
        return res;
      }
      const ipInfo = await window.kt.vpnGetLocation();
      renderStatus(ipInfo, false);
      if (!ipInfo?.allowed && HARD_BLOCKED.has(ipInfo?.country) && !usNoticeShown) {
        showUsNoticeOnce(ipInfo);
      }
      return { allowed: !!ipInfo?.allowed, ipInfo };
    } catch (e) {
      appendLog(`Verify failed: ${e.message}`);
      return null;
    }
  }

  async function buildCountryGrid() {
    if (!el.grid) return;
    try {
      const [allowed, detect] = await Promise.all([
        window.kt.vpnAllowed(),
        window.kt.vpnDetect(),
      ]);
      const configs = new Set((detect?.configs || []).map((c) => c.code));
      el.grid.innerHTML = (allowed || []).map((c) => {
        const flag = FLAGS[c.code] || '🌍';
        const hasCfg = configs.has(c.code);
        const free = ['NL', 'JP', 'RO', 'PL'].includes(c.code);
        return `<button type="button" class="vpn-country-btn" data-code="${c.code}" ${hasCfg ? '' : 'title="No WireGuard config — use ProtonVPN app"'}>
          <span class="vpn-flag">${flag}</span>
          <span class="vpn-cty">${c.name}${free ? ' (free)' : ''}<div class="vpn-cty-code">${c.code}</div></span>
          ${hasCfg ? '' : '<span class="vpn-no-cfg">Proton</span>'}
        </button>`;
      }).join('');
      el.grid.querySelectorAll('.vpn-country-btn').forEach((btn) => {
        btn.addEventListener('click', async () => {
          const code = btn.dataset.code;
          appendLog(`Connecting WireGuard ${code}…`);
          btn.disabled = true;
          try {
            const res = await window.kt.vpnConnect(code);
            if (res?.routedThroughAllowed) {
              appendLog(`${code} connected — BloFin route OK.`);
              await refreshStatus(true);
            } else {
              appendLog(res?.error || `${code} failed — try ProtonVPN app.`);
              await refreshStatus(false);
            }
          } finally {
            btn.disabled = false;
          }
        });
      });
    } catch (_) {}
  }

  function startPoll() {
    stopPoll();
    pollTimer = setInterval(() => { refreshStatus(false); }, 30000);
  }

  function stopPoll() {
    if (pollTimer) {
      clearInterval(pollTimer);
      pollTimer = null;
    }
  }

  async function runEnsure() {
    if (ensureRunning) return;
    ensureRunning = true;
    el.btnEnsure && (el.btnEnsure.disabled = true);
    appendLog('Ensuring BloFin-allowed route…');
    try {
      const res = await window.kt.vpnEnsureRoute({
        preferredCountry: el.countrySelect?.value || 'random',
      });
      if (res?.allowed) {
        appendLog(`Confirmed: ${res.ipInfo?.countryName || res.ipInfo?.country}`);
        hideWaitOverlay();
        await refreshStatus(true);
      } else if (!res?.waitingForUser) {
        appendLog(res?.error || 'Could not confirm BloFin route yet — still cycling.');
        await refreshStatus(false);
      }
    } catch (e) {
      appendLog(`Ensure failed: ${e.message}`);
    } finally {
      ensureRunning = false;
      el.btnEnsure && (el.btnEnsure.disabled = false);
    }
  }

  async function maybeAutoEnsureBlockedRegion() {
    if (autoEnsureStarted || ensureRunning) return;
    try {
      const [ipInfo, state] = await Promise.all([
        window.kt.vpnGetLocation(),
        window.kt.getOnboardingState().catch(() => ({})),
      ]);
      if (ipInfo?.allowed) return;
      autoEnsureStarted = true;
      usNoticeShown = !!state?.usVpnNoticeShown;
      const creds = await window.kt.getCredentials().catch(() => ({}));
      const hasProton = !!(creds?.proton?.email);
      const returning = !!(state?.protonVpnAutoconnect || state?.vpnVerified || hasProton);
      if (!returning && !usNoticeShown) showUsNoticeOnce(ipInfo);
      appendLog(`Geo ${ipInfo.country || '?'} not allowed — auto VPN ${returning ? 'reconnect' : 'setup'}…`);
      const pref = state?.preferredVpnCountry || 'random';
      ensureRunning = true;
      el.btnEnsure && (el.btnEnsure.disabled = true);
      try {
        await window.kt.vpnEnsureRoute({ preferredCountry: pref });
      } finally {
        ensureRunning = false;
        el.btnEnsure && (el.btnEnsure.disabled = false);
      }
    } catch (_) {}
  }

  function showUsNoticeOnce(ipInfo, payload = {}) {
    if (usNoticeShown) return;
    usNoticeShown = true;
    window.kt.setOnboardingState({ usVpnNoticeShown: true }).catch(() => {});
    showWaitOverlay({
      title: payload.title || (ipInfo?.country === 'US'
        ? 'You are in the United States — VPN required'
        : 'VPN required for BloFin'),
      body: payload.body || 'Create a free Proton account, or sign in if you already have Proton VPN. This notice is shown once.',
      ipInfo: ipInfo || payload.ipInfo,
      steps: payload.steps || [
        'Create a Proton account, or choose Sign in if you already have one.',
        'In the ProtonVPN app, connect to a free server in Netherlands, Japan, Romania, or Poland.',
        'After this first login, KnightTrader reconnects on later launches. You only wait.',
      ],
      cycle: 1,
      cycleLabel: 'Shown once. Pick create or sign in, then wait.',
    });
  }

  function signInExistingProton() {
    appendLog('Opening Proton sign-in for an existing account…');
    window.kt.vpnOpenSignup('protonLogin');
    openProtonDesktopApp();
  }

  function createProtonAccount() {
    appendLog('Opening Proton account signup…');
    window.kt.vpnOpenSignup('proton');
  }

  async function openProtonDesktopApp() {
    appendLog('Opening ProtonVPN desktop app…');
    try {
      const res = await window.kt.vpnOpenProtonApp();
      if (res?.ok) appendLog('ProtonVPN app launched — sign in and connect to NL, JP, RO, or PL.');
      else appendLog(res?.error || 'ProtonVPN not installed yet — running auto-install…');
    } catch (e) {
      appendLog(`Open ProtonVPN failed: ${e.message}`);
    }
  }

  el.btnVerify?.addEventListener('click', () => refreshStatus(true));
  el.btnEnsure?.addEventListener('click', () => runEnsure());
  el.btnProton?.addEventListener('click', () => openProtonDesktopApp());
  el.btnSignin?.addEventListener('click', () => signInExistingProton());
  el.btnCreate?.addEventListener('click', () => createProtonAccount());
  el.btnWaitProton?.addEventListener('click', () => openProtonDesktopApp());
  el.btnWaitSignin?.addEventListener('click', () => signInExistingProton());
  el.btnWaitCreate?.addEventListener('click', () => createProtonAccount());
  el.btnWaitTab?.addEventListener('click', () => {
    try { document.querySelector('.nav-item[data-tab="vpn"]')?.click(); } catch (_) {}
  });
  el.btnDisconnect?.addEventListener('click', async () => {
    await window.kt.vpnDisconnect();
    appendLog('WireGuard disconnected.');
    await refreshStatus(false);
  });

  window.kt.onVpnOnboardingStatus((payload) => {
    window.handleVpnUserNotify(payload);
  });

  window.initVpnTab = async function initVpnTab() {
    try {
      const state = await window.kt.getOnboardingState();
      usNoticeShown = !!state?.usVpnNoticeShown;
    } catch (_) {}
    await refreshStatus(false);
    await buildCountryGrid();
    startPoll();
  };

  window.stopVpnTabPoll = stopPoll;
  window.refreshVpnTabStatus = refreshStatus;
  window.startVpnAutoEnsure = runEnsure;

  window.checkVpnNavBadge = async () => {
    try {
      const state = await window.kt.getOnboardingState().catch(() => ({}));
      usNoticeShown = !!state?.usVpnNoticeShown;
      const ipInfo = await window.kt.vpnGetLocation();
      setNavBadge(!ipInfo?.allowed);
      if (!ipInfo?.allowed) renderStatus(ipInfo, false);
      await maybeAutoEnsureBlockedRegion();
    } catch (_) {}
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.checkVpnNavBadge?.());
  } else {
    window.checkVpnNavBadge?.();
  }
})();
