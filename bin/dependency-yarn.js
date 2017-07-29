var exec = require('child_process').exec;
var execSync = require('child_process').execSync;
var readline = require('readline-sync');

module.exports = function checkYarn(callback) {
    exec('yarn --version', (error, stdout, stderr) => {
        if (stderr === '' && stdout.replace('\n', '').match(/^[0-9]+.[0-9]+.[0-9]+$/)) {
            callback(true);
        } else {
            console.log('It seems that you don\'t have yarn installed. We recommend it as package manager as it is much faster than npm.');
            console.log('');
            var install = readline.question('\tDo you want to install yarn globally now? Enter Y/n: ');
            console.log('');
            if (install === 'y' || install === 'Y') {
                console.log('Installing yarn...');
                let response = execSync('npm install -g yarn').toString();
                if (response.indexOf('npm ERR!') > -1) {
                    console.log('Oh no, something went wrong! Try to install yarn manually and come back later!');
                    process.exit();
                }
                console.log('Horray! You now have yarn installed.');
                callback(true);
            } else {
                callback(false);
            }
        }
    });
}
