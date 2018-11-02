var HueApi = require("node-hue-api").HueApi;
var config = require('config');

var displayResult = function(result) {
    console.log(JSON.stringify(result, null, 2));
};

var host = config.get('SkySuperBotDB.HueSettings.Host'),
    username = config.get('SkySuperBotDB.HueSettings.User'),
    api;

api = new HueApi(host, username);

function GetState(){
    api.fullState().then(displayResult).done();
}

module.exports.GetState = GetState;