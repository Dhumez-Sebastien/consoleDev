// Define global for test
assert = require('assert');
consoleDev = require('../src/consoleDev');

var sails;

consoleDev.setEraseLogList([
    (sails && sails.log) ? sails.log : void 0
]);


expect = require('chai').expect;