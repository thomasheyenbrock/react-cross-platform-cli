const {app, BrowserWindow, dialog, shell, Menu} = require('electron');
const fs = require('fs');
const Module = require('module');
const path = require('path');
const url = require('url');

let mainWindow;

// Parse command line options.
const argv = process.argv.slice(1);
const option = {
    file: null,
    help: null,
    version: null,
    abi: null,
    webdriver: null,
    modules: []
};

for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--version' || argv[i] === '-v') {
        option.version = true;
        break;
    } else if (argv[i] === '--abi') {
        option.abi = true;
        break;
    } else if (argv[i].match(/^--app=/)) {
        option.file = argv[i].split('=')[1];
        break;
    } else if (argv[i] === '--help' || argv[i] === '-h') {
        option.help = true;
        break;
    } else if (argv[i] === '--interactive' || argv[i] === '-i') {
        option.interactive = true;
    } else if (argv[i] === '--test-type=webdriver') {
        option.webdriver = true;
    } else if (argv[i] === '--require' || argv[i] === '-r') {
        option.modules.push(argv[++i]);
        continue;
    } else if (argv[i][0] === '-') {
        continue;
    } else {
        option.file = argv[i];
        break;
    }
}

// Create default menu.
app.once('ready', () => {
    if (Menu.getApplicationMenu()) {
        return;
    }

    const template = [
        {
            label: 'Edit',
            submenu: [
                {role: 'undo'},
                {role: 'redo'},
                {type: 'separator'},
                {role: 'cut'},
                {role: 'copy'},
                {role: 'paste'},
                {role: 'pasteandmatchstyle'},
                {role: 'delete'},
                {role: 'selectall'}
            ]
        },
        {
            label: 'View',
            submenu: [
                {role: 'reload'},
                {role: 'forcereload'},
                {role: 'toggledevtools'},
                {type: 'separator'},
                {role: 'resetzoom'},
                {role: 'zoomin'},
                {role: 'zoomout'},
                {type: 'separator'},
                {role: 'togglefullscreen'}
            ]
        },
        {
            role: 'window',
            submenu: [
                {role: 'minimize'},
                {role: 'close'}
            ]
        },
        {
            role: 'help',
            submenu: [
                {
                    label: 'Learn More',
                    click () {
                        shell.openExternal('https://electron.atom.io');
                    }
                },
                {
                    label: 'Documentation',
                    click () {
                        shell.openExternal(`https://github.com/electron/electron/tree/v${process.versions.electron}/docs#readme`);
                    }
                },
                {
                    label: 'Community Discussions',
                    click () {
                        shell.openExternal('https://discuss.atom.io/c/electron');
                    }
                },
                {
                    label: 'Search Issues',
                    click () {
                        shell.openExternal('https://github.com/electron/electron/issues');
                    }
                }
            ]
        }
    ];

    if (process.platform === 'darwin') {
        template.unshift({
            label: 'Electron',
            submenu: [
                {role: 'about'},
                {type: 'separator'},
                {
                    role: 'services',
                    submenu: []
                },
                {type: 'separator'},
                {role: 'hide'},
                {role: 'hideothers'},
                {role: 'unhide'},
                {type: 'separator'},
                {role: 'quit'}
            ]
        });
        template[1].submenu.push(
            {type: 'separator'},
            {
                label: 'Speech',
                submenu: [
                    {role: 'startspeaking'},
                    {role: 'stopspeaking'}
                ]
            }
        );
        template[3].submenu = [
            {role: 'close'},
            {role: 'minimize'},
            {role: 'zoom'},
            {type: 'separator'},
            {role: 'front'}
        ];
    } else {
        template.unshift({
            label: 'File',
            submenu: [
                {role: 'quit'}
            ]
        });
    }

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
});

// Quit when all windows are closed and no other one is listening to this.
// On OS X it is common for applications and their menu bar
// to stay active until the user quits explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (app.listeners('window-all-closed').length === 1 && !option.interactive && process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        startApp();
    }
});

function startApp() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        height: 600,
        width: 800
    });

    // and load the index.html of the app in production
    // or localhost on port 3000 in development
    if (process.env.NODE_ENV === 'development') {
        mainWindow.loadURL('http://localhost:3000');
    } else {
        mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'web', 'build', 'index.html'),
            protocol: 'file:',
            slashes: true
        }));
    }
    // Open the DevTools.
    // mainWindow.webContents.openDevTools()

    // Emitted when the window is closed.
    mainWindow.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
}

// Start the specified app if there is one specified in command line, otherwise
// start the default app.
app.on('ready', startApp);
