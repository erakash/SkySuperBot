var mysql = require('mysql');
const config = require('config');
var dbConfig = config.get('SkySuperBotDB.dbConfig');

function ClassifyMessage(telegramcontext,callback) {
    var telegramcommand = telegramcontext.text.toLowerCase();
    var isYouTubeLink = telegramcommand.includes("youtu");
    var classificationresult = {};
    if (isYouTubeLink) {
        classificationresult.type = 'youtubelink'
        callback(classificationresult);
    }
    else {
        var con = mysql.createConnection(dbConfig);
        con.connect(function (err) {
            if (err) throw err;
        });
        var query = "SELECT * FROM SkyBotCommands WHERE Command = '" + telegramcommand + "';";
        con.query(query, function (error, results, fields) {
            if (error) throw error;
            if (results[0]) {
                classificationresult.type = 'command'
                classificationresult.commandscript =  results[0].CommandScript;
                callback(classificationresult);
              }
              else{
                classificationresult.type = 'commandnotavailable'
                console.log(classificationresult);
                callback(classificationresult);
              }
        });
        con.end();
    }
}

module.exports.ClassifyMessage = ClassifyMessage;