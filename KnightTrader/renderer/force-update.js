// Force-update modal logic. Loaded via the standard preload, so window.kt
// is available (downloadUpdate, quitAndInstallUpdate, openExternal, getAppVersion).
(() => {
  const params = new URLSearchParams(location.search || '');
  const msg = params.get('msg') || 'A critical update is required to continue using KnightTrader BloFin.';
  const url = params.get('url') || 'https://mknight2690-sys.github.io/knighttrader-blo-site/';
  const ver = params.get('ver') || '';
  const min = params.get('min') || '';

  document.getElementById('msg').textContent = msg;
  document.getElementById('ver').textContent = ver || '—';
  document.getElementById('min').textContent = min || '—';

  const btnDownload = document.getElementById('download');
  const btnInstall = document.getElementById('install');
  const btnManual = document.getElementById('manual');
  const statusEl = document.getElementById('status');
  const progressWrap = document.getElementById('progress-wrap');
  const progressBar = document.getElementById('progress-bar');
  const progressLabel = document.getElementById('progress-label');

  let downloadReady = false;

  function setStatus(text, kind) {
    statusEl.textContent = text || '';
    statusEl.className = 'status' + (kind ? ' ' + kind : '');
  }

  function setProgress(pct) {
    if (!progressWrap || !progressBar || !progressLabel) return;
    progressWrap.classList.remove('hidden');
    const n = Math.max(0, Math.min(100, Math.round(Number(pct) || 0)));
    progressBar.style.width = `${n}%`;
    progressLabel.textContent = `${n}%`;
  }

  window.kt.onUpdateDownloadProgress((info) => {
    if (info?.percent != null) setProgress(info.percent);
  });
  window.kt.onUpdateDownloaded(() => {
    downloadReady = true;
    if (btnDownload) btnDownload.classList.add('hidden');
    if (btnInstall) {
      btnInstall.classList.remove('hidden');
      btnInstall.disabled = false;
    }
    setStatus('Download complete. Click Restart to Install.', 'ok');
  });
  window.kt.onUpdateError((error) => {
    const msg = error?.message || String(error || 'Download failed');
    setStatus(msg.slice(0, 120), 'err');
    if (btnDownload) {
      btnDownload.disabled = false;
      btnDownload.textContent = 'Retry Download';
    }
  });

  if (btnDownload) {
    btnDownload.addEventListener('click', async () => {
      btnDownload.disabled = true;
      btnDownload.textContent = 'Downloading…';
      if (btnInstall) btnInstall.classList.add('hidden');
      setStatus('Step 1: downloading the update…', 'ok');
      setProgress(0);
      try {
        const res = await window.kt.downloadUpdate();
        if (res?.ok) {
          downloadReady = true;
          btnDownload.classList.add('hidden');
          if (btnInstall) btnInstall.classList.remove('hidden');
          setStatus('Download complete. Click Restart to Install.', 'ok');
          return;
        }
        btnDownload.disabled = false;
        btnDownload.textContent = 'Retry Download';
        setStatus(res?.error || 'Download failed', 'err');
      } catch (e) {
        btnDownload.disabled = false;
        btnDownload.textContent = 'Retry Download';
        setStatus(e?.message || 'Download failed', 'err');
      }
    });
  }

  if (btnInstall) {
    btnInstall.addEventListener('click', async () => {
      if (!downloadReady) {
        setStatus('Download the update first.', 'err');
        return;
      }
      btnInstall.disabled = true;
      btnInstall.textContent = 'Installing…';
      setStatus('Step 2: installing — the app will restart…', 'ok');
      try {
        const res = await window.kt.quitAndInstallUpdate();
        if (res?.ok && res?.installing) return;
        btnInstall.disabled = false;
        btnInstall.textContent = 'Restart to Install';
        setStatus(res?.error || 'Install failed', 'err');
      } catch (e) {
        btnInstall.disabled = false;
        btnInstall.textContent = 'Restart to Install';
        setStatus(e?.message || 'Install failed', 'err');
      }
    });
  }

  btnManual.addEventListener('click', () => {
    try { window.kt.openExternal(url); } catch (_) {}
    setStatus('Opening the download page in your browser…', 'ok');
  });
})();
