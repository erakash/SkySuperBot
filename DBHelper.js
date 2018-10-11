var mysql = require('mysql');

var con = mysql.createConnection(config.get('SkySuperBotDB.dbConfig'));
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });