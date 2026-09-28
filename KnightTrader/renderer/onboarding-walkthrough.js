// Full-app onboarding: disclaimer, missing-step detection, popup walkthrough, returning-user handoff.
(() => {
  const $ = (id) => document.getElementById(id);

  const el = {
    disclaimer: $('onboard-disclaimer-overlay'),
    missing: $('onboard-missing-overlay'),
    missingList: $('onboard-missing-list'),
    overlay: $('first-run-overlay'),
    stepLabel: $('first-run-step-label'),
    text: $('first-run-text'),
    status: $('first-run-status'),
    credsWrap: $('first-run-creds'),
    frProtonEmail: $('fr-proton-email'),
    frProtonPassword: $('fr-proton-password'),
    frBlofinWrap: $('fr-blofin-wrap'),
    frBlofinEmail: $('fr-blofin-email'),
    btnPrimary: $('first-run-primary'),
    btnSecondary: $('first-run-secondary'),
    btnSkip: $('first-run-skip'),
    btnRerunWizard: $('btn-rerun-wizard'),
    vpnCountry: $('vpn-country'),
    btnVpnAuto: $('btn-vpn-auto-setup'),
    btnVpnCheck: $('btn-vpn-check'),
    btnSignupProton: $('btn-signup-proton'),
    btnSigninProton: $('btn-signin-proton'),
    btnSignupProtonMail: $('btn-signup-proton-mail'),
    btnSignupGmail: $('btn-signup-gmail'),
    btnSignupDownloads: $('btn-signup-proton-downloads'),
    btnSignupBlofin: $('btn-signup-blofin'),
    btnSignupBlofinLogin: $('btn-signup-blofin-login'),
    btnSignupBlofinApi: $('btn-signup-blofin-api'),
    btnPasteBlofinApi: $('btn-paste-blofin-api'),
    btnPasteNousApi: $('btn-paste-nous-api'),
    btnCoinbase: $('btn-signup-coinbase'),
    btnCoinbaseBuy: $('btn-signup-coinbase-buy'),
    btnBlofinDeposit: $('btn-signup-blofin-deposit'),
    vpnStatus: $('vpn-status'),
    vpnBanner: $('vpn-onboard-banner'),
    vpnBannerTitle: $('vpn-onboard-banner-title'),
    vpnBannerText: $('vpn-onboard-banner-text'),
    btnDisclaimerStart: $('onboard-disclaimer-start'),
    btnDisclaimerSkip: $('onboard-disclaimer-skip'),
    btnMissingContinue: $('onboard-missing-continue'),
    btnMissingLater: $('onboard-missing-later'),
  };

  let walkQueue = [];
  let walkIndex = 0;
  let needsVpn = true;
  let locationAllowed = false;
  let lastChecklist = null;

  function setStatus(text, kind) {
    if (!el.status) return;
    el.status.textContent = text || '';
    el.status.className = 'first-run-status' + (kind ? ` ${kind}` : '');
  }

  function appendSetupLog(line) {
    if (!el.vpnStatus) return;
    const ts = new Date().toLocaleTimeString();
    el.vpnStatus.textContent = `${el.vpnStatus.textContent ? el.vpnStatus.textContent + '\n' : ''}[${ts}] ${line}`;
    el.vpnStatus.scrollTop = el.vpnStatus.scrollHeight;
  }

  function showCredFields(mode) {
    if (!el.credsWrap) return;
    el.credsWrap.classList.toggle('hidden', !mode);
    el.frBlofinWrap?.classList.toggle('hidden', mode !== 'blofinEmail');
  }

  function openSignup(type) {
    window.kt.vpnOpenSignup(type);
    appendSetupLog(`Opened ${type} popup — click Done when finished.`);
  }

  async function saveProtonForm() {
    await window.kt.saveCredentials({
      proton: {
        email: el.frProtonEmail?.value?.trim() || '',
        password: el.frProtonPassword?.value || '',
      },
      blofinAccount: { email: el.frProtonEmail?.value?.trim() || '' },
    });
    await window.kt.markOnboardingStep('protonSave');
    window.initCredentialsTab?.();
  }

  async function saveBlofinEmailForm() {
    await window.kt.saveCredentials({
      blofinAccount: { email: el.frBlofinEmail?.value?.trim() || el.frProtonEmail?.value?.trim() || '' },
    });
    await window.kt.markOnboardingStep('blofinEmailSave');
    window.initCredentialsTab?.();
  }

  const STEP_COPY = {
    location: {
      title: 'Check location',
      text: 'We detect whether BloFin works in your country. Restricted regions get free ProtonVPN setup next.',
      primary: 'Check my location',
      secondary: null,
      form: false,
    },
    protonAccount: { title: 'Proton account', text: 'Create a free Proton account, or sign in if you already have Proton VPN. Complete CAPTCHA in the popup, then Done.', primary: 'Create Proton account', secondary: 'Sign in to existing Proton VPN', form: false, popup: 'proton', secondaryPopup: 'protonLogin' },
    protonMail: { title: 'Verify Proton email', text: 'Open Proton Mail, click the verification link, then Done.', primary: 'Open Proton Mail', secondary: 'Skip — verified', form: false, popup: 'protonMail' },
    protonSave: { title: 'Save Proton login', text: 'Enter your @proton.me and password — stored encrypted on this PC.', primary: 'Save & continue', secondary: null, form: 'proton' },
    vpn: { title: 'Connect VPN', text: 'Installs WireGuard + ProtonVPN and connects to a free BloFin-allowed country.', primary: 'Install & connect VPN', secondary: 'Skip — not needed', form: false },
    blofinAccount: { title: 'Create BloFin account', text: 'Register with your @proton.me email in the popup.', primary: 'Open BloFin signup', secondary: 'Skip — have account', form: false, popup: 'blofin' },
    blofinMail: { title: 'Verify BloFin email', text: 'Open Proton Mail, click BloFin’s verification link, then Done.', primary: 'Open Proton Mail', secondary: 'Skip', form: false, popup: 'protonMail' },
    blofinEmailSave: { title: 'Save BloFin email', text: 'Confirm the email you used on BloFin.', primary: 'Save & continue', secondary: null, form: 'blofinEmail' },
    blofinLogin: { title: 'Sign in to BloFin', text: 'Sign in so we can open API Management next.', primary: 'Open BloFin login', secondary: 'Skip — signed in', form: false, popup: 'blofinLogin' },
    blofinApiCreate: { title: 'Create BloFin API keys', text: 'Create key KT Hermes — Read + Compendium + Trade + Passphrase. Copy all three values.', primary: 'Open API Management', secondary: 'Skip — have keys', form: false, popup: 'blofinApi' },
    blofinApiPaste: { title: 'Paste BloFin API keys', text: 'Paste API Key, Secret Key, and Passphrase once — Done saves everything.', primary: 'Open paste window', secondary: 'Skip for now', form: false, paste: 'blofin' },
    nousSignup: { title: 'Nous Portal account', text: 'Create/login at Nous Portal (Hermes AI). Done when signed in.', primary: 'Open Nous Portal', secondary: 'Skip', form: false, popup: 'nousPortal' },
    nousCredits: { title: 'Add Nous credits', text: 'Add at least $5 in credits via Stripe — required before API key creation.', primary: 'Open billing / top-up', secondary: 'Skip — have credits', form: false, popup: 'nousBilling' },
    nousApiCreate: { title: 'Create Nous API key', text: 'Create key named KT Hermes — copy the full key.', primary: 'Open API keys page', secondary: 'Skip', form: false, popup: 'nousApiKeys' },
    nousApiPaste: { title: 'Paste Nous API key', text: 'Paste your Portal API key once — Done saves it.', primary: 'Open paste window', secondary: 'Skip for now', form: false, paste: 'nous' },
    coinbaseSignup: { title: 'Create Coinbase account', text: 'On-ramp for USDT. Complete signup + ID verification in popup.', primary: 'Open Coinbase signup', secondary: 'Skip — have Coinbase', form: false, popup: 'coinbase' },
    coinbaseCard: { title: 'Add debit card', text: 'Link your debit card for buying USDT.', primary: 'Open payment methods', secondary: 'Skip', form: false, popup: 'coinbasePayments' },
    coinbaseBuy: { title: 'Buy USDT', text: 'Buy USDT (not USDC) — start with $25–50.', primary: 'Open buy USDT', secondary: 'Skip', form: false, popup: 'coinbaseBuy' },
    blofinDeposit: { title: 'BloFin deposit address', text: 'Copy USDT deposit address + network — you’ll need it on Coinbase send.', primary: 'Open BloFin deposit', secondary: 'Skip', form: false, popup: 'blofinDeposit' },
    coinbaseSend: { title: 'Send USDT to BloFin', text: 'Send USDT from Coinbase — network must match BloFin exactly.', primary: 'Open Coinbase send', secondary: 'Skip', form: false, popup: 'coinbaseSend' },
    blofinTransfer: { title: 'Move USDT to USDT-M', text: 'Internal transfer Funding/Spot → Futures (USDT-M) so Hermes can trade.', primary: 'Open BloFin transfer', secondary: 'Skip', form: false, popup: 'blofinTransfer' },
    defender: { title: 'Defender exclusion', text: 'Windows only — whitelist Hermes folder (UAC prompt).', primary: 'Add Defender exclusion', secondary: 'Skip (Mac / done)', form: false, action: 'defender' },
    hermesInstall: { title: 'Install Hermes', text: 'Downloads Hermes sandboxed inside this app.', primary: 'Install Hermes now', secondary: 'Skip — installed', form: false, action: 'hermesInstall' },
    compendium: { title: 'Save & compendium', text: 'Writes the file Hermes reads for your keys.', primary: 'Save & write compendium', secondary: 'Skip', form: false, action: 'compendium' },
    hermesStart: { title: 'Start Hermes', text: 'Starts dashboard + gateway on port 9119.', primary: 'Start dashboard + gateway', secondary: 'Skip — running', form: false, action: 'hermesStart' },
    cron: { title: 'Configure cron', text: 'Auto-creates the 10-minute BloFin trading cron.', primary: 'Auto-configure cron', secondary: 'Skip', form: false, action: 'cron' },
  };

  function currentStepId() {
    return walkQueue[walkIndex];
  }

  function renderWalkStep() {
    const stepId = currentStepId();
    const copy = STEP_COPY[stepId];
    if (!copy || !el.overlay) return;
    el.overlay.classList.remove('hidden');
    const total = walkQueue.length;
    if (el.stepLabel) el.stepLabel.textContent = `Step ${walkIndex + 1} of ${total} — ${copy.title}`;
    if (el.text) el.text.textContent = copy.text;
    showCredFields(copy.form || false);
    if (el.btnPrimary) {
      el.btnPrimary.textContent = copy.primary;
      el.btnPrimary.classList.remove('hidden');
    }
    if (el.btnSecondary) {
      if (copy.secondary) {
        el.btnSecondary.textContent = copy.secondary;
        el.btnSecondary.classList.remove('hidden');
      } else {
        el.btnSecondary.classList.add('hidden');
      }
    }
    setStatus('', '');
  }

  async function skipCurrentStep() {
    const stepId = currentStepId();
    if (stepId) await window.kt.markOnboardingStep(stepId);
    advanceWalk();
  }

  async function runPrimaryAction() {
    const stepId = currentStepId();
    const copy = STEP_COPY[stepId];
    if (!copy) return;

    if (copy.popup) {
      openSignup(copy.popup);
      return;
    }
    if (copy.paste === 'blofin') {
      window.kt.openBlofinPaste();
      return;
    }
    if (copy.paste === 'nous') {
      window.kt.openNousPaste();
      return;
    }
    if (copy.form === 'proton') {
      if (!el.frProtonEmail?.value?.trim()) { setStatus('Enter your @proton.me email.', 'err'); return; }
      await saveProtonForm();
      advanceWalk();
      return;
    }
    if (copy.form === 'blofinEmail') {
      await saveBlofinEmailForm();
      advanceWalk();
      return;
    }

    if (stepId === 'location') {
      setStatus('Checking location…', 'pending');
      const res = await window.kt.vpnOnboardingCheck();
      locationAllowed = !!res?.allowed;
      needsVpn = !locationAllowed;
      await window.kt.markOnboardingStep('location');
      if (locationAllowed) {
        setStatus(`Location OK (${res?.ipInfo?.countryName || 'allowed'}) — VPN connect not needed; Proton signup still required if you have no @proton.me yet.`, 'ok');
        walkQueue = walkQueue.filter((id) => id !== 'vpn');
      }
      advanceWalk();
      return;
    }
    if (stepId === 'vpn') {
      appendSetupLog('Ensuring BloFin-allowed VPN route…');
      try { document.querySelector('.nav-item[data-tab="vpn"]')?.click(); } catch (_) {}
      window.handleVpnUserNotify?.({
        step: 'user-notify',
        notifyUser: true,
        title: 'VPN setup — follow the steps',
        body: 'KnightTrader will keep checking until ProtonVPN shows an allowed country.',
        steps: [
          'ProtonVPN opens automatically — sign in with your free Proton account.',
          'Connect to Netherlands, Japan, Romania, or Poland (free servers).',
          'Wait 1–2 minutes. This screen updates automatically — do not close the app.',
        ],
        cycle: 0,
      });
      const res = await window.kt.vpnEnsureRoute({ preferredCountry: el.vpnCountry?.value || 'random' });
      if (res?.allowed) {
        await window.kt.markOnboardingStep('vpn');
        advanceWalk();
      } else {
        setStatus('Connect ProtonVPN to NL, JP, RO, or PL — KnightTrader will verify when ready.', 'pending');
      }
      return;
    }
    if (copy.action === 'defender') {
      const r = await window.kt.addDefenderExclusion();
      if (r?.ok) await window.kt.markOnboardingStep('defender');
      setStatus(r?.ok ? 'Defender exclusion added.' : (r?.error || 'Try again or add manually.'), r?.ok ? 'ok' : 'err');
      if (r?.ok) advanceWalk();
      return;
    }
    if (copy.action === 'hermesInstall') {
      setStatus('Installing Hermes…', 'pending');
      const r = await window.kt.installHermes();
      if (r?.ok) await window.kt.markOnboardingStep('hermesInstall');
      setStatus(r?.ok ? 'Hermes installed.' : (r?.error || 'Install failed — see Logs.'), r?.ok ? 'ok' : 'err');
      if (r?.ok) advanceWalk();
      return;
    }
    if (copy.action === 'compendium') {
      const creds = await window.kt.getCredentials();
      await window.kt.saveCredentials(creds);
      const w = await window.kt.writeCompendium();
      if (w?.ok) await window.kt.markOnboardingStep('compendium');
      setStatus(w?.ok ? 'Compendium written.' : (w?.error || 'Failed'), w?.ok ? 'ok' : 'err');
      if (w?.ok) advanceWalk();
      return;
    }
    if (copy.action === 'hermesStart') {
      setStatus('Starting Hermes…', 'pending');
      const r = await window.kt.startDashboard();
      if (r?.ok) await window.kt.markOnboardingStep('hermesStart');
      setStatus(r?.ok ? 'Dashboard + gateway starting…' : (r?.error || 'Failed'), r?.ok ? 'ok' : 'pending');
      if (r?.ok) setTimeout(() => advanceWalk(), 3000);
      return;
    }
    if (copy.action === 'cron') {
      const r = await window.kt.configureCron();
      if (r?.ok) await window.kt.markOnboardingStep('cron');
      setStatus(r?.ok ? 'Cron configured.' : 'Copy prompt manually if needed.', r?.ok ? 'ok' : 'err');
      advanceWalk();
    }
  }

  function advanceWalk() {
    walkIndex += 1;
    if (walkIndex >= walkQueue.length) {
      finishWalkthrough(true);
      return;
    }
    renderWalkStep();
  }

  async function finishWalkthrough(markComplete) {
    el.overlay?.classList.add('hidden');
    if (markComplete) {
      await window.kt.setOnboardingState({
        firstRunComplete: true,
        setupComplete: true,
        completedAt: Date.now(),
      });
    }
    window.kt.vpnOnboardingStopPoll?.();
  }

  function startWalkFromMissing(missing) {
    walkQueue = (missing || []).map((s) => s.id);
    walkIndex = 0;
    if (!walkQueue.length) return;
    renderWalkStep();
  }

  function showMissingPrompt(missing) {
    if (!el.missing || !missing?.length) return;
    el.missingList.innerHTML = missing.map((s) => `<li>${s.label}</li>`).join('');
    el.missing.classList.remove('hidden');
  }

  function hideOverlays() {
    el.disclaimer?.classList.add('hidden');
    el.missing?.classList.add('hidden');
    el.overlay?.classList.add('hidden');
  }

  async function onSignupOrPasteDone(payload) {
    const stepId = currentStepId();
    if (payload?.stepId && payload.stepId === stepId) {
      advanceWalk();
      return;
    }
    if (stepId === 'blofinApiCreate' && payload?.type === 'blofinApi') {
      advanceWalk();
      setTimeout(() => window.kt.openBlofinPaste(), 500);
      return;
    }
    if (stepId === 'nousApiCreate' && (payload?.type === 'nousApiKeys' || payload?.kind === 'nousApi')) {
      advanceWalk();
      setTimeout(() => window.kt.openNousPaste(), 500);
      return;
    }
    if (payload?.ok && (stepId === 'blofinApiPaste' || stepId === 'nousApiPaste')) {
      advanceWalk();
    }
  }

  async function initOnboardingWalkthrough() {
    try {
      lastChecklist = await window.kt.getOnboardingChecklist();
    } catch (_) {
      return;
    }

    if (lastChecklist.isReturningUser || lastChecklist.setupComplete) {
      if (window.runReturningUserStartup) window.runReturningUserStartup();
      return;
    }

    if (!lastChecklist.needsWalkthrough || !lastChecklist.missing?.length) return;

    const state = await window.kt.getOnboardingState();
    if (!state?.disclaimerSeen) {
      el.disclaimer?.classList.remove('hidden');
      return;
    }

    showMissingPrompt(lastChecklist.missing);
  }

  el.btnDisclaimerStart?.addEventListener('click', async () => {
    await window.kt.setOnboardingState({ disclaimerSeen: true });
    el.disclaimer?.classList.add('hidden');
    lastChecklist = await window.kt.getOnboardingChecklist();
    if (lastChecklist.missing?.length) {
      showMissingPrompt(lastChecklist.missing);
    } else {
      startWalkFromMissing([]);
    }
  });

  el.btnDisclaimerSkip?.addEventListener('click', async () => {
    await window.kt.setOnboardingState({ disclaimerSeen: true, firstRunComplete: true });
    hideOverlays();
  });

  el.btnMissingContinue?.addEventListener('click', () => {
    el.missing?.classList.add('hidden');
    startWalkFromMissing(lastChecklist?.missing || []);
  });

  el.btnMissingLater?.addEventListener('click', () => {
    el.missing?.classList.add('hidden');
  });

  el.btnPrimary?.addEventListener('click', () => runPrimaryAction());
  el.btnSecondary?.addEventListener('click', () => {
    const copy = STEP_COPY[currentStepId()];
    if (copy?.secondaryPopup) {
      openSignup(copy.secondaryPopup);
      window.kt.vpnOpenProtonApp?.();
      return;
    }
    skipCurrentStep();
  });
  el.btnSkip?.addEventListener('click', () => finishWalkthrough(false));
  el.btnRerunWizard?.addEventListener('click', async () => {
    lastChecklist = await window.kt.getOnboardingChecklist();
    if (lastChecklist.missing?.length) showMissingPrompt(lastChecklist.missing);
  });

  el.btnVpnCheck?.addEventListener('click', async () => {
    const res = await window.kt.vpnOnboardingCheck();
    appendSetupLog(res?.allowed ? 'Location OK' : 'VPN may be required');
  });
  el.btnVpnAuto?.addEventListener('click', () => window.kt.vpnEnsureRoute({ preferredCountry: el.vpnCountry?.value || 'random' }));
  el.btnSignupProton?.addEventListener('click', () => openSignup('proton'));
  el.btnSigninProton?.addEventListener('click', () => {
    openSignup('protonLogin');
    window.kt.vpnOpenProtonApp?.();
  });
  el.btnSignupProtonMail?.addEventListener('click', () => openSignup('protonMail'));
  el.btnSignupGmail?.addEventListener('click', () => openSignup('gmail'));
  el.btnSignupDownloads?.addEventListener('click', () => openSignup('protonDownloads'));
  el.btnSignupBlofin?.addEventListener('click', () => openSignup('blofin'));
  el.btnSignupBlofinLogin?.addEventListener('click', () => openSignup('blofinLogin'));
  el.btnSignupBlofinApi?.addEventListener('click', () => openSignup('blofinApi'));
  el.btnPasteBlofinApi?.addEventListener('click', () => window.kt.openBlofinPaste());
  el.btnPasteNousApi?.addEventListener('click', () => window.kt.openNousPaste());
  el.btnCoinbase?.addEventListener('click', () => openSignup('coinbase'));
  el.btnCoinbaseBuy?.addEventListener('click', () => openSignup('coinbaseBuy'));
  el.btnBlofinDeposit?.addEventListener('click', () => openSignup('blofinDeposit'));

  window.kt.onSignupStepDone((p) => onSignupOrPasteDone(p));
  window.kt.onPasteStepDone((p) => onSignupOrPasteDone(p));
  window.kt.onVpnOnboardingStatus((payload) => {
    const msg = payload?.message || '';
    if (msg) appendSetupLog(msg);
    if ((payload?.step === 'connected' || payload?.step === 'ready') && currentStepId() === 'vpn') {
      window.kt.markOnboardingStep('vpn').then(() => advanceWalk());
    }
  });

  window.initOnboardingWalkthrough = initOnboardingWalkthrough;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.initOnboardingWalkthrough?.());
  } else {
    window.initOnboardingWalkthrough?.();
  }
})();
