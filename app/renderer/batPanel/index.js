const { ipcRenderer } = require("electron");
const commands = require("../../main/commands");

function createBatPanelView(batsConfiguration) {
  const batPanel = document.getElementById("bat-panel-buttons");

  document
    .getElementById("button-exit")
    .addEventListener("click", () => commandCloseApp());

  document
    .getElementById("button-load-config")
    .addEventListener("click", () => commandLoadConfig());

  document
    .getElementById("circularMainButton")
    .addEventListener("click", () =>
      document.getElementById("circularMenu1").classList.toggle("active")
    );

  batsConfiguration.forEach((batConfig) => {
    let button = createButton(batConfig.name, batConfig.icon, batConfig.path);
    batPanel.prepend(button);
  });
}

function createButton(buttonName, icon, batFileName) {
  let button = document.createElement("button");
  let buttonText = document.createElement("div");
  buttonText.classList.add(`fas`);
  buttonText.classList.add(`fa-${icon}`);
  buttonText.classList.add("button-text");
  button.appendChild(buttonText);
  button.classList.add("menu-item");
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
