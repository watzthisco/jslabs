var SparkBot = require("node-sparkbot");
var SparkAPIWrapper = require("node-sparkclient");
const {Wit, log} = require('node-wit');
var myId;

if (!process.env.SPARK_TOKEN) {
    console.log("Could not start as this bot requires a Cisco Spark API access token.");
    console.log("Please add env variable SPARK_TOKEN on the command line");
    console.log("Example: ");
    console.log("> SPARK_TOKEN=XXXXXXXXXXXX DEBUG=sparkbot* node witbot.js");
    process.exit(1);
}

const spark = new SparkAPIWrapper(process.env.SPARK_TOKEN);


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


const bot = new SparkBot();

const wittoken = 'WQDZKPAMABB4B73M66GFN3LHFL4FBZ7W';


const context0 = {};
var sessionId = myId;

const firstEntityValue = (entities, entity) => {
    const val = entities && entities[entity] &&
            Array.isArray(entities[entity]) &&
            entities[entity].length > 0 &&
            entities[entity][0].value
        ;
    if (!val) {
        return null;
    }
    return typeof val === 'object' ? val.value : val;
};

// Our bot actions
const actions = {
    send(request, response) {
        const {sessionId, context, entities} = request;
        const {text, quickreplies} = response;
        return new Promise(function(resolve, reject) {
            console.log('sending...', JSON.stringify(response));
            return resolve();
        });
    },
    // You should implement your custom actions here
    // See https://wit.ai/docs/quickstart
    getForecast({context, entities}) {
        var location = firstEntityValue(entities, 'location');
        if (location) {
            context.forecast = 'sunny in ' + location; // we should call a weather API here
            delete context.missingLocation;
        } else {
            context.missingLocation = true;
            delete context.forecast;
        }
        return context;
    },
};

const brain = new Wit({accessToken: wittoken,actions});

// Sends things to wit.ai and write response
bot.onMessage(function(trigger, message) {
    if(trigger.data.personId != myId) {

/*
        //send message to wit to interpret
        brain.message(message.text, {})
            .then((data) => {
            console.log('Yay, got Wit.ai message response: ' + JSON.stringify(data));
        });
*/

        //converses
        brain.converse(sessionId,message.text,context0)
            .then((data) => {

                console.log('Yay, got Wit.ai converse response: ' + JSON.stringify(data));

                spark.createMessage(message.roomId, "<@personEmail:" + trigger.data.personEmail + "> " + data.msg + "", {"markdown": true}, function (err, message) {
                    if (err) {
                        console.log("WARNING: could not post message to room: " + command.message.roomId);
                        return;
                    }
                });
            })

    .catch(console.error);
    }
});