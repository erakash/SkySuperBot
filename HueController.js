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

var displayResult = function(result) {
    console.log(JSON.stringify(result, null, 2));
};

function AllLightsOff(){
    api.setLightState(1, stateon).then(displayResult).done();
    api.setLightState(3, stateon).then(displayResult).done();
    api.setLightState(7, stateon).then(displayResult).done();
}

function AllLightsOn(){
    api.setLightState(1, stateoff).then(displayResult).done();
    api.setLightState(3, stateoff).then(displayResult).done();
    api.setLightState(7, stateoff).then(displayResult).done();
}

module.exports.AllLightsOff = AllLightsOff;
module.exports.AllLightsOn = AllLightsOn;