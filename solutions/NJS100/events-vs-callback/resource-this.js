var util = require('util');
var EventEmitter = require('events').EventEmitter;

function Resource (c) {

    var maxEvents = c;

    process.nextTick(() => {
        var count = 0;
        this.emit('start');
        var t = setInterval(() => {
            this.emit('data', ++count);
            if (count === maxEvents) {
                this.emit('end', count);
                clearInterval(t);
            }
        },10);
    });
};

util.inherits(Resource,EventEmitter);

module.exports = Resource;
