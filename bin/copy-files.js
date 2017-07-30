var execSync = require('child_process').execSync;
var fs = require('fs');
var path = require('path');

module.exports = function copyFiles(name, web, desktop) {
    var fileList = [
        'app.js',
        'app.json',
        'index.android.js',
        'index.ios.js'
    ];

    if (web || desktop) {
        fileList.push('index.web.js');
    }
    if (desktop) {
        fileList.push('index.desktop.js');
        fileList.push('rn-cli.config.js');
    }

    fileList.forEach(function(file) {
        var fileContent = fs.readFileSync(path.join(__dirname, '..', 'files', file), 'utf8');
        fileContent = fileContent.replace(/\<\<name\>\>/g, name);
        fs.writeFileSync(path.join(path.resolve('.'), name, file), fileContent);
    });

    if (web || desktop) {
        fs.mkdir(path.join(path.resolve('.'), name, 'script'));
        fs.mkdir(path.join(path.resolve('.'), name, 'web'));
        fs.mkdir(path.join(path.resolve('.'), name, 'web', 'templates'));

        var fileContent = fs.readFileSync(path.join(__dirname, '..', 'files', 'index.ejs'), 'utf8');
        fileContent = fileContent.replace(/\<\<name\>\>/g, name);
        fs.writeFileSync(path.join(path.resolve('.'), name, 'web', 'templates', 'index.ejs'), fileContent);

        fileContent = fs.readFileSync(path.join(__dirname, '..', 'files', 'shared.webpack.config.js'), 'utf8');
        fs.writeFileSync(path.join(path.resolve('.'), name, 'web', 'shared.webpack.config.js'), fileContent);

        fileContent = fs.readFileSync(path.join(__dirname, '..', 'files', 'vendor.webpack.config.js'), 'utf8');
        fs.writeFileSync(path.join(path.resolve('.'), name, 'web', 'vendor.webpack.config.js'), fileContent);

        fileContent = fs.readFileSync(path.join(__dirname, '..', 'files', 'webpack.config.js'), 'utf8');
        fs.writeFileSync(path.join(path.resolve('.'), name, 'web', 'webpack.config.js'), fileContent);

        fileContent = fs.readFileSync(path.join(__dirname, '..', 'files', 'build.desktop.js'), 'utf8');
        fs.writeFileSync(path.join(path.resolve('.'), name, 'script', 'build.desktop.js'), fileContent);
    }
}
