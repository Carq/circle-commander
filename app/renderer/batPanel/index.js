const { ipcRenderer } = require("electron");
const commands = require("../../main/commands");

function createBatPanelView(batsConfiguration) {
  const batPanel = document.getElementById("bat-panel-buttons");
  batPanel.innerHTML = null;

  document
    .getElementById("button-exit")
    .addEventListener("click", () => commandCloseApp());

  document
    .getElementById("button-load-config")
    .addEventListener("click", () => commandLoadConfig());

  batsConfiguration.forEach((batConfig) => {
    let button = createButton(batConfig.name, batConfig.path);
    batPanel.appendChild(button);
  });
}

function createButton(buttonName, batFileName) {
  let button = document.createElement("button");
  button.innerHTML = buttonName;
  button.classList.add("bat-panel-button");
  button.onclick = () => commandRunBat(batFileName);
  return button;
}

function commandRunBat(batFileName) {
  ipcRenderer.send(commands.RUN_BAT, batFileName);
}

function commandCloseApp() {
  ipcRenderer.send(commands.CLOSE_APP);
}

function commandLoadConfig() {
  ipcRenderer.send(commands.LOAD_CONFIGURATION);
}
module.exports = {
  createBatPanelView,
};
