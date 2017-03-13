var sumModule = require('./sumModule.js');

sumModule(1,"egg",function(err,data){
    if(err) throw err;

    console.log(data);

});