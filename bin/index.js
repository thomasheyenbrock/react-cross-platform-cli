#!/usr/bin/env node

var init = require('./init');
var options = require('minimist')(process.argv.slice(2));
var print = require('./print');

// Print help
if (options.help || options.h) {
    print.printHelp();
}
// Print version
if (options.version || options.v) {
    print.printVersion();
}

// No arguments or more than one argument provided
if (options._.length !== 1) {
    print.printErrorAndExit();
}

// Execute command
switch (options._[0]) {
    case 'init': init(); break;
    default: print.printErrorAndExit();
}
