import 'react-native-gesture-handler';
import React from 'react';
import Navigator from './navigation/Navigator';
import NavigationService from './navigation/NavigationService';
import firebase from 'firebase';
import {Provider as StoreProvider} from 'react-redux';
import store from './store';

const firebaseConfig = {
  apiKey: 'AIzaSyBqvDMofzdjHMHeVc4Bmxgz3dJcvuBwFWE',
  authDomain: 'fir-chatapp-17ccd.firebaseapp.com',
  databaseURL: 'https://fir-chatapp-17ccd.firebaseio.com',
  projectId: 'fir-chatapp-17ccd',
  storageBucket: 'fir-chatapp-17ccd.appspot.com',
  messagingSenderId: '658508613629',
  appId: '1:658508613629:web:9db2fbe07558b5ac6a3b94',
  measurementId: 'G-113277Q9Y3',
};

const App = () => {
  // Initialize Firebase

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  return (
    <StoreProvider store={store}>
      <Navigator
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    </StoreProvider>
  );
};

export default App;
