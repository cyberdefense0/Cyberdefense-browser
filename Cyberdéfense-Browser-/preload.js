const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  invoke: (channel, ...args) => ipcRenderer.invoke(channel, ...args)
});

contextBridge.exposeInMainWorld('electronAPI', {
  invoke: (channel, ...args) => ipcRenderer.invoke(channel, ...args),
  onUpdateStatus: (callback) => ipcRenderer.on('update-status', (event, data) => callback(data.status, data)),
  onUpdateProgress: (callback) => ipcRenderer.on('update-progress', (event, data) => callback(data))
});
