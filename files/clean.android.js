var fs = require('fs');
var path = require('path');
var rimraf = require('rimraf');

rimraf(path.join(path.resolve('.'), 'android', 'build'), fs, function() {
    rimraf(path.join(path.resolve('.'), 'android', '.gradle'), fs, function() {
        rimraf(path.join(path.resolve('.'), 'android', 'app', 'build'), fs, function() {
            process.exit(0);
        });
    });
});
