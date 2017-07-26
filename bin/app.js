import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Platform
} from 'react-native';

/**
 * Main component for the whole app.
 */
export default class App extends React.Component {
    /**
     * Render the content.
     * @return {React.Component} The rendered content of this component.
     */
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to React Native! ({Platform.OS})
                </Text>
                <Text style={styles.instructions}>
                    To get started, edit app.js
                </Text>
                <Text style={styles.instructions}>
                    For reload do a double tap R or Cmd+R on your keyboard.
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    }
});
