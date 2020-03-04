/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, FlatList, Dimensions, TouchableOpacity} from 'react-native';
import firebase from 'firebase';
import NavigationService from '../../navigation/NavigationService';

export default class NewChatScreen extends React.Component {
  static navigationOptions = {
    title: 'Select User',
  };

  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    firebase
      .database()
      .ref('/users')
      .on('child_added', value => {
        if (value.val().uid !== firebase.auth().currentUser.uid) {
          this.setState(prevState => {
            return {
              users: [...prevState.users, value.val()],
            };
          });
        }
      });
  }

  renderRow = ({item}) => {
    return (
      <TouchableOpacity
        style={{padding: 10, borderBottomColor: '#ccc', borderBottomWidth: 1}}
        onPress={() => NavigationService.navigate('Chat', item)}>
        <Text style={{fontSize: 20}}>{item.fullname}</Text>
      </TouchableOpacity>
    );
  };

  render() {
    let {height} = Dimensions.get('window');
    return (
      <View>
        <FlatList
          style={{padding: 5, paddingHorizontal: 5, height}}
          data={this.state.users}
          renderItem={this.renderRow}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}
