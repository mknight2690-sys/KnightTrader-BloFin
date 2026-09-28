// Region / VPN / signup onboarding — first-run modal + Credentials tab assistant.
(() => {
  const $ = (id) => document.getElementById(id);

  const el = {
    overlay: $('first-run-overlay'),
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
    btnSignupProtonMail: $('btn-signup-proton-mail'),
    btnSignupGmail: $('btn-signup-gmail'),
    btnSignupDownloads: $('btn-signup-proton-downloads'),
    btnSignupBlofin: $('btn-signup-blofin'),
    vpnStatus: $('vpn-status'),
    vpnBanner: $('vpn-onboard-banner'),
    vpnBannerTitle: $('vpn-onboard-banner-title'),
    vpnBannerText: $('vpn-onboard-banner-text'),
  };

  const TOTAL_STEPS = 8;

  let wizardStep = 0;
  let lastLocation = null;
  let needsVpn = false;

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
    window.kt.vpnOpenSignup(type);
    appendSetupLog(`Opened ${type} — complete the page, then click Done — continue.`);
  }

  function goToCredentialsTab() {
    try {
      document.querySelector('.nav-item[data-tab="credentials"]')?.click();
    } catch (_) {}
  }

  function stepLabel(n, title) {
    return `Step ${n} of ${TOTAL_STEPS} — ${title}`;
  }

  // ── First-run wizard ────────────────────────────────────────────────
  // 0 location | 1 proton signup (@proton.me) | 2 verify proton mail
  // 3 save proton | 4 vpn | 5 blofin signup | 6 verify blofin mail | 7 save & finish
  const STEPS = {
    0: {
      label: stepLabel(1, 'Check location'),
      text: 'We check whether BloFin is available where you are. Restricted regions need free ProtonVPN + a free Proton email first.',
      primary: 'Check my location',
      secondary: null,
      showCreds: false,
      async action() {
        const res = await checkLocation();
        if (!res) return;
        wizardStep = res.allowed ? 5 : 1;
        renderWizard();
      },
    },
    1: {
      label: stepLabel(2, 'Create your @proton.me email'),
      text: 'Opens Proton signup in a popup. Pick a username — that becomes your free @proton.me address (you will use it for BloFin). Complete CAPTCHA, then click Done — continue.',
      primary: 'Open Proton signup',
      secondary: 'Skip — I already have Proton',
      showCreds: false,
      action() { openSignup('proton'); },
      secondaryAction() { wizardStep = 3; renderWizard(); },
    },
    2: {
      label: stepLabel(3, 'Verify Proton email'),
      text: 'Opens Proton Mail in a popup. Sign in if needed, open Proton’s verification message, and click the confirm link. Then Done — continue.',
      primary: 'Open Proton Mail',
      secondary: 'Skip — already verified',
      showCreds: false,
      action() { openSignup('protonMail'); },
      secondaryAction() { wizardStep = 3; renderWizard(); },
    },
    3: {
      label: stepLabel(4, 'Save Proton login'),
      text: 'Enter the @proton.me address and password you just created. Stored encrypted on this PC (Credentials tab).',
      primary: 'Save & continue',
      secondary: null,
      showCreds: 'proton',
      async action() {
        if (!el.frProtonEmail?.value?.trim()) {
          setStatus(el.status, 'Enter your @proton.me email.', 'err');
          return;
        }
        await saveWizardCredentials('proton');
        wizardStep = needsVpn ? 4 : 5;
        renderWizard();
      },
    },
    4: {
      label: stepLabel(5, 'Connect VPN'),
      text: 'Installs WireGuard + ProtonVPN if needed, then opens ProtonVPN. Sign in with your Proton account and connect to a free server in NL, JP, RO, or PL.',
      primary: 'Install & connect VPN',
      secondary: 'Check location again',
      showCreds: false,
      async action() {
        if (el.progressWrap) el.progressWrap.classList.remove('hidden');
        await runAutoVpnSetup();
      },
      async secondaryAction() {
        const res = await checkLocation();
        if (res?.allowed) { wizardStep = 5; renderWizard(); }
      },
    },
    5: {
      label: stepLabel(6, 'Create BloFin account'),
      text: needsVpn
        ? 'Keep VPN connected. Opens BloFin signup — register with your @proton.me email (same one you saved). Then Done — continue.'
        : 'Opens BloFin signup in a popup. Use your @proton.me email, or create one first with the secondary button below.',
      primary: 'Open BloFin signup',
      secondary: 'Create @proton.me email first',
      showCreds: false,
      action() { openSignup('blofin'); },
      secondaryAction() { openSignup('proton'); },
    },
    6: {
      label: stepLabel(7, 'Verify BloFin email'),
      text: 'Opens Proton Mail again. Find BloFin’s verification email, click the link, then Done — continue.',
      primary: 'Open Proton Mail',
      secondary: 'Skip — BloFin already verified',
      showCreds: false,
      action() { openSignup('protonMail'); },
      secondaryAction() { wizardStep = 7; renderWizard(); },
    },
    7: {
      label: stepLabel(8, 'Save BloFin email & finish'),
      text: 'Confirm the email you used on BloFin (usually your @proton.me). API keys come later on the Setup tab.',
      primary: 'Save & finish',
      secondary: 'Open Credentials tab',
      showCreds: 'blofin',
      async action() {
        if (!el.frBlofinEmail?.value?.trim() && !el.frProtonEmail?.value?.trim()) {
          setStatus(el.status, 'Enter your BloFin account email.', 'err');
          return;
        }
        await saveWizardCredentials('blofin');
        await finishFirstRun(true);
      },
      secondaryAction() { goToCredentialsTab(); finishFirstRun(true); },
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
    if (wizardStep !== 4) setStatus(el.status, '', '');
  }

  function handleSignupDone(type) {
    appendSetupLog(`${type} popup completed.`);
    if (type === 'proton' || type === 'protonvpn') {
      if (wizardStep === 1) { wizardStep = 2; renderWizard(); return; }
      if (wizardStep === 5) {
        setStatus(el.status, 'Proton email created — now click Open BloFin signup.', 'ok');
        return;
      }
    }
    if (type === 'protonMail' || type === 'protonMailLogin') {
      if (wizardStep === 2) { wizardStep = 3; renderWizard(); return; }
      if (wizardStep === 6) { wizardStep = 7; renderWizard(); return; }
    }
    if (type === 'gmail') {
      setStatus(el.status, 'Gmail created — use that address for BloFin signup.', 'ok');
      return;
    }
    if (type === 'blofin') {
      if (wizardStep === 5) {
        if (el.frBlofinEmail && el.frProtonEmail?.value) {
          el.frBlofinEmail.value = el.frProtonEmail.value;
        }
        wizardStep = 6;
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

  el.btnVpnCheck?.addEventListener('click', () => checkLocation());
  el.btnVpnAuto?.addEventListener('click', () => runAutoVpnSetup());
  el.btnSignupProton?.addEventListener('click', () => openSignup('proton'));
  el.btnSignupProtonMail?.addEventListener('click', () => openSignup('protonMail'));
  el.btnSignupGmail?.addEventListener('click', () => openSignup('gmail'));
  el.btnSignupDownloads?.addEventListener('click', () => openSignup('protonDownloads'));
  el.btnSignupBlofin?.addEventListener('click', () => openSignup('blofin'));

  window.kt.onSignupStepDone((payload) => handleSignupDone(payload?.type));

  window.kt.onVpnOnboardingStatus((payload) => {
    const msg = payload?.message || '';
    if (msg) appendSetupLog(msg);
    if (payload?.step === 'connected' || payload?.step === 'ready') {
      showVpnBanner('VPN ready', msg, true);
      if (payload?.ipInfo?.allowed && wizardStep === 4) {
        wizardStep = 5;
        renderWizard();
      }
    }
    if (payload?.percent != null && el.progressBar) {
      el.progressWrap?.classList.remove('hidden');
      el.progressBar.style.width = `${Math.round(payload.percent)}%`;
    }
  });

  window.initVpnOnboarding = () => { maybeShowFirstRun(); };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.initVpnOnboarding?.());
  } else {
    window.initVpnOnboarding?.();
  }
})();
