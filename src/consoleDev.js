///<reference path="./defLoader.d.ts" />
var colors = require('colors');
var _ = require('lodash');
// Debug types available
var types = ['log', 'silly', 'input', 'verbose', 'prompt', 'info', 'data', 'help', 'warn', 'debug', 'error'];
var levels = ['silent', 'error', 'warn', 'debug', 'info', 'verbose', 'silly'];
/**
 * Priority	level	Log fns visible
 0	silent	N/A
 1	error	.error()
 2	warn	.warn(), .error()
 3	debug	.debug(), .warn(), .error()
 4	info	.info(), .debug(), .warn(), .error()
 5	verbose	.verbose(), .info(), .debug(), .warn(), .error()
 6	silly	.silly(), .verbose(), .info(), .debug(), .warn(), .error()
 */
var levelsRestrict = {
    silent: [],
    error: ['error'],
    warn: ['warn', 'error'],
    debug: ['debug', 'warn', 'error'],
    info: ['info', 'debug', 'warn', 'error', 'log'],
    verbose: ['verbose', 'info', 'debug', 'warn', 'error', 'log'],
    silly: ['silly', 'verbose', 'info', 'debug', 'warn', 'error', 'log']
};
/**
 * ConsoleDev
 *
 * @module :: ConsoleDev
 * @description	:: ConsoleDev Class
 */
var ConsoleDev = (function () {
    /**
     * Basic constructor
     */
    function ConsoleDev() {
        this._logFnErase = [];
        // Apply default theme
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
        // Apply the default log level "info"
        this._logLevel = 'info';
        // Load logs
        this.__loadLogs();
    }
    /**
     * Binding logs
     * @method __loadLogs
     * @private
     */
    ConsoleDev.prototype.__loadLogs = function () {
        // Bind all logs types
        for (var i = 0, ls = types.length; i < ls; i++) {
            /*if (types[i] === 'log') {
                this[types[i]] = function(str) {
                    console.log(colors.log(str));
                };
                continue;
            }*/
            if (_.indexOf(levelsRestrict[this._logLevel], types[i]) !== -1) {
                // Bind logs type
                this[types[i]] = this.__showLog((colors[types[i]]) ? colors[types[i]] : colors.white);
                for (var j = 0, lx = this._logFnErase.length; j < lx; j++) {
                    // Cannot erase console.log
                    if (types[i] === 'log' && this._logFnErase[j] === console) {
                        continue;
                    }
                    // Erase all others
                    if (this._logFnErase[j][types[i]]) {
                        this._logFnErase[j][types[i]] = this[types[i]];
                    }
                }
                // If type
                if (!this[types[i]] && console[types[i]]) {
                    this[types[i]] = console[types[i]];
                }
                else if (!this[types[i]] && !console[types[i]]) {
                    this[types[i]] = console.log;
                }
            }
            else {
                // Just an empty function
                this[types[i]] = function () { };
            }
        }
    };
    /**
     * Used the current logs colorized
     * @method __showLog
     * @private
     *
     * @param {object} color        The current color used by log
     */
    ConsoleDev.prototype.__showLog = function (color) {
        return function (str) {
            console.log(color(str));
        };
    };
    /**
     * Get the current log level
     * @method getLogLevel
     *
     * @return {string}     The current log level
     */
    ConsoleDev.prototype.getLogLevel = function () {
        return this._logLevel;
    };
    /**
     * Apply another log level
     * @method setLogLevel
     *
     * @param {string} level        The new log level who must be used
     * @return {ConsoleDev}         return ConsoleDev
     */
    ConsoleDev.prototype.setLogLevel = function (level) {
        if (_.indexOf(levels, level) === -1) {
            throw ('Unknow level type');
        }
        else {
            this._logLevel = level;
            this.__loadLogs();
        }
        return this;
    };
    /**
     * Apply another log level
     * @method setEraseLogList
     *
     * @param {any[]} list          List of logger who must be erased
     * @return {ConsoleDev}         return ConsoleDev
     */
    ConsoleDev.prototype.setEraseLogList = function (list) {
        // Clear array
        for (var i = 0, ls = this._logFnErase.length; i < ls; i++) {
            this._logFnErase.pop();
        }
        // Add elements
        for (var j = 0, lx = list.length; j < lx; j++) {
            if (!_.isUndefined(list[j])) {
                this._logFnErase.push(list[j]);
            }
        }
        // Reload logs
        this.__loadLogs();
        return this;
    };
    return ConsoleDev;
})();
module.exports = new ConsoleDev();
//# sourceMappingURL=consoleDev.js.map