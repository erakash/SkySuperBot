const fs = require('fs');
const { exec } = require('child_process');
const config = require('config');
var shellcommand = require('./ShellCommandHelper');
var mysql      = require('mysql');
var dbConfig = config.get('Skysuperbot.dbConfig');


function ExecuteShellCommand(telegramcontext)
{
  var connection = mysql.createConnection(dbConfig);
  connection.connect();
    var telegramcommand = telegramcontext.text.toLowerCase();
    var isYouTubeLink = telegramcommand.includes("youtu");
    if(!isYouTubeLink)
    {
      connection.query("SELECT * FROM SkyBotCommands WHERE Command = '"+telegramcommand+"'", function (error, results, fields) {
        if (error) throw error;
        if(results[0])
        {
          ExecuteCommand(results[0].CommandScript);
        }
        else{
            console.log("Not valid Command");
        }
      });
    }
    else{
      var youTubeLink = telegramcontext.text.split("&");
      console.log(youTubeLink[0]);
      ExecuteCommand('sudo killall vlc; sudo killall omxplayer.bin;sudo vcgencmd display_power 1;sudo omxplayer $(youtube-dl -f mp4 -g '+ youTubeLink[0]+')');
    }
    connection.end();
}


function ExecuteCommand(command){
    var shellcommand = command
    exec(command, (err, stdout, stderr)=>{});
}


module.exports.ExecuteShellCommand = ExecuteShellCommand;
module.exports.ExecuteCommand = ExecuteCommand;

