describe('Unit :: consoleDev', function () {
    it('should return a function with consoleDev methods', function() {
        assert(typeof consoleDev == 'object', 'No found consoleDev : '+typeof consoleDev);
        assert(typeof consoleDev.getLogLevel == 'function', 'No found consoleDev.getLogLevel : '+typeof consoleDev.getLogLevel);
        assert(typeof consoleDev.setLogLevel == 'function', 'No found consoleDev.setLogLevel : '+typeof consoleDev.setLogLevel);

        assert(consoleDev.setLogLevel('silent').getLogLevel() == 'silent', 'Invalid logLevel : '+consoleDev.getLogLevel());
        assert(consoleDev.setLogLevel('error').getLogLevel() == 'error', 'Invalid logLevel : '+consoleDev.getLogLevel());
        assert(consoleDev.setLogLevel('warn').getLogLevel() == 'warn', 'Invalid logLevel : '+consoleDev.getLogLevel());
        assert(consoleDev.setLogLevel('debug').getLogLevel() == 'debug', 'Invalid logLevel : '+consoleDev.getLogLevel());
        assert(consoleDev.setLogLevel('info').getLogLevel() == 'info', 'Invalid logLevel : '+consoleDev.getLogLevel());
        assert(consoleDev.setLogLevel('verbose').getLogLevel() == 'verbose', 'Invalid logLevel : '+consoleDev.getLogLevel());
        assert(consoleDev.setLogLevel('silly').getLogLevel() == 'silly', 'Invalid logLevel : '+consoleDev.getLogLevel());

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
            fullColorize : true
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
            showPrefix : true,
            fullColorize : false
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
            showPrefix : true,
            fullColorize : true,
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


    });
});