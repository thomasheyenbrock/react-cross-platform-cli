# react-cross-platform-cli

This project servers as a simple command line interface. One can use it to generate a boilerplate project for a cross platform react application.

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

The CLI uses `yarn` as package manager. You can either install `yarn` manually or let the CLI do this for you. (In the future this CLI shall also work using native `npm` instead of `yarn`.)

## Usage

To run the CLI simply type

```shell
react-cross-platform-cli init
```

The CLI will ask you for a project name and the platforms you want to use. (Android and iOS are always default, Web and Desktop are optinal.)

The CLI then creates a new folder in your working directory with the boilerplate application.

After that you have multiple options for running your application from the command line, each depending on the device:
* `npm run andoid`: Runs the application on a virtual Android device. For setup instructions look [here](https://facebook.github.io/react-native/docs/getting-started.html).
* `npm run ios`: Runs the application on a virtual iPhone. For setup instructions look [here](https://facebook.github.io/react-native/docs/getting-started.html).
* `npm run web`: Runs `webpack-dev-server` on port `3000`. You can look at your application via [http://localhost:3000](http://localhost:3000).
  You have also extended options here, look them up [here](https://github.com/ndbroadbent/react-native-web-webpack).
* `npm run desktop`: Runs the application in a new window on your desktop.

The single source of truth for all devices is the App-Component located in `app.js`. Simply use this as your main component and import all custom components there, then you never should have to actually touch any of the platform-specific files.

## Credits

* For directly initializing the react-native-application I use the [react-native-cli](https://www.npmjs.com/package/react-native-cli).
* For all the rest I mostly based this on [this project](https://github.com/ndbroadbent/react-native-web-webpack) by [ndbroadbent](https://github.com/ndbroadbent).
