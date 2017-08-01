var fs = require('fs');
var path = require('path');
var rimraf = require('rimraf');

rimraf(path.join(path.resolve('.'), 'web', 'vendor'), fs, function() {
    rimraf(path.join(path.resolve('.'), 'web', 'vendor-dev'), fs, function() {
        rimraf(path.join(path.resolve('.'), 'web', 'build'), fs, function() {
            process.exit(0);
        });
    });
});
