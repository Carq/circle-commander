const { ipcRenderer } = require("electron");

const commands = require("../main/commands");

const { openCommander, closeCommander } = require("./batPanel");

function registerCommandHandlers() {
  console.log("Register command handlers");

  ipcRenderer.on(commands.OPEN_COMMANDER, (event, data) => {
    openCommander();
  });

  ipcRenderer.on(commands.CLOSE_COMMANDER_START, (event, data) => {
    closeCommander();
  });
}

module.exports = registerCommandHandlers;
