const Promise = require('promise');

var readFile = Promise.denodeify(require('fs').readFile);
// now `readFile` will return a promise rather than
// expecting a callback

function readText(filename, callback){
    // If a callback is provided, call it with error as the
    // first argument and result as the second argument,
    // then return `undefined`. If no callback is provided,
    // just return the promise.
    return readFile(filename, 'utf8').nodeify(callback);
}

//using promise
readText('text.txt')
    .then(function(data) {
            console.log(data.toString());
        }, console.error
    );

//using callback
/*
readText('text.txt',function(err,data) {
    console.log(data.toString());
}, console.error
);*/
