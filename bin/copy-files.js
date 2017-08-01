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
    var fileContent;

    if (web || desktop) {
        fileList.push('index.web.js');
    }
    if (desktop) {
        fileList.push('index.desktop.js');
    }

    fileList.forEach(function(file) {
        fileContent = fs.readFileSync(path.join(__dirname, '..', 'files', file), 'utf8');
        fileContent = fileContent.replace(/\<\<name\>\>/g, name);
        fs.writeFileSync(path.join(path.resolve('.'), name, file), fileContent);
    });

    fs.mkdirSync(path.join(path.resolve('.'), name, 'script'));

    fileContent = fs.readFileSync(path.join(__dirname, '..', 'files', 'build.android.js'), 'utf8');
    fs.writeFileSync(path.join(path.resolve('.'), name, 'script', 'build.android.js'), fileContent);

    fileContent = fs.readFileSync(path.join(__dirname, '..', 'files', 'clean.android.js'), 'utf8');
    fs.writeFileSync(path.join(path.resolve('.'), name, 'script', 'clean.android.js'), fileContent);

    fileContent = fs.readFileSync(path.join(__dirname, '..', 'files', 'clean.ios.js'), 'utf8');
    fs.writeFileSync(path.join(path.resolve('.'), name, 'script', 'clean.ios.js'), fileContent);

    if (web || desktop) {
        fs.mkdirSync(path.join(path.resolve('.'), name, 'web'));
        fs.mkdirSync(path.join(path.resolve('.'), name, 'web', 'templates'));

        fileContent = fs.readFileSync(path.join(__dirname, '..', 'files', 'index.ejs'), 'utf8');
        fileContent = fileContent.replace(/\<\<name\>\>/g, name);
        fs.writeFileSync(path.join(path.resolve('.'), name, 'web', 'templates', 'index.ejs'), fileContent);

        fileContent = fs.readFileSync(path.join(__dirname, '..', 'files', 'shared.webpack.config.js'), 'utf8');
        fs.writeFileSync(path.join(path.resolve('.'), name, 'web', 'shared.webpack.config.js'), fileContent);

        fileContent = fs.readFileSync(path.join(__dirname, '..', 'files', 'vendor.webpack.config.js'), 'utf8');
        fs.writeFileSync(path.join(path.resolve('.'), name, 'web', 'vendor.webpack.config.js'), fileContent);

        fileContent = fs.readFileSync(path.join(__dirname, '..', 'files', 'webpack.config.js'), 'utf8');
        fs.writeFileSync(path.join(path.resolve('.'), name, 'web', 'webpack.config.js'), fileContent);

        fileContent = fs.readFileSync(path.join(__dirname, '..', 'files', 'build.app.web.js'), 'utf8');
        fs.writeFileSync(path.join(path.resolve('.'), name, 'script', 'build.app.web.js'), fileContent);

        fileContent = fs.readFileSync(path.join(__dirname, '..', 'files', 'build.vendor-dev.web.js'), 'utf8');
        fs.writeFileSync(path.join(path.resolve('.'), name, 'script', 'build.vendor-dev.web.js'), fileContent);

        fileContent = fs.readFileSync(path.join(__dirname, '..', 'files', 'build.vendor.web.js'), 'utf8');
        fs.writeFileSync(path.join(path.resolve('.'), name, 'script', 'build.vendor.web.js'), fileContent);

        fileContent = fs.readFileSync(path.join(__dirname, '..', 'files', 'clean.web.js'), 'utf8');
        fs.writeFileSync(path.join(path.resolve('.'), name, 'script', 'clean.web.js'), fileContent);
    }

    if (desktop) {
        fileContent = fs.readFileSync(path.join(__dirname, '..', 'files', 'build.desktop.js'), 'utf8');
        fs.writeFileSync(path.join(path.resolve('.'), name, 'script', 'build.desktop.js'), fileContent);

        fileContent = fs.readFileSync(path.join(__dirname, '..', 'files', 'run.desktop.js'), 'utf8');
        fs.writeFileSync(path.join(path.resolve('.'), name, 'script', 'run.desktop.js'), fileContent);
    }
}
