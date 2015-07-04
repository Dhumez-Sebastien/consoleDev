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
        /**
         * Full colorization for string
         *
         * @property _fullColorize
         * @type {boolean}
         * @private
         */
        this._fullColorize = true;
        /**
         * List of logger who lmust be erased
         *      e.g : sails.log
         *
         * @property _logFnErase
         * @type {Function}
         * @private
         */
        this._logFnErase = [];
        /**
         * To set is object/Array or other must be in parenthesis
         *      e.g     ______________________
         *      e.g     { test : 0 }
         *      e.g     ______________________
         *
         * @property _parenthesisObject
         * @type {boolean}
         * @private
         */
        this._parenthesisObject = true;
        /**
         * Show prefix before log
         *      e.g : error : i'm an error
         *
         * @property _showPrefix
         * @type {boolean}
         * @private
         */
        this._showPrefix = true;
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
     * Return string for colorization
     * @method __colorizeChar
     * @private
     *
     * @param {object} str          Get back this string for colorization
     */
    ConsoleDev.prototype.__colorizeChar = function (str) {
        return str;
    };
    /**
     * Binding logs
     * @method __loadLogs
     * @private
     */
    ConsoleDev.prototype.__loadLogs = function () {
        // Bind all logs types
        for (var i = 0, ls = types.length; i < ls; i++) {
            if (_.indexOf(levelsRestrict[this._logLevel], types[i]) !== -1) {
                // Bind logs type
                this[types[i]] = this.__showLog((colors[types[i]]) ? colors[types[i]] : colors.white, types[i]);
                for (var j = 0, lx = this._logFnErase.length; j < lx; j++) {
                    // Cannot erase console
                    if (this._logFnErase[j] instanceof console.Console) {
                        continue;
                    }
                    // Erase all others
                    if (this._logFnErase[j][types[i]]) {
                        this._logFnErase[j][types[i]] = this[types[i]];
                    }
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
     * @param {string} type         Type of log
     */
    ConsoleDev.prototype.__showLog = function (color, type) {
        // Scope
        var self = this;
        // Colorize string
        var colorizeStr = (this._fullColorize) ? color : this.__colorizeChar;
        // Show prefix before log
        var showPrefix = (this._showPrefix) ? color(type + ' : ') : '';
        // Select console type
        var consoleType = (console[type]) ? type : 'log';
        // Show or hide parenthesis for objects
        var parenthesis = (this._parenthesisObject) ?
            function () {
                console[consoleType](color('______________________________________'));
            } : function () { };
        // Back function
        return function () {
            for (var i = 0, ls = arguments.length; i < ls; i++) {
                if (typeof arguments[i] !== 'string') {
                    parenthesis();
                    if (self._showPrefix) {
                        console[consoleType](showPrefix);
                    }
                    console[consoleType](arguments[i]);
                    parenthesis();
                }
                else {
                    console[consoleType](showPrefix + colorizeStr(arguments[i]));
                }
            }
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
    /**
     * Apply another log level
     * @method setLogLevel
     *
     * @param {string} level        The new log level who must be used
     * @return {ConsoleDev}         return ConsoleDev
     */
    ConsoleDev.prototype.setLogLevel = function (level) {
        if (_.indexOf(levels, level) === -1) {
            this['error']('Unknown level type : ' + level);
        }
        else {
            this._logLevel = level;
            this.__loadLogs();
        }
        return this;
    };
    /**
     * Apply some custom parameters
     * @method setParams
     *
     * @param {object} opts         List of parameters
     * @return {ConsoleDev}         return ConsoleDev
     */
    ConsoleDev.prototype.setParams = function (opts) {
        if (!_.isUndefined(opts.fullColorize)) {
            this._fullColorize = !!opts.fullColorize;
        }
        if (!_.isUndefined(opts.parenthesisObject)) {
            this._parenthesisObject = !!opts.parenthesisObject;
        }
        if (!_.isUndefined(opts.showPrefix)) {
            this._showPrefix = !!opts.showPrefix;
        }
        // Reload logs
        this.__loadLogs();
        return this;
    };
    return ConsoleDev;
})();
module.exports = new ConsoleDev();
//# sourceMappingURL=consoleDev.js.map