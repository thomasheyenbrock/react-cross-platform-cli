var exec = require('child_process').exec;
var spawn = require('child_process').spawn;

exec('cross-env NODE_ENV=development electron .');

var test = spawn('npm', ['run', 'web']);
test.stdout.on('data', function (data) {
    console.log(data.toString());
});
