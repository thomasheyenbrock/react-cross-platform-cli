var execSync = require('child_process').execSync;
var fs = require('fs');
var path = require('path');

var adjustDesktop = require('./adjust-desktop');
var adjustIos = require('./adjust-ios');
var copyFiles = require('./copy-files');
var dependencyReactNativeCli = require('./dependency-react-native-cli');
var dependencyYarn = require('./dependency-yarn');
var read = require('./read');

function build(yarn, project) {
    console.log('');
    console.log('Initializing application...');
    execSync('react-native init ' + project.project.name);
    fs.writeFileSync(path.join(path.resolve('.'), project.project.name, 'package.json'), JSON.stringify(project.project, null, 2));
    execSync('cd ' + project.project.name + ' && ' + (yarn ? 'yarn' : 'npm install'));

    console.log('');
    console.log('Copying files...');
    copyFiles(project.project.name, project.web, project.desktop);
    console.log('Adjusting xcode project...');
    adjustIos(project.project.name);
    adjustDesktop(project.desktop, project.project.name, function() {
        console.log('');
        console.log('We did it! Happy coding :)');
        console.log('');
        process.exit();
    });
}

module.exports = function init() {
    console.log('Hello stranger! Let\'s begin to set up your cross platform react application.');

    dependencyYarn(function(yarn) {
        dependencyReactNativeCli(function() {
            console.log('Please answer the following questions:');
            console.log('');
            var project = read();

            build(yarn, project);
        });
    });
}

// TODO: remove adjustDesktop
