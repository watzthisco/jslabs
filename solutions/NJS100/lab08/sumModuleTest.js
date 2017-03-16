var sumModule = require('./sumModule');
var assert = require('assert');

sumModule(1,2,function(err,data){
    assert.equal(data,3);
    assert.equal(err)
    console.log(data);

});
sumModule(1,-1,function(err,data){
    assert.equal(err,"Each number must be positive");
});