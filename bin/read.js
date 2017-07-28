var fs = require('fs');
var readline = require('readline-sync');

module.exports = function readInput() {
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
            ios: 'react-native run-ios',
            'ios:clean': 'rm -r -f ios/build'
        },
        dependencies: {
            'react': '16.0.0-alpha.6',
            'react-native': '0.43.4'
        },
        devDependencies: {
            'babel-jest': '19.0.0',
            'jest': '19.0.2',
            'babel-preset-react-native': '1.9.1',
            'react-test-renderer': '16.0.0-alpha.6'
        },
        jest: {
            preset: 'react-native'
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
        project['scripts']['desktop'] = 'NODE_ENV=development electron . & npm run web';
        project['scripts']['desktop:build'] = 'python ./electron/script/build.py';
        project['scripts']['desktop:build:bootstrap'] = 'python ./electron/script/bootstrap.py -v';
        project['scripts']['desktop:build:debug'] = 'python ./electron/script/build.py -c D';
        project['scripts']['desktop:clean'] = 'python ./electron/script/clean.py';
        project['dependencies']['electron'] = '^1.6.11';
    }

    return {
        project: project,
        web: web === 'y' || web === 'Y',
        desktop: desktop === 'y' || desktop === 'Y'
    };
}