const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  invoke: (channel, ...args) => ipcRenderer.invoke(channel, ...args),
  onBlocked: (callback) => {
    ipcRenderer.on('cyber-blocked', (_event, data) => callback(data));
  },
  onDownloadEvent: (callback) => {
    ipcRenderer.on('cyber-download-event', (_event, data) => callback(data));
  }
});
