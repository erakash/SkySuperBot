var mysql = require('mysql');
const config = require('config');
var dbConfig = config.get('SkySuperBotDB.dbConfig');

function InsertUpdateDetails(chatinfo) {
  var con = mysql.createConnection(dbConfig);
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
  });
  var query = "CALL UpdateInsertBotSubscribers(" + chatinfo.id + ",'" + chatinfo.first_name + "', '" + chatinfo.last_name + "', '" + chatinfo.username + "');";
  con.query(query, function (error, results, fields) {
    if (error) throw error;
  });
  con.end();
}


function GetChatIdByUserId(username) {
  var con = mysql.createConnection(dbConfig);
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
  });
  var query = "select id from botsubscribers WHERE username = '"+username+"'";
  con.query(query, function (error, results, fields) {
    if (error) throw error;
    console.log(results);
  });
  con.end();
}

module.exports.InsertUpdateDetails = InsertUpdateDetails;
module.exports.GetChatIdByUserId = GetChatIdByUserId;
