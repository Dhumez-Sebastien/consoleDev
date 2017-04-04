"use strict";
const colors = require("colors");
const _ = require("lodash");
const types = ['log', 'silly', 'input', 'verbose', 'prompt', 'info', 'data', 'help', 'warn', 'debug', 'error'];
const levels = ['silent', 'error', 'warn', 'debug', 'info', 'verbose', 'silly'];
const levelsRestrict = {
    silent: [],
    error: ['error'],
    warn: ['warn', 'error'],
    debug: ['debug', 'warn', 'error'],
    info: ['info', 'debug', 'warn', 'error', 'log'],
    verbose: ['verbose', 'info', 'debug', 'warn', 'error', 'log'],
    silly: ['silly', 'verbose', 'info', 'debug', 'warn', 'error', 'log'],
};
class ConsoleDev {
    constructor() {
        this._fullColorize = true;
        this._logFnErase = [];
        this._parenthesisObject = true;
        this._showPrefix = true;
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
        this._logLevel = 'info';
        this.__loadLogs();
    }
    __colorizeChar(str) {
        return str;
    }
    __loadLogs() {
        for (let i = 0, ls = types.length; i < ls; i++) {
            if (_.indexOf(levelsRestrict[this._logLevel], types[i]) !== -1) {
                this[types[i]] = this.__showLog((colors[types[i]]) ? colors[types[i]] : colors.white, types[i]);
                for (let j = 0, lx = this._logFnErase.length; j < lx; j++) {
                    if (this._logFnErase[j] instanceof console.Console) {
                        continue;
                    }
                    if (this._logFnErase[j][types[i]]) {
                        this._logFnErase[j][types[i]] = this[types[i]];
                    }
                }
            }
            else {
                this[types[i]] = function () { };
            }
        }
    }
    __showLog(color, type) {
        const self = this;
        const colorizeStr = (this._fullColorize) ? color : this.__colorizeChar;
        const showPrefix = (this._showPrefix) ? color(type + ' : ') : '';
        const consoleType = (console[type]) ? type : 'log';
        const parenthesis = (this._parenthesisObject) ?
            function () {
                console[consoleType](color('______________________________________'));
            } : function () { };
        return function () {
            for (let i = 0, ls = arguments.length; i < ls; i++) {
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
    }
    getLogLevel() {
        return this._logLevel;
    }
    setEraseLogList(list) {
        for (let i = 0, ls = this._logFnErase.length; i < ls; i++) {
            this._logFnErase.pop();
        }
        for (let j = 0, lx = list.length; j < lx; j++) {
            if (!_.isUndefined(list[j])) {
                this._logFnErase.push(list[j]);
            }
        }
        this.__loadLogs();
        return this;
    }
    setLogLevel(level) {
        if (_.indexOf(levels, level) === -1) {
            this['error']('Unknown level type : ' + level);
        }
        else {
            this._logLevel = level;
            this.__loadLogs();
        }
        return this;
    }
    setParams(opts) {
        if (!_.isUndefined(opts.fullColorize) && _.isBoolean(opts.fullColorize)) {
            this._fullColorize = opts.fullColorize;
        }
        if (!_.isUndefined(opts.parenthesisObject) && _.isBoolean(opts.parenthesisObject)) {
            this._parenthesisObject = opts.parenthesisObject;
        }
        if (!_.isUndefined(opts.showPrefix) && _.isBoolean(opts.showPrefix)) {
            this._showPrefix = opts.showPrefix;
        }
        this.__loadLogs();
        return this;
    }
}
let NewConsoleDev = new ConsoleDev();
module.exports = NewConsoleDev;
//# sourceMappingURL=consoleDev.js.map