'use strict';
var request = require('request');
var alexa = require('alexa-app');
var newtemp 
var oldtemp
var thermostatApp = new alexa.app('thermostat');

thermostatApp.intent('setHeat', function(req, res) {
  request.post(process.env.THERMOSTAT_URL + '/tstat', {json: {t_heat: parseFloat(req.slot('setHeating'))}});
  res.card("Thermostat Skill","Thermostat heat mode is set to " + parseInt(req.slot('setHeating')) + " degrees");
  res.say("Thermostat heat mode is set to " + parseInt(req.slot('setHeating')) + " degrees");
});

thermostatApp.intent('setCool', function(req, res) {
  request.post(process.env.THERMOSTAT_URL + '/tstat', {json: {t_cool: parseFloat(req.slot('setCooling'))}});
  res.card("Thermostat Skill","Thermostat cool mode is set to " + parseInt(req.slot('setCooling')) + " degrees");
  res.say("Thermostat cool mode is set to " + parseInt(req.slot('setCooling')) + " degrees");
});

thermostatApp.intent('setOff', function(req, res) {
  request.post(process.env.THERMOSTAT_URL + '/tstat', {json: {"tmode": 0}});
  res.card("Thermostat Skill","Thermostat is set to off");
  res.say("Thermostat is set to off");
});

thermostatApp.intent('setFanOn', function(req, res) {
  request.post(process.env.THERMOSTAT_URL + '/tstat', {json: {"fmode": 2}});
  res.card("Thermostat Skill","Thermostat fan is set to on");
  res.say("Thermostat fan is set to on");
});

thermostatApp.intent('setFanAuto', function(req, res) {
  request.post(process.env.THERMOSTAT_URL + '/tstat', {json: {"fmode": 0}});
  res.card("Thermostat Skill","Thermostat fan is set to auto");
  res.say("Thermostat fan is set to auto");
});

thermostatApp.intent('setHoldOn', function(req, res) {
  request.post(process.env.THERMOSTAT_URL + '/tstat', {json: {"hold": 1}});
  res.card("Thermostat Skill","Thermostat hold is set to on");
  res.say("Thermostat hold is set to on");
});

thermostatApp.intent('setHoldOff', function(req, res) {
  request.post(process.env.THERMOSTAT_URL + '/tstat', {json: {"hold": 0}});
  res.card("Thermostat Skill","Thermostat hold is set to off");
  res.say("Thermostat hold is set to off");
});

// process get temperature request
// This intent uses the res.send() feature for a delayed response back to alexa due to async http request.
thermostatApp.intent('getTemp', function(req, res) {
  request(process.env.THERMOSTAT_URL + '/tstat', function (error, response, body) {
    console.log('Error: ' + error, 'RESPONSE: ' + response, 'BODY: ' + body);
    body = JSON.parse(body);
    if (body.tmode == 0) {
        res.say("Thermostat current temperature is " + body.temp + " degrees, the thermostat is off.");
        res.card("Thermostat Skill","Thermostat current temperature is " + body.temp + " degrees, the thermostat is off.");
        res.send();
    }
    if (body.tmode == 1) {
        res.say("Thermostat current temperature is " + body.temp + " degrees. Target temperature is " + body.t_heat + " degrees.");
        res.card("Thermostat Skill","Thermostat current temperature is " + body.temp + " degrees. Target temperature is " + body.t_heat + " degrees.");
        res.send();
    }       
    if (body.tmode == 2) {
        res.say("Thermostat current temperature is " + body.temp + " degrees, the thermostat is in cool mode. Target temperature is " + body.t_cool + " degrees.");
        res.card("Thermostat Skill","Thermostat current temperature is " + body.temp + " degrees, the thermostat is in cool mode. Target temperature is " + body.t_cool + " degrees.");
        res.send();
    }
  });
  return false;
});

