///<reference path="./defLoader.d.ts" />
import colors = require('colors');
import _ = require('lodash');

declare var console : any;

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
    silent : [],
    error : ['error'],
    warn : ['warn', 'error'],
    debug : ['debug', 'warn', 'error'],
    info : ['info', 'debug', 'warn', 'error', 'log'],
    verbose : ['verbose', 'info', 'debug', 'warn', 'error', 'log'],
    silly : ['silly', 'verbose', 'info', 'debug', 'warn', 'error', 'log'],
};

/**
 * ConsoleDev
 *
 * @module :: ConsoleDev
 * @description	:: ConsoleDev Class
 */
class ConsoleDev {

    /**
     * Full colorization for string
     *
     * @property _fullColorize
     * @type {boolean}
     * @private
     */
    private _fullColorize : boolean = true;

    /**
     * List of logger who lmust be erased
     *      e.g : sails.log
     *
     * @property _logFnErase
     * @type {Function}
     * @private
     */
    private _logFnErase : Function[] = [];

    /**
     * Contains the current logLevel
     *      e.g : info, silly, verbose...
     *
     * @property _logLevel
     * @type {string}
     * @private
     */
    private _logLevel : string;

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
    private _parenthesisObject : boolean = true;

    /**
     * Show prefix before log
     *      e.g : error : i'm an error
     *
     * @property _showPrefix
     * @type {boolean}
     * @private
     */
    private _showPrefix : boolean = true;

    /**
     * Basic constructor
     */
    public constructor() {
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
    private __loadLogs() : void {

        // Bind all logs types
        for (var i : number = 0, ls : number = types.length; i < ls; i++) {

            if (_.indexOf(levelsRestrict[this._logLevel], types[i]) !== -1) {
                // Bind logs type
                this[types[i]] = this.__showLog((colors[types[i]]) ? colors[types[i]] : colors.white, types[i]);

                for (var j : number = 0, lx : number = this._logFnErase.length; j < lx; j++) {
                    // Cannot erase console.log
                    if (types[i] === 'log' && this._logFnErase[j] === console) {
                        continue;
                    }

                    // Erase all others
                    if (this._logFnErase[j][types[i]]) {
                        this._logFnErase[j][types[i]] = this[types[i]]
                    }
                }

                // If type
                if (!this[types[i]] && console[types[i]]) {
                    this[types[i]] = console[types[i]];
                } else if (!this[types[i]] && !console[types[i]]) {
                    this[types[i]] = console.log;
                }
            } else {
                // Just an empty function
                this[types[i]] = function() {};
            }
        }
    }

    /**
     * Used the current logs colorized
     * @method __showLog
     * @private
     *
     * @param {object} color        The current color used by log
     * @param {string} type         Type of log
     */
    private __showLog(color : any, type : string) : Function {
        // Scope
        var self : ConsoleDev = this;

        // Colorize string
        var colorizeStr : Function = (this._fullColorize) ? color : function(str) {
            return str;
        };

        // Show prefix before log
        var showPrefix : string = (this._showPrefix) ? color(type+' : ') : '';

        // Select console type
        var consoleType : string = (console[type]) ? type : 'log';

        // Show or hide parenthesis for objects
        var parenthesis : Function = (this._parenthesisObject) ?
            function() {
                console[consoleType](color('______________________________________')
                )
            } : function() {};

        // Back function
        return function(str) {
            if (typeof str !== 'string') {
                parenthesis();

                if (self._showPrefix) {
                    console[consoleType](showPrefix);
                }

                console[consoleType](str);
                parenthesis();
            } else {
                console[consoleType](showPrefix + colorizeStr(str));
            }
        };
    }


    /**
     * Get the current log level
     * @method getLogLevel
     *
     * @return {string}     The current log level
     */
    public getLogLevel() : string {
        return this._logLevel;
    }

    /**
     * Apply another log level
     * @method setLogLevel
     *
     * @param {string} level        The new log level who must be used
     * @return {ConsoleDev}         return ConsoleDev
     */
    public setLogLevel(level : string) : ConsoleDev {
        if (_.indexOf(levels, level) === -1) {
            throw('Unknow level type');
        } else {
            this._logLevel = level;
            this.__loadLogs();
        }

        return this;
    }

    /**
     * Apply another log level
     * @method setEraseLogList
     *
     * @param {any[]} list          List of logger who must be erased
     * @return {ConsoleDev}         return ConsoleDev
     */
    public setEraseLogList(list : any[]) : ConsoleDev {
        // Clear array
        for (var i : number = 0, ls : number = this._logFnErase.length; i < ls; i++) {
            this._logFnErase.pop();
        }

        // Add elements
        for (var j : number = 0, lx : number = list.length; j < lx; j++) {
            if (!_.isUndefined(list[j])) {
                this._logFnErase.push(list[j]);
            }
        }

        // Reload logs
        this.__loadLogs();

        return this;
    }

    /**
     * Apply some custom parameters
     * @method setParams
     *
     * @param {object} opts         List of parameters
     * @return {ConsoleDev}         return ConsoleDev
     */
    public setParams(opts : any) : ConsoleDev {
        this._fullColorize = (!_.isUndefined(opts.fullColorize)) ? !!opts.fullColorize : this._fullColorize;
        this._parenthesisObject = (!_.isUndefined(opts.parenthesisObject)) ? !!opts.parenthesisObject : this._parenthesisObject;
        this._showPrefix = (!_.isUndefined(opts.showPrefix)) ? !!opts.showPrefix : this._showPrefix;

        // Reload logs
        this.__loadLogs();

        return this;
    }
}

export = new ConsoleDev();