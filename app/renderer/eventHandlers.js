const { ipcRenderer } = require("electron");

const events = require("../main/events");

function registerEventHandlers() {
  console.log("Register event handlers");
  ipcRenderer.on(events.COMMANDS_HAVE_BEEN_LOADED, (event, data) => {
    console.log(data);
  });
}

module.exports = registerEventHandlers;
