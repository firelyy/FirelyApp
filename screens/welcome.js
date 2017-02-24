import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native';


const styles = require('../styles.js')

var WelcomeView = React.createClass({
  render: function() {

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


  },
  
});

module.exports = WelcomeView;
