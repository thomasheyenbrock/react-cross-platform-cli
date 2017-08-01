var fs = require('fs');
var ncp = require('ncp');
var packager = require('electron-packager');
var path = require('path');
var rimraf = require('rimraf');

var tempFolder = 'temp' + Math.random();
var tempDir = path.join(path.resolve('.'), tempFolder);

fs.mkdirSync(tempDir);
fs.mkdirSync(path.join(tempDir, 'web'));
fs.mkdirSync(path.join(tempDir, 'web', 'build'));

var fileContent = fs.readFileSync(path.join(path.resolve('.'), 'index.desktop.js'), 'utf8');
fs.writeFileSync(path.join(tempDir, 'index.desktop.js'), fileContent);

var info = JSON.parse(fs.readFileSync(path.join(path.resolve('.'), 'app.json'), 'utf8'));
fileContent = `{
    "name": "${info.name}",
    "productName": "${info.displayName}",
    "main": "index.desktop.js"
}`;
fs.writeFileSync(path.join(tempDir, 'package.json'), fileContent);

ncp(path.join(path.resolve('.'), 'web', 'build'), path.join(tempDir, 'web', 'build'), function (err) {
    if (err) {
        throw err;
    }

    packager({
        asar: true,
        dir: tempDir,
        overwrite: true
    }, (err, appPaths) => {
        if (err) {
            throw err;
        }

        rimraf(tempDir, fs, function() {
            console.log('Build successful!');
            console.log('Executable created in ' + appPaths.join(', '));
            process.exit(0);
        });
    });
});
