import {AppRegistry} from 'react-native';
import App from './app';

if (__OFFLINE__) {
    require('offline-plugin/runtime').install();
}

AppRegistry.registerComponent('<<name>>', () => App);
AppRegistry.runApplication('<<name>>', {
    rootTag: window.document.getElementById('react-root')
});
