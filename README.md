# consoleDev

[![Build Status](https://travis-ci.org/Dhumez-Sebastien/consoleDev.svg?branch=master)](https://travis-ci.org/Dhumez-Sebastien/consoleDev)
[![Code Climate](https://codeclimate.com/github/Dhumez-Sebastien/consoleDev/badges/gpa.svg)](https://codeclimate.com/github/Dhumez-Sebastien/consoleDev)
[![Test Coverage](https://codeclimate.com/github/Dhumez-Sebastien/consoleDev/badges/coverage.svg)](https://codeclimate.com/github/Dhumez-Sebastien/consoleDev/coverage)
[![Dependency Status](https://david-dm.org/Dhumez-Sebastien/consoleDev.svg)](https://david-dm.org/Dhumez-Sebastien/consoleDev)

#### More logs more simple!

Currently is dev!

# Quick Start

## Install
```shell
$ npm install consoleDev
```

## Basic Usage

```javascript
// Include consoleDev
var consoleDev = require('consoleDev');

// Erase a list logger
consoleDev.setEraseLogList([
    (sails && sails.log) ? sails.log : void 0
]);

// Set the different listener modes
consoleDev.setLogLevel('silent');
consoleDev.setLogLevel('error');
consoleDev.setLogLevel('warn');
consoleDev.setLogLevel('debug');
consoleDev.setLogLevel('info');
consoleDev.setLogLevel('verbose');
consoleDev.setLogLevel('silly');

// Show data
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

```

## Customise

```javascript
consoleDev.setParams({
            showPrefix : true,          // Show prefix before log (default to true)
            fullColorize : true,        // Colorize full string into log
            parenthesisObject : true    // Show parenthesis before/after object/array (default to true)
        });
```

# Join in!

I'm happy to receive bug reports, fixes, documentation enhancements, and any other improvements.

# RoadMap

* Customise color