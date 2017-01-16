var Jasmine = require('jasmine'),
    reporters = require('jasmine-reporters');

var junitReporter = new reporters.TerminalReporter({
    verbosity: 3,
    color: true
});

var jasmine = new Jasmine();

jasmine.loadConfigFile("spec/support/jasmine.json");
jasmine.addReporter(junitReporter);
jasmine.execute();