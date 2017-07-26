#!/usr/bin/env node

var execSync = require('child_process').execSync;
var fs = require('fs');
var path = require('path');
var readline = require('readline-sync');

var options = require('minimist')(process.argv.slice(2));

// Print help
if (options.help || options.h) {
    printHelp();
}
// Print version
if (options.version || options.v) {
    printVersion();
}

// No arguments or more than one argument provided
if (options._.length !== 1) {
    printErrorAndExit();
}

// Execute command
switch (options._[0]) {
    case 'init': init(); break;
    default: printErrorAndExit();
}

function printErrorAndExit() {
    console.log('\tYou entered an invalid command. Use the following for help:');
    console.log('');
    console.log('\t\treact-cross-platform-cli --help');
    console.log('');
    process.exit();
}

function printHelp() {
    console.log('\tUsage: react-cross-platform-cli [command] [options]');
    console.log('');
    console.log('\tCommands:');
    console.log('');
    console.log('\t\tinit: starts the inferface for creating a new cross platform react application');
    console.log('');
    console.log('\tOptions:');
    console.log('\t\t--version, -v: output installed version');
    console.log('\t\t--help, -h:    output usage information');
    console.log('');
    process.exit();
}

function printVersion() {
    console.log(require('../package.json').version);
    process.exit();
}

function init() {
    console.log('Hello stranger! Let\'s begin to set up your cross platform react application.');

    checkForYarn(function(yarn) {
        checkForReactNativeCli(function() {
            console.log('Please answer the following questions:');
            console.log('');
            var project = readInput();

            console.log('');
            console.log('Initializing application...');
            execSync('react-native init ' + project.project.name);
            fs.writeFileSync(path.join(path.resolve('.'), project.project.name, 'package.json'), JSON.stringify(project.project, null, 2));
            execSync('cd ' + project.project.name + ' && rm -r -f node_modules && ' + (yarn ? 'yarn' : 'npm install'));

            console.log('Copying files...');
            copyFiles(project.project.name, project.web, project.desktop);
            console.log('');
            console.log('Doing stuff...');
            correctXcodeProject(project.project.name);

            console.log('');
            console.log('We did it! Happy coding :)');
            console.log('');
            process.exit();
        });
    });
}

function checkForYarn(callback) {
    require('child_process').exec('yarn --version', (error, stdout, stderr) => {
        if (stderr === '' && stdout.replace('\n', '').match(/^[0-9]+.[0-9]+.[0-9]+$/)) {
            callback(true);
        } else {
            console.log('It seems that you don\'t have yarn installed. We recommend it as package manager as it is much faster than npm.');
            console.log('');
            var install = readline.question('\tDo you want to install yarn globally now? Enter Y/n: ');
            console.log('');
            if (install === 'y' || install === 'Y') {
                installYarn(callback);
            } else {
                callback(false);
            }
        }
    });
}

function installYarn(callback) {
    console.log('Installing yarn...');
    let response = execSync('npm install -g yarn').toString();
    if (response.indexOf('npm ERR!') > -1) {
        console.log('Oh no, something went wrong! Try to install yarn manually and come back later!');
        process.exit();
    }
    console.log('Horray! You now have yarn installed.');
    callback(true);
}

function checkForReactNativeCli(callback) {
    require('child_process').exec('react-native --version', (error, stdout, stderr) => {
        if (stderr === '' && stdout.substr(0, 17) === 'react-native-cli:') {
            callback();
        } else {
            installReactNativeCli(callback);
        }
    });
}

function installReactNativeCli(callback) {
    console.log('It seems that you don\'t have react-native-cli installed. We need this to initialize your application.');
    console.log('');
    var install = readline.question('\tDo you want to install react-native-cli globally now? Enter Y/n: ');
    console.log('');
    if (install === 'y' || install === 'Y') {
        console.log('Installing react-native-cli...');
        let response = execSync('npm install -g react-native-cli').toString();
        if (response.indexOf('npm ERR!') > -1) {
            console.log('Oh no, something went wrong! Try to install react-native-cli manually and come back later!');
            process.exit();
        }
        console.log('Horray! You now have react-native-cli installed.');
        callback();
    } else {
        console.log('What a shame, you are missing some good stuff! Come back later if you change your mind :)');
        process.exit();
    }
}

