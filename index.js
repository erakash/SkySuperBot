var config = require('config');
const request = require('request');
const Telegraf = require('telegraf')
const TelegrafWit = require('telegraf-wit')
var dbhelper = require('./DBHelper');
var messagehelper = require('./MessageHelper');
var messageclassifier = require('./messageclassifier');
var shellcommandhelper = require('./shellcommandhelper');
var telegraftoken = config.get('SkySuperBotDB.telegramtoken.token');
var wittoken = config.get('SkySuperBotDB.wittoken.token');
const wit = new TelegrafWit(wittoken)
const bot = new Telegraf(telegraftoken)

bot.start((ctx) => ctx.reply('Welcome!'));
bot.hears('hi', (ctx) => ctx.reply('Hey there'));
bot.on('text', (ctx) => {
    dbhelper.InsertUpdateDetails(ctx.message.chat);
    var classifier = messageclassifier.ClassifyMessage(ctx.message);
    switch (classifier) {
        case 'youtubelink':
        {
            var youTubeLink = ctx.message.text.split("&");
            console.log(youTubeLink[0]);
            ExecuteCommand('sudo killall vlc; sudo killall omxplayer.bin;sudo vcgencmd display_power 1;sudo omxplayer $(youtube-dl -f mp4 -g '+ youTubeLink[0]+')');
            break;
        }
        case 'optionnotavailable':
            console.log(shellcommandhelper.GetCommand(ctx.message));
            break;
        default:
            ctx.reply('Invalid Command');
    }
})

//messagehelper.SendMessageToUserId('codejockey', 'hello');
bot.startPolling()

//Function with timers - It will update the sensors and environment parameters
function SetSensorsParametersInDb() {
    GetWeatherData();
}
setInterval(SetSensorsParametersInDb, 3000);

function GetWeatherData() {
    request('https://api.openweathermap.org/data/2.5/weather?zip=38016,us&appid=' + config.get('SkySuperBotDB.apikeys.openweathermap'), { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        dbhelper.UpdateInsertHomeAttributes('sunrise', body.sys.sunrise);
        dbhelper.UpdateInsertHomeAttributes('sunset', body.sys.sunset);
        dbhelper.UpdateInsertHomeAttributes('temp', body.main.temp);
        dbhelper.UpdateInsertHomeAttributes('weather', body.weather[0].id);
    });
}

