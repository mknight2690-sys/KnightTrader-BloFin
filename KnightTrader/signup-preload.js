const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('signupShell', {
  getParams: () => ipcRenderer.invoke('get-signup-params'),
  done: (type) => ipcRenderer.send('signup-done', { type }),
  onConfig: (cb) => ipcRenderer.on('signup-shell-config', (_e, data) => cb(data)),
});
