var execSync = require('child_process').execSync;
var fs = require('fs');
var path = require('path');

var adjustDesktop = require('./adjustDesktop');
var adjustIos = require('./adjustIos');
var copyFiles = require('./copyFiles');
var dependencyAsar = require('./dependencyAsar');
var dependencyReactNativeCli = require('./dependencyReactNativeCli');
var dependencyYarn = require('./dependencyYarn');
var read = require('./read');

function build(yarn, project) {
    console.log('');
    console.log('Initializing application...');
    execSync('react-native init ' + project.project.name);
    fs.writeFileSync(path.join(path.resolve('.'), project.project.name, 'package.json'), JSON.stringify(project.project, null, 2));
    execSync('cd ' + project.project.name + ' && rm -r -f node_modules && ' + (yarn ? 'yarn' : 'npm install'));

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

            if (project.desktop) {
                dependencyAsar(function() {
                    build(yarn, project);
                });
            } else {
                build(yarn, project);
            }


        });
    });
}
