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
  LOAD_CONFIGURATION: "loadConfiguration",
};

module.exports = commands;


/***/ }),

/***/ "./app/main/events.js":
/*!****************************!*\
  !*** ./app/main/events.js ***!
  \****************************/
/***/ ((module) => {

const events = {
  BATS_CONFIGURATION_HAS_BEEN_LOADED: "batsConfigurationHasBeenLoaded",
};

module.exports = events;


/***/ }),

/***/ "./app/renderer/batPanel/index.js":
/*!****************************************!*\
  !*** ./app/renderer/batPanel/index.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const {
  ipcRenderer
} = __webpack_require__(/*! electron */ "electron");

const commands = __webpack_require__(/*! ../../main/commands */ "./app/main/commands.js");

function createBatPanelView(batsConfiguration) {
  const batPanel = document.getElementById("bat-panel-buttons");
  document.getElementById("button-exit").addEventListener("click", () => commandCloseApp());
  document.getElementById("button-load-config").addEventListener("click", () => commandLoadConfig());
  document.getElementById("circularMainButton").addEventListener("click", () => document.getElementById("circularMenu1").classList.toggle("active"));
  batsConfiguration.forEach(batConfig => {
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
  createBatPanelView
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

const {
  createBatPanelView
} = __webpack_require__(/*! ./batPanel */ "./app/renderer/batPanel/index.js");

function registerEventHandlers() {
  console.log("Register event handlers");
  ipcRenderer.on(events.BATS_CONFIGURATION_HAS_BEEN_LOADED, (event, data) => {
    createBatPanelView(data.bats);
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
  ipcRenderer
} = __webpack_require__(/*! electron */ "electron");

const registerEventHandlers = __webpack_require__(/*! ./eventHandlers */ "./app/renderer/eventHandlers.js");

const commands = __webpack_require__(/*! ../main/commands */ "./app/main/commands.js");

ipcRenderer.send(commands.LOAD_CONFIGURATION);
registerEventHandlers();
})();

/******/ })()
;
//# sourceMappingURL=renderer.js.map