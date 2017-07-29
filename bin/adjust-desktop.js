var exec = require('child_process').exec;
var fs = require('fs');
var os = require('os');
var path = require('path');

module.exports = function(desktop, name, callback) {
    if (desktop) {
        var link = '';
        if (os.type() === 'Darwin') {
            link = 'https://electron.atom.io/docs/development/build-instructions-osx/';
        } else if (os.type() === 'Linux') {
            link = 'https://electron.atom.io/docs/development/build-instructions-linux/';
        } else if (os.type() === 'Windows_NT') {
            link = 'https://electron.atom.io/docs/development/build-instructions-windows/';
        }
        console.log('');
        console.log('WARNING: If you want to build your desktop application for redistribution you should check out');
        console.log('         ' + link + ' for the required dependencies.');
        console.log('         Independent of these dependencies the desktop application will compile in development.');

        exec('cd ' + name + ' && git clone https://github.com/electron/electron.git', (error, stdout, stderr) => {
            var notCloned;

            try {
                fs.accessSync(path.join(path.resolve('.'), name, 'electron'));
            } catch (err) {
                notCloned = true;
            }

            if (error || notCloned) {
                console.log('');
                console.log('WARNING: The git repository electron couldn\'t be cloned. To build the desktop');
                console.log('         application you have to clone the following repository into your project folder:');
                console.log('');
                console.log('             https://github.com/electron/electron.git');
            }
            callback();
        });
    } else {
        callback();
    }
}
