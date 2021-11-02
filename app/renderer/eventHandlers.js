const { ipcRenderer } = require("electron");

const events = require("../main/events");

const { createBatPanelView } = require("./batPanel");

function registerEventHandlers() {
  console.log("Register event handlers");

  ipcRenderer.on(events.BATS_CONFIGURATION_HAS_BEEN_LOADED, (event, data) => {
    createBatPanelView(data.bats);
  });
}

module.exports = registerEventHandlers;
