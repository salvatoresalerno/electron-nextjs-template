import { app, BrowserWindow, Menu } from "electron";
import path, { dirname } from "path";
import { fileURLToPath } from "url"; 


const isDev = process.env.NODE_ENV === "development";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function createWindow() {
    const win = new BrowserWindow({
        height: 1200,
        width: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.bundle.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    const template = [
    {
      label: "File",
      submenu: [
        { label: "Home", click: () => win.webContents.send("navigate", "/") },
        { label: "Page 1", click: () => win.webContents.send("navigate", "/page1") },
        { label: "Page 2", click: () => win.webContents.send("navigate", "/page2") },
        { label: "Page 3", click: () => win.webContents.send("navigate", "/page3") },
        { type: "separator" },
        { role: "quit", label: "Esci" },
      ],
    },
    {
      label: "Debug",
      submenu: [{ role: "reload" }, { role: "toggleDevTools" }],
    },
  ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    if(isDev) {
        win.loadURL("http://localhost:3000")
    } else {
        win.loadFile(path.join(__dirname, '../out/index.html'))  //--> da verificare nella build
    }
}

app.whenReady().then(createWindow);
app.on('window-all-closed', ()=>{
    if(process.platform !== "darwin"){
        app.quit()
    }
}) 
   
 