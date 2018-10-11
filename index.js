var config = require('config');
const Telegraf = require('telegraf')
const TelegrafWit = require('telegraf-wit')

var telegraftoken = config.get('SkySuperBotDB.telegramtoken.token');
var wittoken = config.get('SkySuperBotDB.wittoken.token');
const wit = new TelegrafWit(wittoken)
const bot = new Telegraf(telegraftoken)

bot.start((ctx) => ctx.reply('Welcome!'));
bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.on('sticker', (ctx) => ctx.reply('👍'));
bot.hears('hi', (ctx) => ctx.reply('Hey there'));
bot.on('text', (ctx) => {
    ctx.reply('Hello World');
    console.log(ctx.message.chat);
})

//bot.telegram.sendMessage('596158889','Hi World');

bot.startPolling()

