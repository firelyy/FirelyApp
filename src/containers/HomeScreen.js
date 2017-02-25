import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Logged In',
  };
  render() {
    return (
      <View>
        <Text>You're logged in!</Text>
      </View>
    );
  }
}

export { HomeScreen as default };