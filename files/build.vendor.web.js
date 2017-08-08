var fs = require('fs');
var path = require('path');
var rimraf = require('rimraf');

var filePath = path.join(path.resolve('.'), 'web', 'templates', 'index.ejs');
var fileContent = fs.readFileSync(filePath, 'utf8').split('\n');
for (var i = 0; i < fileContent.length; i++) {
    if (fileContent[i].match(/\<title\>/)) {
        fileContent[i] = '    <title>' + require(path.join(path.resolve('.'), 'app.json')).displayName + '</title>';
    }
}
fs.writeFileSync(filePath, fileContent.join('\n'));

rimraf(path.join(path.resolve('.'), 'web', 'vendor'), fs, function() {
    process.exit(0);
});