// process increase temperature request
// This intent uses the res.send() feature for a delayed response back to alexa due to async http request.
thermostatApp.intent('incTemp', function(req, res) {
  request(process.env.THERMOSTAT_URL + '/tstat', function (error, response, body) {
    console.log('Error: ' + error, 'RESPONSE: ' + response, 'BODY: ' + body);
    body = JSON.parse(body);
    if (body.tmode == 0) {
        res.say("Thermostat current temperature is " + body.temp + " degrees, the thermostat is off.");
        res.card("Thermostat Skill","Thermostat current temperature is " + body.temp + " degrees, the thermostat is off.");
        res.send();
    }
    if (body.tmode == 1) {
        newtemp = body.t_heat + parseInt(req.slot('increaseTemp'));
        request.post(process.env.THERMOSTAT_URL + '/tstat', {json: {t_heat: parseInt(newtemp)}});
        res.say("Target temperature increased by " + parseInt(req.slot('increaseTemp')) + " degrees.  Target temperature is now " + parseInt(newtemp) + " degrees.");
        res.card("Thermostat Skill","Target temperature increased by " + parseInt(req.slot('increaseTemp')) + " degrees. Target temperature is now " + parseInt(newtemp) + " degrees.");
        res.send();
    }
    if (body.tmode == 2) {
        newtemp = body.t_cool + parseInt(req.slot('increaseTemp'));
        request.post(process.env.THERMOSTAT_URL + '/tstat', {json: {t_cool: parseInt(newtemp)}});
        res.say("Thermostat is in cool mode. Target temperature increased by " + parseInt(req.slot('increaseTemp')) + " degrees. Target temperature is now " + parseInt(newtemp) + " degrees.");
        res.card("Thermostat Skill","Thermostat is in cool mode. Target temperature increased by " + parseInt(req.slot('increaseTemp')) + " degrees. Target temperature is now " + parseInt(newtemp) + " degrees.");
        res.send();
    }
  });
  return false;
});

// process decrease temperature request
// This intent uses the res.send() feature for a delayed response back to alexa due to async http request.
thermostatApp.intent('decTemp', function(req, res) {
  request(process.env.THERMOSTAT_URL + '/tstat', function (error, response, body) {
    console.log('Error: ' + error, 'RESPONSE: ' + response, 'BODY: ' + body);
    body = JSON.parse(body);
    if (body.tmode == 0) {
        res.say("Thermostat current temperature is " + body.temp + " degrees, the thermostat is off.");
        res.card("Thermostat Skill","Thermostat current temperature is " + body.temp + " degrees, the thermostat is off.");
        res.send();
    }
    if (body.tmode == 1) {
        newtemp = body.t_heat - parseInt(req.slot('decreaseTemp'));
        request.post(process.env.THERMOSTAT_URL + '/tstat', {json: {t_heat: parseInt(newtemp)}});
        res.say("Target temperature decreased by " + parseInt(req.slot('decreaseTemp')) + " degrees. Target temperature is now " + parseInt(newtemp) + " degrees.");
        res.card("Thermostat Skill","Target temperature decreased by " + parseInt(req.slot('decreaseTemp')) + " degrees. Target temperature is now " + parseInt(newtemp) + " degrees.");
        res.send();
    }
    if (body.tmode == 2) {
        newtemp = body.t_cool - parseInt(req.slot('decreaseTemp'));
        request.post(process.env.THERMOSTAT_URL + '/tstat', {json: {t_cool: parseInt(newtemp)}});
        res.say("Thermostat is in cool mode. Target temperature decreased by " + parseInt(req.slot('decreaseTemp')) + " degrees. Target temperature is now " + parseInt(newtemp) + " degrees.");
        res.card("Thermostat Skill","Thermostat is in cool mode. Target temperature decreased by " + parseInt(req.slot('decreaseTemp')) + " degrees. Target temperature is now " + parseInt(newtemp) + " degrees.");
        res.send();
    }
  });
  return false;
});


// process launch request when no utterances detected
thermostatApp.launch(function(req, res) {
  console.log('REQUEST', JSON.stringify(req));
  res.say("You can say, what is the temperature, set heat to 75, turn hold on, turn hold off. Have fun!");
});

module.exports = function(cb) {
  global.thermostat = thermostatApp;
  cb();
};
