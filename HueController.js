var hue = require("node-hue-api");
var config = require('config');
var HueApi = hue.HueApi;

var lightState = hue.lightState;
var host = config.get('SkySuperBotDB.HueSettings.Host');
var username = config.get('SkySuperBotDB.HueSettings.User');
var api;
api = new HueApi(host, username);

var stateon = lightState.create().on().white(500, 100);
var stateoff = lightState.create().off();

var displayResult = function(result) {
    console.log(JSON.stringify(result, null, 2));
};

function AllLightsOn(){
    api.setLightState(1, stateon).then(displayResult).done();
    api.setLightState(3, stateon).then(displayResult).done();
    api.setLightState(7, stateon).then(displayResult).done();
}

function AllLightsOff(){
    api.setLightState(1, stateoff);
    api.setLightState(2, stateoff);
    api.setLightState(3, stateoff);
    api.setLightState(4, stateoff);
    api.setLightState(5, stateoff);
    api.setLightState(6, stateoff);
    api.setLightState(7, stateoff);
    api.setLightState(8, stateoff);
    api.setLightState(9, stateoff);
    api.setLightState(10, stateoff);
    api.setLightState(11, stateoff);
}

module.exports.AllLightsOff = AllLightsOff;
module.exports.AllLightsOn = AllLightsOn;