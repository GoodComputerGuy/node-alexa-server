# alexa-radiothermostat

This is a module for [node-alexa-server](https://github.com/bbrookfield/node-alexa-server) to integrate with [Radio Thermostats](http://www.radiothermostat.com/) 

####Getting started
1. Make sure you have downloaded and setup your [node-alexa-server](https://github.com/bbrookfield/node-alexa-server)
2. If you do not already have an `app_modules` directory in your server project, you need to create one
3. Clone this project into that directory
4. Setup your Alexa skill
5. Configure your intents
  
```
{
"intents": [
	{
	"intent": "getTemp",
		"slots": [{
			"name": "getTemperature",
			"type": "AMAZON.LITERAL"
		}]
	},
	{
	"intent": "setHeat",
		"slots": [{
			"name": "setHeating",
			"type": "AMAZON.NUMBER"
		}]
	},
	{
	"intent": "setTemp",
		"slots": [{
			"name": "setTemperature",
			"type": "AMAZON.NUMBER"
		}]
	},
	{
	"intent": "setOff"
	},
	{
	"intent": "setHoldOn"
	},
	{
	"intent": "setHoldOff"
	},
	{
	"intent": "incTemp",
		"slots": [{
			"name": "increaseTemp",
			"type": "AMAZON.NUMBER"
		}]
	},
	{
	"intent": "decTemp",
		"slots": [{
			"name": "decreaseTemp",
			"type": "AMAZON.NUMBER"
		}]
	}
 ]
}
```
6. Configure your utterances

```
setOff turn off thermostat
setOff turn off the thermostat
setOff set thermostat to off
setHoldOn turn on hold
setHoldOn set hold to on
setHoldOff turn off hold
setHoldOff set hold to off
setTemp set to {setTemperature}
setTemp set the temp to {setTemperature}
setTemp set the temperature to {setTemperature}
setTemp set temperature to {setTemperature}
setTemp adjust temperature to {setTemperature}
setTemp adjust the temperature to {setTemperature}
setHeat set heat to {setHeating}
setHeat adjust heat to {setHeating}
setHeat adjust the heat to {setHeating}
getTemp what is the temperature
getTemp what is the temperature
getTemp what is temperature
getTemp what is house temperature
getTemp what's the house temperature
getTemp what's the temperature
getTemp say the temperature
getTemp tell me the temperature
getTemp tell me temperature
```
