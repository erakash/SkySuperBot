var mysql = require('mysql');
const config = require('config');
var dbConfig = config.get('SkySuperBotDB.dbConfig');

const Telegraf = require('telegraf');
var telegraftoken = config.get('SkySuperBotDB.telegramtoken.token');
const bot = new Telegraf(telegraftoken);

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


function SendMessageToUserId(username,message) {
  var con = mysql.createConnection(dbConfig);
  con.connect(function (err) {
    if (err) throw err;
  });
  var query = "select id from botsubscribers WHERE username = '"+username+"'";
  con.query(query, function (error, results, fields) {
    if (error) throw error;
    console.log(results);
    bot.telegram.sendMessage(results[0].id,message);
  });
  con.end();
}

function UpdateInsertHomeAttributes(attributename,attributevalue) {
  var con = mysql.createConnection(dbConfig);
  con.connect(function (err) {
    if (err) throw err;
  });
  var query = "CALL UpdateInsertHomeAttributes('" + attributename + "','" + attributevalue + "');";
  //console.log(query);
  con.query(query, function (error, results, fields) {
    if (error) throw error;
  });
  con.end();
}

module.exports.InsertUpdateDetails = InsertUpdateDetails;
module.exports.SendMessageToUserId = SendMessageToUserId;
module.exports.UpdateInsertHomeAttributes = UpdateInsertHomeAttributes;
