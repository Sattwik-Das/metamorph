const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  onPttStart: (callback) => ipcRenderer.on('ptt-start', (_event) => callback()),
  removePttStart: () => ipcRenderer.removeAllListeners('ptt-start'),
  // We can add desktopCapturer IPCs here later if needed
});
