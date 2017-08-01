var exec = require('child_process').exec;

exec('cross-env NODE_ENV=development electron .');

var web = exec('npm run web');
web.stdout.on('data', function (data) {
    console.log(data.toString());
});
