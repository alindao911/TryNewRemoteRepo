import React from 'react';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import NavigationService from '../../navigation/NavigationService';
import {NAVIGATION_LOGIN_SCREEN, PRIVATE_ROUTE} from '../../navigation/routes';
import ValidationComponent from 'react-native-form-validator';
import firebase from 'firebase';
import {ProgressDialog} from 'react-native-simple-dialogs';

const validations = {
  email: {
    required: true,
    email: true,
  },
  username: {
    required: true,
  },
  password: {
    required: true,
  },
  fullname: {
    required: true,
  },
};

export default class RegisterScreen extends ValidationComponent {
  static navigationOptions = {
    headerShown: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      username: '',
      password: '',
      fullname: '',
      bio: '',
      progressVisibile: false,
    };
  }

  handleChange = key => value => {
    this.setState({[key]: value});
  };

  _onSubmit = () => {
    this.validate({...validations});

    const {email, password} = this.state;
    this.setState({progressVisibile: true});

    if (this.isFormValid()) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          this._saveUser();
        });
    } else {
      console.log(this.getErrorMessages());
      console.log(this.state);
      Alert.alert('Error', 'Please input necessary fields');
    }
  };

  _saveUser = () => {
    const {email, fullname, username, bio} = this.state;
    const uid = firebase.auth().currentUser.uid;

    let ref = firebase.database().ref(`/users/${uid}`);
    ref
      .set({
        fullname: fullname,
        username: username,
        bio: bio,
        email: email,
        uid: uid,
      })
      .then(() => {
        this.setState({progressVisibile: false});
        NavigationService.navigate(PRIVATE_ROUTE);
      })
      .catch(() => {
        this.setState({progressVisibile: false});
        Alert.alert('Error', 'Server error!');
      });
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <TextInput
          placeholder="Fullname"
          style={[styles.input]}
          value={this.state.fullname}
          autoCompleteType="name"
          onChangeText={this.handleChange('fullname')}
        />
        <TextInput
          placeholder="Username"
          style={styles.input}
          value={this.state.username}
          autoCompleteType="off"
          onChangeText={this.handleChange('username')}
        />
        <TextInput
          placeholder="Bio"
          style={styles.input}
          value={this.state.bio}
          autoCompleteType="off"
          onChangeText={this.handleChange('bio')}
        />
        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          style={styles.input}
          value={this.state.email}
          onChangeText={this.handleChange('email')}
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          keyboardType="default"
          secureTextEntry={true}
          value={this.state.password}
          autoCompleteType="password"
          onChangeText={this.handleChange('password')}
        />
        <TouchableOpacity onPress={this._onSubmit}>
          <Text style={styles.btnText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => NavigationService.navigate(NAVIGATION_LOGIN_SCREEN)}>
          <Text style={styles.btnLogin}>Already have an account? Login</Text>
        </TouchableOpacity>
        <ProgressDialog
          visible={this.state.progressVisibile}
          title="Signing in"
          message="Please wait..."
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '80%',
    marginBottom: 10,
    borderRadius: 5,
  },
  btnText: {
    color: 'darkblue',
    fontSize: 20,
    marginTop: 5,
  },
  btnLogin: {
    color: 'blue',
    fontSize: 15,
    marginTop: 10,
  },
});
