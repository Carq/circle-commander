const { app, BrowserWindow, ipcMain } = require("electron");
const fs = require("fs");

let mainWindow;
const events = require("../app/main/events");
const commands = require("../app/main/commands");
const { runBat } = require("./main/batRunner");

const isDevelopment = process.env.NODE_ENV.trim() === "development";

function createWindow() {
  mainWindow = new BrowserWindow({
    width: isDevelopment ? 1200 : 800,
    height: 600,
    frame: false,
    transparent: true,
    maximizable: false,
    minimizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile("app/index.html");
  if (isDevelopment) {
    console.warn("App has been started in development mode");
    // mainWindow.webContents.openDevTools();
  }
}

function loadBatsConfiguration() {
  let commands = JSON.parse(fs.readFileSync("batsConfiguration.json", "utf8"));
  mainWindow.webContents.send(
    events.BATS_CONFIGURATION_HAS_BEEN_LOADED,
    commands
  );
}

app.whenReady().then(() => {
  createWindow();
});

ipcMain.on(commands.CLOSE_APP, (evt, arg) => {
  console.log(`Exeucute Command ${commands.CLOSE_APP}.`);
  app.quit();
});

ipcMain.on(commands.RUN_BAT, (evt, arg) => {
  console.log(`Exeucute Command ${commands.RUN_BAT} with param: ${arg}`);
  runBat(arg);
});

ipcMain.on(commands.LOAD_CONFIGURATION, (evt, arg) => {
  console.log(`Exeucute Command ${commands.LOAD_CONFIGURATION}.`);
  loadBatsConfiguration();
});
