/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./app/main/commands.js":
/*!******************************!*\
  !*** ./app/main/commands.js ***!
  \******************************/
/***/ ((module) => {

const commands = {
  RUN_BAT: "runBat",
  CLOSE_APP: "closeApp",
};

module.exports = commands;


/***/ }),

/***/ "./app/main/events.js":
/*!****************************!*\
  !*** ./app/main/events.js ***!
  \****************************/
/***/ ((module) => {

const events = {
  COMMANDS_HAVE_BEEN_LOADED: "commandsHaveBeenLoaded"
};
module.exports = events;

/***/ }),

/***/ "./app/renderer/commands/index.js":
/*!****************************************!*\
  !*** ./app/renderer/commands/index.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const {
  ipcRenderer
} = __webpack_require__(/*! electron */ "electron");

const commands = __webpack_require__(/*! ../../main/commands */ "./app/main/commands.js");

function bindCommandsToView() {
  document.getElementById("button-01").addEventListener("click", () => commandRunBat("rainmeter.bat"));
  document.getElementById("button-02").addEventListener("click", () => commandRunBat("vpn-on.bat"));
  document.getElementById("button-03").addEventListener("click", () => commandRunBat("vpn-off.bat"));
  document.getElementById("button-exit").addEventListener("click", () => commandCloseApp());
}

function commandRunBat(batFileName) {
  ipcRenderer.send(commands.RUN_BAT, batFileName);
}

function commandCloseApp() {
  ipcRenderer.send(commands.CLOSE_APP);
}

module.exports = {
  bindCommandsToView
};

/***/ }),

/***/ "./app/renderer/eventHandlers.js":
/*!***************************************!*\
  !*** ./app/renderer/eventHandlers.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const {
  ipcRenderer
} = __webpack_require__(/*! electron */ "electron");

const events = __webpack_require__(/*! ../main/events */ "./app/main/events.js");

function registerEventHandlers() {
  console.log("Register event handlers");
  ipcRenderer.on(events.COMMANDS_HAVE_BEEN_LOADED, (event, data) => {
    console.log(data);
  });
}

module.exports = registerEventHandlers;

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("electron");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*******************************!*\
  !*** ./app/renderer/index.js ***!
  \*******************************/
const {
  bindCommandsToView
} = __webpack_require__(/*! ./commands/index */ "./app/renderer/commands/index.js");

const registerEventHandlers = __webpack_require__(/*! ./eventHandlers */ "./app/renderer/eventHandlers.js");

bindCommandsToView();
registerEventHandlers();
})();

/******/ })()
;
//# sourceMappingURL=renderer.js.map