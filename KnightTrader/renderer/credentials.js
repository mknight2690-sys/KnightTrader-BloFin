// Credentials tab — Proton/BloFin account logins + VPN assistant.
(() => {
  const $ = (id) => document.getElementById(id);

  const el = {
    protonEmail: $('cred-proton-email'),
    protonPassword: $('cred-proton-password'),
    blofinEmail: $('cred-blofin-account-email'),
    saveBtn: $('btn-save-account-creds'),
    saveStatus: $('cred-save-status'),
  };

  async function loadAccountCredentials() {
    try {
      const data = await window.kt.getCredentials();
      if (el.protonEmail) el.protonEmail.value = data?.proton?.email || '';
      if (el.protonPassword) el.protonPassword.value = data?.proton?.password || '';
      if (el.blofinEmail) el.blofinEmail.value = data?.blofinAccount?.email || '';
    } catch (_) {}
  }

  async function saveAccountCredentials() {
    if (el.saveBtn) el.saveBtn.disabled = true;
    if (el.saveStatus) {
      el.saveStatus.textContent = 'Saving…';
      el.saveStatus.className = 'save-status pending';
    }
    try {
      await window.kt.saveCredentials({
        proton: {
          email: el.protonEmail?.value?.trim() || '',
          password: el.protonPassword?.value || '',
        },
        blofinAccount: {
          email: el.blofinEmail?.value?.trim() || '',
        },
      });
      if (el.saveStatus) {
        el.saveStatus.textContent = 'Saved locally (encrypted).';
        el.saveStatus.className = 'save-status ok';
      }
    } catch (e) {
      if (el.saveStatus) {
        el.saveStatus.textContent = e?.message || 'Save failed';
        el.saveStatus.className = 'save-status err';
      }
    } finally {
      if (el.saveBtn) el.saveBtn.disabled = false;
    }
  }

  el.saveBtn?.addEventListener('click', () => saveAccountCredentials());

  window.initCredentialsTab = () => {
    loadAccountCredentials();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.initCredentialsTab?.());
  } else {
    window.initCredentialsTab?.();
  }
})();
