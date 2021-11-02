const { ipcRenderer } = require("electron");
const commands = require("../../main/commands");

let mainMenu;
let clossingCommanderIsInProgress = false;

function createBatPanelView(batsConfiguration) {
  const batPanel = document.getElementById("bat-panel-buttons");

  const buttonExit = document.getElementById("button-exit");

  if (buttonExit != undefined) {
    buttonExit.addEventListener("click", () => commandCloseApp());
  }

  document
    .getElementById("button-load-config")
    .addEventListener("click", () => commandLoadConfig());

  document
    .getElementById("circularMainButton")
    .addEventListener("click", () => openCommander());

  mainMenu = document.getElementById("circularMenu");
  mainMenu.addEventListener("transitionend", () => {
    console.log("transitionend");
    if (
      !mainMenu.classList.contains("active") &&
      clossingCommanderIsInProgress === false
    ) {
      clossingCommanderIsInProgress = true;
      ipcRenderer.send(commands.CLOSE_COMMANDER_END);
    }
  });

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

function openCommander() {
  let mainMenu = document.getElementById("circularMenu");
  if (!mainMenu.classList.contains("active")) {
    document.getElementById("circularMenu").classList.toggle("active");
  }
}

function closeCommander() {
  let mainMenu = document.getElementById("circularMenu");
  if (mainMenu.classList.contains("active")) {
    clossingCommanderIsInProgress = false;
    document.getElementById("circularMenu").classList.toggle("active");
  }
}

module.exports = {
  createBatPanelView,
  openCommander,
  closeCommander,
};
