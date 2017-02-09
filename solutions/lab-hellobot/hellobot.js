var SparkAPIWrapper = require("node-sparkclient");

var roomId = '';

if (!process.env.SPARK_TOKEN) {
    console.log("Could not start as this bot requires a Cisco Spark API access token.");
    console.log("Please add env variable SPARK_TOKEN on the command line");
    console.log("Example: ");
    console.log("> SPARK_TOKEN=XXXXXXXXXXXX DEBUG=sparkbot* node hellobot.js");
    process.exit(1);
}

const spark = new SparkAPIWrapper(process.env.SPARK_TOKEN);

spark.createMessage(roomId, "Hello, World!", {"markdown": true}, function (err, message) {
    if (err) {
        console.log("WARNING: could not post message to room: " + roomId);
        return;
    }
});