const {
  app,
  BrowserWindow,
  ipcMain,
  globalShortcut,
  screen,
} = require("electron");
const fs = require("fs");

let mainWindow;
const events = require("../app/main/events");
const commands = require("../app/main/commands");
const { runBat } = require("./main/batRunner");

const isDevelopment = process.env.NODE_ENV.trim() === "development";

app.whenReady().then(() => {
  createWindow();
  registerGlobalShortcut();
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

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 360,
    height: 360,
    icon: __dirname + "./img/circle.png",
    frame: false,
    transparent: true,
    maximizable: false,
    minimizable: false,
    skipTaskbar: true,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile("app/index.html");
  mainWindow.on("blur", (e) => {
    mainWindow.hide();
  });
  if (isDevelopment) {
    console.warn("App has been started in development mode");
  }
}

function registerGlobalShortcut() {
  globalShortcut.register("CommandOrControl+Space", () => {
    if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      showWindowAtMousePosition();
    }
  });
}

function showWindowAtMousePosition() {
  let mousePosition = screen.getCursorScreenPoint();
  windowsSize = mainWindow.getSize();
  mainWindow.setPosition(
    mousePosition.x - windowsSize[0] / 2,
    mousePosition.y - windowsSize[0] / 2
  );
  mainWindow.show();
}

function loadBatsConfiguration() {
  let commands = JSON.parse(fs.readFileSync("batsConfiguration.json", "utf8"));
  mainWindow.webContents.send(
    events.BATS_CONFIGURATION_HAS_BEEN_LOADED,
    commands
  );
}
