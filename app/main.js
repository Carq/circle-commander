const { app, BrowserWindow, ipcMain } = require("electron");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    maximizable: false,
    minimizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadFile("app/index.html");
}

app.whenReady().then(() => {
  createWindow();
});

ipcMain.on("close-app", (evt, arg) => {
  app.quit();
});
