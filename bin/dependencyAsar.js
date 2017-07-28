var exec = require('child_process').exec;
var execSync = require('child_process').execSync;
var readline = require('readline-sync');

module.exports = function checkForAsar(callback) {
    exec('asar --version', (error, stdout, stderr) => {
        if (stderr === '' && stdout.replace('\n', '').match(/^v[0-9]+.[0-9]+.[0-9]+/)) {
            callback();
        } else {
            console.log('It seems that you don\'t have asar installed. You need this to build your desktop application.');
            console.log('');
            var install = readline.question('\tDo you want to install asar globally now? Enter Y/n: ');
            console.log('');
            if (install === 'y' || install === 'Y') {
                console.log('Installing asar...');
                let response = execSync('npm install -g asar').toString();
                if (response.indexOf('npm ERR!') > -1) {
                    console.log('WARNING: There was an error while installing asar. Install asar manually to build your desktop application.');
                } else {
                    console.log('Horray! You now have asar installed.');
                }
                callback();
            } else {
                console.log('WARNING: To build your desktop application for production you will have to install asar manually.');
                callback();
            }
        }
    });
}
