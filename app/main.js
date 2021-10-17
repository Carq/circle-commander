const { app, BrowserWindow, ipcMain } = require("electron");
const fs = require("fs");

let mainWindow;
const events = require("../app/main/events");

function createWindow() {
  mainWindow = new BrowserWindow({
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

  mainWindow.loadFile("app/index.html");
}

function loadCommands() {
  let commands = JSON.parse(fs.readFileSync("commands.json", "utf8"));
  mainWindow.webContents.send(events.COMMANDS_HAVE_BEEN_LOADED, commands);
}

app.whenReady().then(() => {
  createWindow();
  loadCommands();
});

ipcMain.on("close-app", (evt, arg) => {
  app.quit();
});
