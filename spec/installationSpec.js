var cmp = require('semver-compare');
const packageJson = require('../package.json');

describe('Student computer setup', function() {
    it('has an acceptable version of Node.js', function() {
        const expectedVersion = packageJson.engines.node;
        const actualVersion = process.version;
        expect(cmp(expectedVersion,actualVersion)).toEqual(1);
    });
});