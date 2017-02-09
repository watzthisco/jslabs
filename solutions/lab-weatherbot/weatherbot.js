/*
Step 1: Sign up and verify your account on weather underground (wunderground.com)
Step 2: get an api key from wunderground.com
Step 3: add WEATHER_KEY constant to app
Step 4: require http
Step 5: make a const for the wunderground url
Step 6: make an options object, containing the zip code
Step 7:

// SPARK_TOKEN=ZTgzM2IyYTktNDAzOS00NzgzLTk1M2YtOWI5MThhZWIzMTk0ZDcxOWZmODEtM2I4 DEBUG=sparkbot* node weatherbot.js

 */
var http = require('http');
var SparkBot = require("node-sparkbot");
var SparkAPIWrapper = require("node-sparkclient");

const WEATHER_KEY = '16eba5a259d5a110';

if (!process.env.SPARK_TOKEN) {
    console.log("Could not start as this bot requires a Cisco Spark API access token.");
    console.log("Please add env variable SPARK_TOKEN on the command line");
    console.log("Example: ");
    console.log("> SPARK_TOKEN=XXXXXXXXXXXX DEBUG=sparkbot* node helloworld.js");
    process.exit(1);
}

const wunderground = 'api.wunderground.com';


const bot = new SparkBot();
const spark = new SparkAPIWrapper(process.env.SPARK_TOKEN);
var myId;

//
// WHO AM I?
//
spark.getMe(function(err, me) {
    if (!err) {
        console.log(me.id);
        console.log(me.emails);
        console.log(me.displayName);
        console.log(me.avatar);
        console.log(me.created);
        myId = me.id;
    }
});

// Agrees with everything
bot.onMessage(function(trigger, message) {
    if(trigger.data.personId != myId) {
        console.log("new message from: " + trigger.data.personEmail + ", text: " + message.text);
        //todo: filter out bot's name from message.text

        spark.createMessage(message.roomId, "<@personEmail:" + trigger.data.personEmail + "> I agree.", {"markdown": true}, function (err, message) {
            if (err) {
                console.log("WARNING: could not post message to room: " + command.message.roomId);
                return;
            }
            var options = {
                host: wunderground,
                path: '/api/'+WEATHER_KEY+'/geolookup/conditions/q/IA/Cedar_Rapids.json'
                //todo: get parameters from the room

            };
            var callback = function(response){
                var str = '';
                response.on('data', function(chunk) {
                    str += chunk;
                });
                response.on('end', function() {
                    console.log(str);
                    //todo: output a message to the room
                });
            };
            var request = http.get(options,callback).end();

        });
    }
});