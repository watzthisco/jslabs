exports.greet = function greet(name) {
    if(name === undefined) {
        name = "Friend"
    }
    return 'Hello, ' + name;

};