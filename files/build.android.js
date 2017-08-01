var fs = require('fs');
var path = require('path');

fs.writeFileSync(path.join(path.resolve('.'), 'android', 'app', 'src', 'main', 'res', 'values', 'strings.xml'), '<resources>\n\t<string name="app_name">' + require('../app.json').displayName + '</string>\n</resources>');

process.exit();
