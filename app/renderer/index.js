const { bindCommandsToView } = require("./commands/index");
const registerEventHandlers = require("./eventHandlers");

bindCommandsToView();
registerEventHandlers();
