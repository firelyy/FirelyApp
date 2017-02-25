import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import AuthScreen from './containers/AuthScreen';
import HomeScreen from './containers/HomeScreen';

const firelyApp = StackNavigator({
  Start: { screen: AuthScreen },
  Home: { screen: HomeScreen },
});


AppRegistry.registerComponent('firelyApp', () => firelyApp);