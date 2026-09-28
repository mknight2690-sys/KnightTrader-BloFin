'use strict';

// Keeps a private copy of Proton VPN under the app's user-data folder.
// Never writes to Program Files and never starts the system-wide Proton app.

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

function systemProtonDir() {
  const roots = [
    path.join(process.env['ProgramFiles'] || 'C:\\Program Files', 'Proton', 'VPN'),
    path.join(process.env['ProgramFiles(x86)'] || 'C:\\Program Files (x86)', 'Proton', 'VPN'),
  ];
  return roots.find((dir) => fs.existsSync(path.join(dir, 'ProtonVPN.Launcher.exe'))) || null;
}

function sandboxPaths(userDataPath) {
  const root = path.join(userDataPath, 'proton');
  return {
    root,
    appDir: path.join(root, 'app'),
    installerDir: path.join(root, 'installers'),
    launcher: path.join(root, 'app', 'ProtonVPN.Launcher.exe'),
  };
}

function robocopy(source, dest) {
  return new Promise((resolve) => {
    const child = spawn('robocopy', [
      source,
      dest,
      '/E',
      '/NFL', '/NDL', '/NJH', '/NJS', '/NC', '/NS',
      '/XD', 'Updates',
    ], { windowsHide: true });
    child.on('close', (code) => {
      // Robocopy uses 0–7 for success.
      resolve({ ok: code !== null && code < 8, code });
    });
    child.on('error', (err) => resolve({ ok: false, error: err.message }));
  });
}

async function ensureProtonSandbox(userDataPath, emit = () => {}) {
  const paths = sandboxPaths(userDataPath);
  fs.mkdirSync(paths.installerDir, { recursive: true });
  fs.mkdirSync(paths.appDir, { recursive: true });
  if (fs.existsSync(paths.launcher)) {
    emit({ step: 'sandbox', message: 'Sandboxed Proton VPN is already in KnightTrader app data.' });
    return { ok: true, ...paths, already: true };
  }

  const source = systemProtonDir();
  if (source) {
    emit({
      step: 'sandbox',
      message: 'Copying Proton VPN into KnightTrader app data. The existing Program Files install is not changed.',
    });
    const copied = await robocopy(source, paths.appDir);
    if (copied.ok && fs.existsSync(paths.launcher)) {
      emit({ step: 'sandbox', message: 'Sandboxed Proton VPN copy is ready.' });
      return { ok: true, ...paths, copied: true };
    }
    emit({ step: 'sandbox-warn', message: 'Could not finish the sandboxed Proton copy. Server cycling still uses KnightTrader WireGuard tunnels.' });
    return { ok: false, ...paths, error: copied.error || `robocopy ${copied.code}` };
  }

  emit({
    step: 'sandbox',
    message: 'No system Proton install found. Downloading the installer into KnightTrader app data only.',
  });
  await new Promise((resolve) => {
    const child = spawn('winget', [
      'download', '--id', 'Proton.ProtonVPN', '-e',
      '--accept-source-agreements', '--accept-package-agreements',
      '--download-directory', paths.installerDir,
    ], { windowsHide: true });
    child.on('close', () => resolve());
    child.on('error', () => resolve());
  });
  emit({
    step: 'sandbox',
    message: 'Proton installer is stored in KnightTrader app data. It was not installed over any existing Proton app.',
  });
  return { ok: fs.existsSync(paths.launcher), ...paths, downloaded: true };
}

module.exports = { ensureProtonSandbox, sandboxPaths, systemProtonDir };
