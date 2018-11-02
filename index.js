var config = require('config');
var mysql = require('mysql');
var dbConfig = config.get('SkySuperBotDB.dbConfig');
const request = require('request');
const Telegraf = require('telegraf')
const TelegrafWit = require('telegraf-wit')
var dbhelper = require('./DBHelper');
var lights = require('./HueController');
var messagehelper = require('./MessageHelper');
var messageclassifier = require('./messageclassifier');
var shellcommandhelper = require('./shellcommandhelper');
var telegraftoken = config.get('SkySuperBotDB.telegramtoken.token');
var wittoken = config.get('SkySuperBotDB.wittoken.token');
const { exec } = require('child_process');
var schedule = require('node-schedule');
const wit = new TelegrafWit(wittoken);
const bot = new Telegraf(telegraftoken);

//------------Home Attributes-------------//
var IsSomeonePresentAtHome = 0;
var IsSuperAdminPresentAtHome = 0;
var sunrise;
var sunset;
var temp;
var weather;
//----------------------------------------//


//--------------Bot Commands Handler-----------//
bot.start((ctx) => ctx.reply('Welcome!'));
bot.hears('hi', (ctx) => ctx.reply('Hey there'));
bot.on('text', (ctx) => {
    dbhelper.InsertUpdateDetails(ctx.message.chat);
    messageclassifier.ClassifyMessage(ctx.message, function (classifier) {
        var con = mysql.createConnection(dbConfig);
        con.connect(function (err) {
            if (err) throw err;
        });
        var query = "select role from botsubscribers where username = '" + ctx.message.chat.username + "';";
        con.query(query, function (error, results, fields) {
            if (error) throw error;
            if (results[0].role == 1) {
                switch (classifier.type) {
                    case 'youtubelink':
                        {
                            var youTubeLink = ctx.message.text.split("&");
                            console.log('sudo killall vlc; sudo killall omxplayer.bin;sudo vcgencmd display_power 1;sudo omxplayer $(youtube-dl -f mp4 -g ' + youTubeLink[0] + ')');
                            shellcommandhelper.ExecuteCommand('sudo killall vlc; sudo killall omxplayer.bin;sudo vcgencmd display_power 1;sudo omxplayer $(youtube-dl -f mp4 -g ' + youTubeLink[0] + ') -o both');
                            ctx.reply('Running Youtube Video');
                            break;
                        }
                    case 'commandnotavailable':
                        {
                            ctx.reply('Invalid Command');
                            break;
                        }
                    case 'command':
                        {
                            shellcommandhelper.ExecuteCommand(classifier.commandscript);
                            console.log(classifier.commandscript);
                            ctx.reply('Running Command');
                            break;
                        }
                    case 'script':
                        {
                            ctx.reply('Running Script');
                            break;
                        }
                    case 'pythonscript':
                        {
                            ctx.reply('Running Python Script');
                            break;
                        }
                    case 'commandnotavailable':
                        {
                            ctx.reply('Command not configured');
                            break;
                        }
                    default:
                        {
                            ctx.reply('Invalid Command');
                            break;
                        }
                }
            }
            else {
                ctx.reply('You are not admin');
            }
        });
        con.end();
    });
})

//messagehelper.SendMessageToUserId('codejockey', 'hello');
bot.startPolling()

//Function with timers - It will update the sensors and environment parameters
function SetSensorsParametersInDb() {
    GetWeatherData();
}


function GetWeatherData() {
    request('https://api.openweathermap.org/data/2.5/weather?zip=38016,us&appid=' + config.get('SkySuperBotDB.apikeys.openweathermap'), { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        sunrise = body.sys.sunrise;
        sunset = body.sys.sunset;
        temp = body.main.temp;
        weather = body.weather[0].id;
        /*dbhelper.UpdateInsertHomeAttributes('sunrise', body.sys.sunrise);
        dbhelper.UpdateInsertHomeAttributes('sunset', body.sys.sunset);
        dbhelper.UpdateInsertHomeAttributes('temp', body.main.temp);
        dbhelper.UpdateInsertHomeAttributes('weather', body.weather[0].id);*/
    });
}
function GetWifiStatus() {
    exec("sudo arp-scan --localnet | awk -F'\t' '$2 ~ /([0-9a-f][0-9a-f]:){5}/ {print $2}'", (err, stdout, stderr) => {
        var ConnectedDevices = stdout.split("\n");
        var con = mysql.createConnection(dbConfig);
        con.connect(function (err) {
            if (err) throw err;
        });
        var query = "TRUNCATE TABLE connecteddevices;"
        con.query(query, function (error, results, fields) {
            ConnectedDevices.forEach(function (device) {
                var query = "INSERT INTO connecteddevices VALUES('" + device + "');";
                con.query(query, function (error, results, fields) {
                    if (error) throw error;
                });
            });
            con.end();
        });
    });
}

var HanumanChalisaSchedule = schedule.scheduleJob(config.get('SkySuperBotDB.JobSchedules.HanumanChalisaSchedule'), function () {
    if(IsSuperAdminPresentAtHome==1){
        messagehelper.SendMessageToUserId(config.get('SkySuperBotDB.SuperAdmin.userid'), 'Hanuman Chalisa Playing');
    }
});


function GetHomeUsersStatus() {
    var con = mysql.createConnection(dbConfig);
    con.connect(function (err) {
        if (err) throw err;
    });
    var query = "SELECT AD.username FROM admindevices AD JOIN connecteddevices CD ON AD.DeviceAddress = CD.DeviceAddress;"
    con.query(query, function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
            IsSomeonePresentAtHome = 1;
            for(var i=0;i<results.length;i++)
            {
                console.log(results[i].username);
                if (results[i].username == config.get('SkySuperBotDB.SuperAdmin.userid'))
                {
                    IsSuperAdminPresentAtHome = 1;
                    break;
                }
                else
                    IsSuperAdminPresentAtHome = 0;
            }
        }
        else {
            IsSomeonePresentAtHome = 0;
            IsSuperAdminPresentAtHome = 0;
        }
        con.end();
    });
}

function IfNoOneIsAtHome() {
    console.log(weather);
    console.log(temp);
    console.log(sunrise);
    console.log(sunset);
    if (IsSomeonePresentAtHome == 0) {
        lights.AllLightsOff();
    }
}

setInterval(SetSensorsParametersInDb, 300000);
setInterval(GetWifiStatus, 5000);
setInterval(GetHomeUsersStatus, 5000);
setInterval(IfNoOneIsAtHome, 5000);

