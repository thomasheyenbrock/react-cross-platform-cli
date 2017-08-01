var fs = require('fs');
var path = require('path');

var filePath = path.join(path.resolve('.'), 'ios', require('../app.json').name, 'Info.plist');
var fileContent = fs.readFileSync(filePath, 'utf8').split('\n');

for (var i = 1; i < fileContent.length; i++) {
    if (fileContent[i - 1].match(/CFBundleDisplayName/)) {
        fileContent[i] = '\t<string>' + require('../app.json').displayName + '</string>';
    }
}

fs.writeFileSync(filePath, fileContent.join('\n'));

process.exit();
