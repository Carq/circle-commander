const { ipcRenderer } = require("electron");

const { events } = require("../main/events");

ipcRenderer.on(events.commandsHasBeenLoaded, (event, data) => {
  console.log(event);
  console.log(data);
});
