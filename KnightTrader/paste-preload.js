const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('pasteShell', {
  getParams: () => ipcRenderer.invoke('get-paste-params'),
  done: (text) => ipcRenderer.send('paste-done', { text }),
  onError: (cb) => ipcRenderer.on('paste-save-error', (_e, msg) => cb(msg)),
});
