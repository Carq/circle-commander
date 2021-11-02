const { ipcRenderer } = require("electron");

const registerEventHandlers = require("./eventHandlers");
const registerCommandHandlers = require("./commandHandlers");

const commands = require("../main/commands");

ipcRenderer.send(commands.LOAD_CONFIGURATION);

registerEventHandlers();
registerCommandHandlers();
