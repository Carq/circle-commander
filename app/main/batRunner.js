const { spawn } = require("child_process");

function runBat(batFile) {
  const command = spawn(process.cwd() + "/app/bats/" + batFile, [], {
    shell: true,
  });

  command.on("error", (err) => {
    console.error(err);
  });

  command.stdout.on("data", (data) => {
    console.log(`bat execution output: ${data}`);
  });
}

module.exports = {
  runBat,
};
