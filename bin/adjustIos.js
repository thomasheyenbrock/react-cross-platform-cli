var fs = require('fs');
var path = require('path');

module.exports = function correctXcodeProject(name) {
    var filePath = path.join(path.resolve('.'), name, 'ios', name + '.xcodeproj', 'project.pbxproj');
    var xcode = fs.readFileSync(filePath, 'utf8');
    xcode = xcode.replace(/shellScript\ \=\ \"export\ NODE_BINARY\=node\\n\.\.\/node_modules\/react\-native\/scripts\/react-native-xcode\.sh\"\;/g, 'shellScript = "export NODE_BINARY=node\\n../node_modules/react-native/packager/react-native-xcode.sh";');
    fs.writeFileSync(filePath, xcode);

    filePath = path.join(path.resolve('.'), name, 'ios', name + 'Tests', name + 'Tests.m');
    xcode = fs.readFileSync(filePath, 'utf8');
    xcode = xcode.replace(/UIViewController\ \*vc\ \=\ \[\[\[RCTSharedApplication\(\)\ delegate\]\ window\]\ rootViewController\]\;/g, 'UIViewController *vc = [[[[UIApplication sharedApplication] delegate] window] rootViewController];');
    fs.writeFileSync(filePath, xcode);
}
