import React from 'react';
import {ActivityIndicator, StatusBar, View} from 'react-native';
import NavagationService from '../../navigation/NavigationService';
import {PRIVATE_ROUTE, PUBLIC_ROUTE} from '../../navigation/routes';
import firebase from 'firebase';

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        NavagationService.navigate(PRIVATE_ROUTE);
      } else {
        NavagationService.navigate(PUBLIC_ROUTE);
      }
    });

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
