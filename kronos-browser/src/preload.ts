import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  spawn: () => {
    ipcRenderer.send('terminal-spawn');
  },
  onData: (callback: (data: string) => void) => {
    ipcRenderer.on('terminal-data', (event, data) => callback(data));
  },
  write: (data: string) => {
    ipcRenderer.send('terminal-write', data);
  },
});
