const fs = require('fs');
const { exec } = require('child_process');
const config = require('config');
var mysql = require('mysql');
var dbConfig = config.get('Skysuperbot.dbConfig');


function GetCommand(telegramcontext) {
  var connection = mysql.createConnection(dbConfig);
  connection.connect();
  var telegramcommand = telegramcontext.text.toLowerCase();
  connection.query("SELECT * FROM SkyBotCommands WHERE Command = '" + telegramcommand + "'", function (error, results, fields) {
    if (error) throw error;
    if (results[0]) {
      return results[0].CommandScript;
    }});
    connection.end();
  }
}


function ExecuteCommand(command) {
  var shellcommand = command
  exec(command, (err, stdout, stderr) => { });
}


module.exports.GetCommand = GetCommand;
module.exports.ExecuteCommand = ExecuteCommand;

