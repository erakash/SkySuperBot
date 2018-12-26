/*-------------Reference Number for Lamps---------------
 1 - Color Lamp Hall
 2 - Color Lamp - My Room
 3 - Color Lamp - Hall
 4 - Color Lamp - My Room
 5 - White Lamp - Hall
 6 - White Lamp - Hall
 7 - Color Lamp - My Room
 8 - Color Lamp - My Room
 9 - White Lamp - Kitchen
 10 - Color Lamp - Kitchen
 11 - White Lamp Kitchen
 */


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

var displayResult = function (result) {
    console.log(JSON.stringify(result, null, 2));
};

function AllLightsOn() {
    api.setLightState(5, stateon);
    api.setLightState(6, stateon);
    //api.setLightState(9, stateon);
    //api.setLightState(11, stateon);
    api.setLightState(2, stateon);
}

function AllLightsOff() {
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

function SetLightColorBasedOnTemprature(light, temp) {
    var tempFahrenheit = ((temp - 273.15) * 1.8) + 32;
    var colorstate;
    //console.log(tempFahrenheit);
    if (tempFahrenheit > 90)
        colorstate = lightState.create().on().rgb(255, 165, 0);
    else if (tempFahrenheit > 80 && tempFahrenheit <= 90)
        colorstate = lightState.create().on().rgb(255, 255, 0);
    else if (tempFahrenheit > 70 && tempFahrenheit <= 80)
        colorstate = lightState.create().on().rgb(124, 252, 0);
    else if (tempFahrenheit > 60 && tempFahrenheit <= 70)
        colorstate = lightState.create().on().rgb(127, 255, 212);
    else if (tempFahrenheit > 50 && tempFahrenheit <= 60)
        colorstate = lightState.create().on().rgb(230, 230, 250);
    else if (tempFahrenheit > 40 && tempFahrenheit <= 50)
        colorstate = lightState.create().on().rgb(0, 191, 255);
    else if (tempFahrenheit > 30 && tempFahrenheit <= 40)
        colorstate = lightState.create().on().rgb(0, 255, 255);
    else if (tempFahrenheit > 20 && tempFahrenheit <= 30)
        colorstate = lightState.create().on().rgb(135, 206, 250);
    else if (tempFahrenheit > 10 && tempFahrenheit <= 20)
        colorstate = lightState.create().on().rgb(123, 104, 238);
    else if (tempFahrenheit > 0 && tempFahrenheit <= 20)
        colorstate = lightState.create().on().rgb(0, 0, 255);
    else
        colorstate = lightState.create().on().rgb(148,0,211);
    api.setLightState(light, colorstate);
}

module.exports.AllLightsOff = AllLightsOff;
module.exports.AllLightsOn = AllLightsOn;
module.exports.SetLightColorBasedOnTemprature = SetLightColorBasedOnTemprature;