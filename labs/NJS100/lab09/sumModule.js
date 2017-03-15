module.exports.sum = function(number1,number2,callback){
    var sum = number1 + number2;
    if (isNaN(sum)) {
        callback("sum is not a number");
    }
    callback(null,sum);
};

module.exports.sumSync = function(number1,number2){
    var sum = number1 + number2;
    if (isNaN(sum)) {
        return ("Error: Not a number");
    } else {
        return sum;
    }
};
