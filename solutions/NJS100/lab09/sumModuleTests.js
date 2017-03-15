var should = require('should');
var sumModule = require('./sumModule');

describe('sumModule', function() {
    describe('when called Asynchronously',function(){

        it('should add numbers together', function (done) {
            sumModule.sum(2, 2, function (err, result) {
                result.should.equal(4);
                done();
            });
        });

    });

    describe('when called Synchronously', function() {

        it('should add numbers together', function(){
            sumModule.sumSync(2,2).should.equal(4);
        });

    });

});

