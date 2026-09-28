// Region / VPN / signup onboarding — first-run modal + Credentials tab assistant.
(() => {
  const $ = (id) => document.getElementById(id);

  const el = {
    overlay: $('first-run-overlay'),
    title: $('first-run-title'),
    lead: $('first-run-lead'),
    stepLabel: $('first-run-step-label'),
    text: $('first-run-text'),
    status: $('first-run-status'),
    credsWrap: $('first-run-creds'),
    frProtonEmail: $('fr-proton-email'),
    frProtonPassword: $('fr-proton-password'),
    frBlofinWrap: $('fr-blofin-wrap'),
    frBlofinEmail: $('fr-blofin-email'),
    progressWrap: $('first-run-progress'),
    progressBar: $('first-run-progress-bar'),
    btnPrimary: $('first-run-primary'),
    btnSecondary: $('first-run-secondary'),
    btnSkip: $('first-run-skip'),
    btnRerunWizard: $('btn-rerun-wizard'),
    vpnCountry: $('vpn-country'),
    btnVpnAuto: $('btn-vpn-auto-setup'),
    btnVpnCheck: $('btn-vpn-check'),
    btnSignupProton: $('btn-signup-proton'),
    btnSignupDownloads: $('btn-signup-proton-downloads'),
    btnSignupBlofin: $('btn-signup-blofin'),
    vpnStatus: $('vpn-status'),
    vpnBanner: $('vpn-onboard-banner'),
    vpnBannerTitle: $('vpn-onboard-banner-title'),
    vpnBannerText: $('vpn-onboard-banner-text'),
  };

  let wizardStep = 0;
  let lastLocation = null;
  let needsVpn = false;
  let signupOpenedForStep = null;

  function setStatus(node, text, kind) {
    const target = node || el.status;
    if (!target) return;
    target.textContent = text || '';
    target.className = (node ? target.className.replace(/\s*(ok|err|pending)\s*/g, ' ') : 'first-run-status')
      + (kind ? ` ${kind}` : '');
    if (!node && kind) target.classList.add(kind);
  }

  function appendSetupLog(line) {
    if (!el.vpnStatus) return;
    const ts = new Date().toLocaleTimeString();
    el.vpnStatus.textContent = `${el.vpnStatus.textContent ? el.vpnStatus.textContent + '\n' : ''}[${ts}] ${line}`;
    el.vpnStatus.scrollTop = el.vpnStatus.scrollHeight;
  }

  function showVpnBanner(title, text, visible = true) {
    if (!el.vpnBanner) return;
    el.vpnBanner.classList.toggle('hidden', !visible);
    if (title && el.vpnBannerTitle) el.vpnBannerTitle.textContent = title;
    if (text && el.vpnBannerText) el.vpnBannerText.textContent = text;
  }

  function preferredCountry() {
    return el.vpnCountry?.value || 'random';
  }

  function showCredFields(mode) {
    if (!el.credsWrap) return;
    el.credsWrap.classList.toggle('hidden', !mode);
    el.frBlofinWrap?.classList.toggle('hidden', mode !== 'blofin');
  }

  async function saveWizardCredentials(mode) {
    const proton = {
      email: el.frProtonEmail?.value?.trim() || '',
      password: el.frProtonPassword?.value || '',
    };
    const blofinAccount = {
      email: el.frBlofinEmail?.value?.trim() || el.frProtonEmail?.value?.trim() || '',
    };
    const patch = mode === 'blofin'
      ? { blofinAccount }
      : { proton, blofinAccount: { email: proton.email || blofinAccount.email } };
    await window.kt.saveCredentials(patch);
    window.initCredentialsTab?.();
    setStatus(el.status, 'Credentials saved locally (encrypted).', 'ok');
    appendSetupLog('Account credentials saved.');
  }

  async function checkLocation() {
    setStatus(el.status, 'Checking location…', 'pending');
    appendSetupLog('Checking location…');
    try {
      const res = await window.kt.vpnOnboardingCheck();
      lastLocation = res?.ipInfo || null;
      needsVpn = !res?.allowed;
      const where = lastLocation?.countryName || lastLocation?.country || 'unknown';
      if (res?.allowed) {
        const msg = `You are in ${where} — BloFin should work without VPN.`;
        setStatus(el.status, msg, 'ok');
        appendSetupLog(msg);
        showVpnBanner('Location OK', msg);
        return res;
      }
      const msg = `${where} is not BloFin-allowed. Free ProtonVPN setup is next.`;
      setStatus(el.status, msg, 'err');
      appendSetupLog(msg);
      showVpnBanner('VPN required', msg);
      return res;
    } catch (e) {
      const msg = e?.message || 'Location check failed';
      setStatus(el.status, msg, 'err');
      appendSetupLog(msg);
      return null;
    }
  }

  async function runAutoVpnSetup() {
    el.btnVpnAuto && (el.btnVpnAuto.disabled = true);
    appendSetupLog('Starting auto VPN setup…');
    if (el.progressWrap) el.progressWrap.classList.remove('hidden');
    try {
      const res = await window.kt.vpnOnboardingAutoSetup({ preferredCountry: preferredCountry() });
      if (res?.allowed) appendSetupLog('VPN route confirmed — BloFin region OK.');
      else if (res?.waitingForUser) appendSetupLog('ProtonVPN opened — connect to a free NL/JP/RO/PL server, then wait.');
      return res;
    } catch (e) {
      appendSetupLog(`Setup error: ${e.message}`);
      return null;
    } finally {
      el.btnVpnAuto && (el.btnVpnAuto.disabled = false);
    }
  }

  function openSignup(type) {
    signupOpenedForStep = wizardStep;
    window.kt.vpnOpenSignup(type);
    appendSetupLog(`Opened ${type} signup — complete CAPTCHA, then click Done — continue.`);
  }

  function goToCredentialsTab() {
    try {
      document.querySelector('.nav-item[data-tab="credentials"]')?.click();
    } catch (_) {}
  }

  // ── First-run wizard (once) ─────────────────────────────────────
  const STEPS = {
    0: {
      label: 'Step 1 of 6 — Check location',
      text: 'We check whether BloFin is available where you are. Restricted regions need free ProtonVPN first.',
      primary: 'Check my location',
      secondary: null,
      showCreds: false,
      async action() {
        const res = await checkLocation();
        if (!res) return;
        wizardStep = res.allowed ? 4 : 1;
        renderWizard();
      },
    },
    1: {
      label: 'Step 2 of 6 — Create Proton account',
      text: 'Opens Proton signup in a popup. Complete CAPTCHA and create your free account, then click Done — continue in that window.',
      primary: 'Open Proton signup',
      secondary: 'Skip — I already have Proton',
      showCreds: false,
      action() { openSignup('proton'); },
      secondaryAction() { wizardStep = 2; renderWizard(); },
    },
    2: {
      label: 'Step 3 of 6 — Save Proton login',
      text: 'Enter the Proton email and password you just created. These are stored encrypted on this PC (Credentials tab).',
      primary: 'Save & continue',
      secondary: null,
      showCreds: 'proton',
      async action() {
        if (!el.frProtonEmail?.value?.trim()) {
          setStatus(el.status, 'Enter your Proton email.', 'err');
          return;
        }
        await saveWizardCredentials('proton');
        wizardStep = 3;
        renderWizard();
      },
    },
    3: {
      label: 'Step 4 of 6 — Connect VPN',
      text: 'The app installs WireGuard + ProtonVPN if needed, then opens ProtonVPN. Sign in and connect to a free server in Netherlands, Japan, Romania, or Poland.',
      primary: 'Install & connect VPN',
      secondary: 'Check location again',
      showCreds: false,
      async action() {
        if (el.progressWrap) el.progressWrap.classList.remove('hidden');
        await runAutoVpnSetup();
      },
      async secondaryAction() {
        const res = await checkLocation();
        if (res?.allowed) { wizardStep = 4; renderWizard(); }
      },
    },
    4: {
      label: 'Step 5 of 6 — BloFin account',
      text: needsVpn
        ? 'Keep VPN connected. Create your BloFin account with your Proton email in the in-app popup.'
        : 'Create your BloFin account in the in-app popup (no VPN needed in your region).',
      primary: 'Open BloFin signup',
      secondary: 'Skip — I already have BloFin',
      showCreds: false,
      action() { openSignup('blofin'); },
      secondaryAction() { wizardStep = 6; renderWizard(); },
    },
    5: {
      label: 'Step 6 of 6 — Save BloFin email',
      text: 'Enter the email you used for BloFin signup. API keys come later on the Setup tab.',
      primary: 'Save & finish',
      secondary: null,
      showCreds: 'blofin',
      async action() {
        if (!el.frBlofinEmail?.value?.trim() && !el.frProtonEmail?.value?.trim()) {
          setStatus(el.status, 'Enter your BloFin account email.', 'err');
          return;
        }
        await saveWizardCredentials('blofin');
        wizardStep = 6;
        await finishFirstRun(true);
      },
    },
    6: {
      label: 'All set',
      text: 'Account setup complete. Continue with Nous Portal + BloFin API keys on the Setup tab.',
      primary: 'Open Credentials tab',
      secondary: 'Close',
      showCreds: false,
      action() { goToCredentialsTab(); finishFirstRun(true); },
      secondaryAction() { finishFirstRun(true); },
    },
  };

  function renderWizard() {
    const step = STEPS[wizardStep];
    if (!step || !el.overlay) return;
    el.overlay.classList.remove('hidden');
    if (el.stepLabel) el.stepLabel.textContent = step.label;
    if (el.text) el.text.textContent = step.text;
    showCredFields(step.showCreds);
    if (el.btnPrimary) {
      el.btnPrimary.textContent = step.primary;
      el.btnPrimary.classList.remove('hidden');
    }
    if (el.btnSecondary) {
      if (step.secondary) {
        el.btnSecondary.textContent = step.secondary;
        el.btnSecondary.classList.remove('hidden');
      } else {
        el.btnSecondary.classList.add('hidden');
      }
    }
    if (wizardStep !== 3) setStatus(el.status, '', '');
  }

  function handleSignupDone(type) {
    appendSetupLog(`${type} signup popup completed.`);
    if (type === 'proton' || type === 'protonvpn') {
      if (wizardStep === 1) { wizardStep = 2; renderWizard(); }
      return;
    }
    if (type === 'blofin') {
      if (wizardStep === 4) {
        if (el.frBlofinEmail && el.frProtonEmail?.value) {
          el.frBlofinEmail.value = el.frProtonEmail.value;
        }
        wizardStep = 5;
        renderWizard();
      }
    }
  }

  async function finishFirstRun(vpnVerified) {
    try {
      await window.kt.setOnboardingState({
        firstRunComplete: true,
        vpnVerified: !!vpnVerified || !needsVpn,
        completedAt: Date.now(),
      });
    } catch (_) {}
    el.overlay?.classList.add('hidden');
    window.kt.vpnOnboardingStopPoll?.();
  }

  async function maybeShowFirstRun() {
    try {
      const state = await window.kt.getOnboardingState();
      if (state?.firstRunComplete) return;
    } catch (_) {}
    wizardStep = 0;
    renderWizard();
  }

  function rerunWizard() {
    wizardStep = 0;
    renderWizard();
  }

  if (el.btnPrimary) {
    el.btnPrimary.addEventListener('click', async () => {
      const step = STEPS[wizardStep];
      if (step?.action) await step.action();
    });
  }
  if (el.btnSecondary) {
    el.btnSecondary.addEventListener('click', async () => {
      const step = STEPS[wizardStep];
      if (step?.secondaryAction) await step.secondaryAction();
    });
  }
  if (el.btnSkip) {
    el.btnSkip.addEventListener('click', () => finishFirstRun(false));
  }
  el.btnRerunWizard?.addEventListener('click', () => rerunWizard());

  // ── Credentials tab controls ──────────────────────────────────────────
  el.btnVpnCheck?.addEventListener('click', () => checkLocation());
  el.btnVpnAuto?.addEventListener('click', () => runAutoVpnSetup());
  el.btnSignupProton?.addEventListener('click', () => openSignup('proton'));
  el.btnSignupDownloads?.addEventListener('click', () => openSignup('protonDownloads'));
  el.btnSignupBlofin?.addEventListener('click', () => openSignup('blofin'));

  window.kt.onSignupStepDone((payload) => handleSignupDone(payload?.type));

  window.kt.onVpnOnboardingStatus((payload) => {
    const msg = payload?.message || '';
    if (msg) appendSetupLog(msg);
    if (payload?.step === 'connected' || payload?.step === 'ready') {
      showVpnBanner('VPN ready', msg, true);
      if (payload?.ipInfo?.allowed && wizardStep === 3) {
        wizardStep = 4;
        renderWizard();
      }
    }
    if (payload?.percent != null && el.progressBar) {
      el.progressWrap?.classList.remove('hidden');
      el.progressBar.style.width = `${Math.round(payload.percent)}%`;
    }
  });

  window.initVpnOnboarding = () => {
    maybeShowFirstRun();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.initVpnOnboarding?.());
  } else {
    window.initVpnOnboarding?.();
  }
})();
