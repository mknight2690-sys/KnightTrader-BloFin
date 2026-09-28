'use strict';

// Onboarding step registry — used by main (checklist IPC) and renderer (walkthrough queue).

const ONBOARDING_STEPS = [
  { id: 'location', label: 'Check location', group: 'region', popup: null },
  { id: 'protonAccount', label: 'Create @proton.me email', group: 'region', popup: 'proton' },
  { id: 'protonMail', label: 'Verify Proton email', group: 'region', popup: 'protonMail' },
  { id: 'protonSave', label: 'Save Proton login', group: 'region', popup: null, form: 'proton' },
  { id: 'vpn', label: 'Connect VPN (if needed)', group: 'region', popup: null, action: 'vpn' },
  { id: 'blofinAccount', label: 'Create BloFin account', group: 'blofin', popup: 'blofin' },
  { id: 'blofinMail', label: 'Verify BloFin email', group: 'blofin', popup: 'protonMail' },
  { id: 'blofinEmailSave', label: 'Save BloFin account email', group: 'blofin', popup: null, form: 'blofinEmail' },
  { id: 'blofinLogin', label: 'Sign in to BloFin', group: 'blofin', popup: 'blofinLogin' },
  { id: 'blofinApiCreate', label: 'Create BloFin API keys', group: 'blofin', popup: 'blofinApi' },
  { id: 'blofinApiPaste', label: 'Paste BloFin API keys', group: 'blofin', popup: null, paste: 'blofin' },
  { id: 'nousSignup', label: 'Nous Portal account', group: 'ai', popup: 'nousPortal' },
  { id: 'nousCredits', label: 'Add Nous credits ($5+)', group: 'ai', popup: 'nousBilling' },
  { id: 'nousApiCreate', label: 'Create Nous API key', group: 'ai', popup: 'nousApiKeys' },
  { id: 'nousApiPaste', label: 'Paste Nous API key', group: 'ai', popup: null, paste: 'nous' },
  { id: 'coinbaseSignup', label: 'Create Coinbase account', group: 'funding', popup: 'coinbase' },
  { id: 'coinbaseCard', label: 'Add debit card on Coinbase', group: 'funding', popup: 'coinbasePayments' },
  { id: 'coinbaseBuy', label: 'Buy USDT on Coinbase', group: 'funding', popup: 'coinbaseBuy' },
  { id: 'blofinDeposit', label: 'Get BloFin USDT deposit address', group: 'funding', popup: 'blofinDeposit' },
  { id: 'coinbaseSend', label: 'Send USDT to BloFin', group: 'funding', popup: 'coinbaseSend' },
  { id: 'blofinTransfer', label: 'Move USDT to USDT-M futures', group: 'funding', popup: 'blofinTransfer' },
  { id: 'defender', label: 'Windows Defender exclusion', group: 'hermes', popup: null, action: 'defender' },
  { id: 'hermesInstall', label: 'Install Hermes', group: 'hermes', popup: null, action: 'hermesInstall' },
  { id: 'compendium', label: 'Save credentials & compendium', group: 'hermes', popup: null, action: 'compendium' },
  { id: 'hermesStart', label: 'Start Hermes dashboard + gateway', group: 'hermes', popup: null, action: 'hermesStart' },
  { id: 'cron', label: 'Configure trading cron', group: 'hermes', popup: null, action: 'cron' },
];

const REQUIRED_FOR_TRADING = new Set([
  'blofinApiPaste', 'nousApiPaste', 'hermesInstall', 'hermesStart', 'cron',
]);

function hasBlofinApi(creds) {
  return !!(String(creds?.blofin?.apiKey || '').trim()
    && String(creds?.blofin?.secretKey || '').trim()
    && String(creds?.blofin?.passphrase || '').trim());
}

function hasNousApi(creds) {
  return !!String(creds?.nous?.apiKey || '').trim();
}

