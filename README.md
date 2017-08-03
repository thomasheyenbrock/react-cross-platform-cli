# react-cross-platform-cli

[![Travis Build Status](https://travis-ci.org/thomasheyenbrock/react-cross-platform-cli.svg?branch=master)](https://travis-ci.org/thomasheyenbrock/react-cross-platform-cli)
[![dependencies Status](https://david-dm.org/thomasheyenbrock/react-cross-platform-cli/status.svg)](https://david-dm.org/thomasheyenbrock/react-cross-platform-cli)
[![npm version](https://badge.fury.io/js/react-cross-platform-cli.svg)](https://badge.fury.io/js/react-cross-platform-cli)

This project serves as a simple command line interface. One can use it to generate a boilerplate project for a cross platform react application.

## Included platforms

The following platforms are supported in the boilerplate application:

* Android (using [react-native](https://facebook.github.io/react-native/))
* iOS (using [react-native](https://facebook.github.io/react-native/))
* Web / Browser (using [react-native-web](https://github.com/necolas/react-native-web))
* Desktop Application (using [electron](https://electron.atom.io/))

## Installation

Install the CLI globally on your machine using `npm`:

```shell
npm install -g react-cross-platform-cli
```

The recommended package manager is `yarn`. If you don't have it installed, you can let the CLI do it for you. If you don't want to use `yarn`, the CLI will go on using `npm` as package manager.

The CLI uses `react-native-cli` to initialize the application. You can either install `react-native-cli` manually or let the CLI do this for you.

## Usage

To run the CLI simply type

```shell
react-cross-platform-cli init
```

The CLI will ask you for a project name and the platforms you want to use. (Android and iOS are always default, Web and Desktop are optional.)

The CLI then creates a new folder in your working directory with the boilerplate application. In `app.json` you can specify `displayName` which will be the name of your application in production.

The single source of truth for all devices is the `App` Component located in `app.js`. Simply use this as your main component and import all custom components there, then you never should have to actually touch any of the platform-specific files.

### Android

The following scripts are created by the CLI:

Script | Description
---|---
`npm run android` | Runs the React Native package.
`npm run android:build` | Runs the React Native packager, builds your application for development and installs it on the virtual or physical device.
`npm run android:build:app` | Builds your application for production.
`npm run android:clean` | Removes files of previous builds.

#### Setup

To run your app on a physical or emulated android device you have to setup [Android Studio](https://developer.android.com/studio/index.html). For extended instructions on doing so, look up the [React Native Getting Started](https://facebook.github.io/react-native/docs/getting-started.html) page.

#### Developing

To start developing open up your Android Virtual Device or connect your physical device. Notice that React Native requires you to run `Android 6.0 (Marshmallow)`, so make sure you are using this.

To initially build your application run `npm run android:build`. This may take a while, depending on your resources. This will also open up a new termial running the React Native packager. When it's done, the app should automatically open up on your device.

After you changed your code, go back to the AVD and hit `R+R` (double-tap `R`) to reloade the application.

When you already initially built the application, it is enough to just start the packager with `npm run android`. When you open up the application on your devive, reloading it like above should work just fine.

If you want to remove any files from previous build, you can do so by running `npm run android:clean`. (Not that this won't remove the installation from your AVD.)

#### Building for production

On Android devices you need to sign your application before you actually can distribute them. The [React Native documentation](https://facebook.github.io/react-native/docs/signed-apk-android.html) should provide you with instructions for that.

When you added your keys, just run `npm run android:build:app` to build the release apk. You can find it in `android/app/build/outputs/apk`.

### iOS

The following scripts are created by the CLI:

Script | Description
---|---
`npm run ios` | Runs the React Native package.
`npm run ios:build` | Runs the React Native packager, opens your iPhone simulator, builds your application and installs it on the virtual device.
`npm run ios:clean` | Removes files of previous builds.

#### Setup

To develop your application for iOS you only need Xcode. (Note that this is only available via the AppStore for devices running MacOS.)

#### Developing

To start developing just run `npm run ios:build` to initially build the application. This may take a while, depending on your resources. It will open up a new termial running the React Native packager and your iPhone simulator. When it's done, the application should automatically open up on the simulator.

After you changed your code, go back to the simulator and hit `Cmd+R` to reloade the application.

When you already initially built the application, it is enough to just start the packager with `npm run ios`. When you open up the application on the simulator, reloading it like above should work just fine.

If you want to remove any files from previous build, you can do so by running `npm run ios:clean`. (Not that this won't remove the installation from your simulator.)

#### Building for production

React Native automatically generates and maintaines a Xcode project for you. The [documentation](https://facebook.github.io/react-native/docs/running-on-device.html) provides instructions how to use Xcode to build your application for production.

### Web / Browser

The following scripts are created by the CLI:

Script | Description
---|---
`npm run web` | Runs `webpack-dev-server` and serves your application on [http://localhost:3000](http://localhost:3000).
`npm run web:build` | Builds your whole application for production.
`npm run web:build:app` | Builds your application and any implicit vendored libraries.
`npm run web:build:vendor` | Builds the `react-native-web` library for production.
`npm run web:build:vendor-dev` | Builds the `react-native-web` library for development.
`npm run web:clean` | Removes files of previous builds.
`npm run web:serve` | Opens your production build on [http://localhost:3001](http://localhost:3001).

#### Developing

Starting development for web should be as easy as running `npm run web`. This will start `webpack-dev-server`. Once it has compiled your code, you should be able to access the application under [http://localhost:3000](http://localhost:3000).

Port `3000` is used by default, but you can change this easily in your `package.json` file.

You can remove all compiled files by running `npm run web:clean`.

#### Building for production

To build your application for production run `npm run web:build`. You can find all the `html` and `js` files for your frontend under `web/build`.

You can serve the production build to [http://localhost:3001](http://localhost:3001) by running `npm run web:serve`. Again you can change the port by editing the script in the `package.json` file.

### Desktop

The following scripts are created by the CLI:

Script | Description
---|---
`npm run desktop` | Opens your application for development in `electron`.
`npm run desktop:build` | Builds your desktop application for production using `electron-packager`.

#### Developing

If you run `npm run desktop`, this will start compiling the code using `webpack-dev-server`. In addition a `electron` window opens that displays your application.

Notice that those two processes start in parallel. You won't see any output until `webpack` has finished compiling. You can reload the window with `Cmd+R` on `MacOS` and `Ctrl+R` on `Windows` and `Linux`.

#### Building for production

By running `npm run desktop:build` your application gets compiled into an executable for your current operating system (i.e. a `.exe` for `Windows` and so on). The script uses [electron-packager](https://github.com/electron-userland/electron-packager) to do this.

## Credits

* For directly initializing the react-native-application I use the [react-native-cli](https://www.npmjs.com/package/react-native-cli).
* For building the desktop application in production [electron-packager](https://github.com/electron-userland/electron-packager) is used.
* For all the rest I mostly based this on [this project](https://github.com/ndbroadbent/react-native-web-webpack) by [ndbroadbent](https://github.com/ndbroadbent).
