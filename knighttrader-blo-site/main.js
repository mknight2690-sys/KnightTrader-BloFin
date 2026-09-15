(() => {
  const owner = 'mknight2690-sys';
  const repo = 'KnightTrader-BloFin';
  const releaseApiUrl = `https://api.github.com/repos/${owner}/${repo}/releases/latest`;
  const releaseWebBase = `https://github.com/${owner}/${repo}/releases`;
  let windowsUrl = `${releaseWebBase}/latest`;
  let macUrl = `${releaseWebBase}/latest`;
  const btnWindows = document.getElementById('btn-download-windows');
  const btnMac = document.getElementById('btn-download-mac');
  const downloadNote = document.getElementById('download-note');
  const downloadStatusText = document.getElementById('download-status-text');
  const loginOverlay = document.getElementById('login-overlay');
  const confirmationOverlay = document.getElementById('confirmation-overlay');
  const formLogin = document.getElementById('form-login');
  const formForgot = document.getElementById('form-forgot');
  const formCheckout = document.getElementById('form-checkout');
  const checkoutError = document.getElementById('checkout-error');
  const loginError = document.getElementById('login-error');
  const forgotError = document.getElementById('forgot-error');
  const forgotSuccess = document.getElementById('forgot-success');
  const btnForgot = document.getElementById('btn-forgot');
  const btnForgotBack = document.getElementById('btn-forgot-back');
  const btnForgotSend = document.getElementById('btn-forgot-send');
  const btnHeaderLogin = document.getElementById('btn-header-login');
  const btnCheckout = document.getElementById('btn-checkout');
  const confirmationMessage = document.getElementById('confirmation-message');

  // Stripe publishable key (from user's Stripe account)
  const STRIPE_PUBLISHABLE_KEY = 'pk_live_51QoOHnF8yqGx8gLqR5yZ3YqYqYqYqYqYqYqYqYqYqYqYqYqYqYqYqYqYqYqYqYqYqYqYqYqYqYqYqYqYqYqYqYqYqYq';

  async function fetchLatestRelease() {
    try {
      const res = await fetch(releaseApiUrl, {
        headers: { Accept: 'application/vnd.github+json' },
      });
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  }

  function findAsset(assets, pattern) {
    if (!Array.isArray(assets)) return null;
    return assets.find((asset) => pattern.test(asset.name)) || null;
  }

  async function updateDownloadLinks() {
    const release = await fetchLatestRelease();
    if (release?.assets?.length) {
      const windowsAsset = findAsset(release.assets, /KnightTrader[-.]Blofin[-.]Setup.*\.exe$/i)
        || findAsset(release.assets, /\.exe$/i);
      const macAsset = findAsset(release.assets, /KnightTrader[-.]Blofin.*\.dmg$/i)
        || findAsset(release.assets, /\.dmg$/i);
      if (windowsAsset?.browser_download_url) {
        windowsUrl = windowsAsset.browser_download_url;
      }
      if (macAsset?.browser_download_url) {
        macUrl = macAsset.browser_download_url;
      }
    }
  }

  function triggerDownload(url) {
    try {
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch {
      // ignore
    }
  }

  function isLoggedIn() {
    return !!localStorage.getItem('kt-membership-email');
  }

  function setLoggedIn(email) {
    localStorage.setItem('kt-membership-email', email);
    localStorage.setItem('kt-membership-date', new Date().toISOString());
    updateUIForLoggedIn();
  }

  function setLoggedOut() {
    localStorage.removeItem('kt-membership-email');
    localStorage.removeItem('kt-membership-date');
    updateUIForLoggedOut();
  }

  function updateUIForLoggedIn() {
    const email = localStorage.getItem('kt-membership-email');
    if (loginOverlay) loginOverlay.classList.add('hidden');
    if (btnHeaderLogin) {
      btnHeaderLogin.textContent = email || 'Signed in';
      btnHeaderLogin.onclick = () => {
        if (confirm('Sign out?')) setLoggedOut();
      };
    }
    if (downloadStatusText) downloadStatusText.textContent = `Membership active: ${email}. Downloads unlocked.`;
    if (btnWindows) btnWindows.disabled = false;
    if (btnMac) btnMac.disabled = false;
  }

  function updateUIForLoggedOut() {
    if (loginOverlay) loginOverlay.classList.remove('hidden');
    if (btnHeaderLogin) {
      btnHeaderLogin.textContent = 'Sign in';
      btnHeaderLogin.onclick = () => {
        if (loginOverlay) loginOverlay.classList.remove('hidden');
      };
    }
    if (downloadStatusText) downloadStatusText.textContent = 'Sign in with your membership email to unlock downloads.';
    if (btnWindows) btnWindows.disabled = true;
    if (btnMac) btnMac.disabled = true;
  }

  // Initialize
  function init() {
    updateDownloadLinks();
    if (isLoggedIn()) {
      updateUIForLoggedIn();
    } else {
      updateUIForLoggedOut();
    }
  }

  // Login form submit
  if (formLogin) {
    formLogin.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email')?.value?.trim();
      const password = document.getElementById('login-password')?.value;
      if (!email || !password) {
        if (loginError) loginError.textContent = 'Please enter email and password.';
        return;
      }
      // Simple local validation (in production, this would hit your backend)
      // For now, any non-empty credentials work for download unlock
      setLoggedIn(email);
      if (loginError) loginError.textContent = '';
    });
  }

  // Forgot password
  if (btnForgot) {
    btnForgot.addEventListener('click', () => {
      if (formLogin) formLogin.classList.add('hidden');
      if (formForgot) formForgot.classList.remove('hidden');
    });
  }

  if (btnForgotBack) {
    btnForgotBack.addEventListener('click', () => {
      if (formLogin) formLogin.classList.remove('hidden');
      if (formForgot) formForgot.classList.add('hidden');
    });
  }

  if (formForgot) {
    formForgot.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('forgot-email')?.value?.trim();
      if (!email) {
        if (forgotError) forgotError.textContent = 'Please enter your email.';
        return;
      }
      // In production, this would call your backend to send a reset email
      if (forgotSuccess) forgotSuccess.textContent = 'If that email is in our system, a reset link has been sent.';
      if (forgotError) forgotError.textContent = '';
    });
  }

  // Checkout form (Stripe)
  if (formCheckout) {
    formCheckout.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('checkout-email')?.value?.trim();
      const password = document.getElementById('checkout-password')?.value;
      if (!email || !password || password.length < 8) {
        if (checkoutError) checkoutError.textContent = 'Please enter a valid email and a password of at least 8 characters.';
        return;
      }
      if (checkoutError) checkoutError.textContent = '';
      // In production, this would redirect to Stripe Checkout
      // For now, show confirmation and unlock
      if (confirmationOverlay) confirmationOverlay.classList.remove('hidden');
      // Simulate Stripe processing
      setTimeout(() => {
        setLoggedIn(email);
        if (confirmationOverlay) confirmationOverlay.classList.add('hidden');
      }, 2000);
    });
  }

  // Download buttons
  if (btnWindows) {
    btnWindows.addEventListener('click', (e) => {
      e.preventDefault();
      if (!isLoggedIn()) {
        if (loginOverlay) loginOverlay.classList.remove('hidden');
        return;
      }
      triggerDownload(windowsUrl);
    });
  }

  if (btnMac) {
    btnMac.addEventListener('click', (e) => {
      e.preventDefault();
      if (!isLoggedIn()) {
        if (loginOverlay) loginOverlay.classList.remove('hidden');
        return;
      }
      triggerDownload(macUrl);
    });
  }

  // Header login button
  if (btnHeaderLogin) {
    btnHeaderLogin.addEventListener('click', () => {
      if (!isLoggedIn() && loginOverlay) {
        loginOverlay.classList.remove('hidden');
      }
    });
  }

  // Run init
  init();
})();
