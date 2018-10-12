var dbhelper = require('./DBHelper');
var config = require('config');
const Telegraf = require('telegraf');
var telegraftoken = config.get('SkySuperBotDB.telegramtoken.token');
const bot = new Telegraf(telegraftoken);


function SendMessageToUserId(userid,message){
    bot.telegram.sendMessage(userid,message);
}


module.exports.SendMessageToUserId = SendMessageToUserId;