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



const bot = new SparkBot();
const spark = new SparkAPIWrapper(process.env.SPARK_TOKEN);
var myId;
var myName;

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
        myName = me.displayName;
    }
});

// Agrees with everything
bot.onMessage(function(trigger, message) {
    if(trigger.data.personId != myId) {

        //remove the bot's name from the message
        var zip = message.text;
        console.log (myName);
        zip = zip.replace(myName,'');
        zip = zip.trim();
        console.log("new message from: " + trigger.data.personEmail + ", text: " + zip);

        spark.createMessage(message.roomId, "<@personEmail:" + trigger.data.personEmail + "> Let me see now....", {"markdown": true}, function (err, message) {
            if (err) {
                console.log("WARNING: could not post message to room: " + command.message.roomId);
                return;
            }
            var options = {
                host: 'api.wunderground.com',
                path: '/api/'+WEATHER_KEY+'/geolookup/conditions/q/'+zip+'.json'

            };
            var callback = function(response){
                var str = '';
                response.on('data', function(chunk) {
                    str += chunk;
                });
                response.on('end', function() {
                    console.log(str);
                    str = JSON.parse(str);
                    spark.createMessage(message.roomId, "<@personEmail:" + trigger.data.personEmail + "> "+str.current_observation.temp_f+ " degrees (F). " + str.current_observation.weather, {"markdown": true}, function (err, message) {
                        if (err) {
                            console.log("WARNING: could not post message to room: " + command.message.roomId);
                            return;
                        }
                    });
                });
            };
            var request = http.get(options,callback).end();

        });
    }
});