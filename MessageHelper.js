var dbhelper = require('./DBHelper');
var config = require('config');
const Telegraf = require('telegraf');
var telegraftoken = config.get('SkySuperBotDB.telegramtoken.token');
const bot = new Telegraf(telegraftoken);


function SendMessageToUserId(userids,message){
    var userid = userids.split(",");
    userid.forEach(user => {
        dbhelper.SendMessageToUserId(user,message);
    });    
}


module.exports.SendMessageToUserId = SendMessageToUserId;