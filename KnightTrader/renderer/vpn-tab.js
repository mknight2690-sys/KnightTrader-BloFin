// VPN tab — live country display + BloFin route verification.
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
    btnDisconnect: $('btn-vpn-tab-disconnect'),
  };

  const FLAGS = { NL: '🇳🇱', JP: '🇯🇵', RO: '🇷🇴', PL: '🇵🇱', MX: '🇲🇽', US: '🇺🇸', CA: '🇨🇦', SG: '🇸🇬' };
  let pollTimer = null;
  let ensureRunning = false;
  let lastAllowed = null;

  function appendLog(line) {
    if (!el.log) return;
    const ts = new Date().toLocaleTimeString();
    el.log.textContent = `${el.log.textContent ? el.log.textContent + '\n' : ''}[${ts}] ${line}`;
    el.log.scrollTop = el.log.scrollHeight;
  }

  function setNavBadge(show) {
    el.navBadge?.classList.toggle('hidden', !show);
  }

  function renderStatus(ipInfo, stable = false) {
    const allowed = !!ipInfo?.allowed;
    lastAllowed = allowed;
    setNavBadge(!allowed);

    if (el.orb) {
      el.orb.classList.remove('ok', 'warn');
      el.orb.classList.add(allowed ? 'ok' : 'warn');
    }
    el.warn?.classList.toggle('hidden', allowed);

    const code = ipInfo?.country || '—';
    const name = ipInfo?.countryName || code;
    const flag = FLAGS[code] || '🌍';

    if (el.countryDisplay) el.countryDisplay.textContent = code === '—' ? '—' : `${flag} ${name}`;
    if (el.title) {
      el.title.textContent = allowed
        ? (stable ? 'BloFin route verified' : 'Allowed country detected')
        : 'Not BloFin-allowed';
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
  }

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
        await refreshStatus(true);
      } else if (res?.waitingForUser) {
        appendLog('ProtonVPN opened — connect to NL, JP, RO, or PL and wait.');
      } else {
        appendLog(res?.error || 'Could not confirm BloFin route.');
        await refreshStatus(false);
      }
    } catch (e) {
      appendLog(`Ensure failed: ${e.message}`);
    } finally {
      ensureRunning = false;
      el.btnEnsure && (el.btnEnsure.disabled = false);
    }
  }

  el.btnVerify?.addEventListener('click', () => refreshStatus(true));
  el.btnEnsure?.addEventListener('click', () => runEnsure());
  el.btnProton?.addEventListener('click', () => window.kt.vpnOpenSignup('protonDownloads'));
  el.btnDisconnect?.addEventListener('click', async () => {
    await window.kt.vpnDisconnect();
    appendLog('WireGuard disconnected.');
    await refreshStatus(false);
  });

  window.kt.onVpnOnboardingStatus((payload) => {
    if (payload?.message) appendLog(payload.message);
    if (payload?.ipInfo) renderStatus(payload.ipInfo, payload.step === 'connected');
    if (payload?.step === 'connected' || payload?.step === 'ready') {
      refreshStatus(true);
    }
  });

  window.initVpnTab = async function initVpnTab() {
    await refreshStatus(false);
    await buildCountryGrid();
    startPoll();
  };

  window.stopVpnTabPoll = stopPoll;

  window.refreshVpnTabStatus = refreshStatus;

  window.checkVpnNavBadge = async () => {
    try {
      const ipInfo = await window.kt.vpnGetLocation();
      setNavBadge(!ipInfo?.allowed);
    } catch (_) {}
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.checkVpnNavBadge?.());
  } else {
    window.checkVpnNavBadge?.();
  }
})();
