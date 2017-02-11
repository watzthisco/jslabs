var SparkBot = require("node-sparkbot");
var SparkAPIWrapper = require("node-sparkclient");


if (!process.env.SPARK_TOKEN) {
    console.log("Could not start as this bot requires a Cisco Spark API access token.");
    console.log("Please add env variable SPARK_TOKEN on the command line");
    console.log("Example: ");
    console.log("> SPARK_TOKEN=XXXXXXXXXXXX DEBUG=sparkbot* node helloworld.js");
    process.exit(1);
}

const bot = new SparkBot();
const spark = new SparkAPIWrapper(process.env.SPARK_TOKEN);

//
// Welcome message
// sent as the bot is added to a Room
//
bot.onEvent("memberships", "created", function (trigger) {
    var newMembership = trigger.data; // see specs here: https://developer.ciscospark.com/endpoint-memberships-get.html
    if (newMembership.personId != bot.interpreter.person.id) {
        // ignoring
        console.log("new membership fired, but it is not us being added to a room. Ignoring...");
        return;
    }

    // so happy to join
    console.log("bot was just added to room: " + trigger.data.roomId);

    spark.createMessage(trigger.data.roomId, "Hi, I am the Hello World bot! I just say Hello.", { "markdown":true }, function(err, message) {
        if (err) {
            console.log("WARNING: could not post Hello message to room: " + trigger.data.roomId);
            return;
        }
    });
});
