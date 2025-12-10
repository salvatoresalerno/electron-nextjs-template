"use strict";

// electron/preload.ts
var import_electron = require("electron");
import_electron.contextBridge.exposeInMainWorld("electronAPI", {
  onNavigate: (callback) => import_electron.ipcRenderer.on("navigate", (_, path) => callback(path))
});
