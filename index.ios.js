var React = require('react');
var ReactNative = require('react-native');
var t = require('tcomb-form-native');
import ApiUtils from './ApiUtils'

var {
  AppRegistry,
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AlertIOS,
} = ReactNative;

var STORAGE_KEY = 'auth_token';

var Form = t.form.Form;

var Person = t.struct({
  cell: t.String,
  password: t.String
});

const options = {};

var firelyApp = React.createClass({

  async _onValueChange(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  },

  async _getProtectedQuote() {
    var DEMO_TOKEN = await AsyncStorage.getItem(STORAGE_KEY);
    fetch("http://localhost:3000/", {
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
  },

  async _userLogout() {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      AlertIOS.alert("Logout Success!")
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  },

  _userSignup() {
    var value = this.refs.form.getValue();
    if (value) { 
      fetch("http://localhost:3000/users", {
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
  },

  _userLogin() { 
    var value = this.refs.form.getValue();
    if (value) { 
      fetch("http://localhost:3000/authenticate", {
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
          "Click the button to get a Chuck Norris quote!"
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
  },


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.title}>JWT Signup/Login test</Text>
        </View>
        <View style={styles.row}>
          <Form
          ref="form"
          type={Person}
          options={options}
          />
        </View>  
        <View style={styles.row}>
          <TouchableHighlight style={styles.button} onPress={this._userSignup} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Signup</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button} onPress={this._userLogin} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button} onPress={this._userLogout} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.row}>    
          <TouchableHighlight onPress={this._getProtectedQuote} style={styles.button}>
            <Text style={styles.buttonText}>Get http://localhost:3000/</Text>
          </TouchableHighlight>
        </View>
      </View>
      );
  }
});

var styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
});

AppRegistry.registerComponent('firelyApp', () => firelyApp);