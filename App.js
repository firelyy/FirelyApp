import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AlertIOS,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

const styles = require('./styles.js')

var t = require('tcomb-form-native');
import ApiUtils from './ApiUtils'
import Welcome from './screens/welcome'

var STORAGE_KEY = 'auth_token';
var Form = t.form.Form;
var Person = t.struct({
  cell: t.String,
  password: t.String
});

const options = {};

class HomeScreen extends React.Component {

  static navigationOptions = {
    title: 'login',
  };


  async _onValueChange(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  async _getProtectedQuote() {
    var DEMO_TOKEN = await AsyncStorage.getItem(STORAGE_KEY);
    fetch("http://45.79.191.91:3000/", {
      method: "GET",
      headers: {
        'Authorization':  DEMO_TOKEN,
        'Content-Type': 'application/json'
      }
    })
    .then(ApiUtils.checkStatus)
    .then((response) => {
      console.log(response)
      return response.json()})
    .then((response) => { 
      AlertIOS.alert(
        "User response:", JSON.stringify(response))
    })
    .catch((error) => {
      console.log(error);
      AlertIOS.alert(
        "Error!",
        DEMO_TOKEN
        )
    })
    .done();
  }

  async _userLogout() {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      AlertIOS.alert("Logout Success!")
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  _userSignup() {
    var value = this.refs.form.getValue();
    if (value) { 
      fetch("http://45.79.191.91:3000/users", {
        method: "POST", 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cell: value.cell, 
          password: value.password, 
          password_confirmation  : value.password, 

        })
      })
      .then(ApiUtils.checkStatus)
      .then((response) => 
      {
        return response.json()
      })
      .then((responseData) => {
        console.log(responseData);
        this._onValueChange(STORAGE_KEY, responseData.auth_token),
        AlertIOS.alert(
          "Signup Success!",
          JSON.stringify(responseData)
          )
      })
      .catch((error) => {
        console.log(error);
        AlertIOS.alert(
          "Error!",
          JSON.stringify(error)
          )
      })
      .done();
    }
  }

  _userLogin() { 
    var value = this.refs.form.getValue();
    if (value) { 
      fetch("http://45.79.191.91:3000/authenticate", {
        method: "POST", 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cell: value.cell, 
          password: value.password, 
        })
      })
      .then(ApiUtils.checkStatus)
      .then((response) => response.json())
      .then((responseData) => {
        AlertIOS.alert(
          "Login Success!",
          "Word Up..."
          ),
        this._onValueChange(STORAGE_KEY, responseData.auth_token)
      })
      .catch((error) => {
        console.log(error);
        AlertIOS.alert(
          "Error!",
          JSON.stringify(error)
          )
      })
      .done();
    } 
  }

  _Welcome() {
    navigator.push({
      title: 'Welcome'
    });
  }


  render() {
    const { navigate } = this.props.navigation;

    return (
    

      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.title}>fire.ly</Text>
        </View>
        <View style={styles.row}>
          <Form
          ref="form"
          type={Person}
          options={options}
          />
        </View>  
        <View style={styles.row}>
          <TouchableHighlight style={styles.button} onPress={this._userSignup.bind(this)} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Signup</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button} onPress={this._userLogin.bind(this)} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button} onPress={() => navigate('LoggedIn')} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Test Button</Text>
          </TouchableHighlight>
        </View>
      </View>


      );



};

}

class LoggedInScreen extends React.Component {
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

const firelyApp = StackNavigator({
  Home: { screen: HomeScreen },
  LoggedIn: { screen: LoggedInScreen },
});


AppRegistry.registerComponent('firelyApp', () => firelyApp);