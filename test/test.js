// Define global for test
assert = require('assert');
consoleDev = require('../src/consoleDev');


var sails;

// Fake console for coverage
var fakeConsole = {
    log : function() {

    },
    error : function() {

    }
};

consoleDev.setEraseLogList([
    (sails && sails.log) ? sails.log : void 0
    , console
    , fakeConsole
]);

consoleDev.setLogLevel('silent').getLogLevel();
consoleDev.setEraseLogList([]);
consoleDev.setParams({
    showPrefix : true,
    fullColorize : true,
    parenthesisObject : true
});

consoleDev.log('I\'m a log');
consoleDev.silly('I\'m a silly');
consoleDev.input('I\'m a input');
consoleDev.verbose('I\'m a verbose');
consoleDev.prompt('I\'m a prompt');
consoleDev.info('I\'m a info');
consoleDev.data('I\'m a data');
consoleDev.help('I\'m a help');
consoleDev.warn('I\'m a warn');
consoleDev.debug('I\'m a debug');
consoleDev.error('I\'m a error');
consoleDev.error('I\'m an obj : ');
consoleDev.error({test : 0});
consoleDev.error(new Error('May get an error'));


consoleDev.setParams({
    showPrefix : false,
    fullColorize : false,
    parenthesisObject : false
});

consoleDev.log('I\'m a log');
consoleDev.silly('I\'m a silly');
consoleDev.input('I\'m a input');
consoleDev.verbose('I\'m a verbose');
consoleDev.prompt('I\'m a prompt');
consoleDev.info('I\'m a info');
consoleDev.data('I\'m a data');
consoleDev.help('I\'m a help');
consoleDev.warn('I\'m a warn');
consoleDev.debug('I\'m a debug');
consoleDev.error('I\'m a error');
consoleDev.error('I\'m an obj : ');
consoleDev.error({test : 0});
consoleDev.error(new Error('May get an error'));


consoleDev.setParams({});
consoleDev.setLogLevel('err');

var colors = require('colors');
colors.setTheme({
    log: 'white',
    silly: 'rainbow',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'grey',
    info: 'green',
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    debug: 'blue',
    error: 'red'
});
consoleDev.__showLog(colors.error, 'log');
consoleDev.__colorizeChar('colorized');

expect = require('chai').expect;