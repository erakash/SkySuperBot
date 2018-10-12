var config = require('config');
const Telegraf = require('telegraf')
const TelegrafWit = require('telegraf-wit')
var dbhelper = require('./DBHelper');
var messagehelper = require('./MessageHelper');

var telegraftoken = config.get('SkySuperBotDB.telegramtoken.token');
var wittoken = config.get('SkySuperBotDB.wittoken.token');
const wit = new TelegrafWit(wittoken)
const bot = new Telegraf(telegraftoken)

bot.start((ctx) => ctx.reply('Welcome!'));
bot.hears('hi', (ctx) => ctx.reply('Hey there'));
bot.on('text', (ctx) => {
    dbhelper.InsertUpdateDetails(ctx.message.chat);
})

//bot.telegram.sendMessage('596158889','Hi World');
messagehelper.SendMessageToUserId('596158889','hey wassup');
dbhelper.GetChatIdByUserId('akashsharma');
bot.startPolling()