function stepComplete(stepId, creds, onboarding, ctx = {}) {
  const done = onboarding?.stepsCompleted || {};
  // Only skip the VPN *connect* step when geo is currently allowed.
  // Never skip Proton signup — being on VPN must not bypass CAPTCHA/account steps.
  const geoOkNow = ctx.currentGeoAllowed === true;

  switch (stepId) {
    case 'location':
      return !!done.location || !!onboarding?.locationChecked;
    case 'protonAccount':
      return !!done.protonAccount || !!String(creds?.proton?.email || '').trim();
    case 'protonMail':
      return !!done.protonMail;
    case 'protonSave':
      return !!String(creds?.proton?.email || '').trim() && !!done.protonSave;
    case 'vpn':
      return geoOkNow || !!onboarding?.vpnVerified || !!done.vpn;
    case 'blofinAccount':
      return !!done.blofinAccount || !!String(creds?.blofinAccount?.email || '').trim();
    case 'blofinMail':
      return !!done.blofinMail;
    case 'blofinEmailSave':
      return !!String(creds?.blofinAccount?.email || '').trim() || !!done.blofinEmailSave;
    case 'blofinLogin':
      return !!done.blofinLogin;
    case 'blofinApiCreate':
      return !!done.blofinApiCreate || hasBlofinApi(creds);
    case 'blofinApiPaste':
      return hasBlofinApi(creds);
    case 'nousSignup':
      return !!done.nousSignup || hasNousApi(creds);
    case 'nousCredits':
      return !!done.nousCredits || hasNousApi(creds);
    case 'nousApiCreate':
      return !!done.nousApiCreate || hasNousApi(creds);
    case 'nousApiPaste':
      return hasNousApi(creds);
    case 'coinbaseSignup':
      return !!done.coinbaseSignup;
    case 'coinbaseCard':
      return !!done.coinbaseCard;
    case 'coinbaseBuy':
      return !!done.coinbaseBuy;
    case 'blofinDeposit':
      return !!done.blofinDeposit;
    case 'coinbaseSend':
      return !!done.coinbaseSend;
    case 'blofinTransfer':
      return !!done.blofinTransfer;
    case 'defender':
      return !!done.defender || ctx.platform !== 'win32';
    case 'hermesInstall':
      return !!done.hermesInstall || !!ctx.hermesInstalled;
    case 'compendium':
      return !!done.compendium || (hasBlofinApi(creds) && hasNousApi(creds));
    case 'hermesStart':
      return !!done.hermesStart || !!ctx.dashboardRunning;
    case 'cron':
      return !!done.cron || !!onboarding?.cronConfigured;
    default:
      return !!done[stepId];
  }
}

function evaluateOnboarding(creds, onboarding, ctx = {}) {
  const missing = [];
  const complete = [];
  for (const step of ONBOARDING_STEPS) {
    if (stepComplete(step.id, creds, onboarding, ctx)) complete.push(step);
    else missing.push(step);
  }
  const tradingReady = hasBlofinApi(creds) && hasNousApi(creds);
  const isReturningUser = tradingReady && !!(onboarding?.setupComplete || onboarding?.firstRunComplete);
  const setupComplete = !!(onboarding?.setupComplete) || (tradingReady && missing.length === 0);
  return {
    steps: ONBOARDING_STEPS,
    missing,
    complete,
    setupComplete,
    isReturningUser,
    tradingReady,
    needsWalkthrough: missing.length > 0 && !setupComplete && !isReturningUser,
  };
}

function markStepComplete(onboarding, stepId) {
  const next = {
    ...onboarding,
    stepsCompleted: { ...(onboarding?.stepsCompleted || {}), [stepId]: Date.now() },
  };
  if (stepId === 'location') next.locationChecked = true;
  if (stepId === 'vpn') next.vpnVerified = true;
  if (stepId === 'cron') next.cronConfigured = true;
  return next;
}

module.exports = {
  ONBOARDING_STEPS,
  REQUIRED_FOR_TRADING,
  evaluateOnboarding,
  markStepComplete,
  stepComplete,
  hasBlofinApi,
  hasNousApi,
};
