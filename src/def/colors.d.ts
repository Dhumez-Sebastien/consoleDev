// https://github.com/Marak/colors.js

// import _colors = module("colors");
// var colors = require('colors');

declare module "colors" {

    export var bold: any;
    export var italic: any;
    export var underline: any;
    export var inverse: any;
    export var white: any;
    export var grey: any;
    export var black: any;
    export var blue: any;
    export var cyan: any;
    export var green: any;
    export var magenta: any;
    export var red: any;
    export var yellow: any;
    export var rainbow: any;

    export var silly: any;
    export var input: any;
    export var log: any;
    export var verbose: any;
    export var prompt: any;
    export var info: any;
    export var data: any;
    export var help: any;
    export var warn: any;
    export var debug: any;
    export var error: any;

    export function setTheme(theme: any);
    export function addSequencer(name: string, callback: Function);

    // none, browser, console
    export var mode: String;

    export interface String {
        bold: String;
        italic: String;
        underline: String;
        inverse: String;
        white: String;
        grey: String;
        black: String;
        blue: String;
        cyan: String;
        green: String;
        magenta: String;
        red: String;
        yellow: String;
    }
}

