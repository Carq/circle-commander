const { spawn } = require("child_process");
const { ipcRenderer } = require("electron");

document
  .getElementById("button-01")
  .addEventListener("click", () => runBat("rainmeter.bat"));

document
  .getElementById("button-02")
  .addEventListener("click", () => runBat("vpn-on.bat"));

document
  .getElementById("button-03")
  .addEventListener("click", () => runBat("vpn-off.bat"));

document
  .getElementById("button-exit")
  .addEventListener("click", () => closeApp());

function runBat(batFile) {
  const command = spawn(process.cwd() + "/app/bats/" + batFile, [], {
    shell: true,
  });

  command.on("error", (err) => {
    console.error(err);
  });

  command.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });
}

function closeApp() {
  ipcRenderer.send("close-app");
}
