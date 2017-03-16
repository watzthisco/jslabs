var sumModule = require('./sumModule');
var assert = require('assert');

sumModule(1,2,function(err,data){
    assert.equal(data,3);

    console.log(data);

});