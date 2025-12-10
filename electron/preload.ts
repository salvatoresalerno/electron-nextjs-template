import { contextBridge, ipcRenderer } from "electron";

 


contextBridge.exposeInMainWorld("electronAPI", {
  onNavigate: (callback: (path: string) => void) =>
    ipcRenderer.on("navigate", (_, path) => callback(path)),
});