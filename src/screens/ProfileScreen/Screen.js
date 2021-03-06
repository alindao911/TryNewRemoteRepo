/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, SafeAreaView, TouchableOpacity, View} from 'react-native';
import firebase from 'firebase';
import NavigationService from '../../navigation/NavigationService';
import {PUBLIC_ROUTE} from '../../navigation/routes';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile',
  };

  _logOut = async () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        NavigationService.navigate(PUBLIC_ROUTE);
      });
  };

  render() {
    const {user} = this.props;
    console.log(user);
    return (
      <SafeAreaView style={{marginHorizontal: 5}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <View
            style={{
              width: '40%',
              alignItems: 'center',
              padding: 10,
              marginVertical: 10,
            }}>
            <Icon name="star" size={50} color="blue" />
          </View>
          <View style={{width: '60%', alignItems: 'center', padding: 10}}>
            <Text style={{fontSize: 20}}>{user.fullname}</Text>
            <Text style={{fontSize: 14}}>{user.email}</Text>
          </View>
        </View>
        <View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: 'grey',
              marginHorizontal: 10,
              marginTop: 10,
            }}>
            Bio
          </Text>
        </View>
        <View>
          <Text
            style={{
              backgroundColor: '#fff',
              padding: 12,
              borderRadius: 20,
              marginHorizontal: 12,
              marginVertical: 10,
            }}>
            {user.bio}
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: 'grey',
              marginHorizontal: 10,
              marginTop: 10,
            }}>
            Account Settings
          </Text>
        </View>
        <View>
          <TouchableOpacity>
            <Text
              style={{
                backgroundColor: '#fff',
                padding: 10,
                borderRadius: 20,
                marginHorizontal: 12,
                marginBottom: 10,
                marginTop: 15,
                textAlign: 'center',
                fontSize: 16,
                width: '80%',
                alignSelf: 'center',
              }}>
              Delete Account
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this._logOut()}>
            <Text
              style={{
                backgroundColor: '#fff',
                padding: 10,
                borderRadius: 20,
                marginHorizontal: 12,
                textAlign: 'center',
                fontSize: 16,
                width: '80%',
                alignSelf: 'center',
              }}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
