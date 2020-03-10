/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  View,
} from 'react-native';
import firebase from 'firebase';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NavigationService from '../../navigation/NavigationService';
import {NAVIGATION_NEW_CHAT_SCREEN} from '../../navigation/routes';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      latestMessages: [],
      dbRef: firebase
        .database()
        .ref(`latest-messages/${firebase.auth().currentUser.uid}`)
        .orderByPriority(),
    };
  }

  componentDidMount() {
    this.state.dbRef.on('child_added', val => {
      let person = val.val();

      this.setState(prevState => {
        return {
          latestMessages: [...prevState.latestMessages, person],
        };
      });
    });

    const uid = firebase.auth().currentUser.uid;
    const userRef = firebase.database().ref(`/users/${uid}`);
    let user = '';
    userRef.on('value', function(snapshot) {
      user = snapshot.val();
    });
    this.props.setUser(user);
  }

  componentWillUnmount() {
    this.state.dbRef.off();
  }

  renderRow = ({item}) => {
    let latestMessage = '';
    let chatPartnerId = '';
    let chatPartner = '';

    for (var key in item) {
      latestMessage = item[key];
    }

    if (latestMessage.fromId === firebase.auth().currentUser.uid) {
      chatPartnerId = latestMessage.toId;
    } else {
      chatPartnerId = latestMessage.fromId;
    }

    firebase
      .database()
      .ref(`/users/${chatPartnerId}`)
      .on('value', value => {
        chatPartner = value.val();
      });

    return (
      <TouchableOpacity
        key={chatPartner.uid}
        style={{padding: 10, borderBottomColor: '#ccc', borderBottomWidth: 1}}
        onPress={() => this.props.navigation.navigate('Chat', chatPartner)}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>
          {chatPartner.fullname}
        </Text>
        <Text style={{marginHorizontal: 15, marginTop: 5}}>
          {latestMessage.message}
        </Text>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <SafeAreaView>
        <FlatList
          data={this.state.latestMessages}
          renderItem={this.renderRow}
          keyExtractor={item => item.phone}
          ListHeaderComponent={() => (
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={{
                  fontSize: 30,
                  marginVertical: 10,
                  marginLeft: 10,
                  fontWeight: 'bold',
                }}>
                Chats
              </Text>
              <TouchableOpacity
                onPress={() =>
                  NavigationService.navigate(NAVIGATION_NEW_CHAT_SCREEN)
                }
                style={{alignSelf: 'center', paddingHorizontal: 10}}>
                <Icon name="message" size={30} />
              </TouchableOpacity>
            </View>
          )}
        />
      </SafeAreaView>
    );
  }
}
