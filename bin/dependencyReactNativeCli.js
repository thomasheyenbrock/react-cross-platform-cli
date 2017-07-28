var exec = require('child_process').exec;
var execSync = require('child_process').execSync;
var readline = require('readline-sync');

module.exports = function checkForReactNativeCli(callback) {
    exec('react-native --version', (error, stdout, stderr) => {
        if (stderr === '' && stdout.substr(0, 17) === 'react-native-cli:') {
            callback();
        } else {
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
    });
}
