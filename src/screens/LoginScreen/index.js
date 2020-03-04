import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import styles from '../../constants/styles';
import firebase from 'firebase';
import NavigationService from '../../navigation/NavigationService';
import {
  NAVIGATION_REGISTER_SCREEN,
  PRIVATE_ROUTE,
} from '../../navigation/routes';
import {ProgressDialog} from 'react-native-simple-dialogs';
import ValidationComponent from 'react-native-form-validator';

const validation = {
  email: {
    email: true,
    required: true,
  },
  password: {
    required: true,
  },
};

export default class LoginScreen extends ValidationComponent {
  static navigationOptions = {
    headerShown: false,
  };

  state = {
    email: '',
    password: '',
    progressVisible: false,
  };

  handleChange = key => value => {
    this.setState({[key]: value});
  };

  submitForm = () => {
    this.validate({...validation});
    const {email, password} = this.state;
    this.setState({progressVisible: true});
    if (this.isFormValid()) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          NavigationService.navigate(PRIVATE_ROUTE);
          this.setState({progressVisible: false});
        })
        .catch(function(error) {
          Alert.alert('Error', `${error.message}`);
          this.setState({progressVisible: false});
        });
    } else {
      this.setState({progressVisible: false});
      Alert.alert('Error', 'Please input necessary fields');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          style={styles.input}
          value={this.state.name}
          onChangeText={this.handleChange('email')}
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          value={this.state.password}
          secureTextEntry={true}
          onChangeText={this.handleChange('password')}
        />
        <TouchableOpacity onPress={this.submitForm}>
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            NavigationService.navigate(NAVIGATION_REGISTER_SCREEN)
          }>
          <Text style={loginStyles.btnRegister}>Back to registration</Text>
        </TouchableOpacity>
        <ProgressDialog
          visible={this.state.progressVisible}
          title="Logging in"
          message="Please wait..."
        />
      </View>
    );
  }
}

const loginStyles = StyleSheet.create({
  btnRegister: {
    color: 'blue',
    fontSize: 15,
    marginTop: 10,
  },
});
