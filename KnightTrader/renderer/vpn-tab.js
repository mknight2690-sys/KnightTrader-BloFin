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
    btnSaveConnect: $('btn-vpn-tab-save-connect'),
    actionStatus: $('vpn-tab-action'),
    tabEmail: $('vpn-tab-email'),
    tabPassword: $('vpn-tab-password'),
    clickConfirm: $('click-confirm'),
    waitOverlay: $('vpn-wait-overlay'),
    waitTitle: $('vpn-wait-title'),
    waitCountry: $('vpn-wait-country'),
    waitBody: $('vpn-wait-body'),
    waitSteps: $('vpn-wait-steps'),
    waitCycle: $('vpn-wait-cycle'),
    btnWaitSignin: $('vpn-wait-signin'),
    btnWaitCreate: $('vpn-wait-create'),
    btnWaitContinue: $('vpn-wait-continue'),
    btnWaitTab: $('vpn-wait-show-tab'),
    waitAccount: $('vpn-wait-account'),
    waitEmail: $('vpn-wait-email'),
    waitPassword: $('vpn-wait-password'),
  };

  const FLAGS = { NL: '🇳🇱', JP: '🇯🇵', RO: '🇷🇴', PL: '🇵🇱', MX: '🇲🇽', US: '🇺🇸', CA: '🇨🇦', SG: '🇸🇬' };
  const HARD_BLOCKED = new Set(['US', 'CA', 'SG']);
  let pollTimer = null;
  let ensureRunning = false;
  let autoEnsureStarted = false;
  let usNoticeShown = false;
  let userHidWaitOverlay = false;

  function appendLog(line) {
    if (!el.log) return;
    const ts = new Date().toLocaleTimeString();
    el.log.textContent = `${el.log.textContent ? el.log.textContent + '\n' : ''}[${ts}] ${line}`;
    el.log.scrollTop = el.log.scrollHeight;
  }

  function confirmClick(message) {
    appendLog(message);
    if (el.actionStatus) el.actionStatus.textContent = message;
    if (el.waitCycle && !el.waitOverlay?.classList.contains('hidden')) el.waitCycle.textContent = message;
    if (el.clickConfirm) {
      el.clickConfirm.textContent = message;
      el.clickConfirm.classList.remove('hidden');
    }
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
    window.parkWebviewsForOverlay?.(true);
  }

  function hideWaitOverlay() {
    el.waitOverlay?.classList.add('hidden');
    try {
      document.querySelector('.nav-item[data-tab="vpn"]')?.classList.remove('nav-attention');
    } catch (_) {}
    window.parkWebviewsForOverlay?.(false);
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
        ? `Confirmed: ${name} (${code}) is a BloFin-allowed country`
        : `Not confirmed: ${name} (${code}) is not a BloFin-allowed country`;
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
    if (payload?.step === 'account-required') {
      showAccountPrompt(payload.ipInfo);
      return;
    }
    if (payload?.step === 'please-wait' || payload?.step === 'user-notify') {
      showPleaseWait(payload.ipInfo, payload);
      if (payload.message) appendLog(payload.message);
      return;
    }
    if (payload?.step === 'wrong-country' || payload?.step === 'cycling' || payload?.step === 'polling') {
      if (payload.message) appendLog(payload.message);
      if (payload.ipInfo) renderStatus(payload.ipInfo, false);
      if (payload.ipInfo && el.waitCountry && !el.waitOverlay?.classList.contains('hidden')) {
        const code = payload.ipInfo.country || '';
        const name = payload.ipInfo.countryName || code;
        el.waitCountry.textContent = code ? `Currently detected: ${FLAGS[code] || '🌍'} ${name} (${code})` : 'Checking your location…';
      }
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

  function setAccountPhase(show) {
    el.waitAccount?.classList.toggle('hidden', !show);
  }

  function showAccountPrompt(ipInfo) {
    if (userHidWaitOverlay) return;
    setAccountPhase(true);
    showWaitOverlay({
      title: ipInfo?.country === 'US' ? 'You are in the United States — VPN required' : 'VPN required for BloFin',
      body: 'Create a Proton account or sign in to an existing one. After you continue, you only wait.',
      ipInfo,
      cycleLabel: 'One-time account step. Then KnightTrader connects by itself.',
    });
    window.kt.vpnPrepareSandbox?.().catch(() => {});
  }

  function showPleaseWait(ipInfo, payload = {}) {
    if (userHidWaitOverlay) {
      if (ipInfo) renderStatus(ipInfo, !!ipInfo.allowed);
      return;
    }
    setAccountPhase(false);
    showWaitOverlay({
      title: 'Please wait',
      body: payload.body || 'Connecting and switching servers until a BloFin-allowed country is reached.',
      ipInfo,
      cycleLabel: payload.cycleLabel || 'Each server is held for 1 minute 50 seconds before the next change.',
    });
  }

  async function maybeAutoEnsureBlockedRegion() {
    if (autoEnsureStarted || ensureRunning) return;
    try {
      const [ipInfo, state, creds] = await Promise.all([
        window.kt.vpnGetLocation(),
        window.kt.getOnboardingState().catch(() => ({})),
        window.kt.getCredentials().catch(() => ({})),
      ]);
      if (ipInfo?.allowed) return;
      autoEnsureStarted = true;
      const ready = !!(creds?.proton?.email && creds?.proton?.password);
      if (el.waitEmail && creds?.proton?.email) el.waitEmail.value = creds.proton.email;
      window.kt.vpnPrepareSandbox?.().catch(() => {});
      if (!ready) {
        showAccountPrompt(ipInfo);
        appendLog('Waiting for a Proton account before automatic server changes.');
        return;
      }
      showPleaseWait(ipInfo);
      appendLog(`Geo ${ipInfo.country || '?'} not allowed — cycling servers.`);
      ensureRunning = true;
      el.btnEnsure && (el.btnEnsure.disabled = true);
      try {
        await window.kt.vpnEnsureRoute({ preferredCountry: state?.preferredVpnCountry || 'random' });
      } finally {
        ensureRunning = false;
        el.btnEnsure && (el.btnEnsure.disabled = false);
      }
    } catch (_) {}
  }

  async function openProtonSignup(type) {
    const opening = type === 'proton'
      ? 'Click received — opening Create Proton account.'
      : 'Click received — opening Sign in to existing Proton.';
    confirmClick(opening);
    try {
      const res = await window.kt.vpnOpenSignup(type);
      if (!res?.ok) {
        confirmClick(`Click received, but the window did not open: ${res?.error || 'unknown error'}`);
        return;
      }
      confirmClick(type === 'proton'
        ? 'Create Proton account window is open. Finish the form, then click Done — continue in the top right.'
        : 'Proton sign-in window is open. Sign in, then click Done — continue in the top right.');
    } catch (e) {
      confirmClick(`Click received, but the window failed: ${e.message}`);
    }
    window.kt.vpnPrepareSandbox?.().catch(() => {});
  }

  function signInExistingProton() {
    openProtonSignup('protonLogin');
  }

  function createProtonAccount() {
    openProtonSignup('proton');
  }

  async function saveProtonAndConnect(email, password) {
    const trimmed = String(email || '').trim();
    if (!trimmed || !password) {
      confirmClick('Click received. Enter the Proton email and password first, then click Continue — connect again.');
      (el.tabEmail || el.waitEmail)?.focus();
      return;
    }
    confirmClick('Click received. Saving the Proton login and starting the country connect.');
    await window.kt.saveCredentials({ proton: { email: trimmed, password } });
    await window.kt.markOnboardingStep('protonAccount').catch(() => {});
    await window.kt.markOnboardingStep('protonSave').catch(() => {});
    if (el.tabEmail) el.tabEmail.value = trimmed;
    if (el.waitEmail) el.waitEmail.value = trimmed;
    userHidWaitOverlay = false;
    showPleaseWait();
    confirmClick('Proton login saved. Please wait — KnightTrader is connecting and will change server after 1:50 if needed.');
    await runEnsure();
  }

  async function continueAfterAccount() {
    await saveProtonAndConnect(el.waitEmail?.value, el.waitPassword?.value);
  }

  async function continueFromVpnTab() {
    await saveProtonAndConnect(el.tabEmail?.value, el.tabPassword?.value);
  }

  async function openProtonDesktopApp() {
    confirmClick('Click received — preparing the sandboxed Proton copy. The system Proton install is left alone.');
    try {
      const res = await window.kt.vpnOpenProtonApp();
      confirmClick(res?.message || 'Sandboxed Proton files are in KnightTrader app data.');
    } catch (e) {
      confirmClick(`Click received, but sandbox prepare failed: ${e.message}`);
    }
  }

  el.btnVerify?.addEventListener('click', () => {
    confirmClick('Click received — checking your country now.');
    refreshStatus(true);
  });
  el.btnEnsure?.addEventListener('click', () => {
    confirmClick('Click received — ensuring a BloFin-allowed route.');
    runEnsure();
  });
  el.btnProton?.addEventListener('click', () => openProtonDesktopApp());
  el.btnSignin?.addEventListener('click', () => signInExistingProton());
  el.btnCreate?.addEventListener('click', () => createProtonAccount());
  el.btnSaveConnect?.addEventListener('click', () => continueFromVpnTab());
  el.btnWaitSignin?.addEventListener('click', () => signInExistingProton());
  el.btnWaitCreate?.addEventListener('click', () => createProtonAccount());
  el.btnWaitContinue?.addEventListener('click', () => continueAfterAccount());
  el.btnWaitTab?.addEventListener('click', () => {
    confirmClick('Click received — opening the VPN tab. Server changes keep running.');
    userHidWaitOverlay = true;
    hideWaitOverlay();
    if (typeof window.switchTab === 'function') window.switchTab('vpn');
    else document.querySelector('.nav-item[data-tab="vpn"]')?.click();
    refreshStatus(false);
  });
  el.btnDisconnect?.addEventListener('click', async () => {
    confirmClick('Click received — disconnecting the KnightTrader WireGuard tunnel.');
    await window.kt.vpnDisconnect();
    confirmClick('WireGuard disconnected.');
    await refreshStatus(false);
  });

  window.kt.onSignupStepDone(async (payload) => {
    const type = payload?.type;
    if (type !== 'proton' && type !== 'protonLogin') return;
    userHidWaitOverlay = true;
    hideWaitOverlay();
    if (typeof window.switchTab === 'function') window.switchTab('vpn');
    const message = payload?.message || (type === 'proton'
      ? 'Create Proton account closed. Enter that email and password, then click Continue — connect.'
      : 'Sign-in closed. Enter that Proton email and password, then click Continue — connect.');
    confirmClick(message);
    try {
      const creds = await window.kt.getCredentials();
      if (creds?.proton?.email && el.tabEmail && !el.tabEmail.value) el.tabEmail.value = creds.proton.email;
    } catch (_) {}
    el.tabEmail?.focus();
  });

  window.kt.onVpnOnboardingStatus((payload) => {
    window.handleVpnUserNotify(payload);
  });

  window.initVpnTab = async function initVpnTab() {
    try {
      const state = await window.kt.getOnboardingState();
      usNoticeShown = !!state?.usVpnNoticeShown;
    } catch (_) {}
    try {
      const creds = await window.kt.getCredentials();
      if (creds?.proton?.email && el.tabEmail && !el.tabEmail.value) el.tabEmail.value = creds.proton.email;
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
