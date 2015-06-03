# consoleDev

[![Build Status](https://travis-ci.org/Dhumez-Sebastien/trap.js.svg?branch=master)](https://travis-ci.org/Dhumez-Sebastien/trap.js)
[![Code Climate](https://codeclimate.com/github/Dhumez-Sebastien/trap.js/badges/gpa.svg)](https://codeclimate.com/github/Dhumez-Sebastien/trap.js)
[![Test Coverage](https://codeclimate.com/github/Dhumez-Sebastien/trap.js/badges/coverage.svg)](https://codeclimate.com/github/Dhumez-Sebastien/trap.js/coverage)
[![Dependency Status](https://david-dm.org/Dhumez-Sebastien/trap.js.svg)](https://david-dm.org/Dhumez-Sebastien/trap.js)

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

# Join in!

I'm happy to receive bug reports, fixes, documentation enhancements, and any other improvements.

# RoadMap

* Soon