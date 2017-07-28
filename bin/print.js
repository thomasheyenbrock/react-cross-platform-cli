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

module.exports = {
    printErrorAndExit: printErrorAndExit,
    printHelp: printHelp,
    printVersion
};
