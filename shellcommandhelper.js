const { exec } = require('child_process');

function ExecuteCommand(command) {
  var shellcommand = command
  exec(command, (err, stdout, stderr) => { });
}

module.exports.ExecuteCommand = ExecuteCommand;


