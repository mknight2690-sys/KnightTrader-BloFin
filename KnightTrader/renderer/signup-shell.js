const titleEl = document.getElementById('title');
const hintEl = document.getElementById('hint');
const statusEl = document.getElementById('status');
const doneBtn = document.getElementById('btn-done');
let signupType = 'proton';

function applyConfig(cfg) {
  if (!cfg) return;
  signupType = cfg.type || signupType;
  if (cfg.title && titleEl) titleEl.textContent = cfg.title;
  if (hintEl) hintEl.textContent = cfg.hint || cfg.error || '';
  if (cfg.error && statusEl) statusEl.textContent = cfg.error;
}

function setStatus(text) {
  if (statusEl) statusEl.textContent = text;
}

if (!window.signupShell) {
  setStatus('Done button is not connected. Close this window and click Create Proton account again.');
} else {
  window.signupShell.getParams().then(applyConfig).catch(() => {});
  window.signupShell.onConfig(applyConfig);
}

doneBtn.addEventListener('click', async () => {
  if (!window.signupShell?.done) {
    setStatus('Click received, but this window cannot report Done. Close it and use Continue — connect on the VPN tab.');
    return;
  }
  doneBtn.disabled = true;
  doneBtn.textContent = 'Continuing…';
  setStatus('Click received. Closing this window and returning to KnightTrader.');
  try {
    const res = await window.signupShell.done(signupType);
    setStatus(res?.message || 'Done. Back on the VPN tab.');
  } catch (err) {
    doneBtn.disabled = false;
    doneBtn.textContent = 'Done — continue';
    setStatus(`Click received, but continue failed: ${err?.message || err}`);
  }
});