function readInput() {
    var name = '';
    while (name === '') {
        name = readline.question('\tWhat\'s the name for your project: ');
        if(!name.match(/^[$A-Z_][0-9A-Z_$]*$/i)) {
            console.log('');
            console.log('You may only use alphanumeric letters in your project-name. Let\'s try again.');
            console.log('');
            name = '';
        }
        try {
            fs.accessSync(name);
            console.log('');
            console.log('There is already a directory with this name. Let\'s try again.');
            console.log('');
            name = '';
        } catch (err) {
        }
    }
    var web = readline.question('\tDo you want to use your project as web application? Enter Y/n: ');
    var desktop = readline.question('\tDo you want to use your project as desktop application? Enter Y/n: ');

    var project = {
        name: name,
        version: '0.0.1',
        scripts: {
            start: 'node node_modules/react-native/local-cli/cli.js start',
            test: 'jest',
            android: 'react-native run-android',
            ios: 'react-native run-ios'
        },
        dependencies: {
            'react': "16.0.0-alpha.6",
            'react-native': "0.43.4"
        },
        devDependencies: {
            'babel-jest': '19.0.0',
            'jest': '19.0.2',
            'babel-preset-react-native': '1.9.1',
            'react-test-renderer': '16.0.0-alpha.6'
        },
        jest: {
            preset: "react-native"
        }
    };

    if (web === 'y' || web === 'Y' || desktop === 'y' || desktop === 'Y') {
        project['scripts']['web'] = '[ -d web/vendor-dev ] || npm run web:build:vendor-dev && NODE_ENV=development webpack-dev-server -d --host 0.0.0.0 --port 3000 --config web/webpack.config.js --inline --hot --colors';
        project['scripts']['web:build'] = 'npm run web:build:vendor && npm run web:build:app';
        project['scripts']['web:build:app'] = 'rm -rf web/build; NODE_ENV=production webpack --config web/webpack.config.js';
        project['scripts']['web:build:vendor-dev'] = 'rm -rf web/vendor-dev; NODE_ENV=development webpack --config web/vendor.webpack.config.js || rm -rf web/vendor-dev';
        project['scripts']['web:build:vendor'] = 'rm -rf web/vendor; NODE_ENV=production webpack --config web/vendor.webpack.config.js';
        project['scripts']['web:clean'] = 'rm -rf web/vendor web/vendor-dev web/build';
        project['scripts']['web:serve'] = 'http-serve -p 3001 --gzip true ./web/build';
        project['devDependencies']['add-asset-html-webpack-plugin'] = '^2.0.1';
        project['devDependencies']['babel-loader'] = '^7.0.0';
        project['devDependencies']['compression-webpack-plugin'] = '^0.4.0';
        project['devDependencies']['copy-webpack-plugin'] = '^4.0.1';
        project['devDependencies']['html-webpack-plugin'] = '^2.28.0';
        project['devDependencies']['http-serve'] = '^1.0.1';
        project['devDependencies']['json-loader'] = '^0.5.4';
        project['devDependencies']['offline-plugin'] = '^4.7.0';
        project['dependencies']['react-dom'] = '^15.4.2';
        project['devDependencies']['react-hot-loader'] = '^1.3.1';
        project['dependencies']['react-native-web'] = '^0.0.88';
        project['devDependencies']['url-loader'] = '^0.5.8';
        project['devDependencies']['webpack'] = '^2.4.1';
        project['devDependencies']['webpack-dev-server'] = '^2.4.2';
        project['jest']['moduleNameMapper'] = {
            'react-native': '<rootDir>/../'
        };
    }

    if (desktop === 'y' || desktop === 'Y') {
        project['main'] = 'index.desktop.js';
        project['scripts']['desktop'] = 'npm run web:build & electron .';
        project['dependencies']['electron'] = '^1.6.11';
    }

    return {
        project: project,
        web: web === 'y' || web === 'Y',
        desktop: desktop === 'y' || desktop === 'Y'
    };
}

function copyFiles(name, web, desktop) {
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
        fileList.push('index.desktop.js')
    }

    fileList.forEach(function(file) {
        var fileContent = fs.readFileSync(path.join(__dirname, file), 'utf8');
        fileContent = fileContent.replace(/\<\<name\>\>/g, name);
        fs.writeFileSync(path.join(path.resolve('.'), name, file), fileContent);
    });

    if (web || desktop) {
        execSync('mkdir -pv ' + path.join(path.resolve('.'), name, 'web', 'templates'));

        var fileContent = fs.readFileSync(path.join(__dirname, 'index.ejs'), 'utf8');
        fileContent = fileContent.replace(/\<\<name\>\>/g, name);
        fs.writeFileSync(path.join(path.resolve('.'), name, 'web', 'templates', 'index.ejs'), fileContent);

        var fileContent = fs.readFileSync(path.join(__dirname, 'shared.webpack.config.js'), 'utf8');
        fs.writeFileSync(path.join(path.resolve('.'), name, 'web', 'shared.webpack.config.js'), fileContent);

        var fileContent = fs.readFileSync(path.join(__dirname, 'vendor.webpack.config.js'), 'utf8');
        fs.writeFileSync(path.join(path.resolve('.'), name, 'web', 'vendor.webpack.config.js'), fileContent);

        var fileContent = fs.readFileSync(path.join(__dirname, 'webpack.config.js'), 'utf8');
        fs.writeFileSync(path.join(path.resolve('.'), name, 'web', 'webpack.config.js'), fileContent);
    }
}

function correctXcodeProject(name) {
    var filePath = path.join(path.resolve('.'), name, 'ios', name + '.xcodeproj', 'project.pbxproj');
    var xcode = fs.readFileSync(filePath, 'utf8');
    xcode = xcode.replace(/shellScript\ \=\ \"export\ NODE_BINARY\=node\\n\.\.\/node_modules\/react\-native\/scripts\/react-native-xcode\.sh\"\;/g, 'shellScript = "export NODE_BINARY=node\\n../node_modules/react-native/packager/react-native-xcode.sh";');
    fs.writeFileSync(filePath, xcode);

    filePath = path.join(path.resolve('.'), name, 'ios', name + 'Tests', name + 'Tests.m');
    xcode = fs.readFileSync(filePath, 'utf8');
    xcode = xcode.replace(/UIViewController\ \*vc\ \=\ \[\[\[RCTSharedApplication\(\)\ delegate\]\ window\]\ rootViewController\]\;/g, 'UIViewController *vc = [[[[UIApplication sharedApplication] delegate] window] rootViewController];');
    fs.writeFileSync(filePath, xcode);
}
