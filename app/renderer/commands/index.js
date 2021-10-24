const { ipcRenderer } = require("electron");
const commands = require("../../main/commands");

function bindCommandsToView() {
  document
    .getElementById("button-01")
    .addEventListener("click", () => commandRunBat("rainmeter.bat"));

  document
    .getElementById("button-02")
    .addEventListener("click", () => commandRunBat("vpn-on.bat"));

  document
    .getElementById("button-03")
    .addEventListener("click", () => commandRunBat("vpn-off.bat"));

  document
    .getElementById("button-exit")
    .addEventListener("click", () => commandCloseApp());
}

function commandRunBat(batFileName) {
  ipcRenderer.send(commands.RUN_BAT, batFileName);
}

function commandCloseApp() {
  ipcRenderer.send(commands.CLOSE_APP);
}

module.exports = {
  bindCommandsToView,
};
