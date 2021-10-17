/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./app/renderer/commands/index.js":
/*!****************************************!*\
  !*** ./app/renderer/commands/index.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const {
  spawn
} = __webpack_require__(/*! child_process */ "child_process");

const {
  ipcRenderer
} = __webpack_require__(/*! electron */ "electron");

function bindCommandsToView() {
  document.getElementById("button-01").addEventListener("click", () => runBat("rainmeter.bat"));
  document.getElementById("button-02").addEventListener("click", () => runBat("vpn-on.bat"));
  document.getElementById("button-03").addEventListener("click", () => runBat("vpn-off.bat"));
  document.getElementById("button-exit").addEventListener("click", () => closeApp());
}

function runBat(batFile) {
  const command = spawn(process.cwd() + "/app/bats/" + batFile, [], {
    shell: true
  });
  command.on("error", err => {
    console.error(err);
  });
  command.stdout.on("data", data => {
    console.log(`Commount output: ${data}`);
  });
}

function closeApp() {
  ipcRenderer.send("close-app");
}

module.exports = bindCommandsToView;

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = require("child_process");

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
const bindCommandsToView = __webpack_require__(/*! ./commands/index */ "./app/renderer/commands/index.js");

bindCommandsToView();
})();

/******/ })()
;
//# sourceMappingURL=renderer.js.map