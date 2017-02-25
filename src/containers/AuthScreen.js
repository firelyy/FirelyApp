import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  AlertIOS
} from 'react-native';
import ApiUtils from '../../src/utilities/ApiUtils'

import t from 'tcomb-form-native';
const STORAGE_KEY = 'auth_token';
const Form = t.form.Form;
const Person = t.struct({
  cell: t.String,
  password: t.String
});
const options = {};

class AuthScreen extends React.Component {

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

  _userSignup() {
    let value = this.refs.form.getValue();
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
        this.props.navigation.navigate('Home')

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
    let value = this.refs.form.getValue();
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
      .then((responseData)=>{
        this._onValueChange(STORAGE_KEY, responseData.auth_token),
        this.props.navigation.navigate('Home')
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

  render() {
    const { navigate } = this.props.navigation;

    return (

      <View style={styles.container}>
        <View style={styles.row1}>
          <Text style={styles.title}>fire.ly</Text>
        </View>
        <View style={styles.row2}>
          <Form
          ref="form"
          type={Person}
          options={options}
          />
        </View>  
        <View style={styles.row3}>
          <TouchableHighlight style={styles.button} onPress={this._userSignup.bind(this)} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Signup</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button} onPress={this._userLogin.bind(this)} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableHighlight>
        </View>
      </View>

      );
}


}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',

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
    marginTop: 5,
    marginBottom: 5,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  row1: {
    // backgroundColor: 'red',
    // flex: 0

  },
  row2: {
    // backgroundColor: 'blue',
    // flex: 0

  },
  row3: {
    // backgroundColor: 'green',
    // flex: 1,
    justifyContent: 'center'

  },
});


export { AuthScreen as default};