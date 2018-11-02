var hue = require("node-hue-api");
var config = require('config');
var HueApi = hue.HueApi;

var lightState = hue.lightState;
var host = config.get('SkySuperBotDB.HueSettings.Host');
var username = config.get('SkySuperBotDB.HueSettings.User');
var api;
api = new HueApi(host, username);

var stateon = lightState.create().on();
var stateoff = lightState.create().off();

function AllLightsOff(){
    api.setLightState(1, stateon);
    api.setLightState(3, stateon);
    api.setLightState(7, stateon);
}

function AllLightsOn(){
    api.setLightState(1, stateoff);
    api.setLightState(3, stateoff);
    api.setLightState(7, stateoff);
}

module.exports.AllLightsOff = AllLightsOff;
module.exports.AllLightsOn = AllLightsOn;