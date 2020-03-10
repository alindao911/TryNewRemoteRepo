/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Keyboard,
  View,
  FlatList,
  Animated,
  Platform,
} from 'react-native';
import styles from '../../constants/styles';
import firebase from 'firebase';
import Icon from 'react-native-vector-icons/FontAwesome';

const isIOS = Platform.OS === 'ios';

export default class ChatScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('fullname'),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      person: {
        name: props.navigation.getParam('name'),
        uid: props.navigation.getParam('uid'),
      },
      textMessage: '',
      messageList: [],
      userMessagesRef: firebase.database().ref('user-messages'),
      latestMessagesRef: firebase.database().ref('latest-messages'),
    };
    this.keyboardHeight = new Animated.Value(0);
    this.bottomPadding = new Animated.Value(60);
  }

  componentDidMount() {
    this.keyboardShowListener = Keyboard.addListener(
      isIOS ? 'keyboardWillShow' : 'keyboardDidShow',
      e => this.keyboardEvent(e, true),
    );
    this.keyboardHideListener = Keyboard.addListener(
      isIOS ? 'keyboardWillHide' : 'keyboardDidHide',
      e => this.keyboardEvent(e, false),
    );
    const fromId = firebase.auth().currentUser.uid;
    const toId = this.state.person.uid;
    this.state.userMessagesRef
      .child(fromId)
      .child(toId)
      .on('child_added', value => {
        this.setState(prevState => {
          return {
            messageList: [...prevState.messageList, value.val()],
          };
        });
      });
  }

  componentWillUnmount() {
    this.state.userMessagesRef.off();
    this.state.latestMessagesRef.off();
    this.keyboardShowListener.remove();
    this.keyboardHideListener.remove();
  }

  keyboardEvent = (event, isShow) => {
    let heightOS = isIOS ? 60 : 80;
    let bottomOS = isIOS ? 120 : 140;
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: event.duration,
        toValue: isShow ? heightOS : 0,
      }),
      Animated.timing(this.bottomPadding, {
        duration: event.duration,
        toValue: isShow ? bottomOS : 60,
      }),
    ]).start();
  };

  handleChange = key => val => {
    this.setState({[key]: val});
  };

  convertTime = time => {
    let d = new Date(time);
    let c = new Date();
    let result = (d.getHours() < 10 ? '0' : '') + d.getHours() + ':';
    result += (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
    if (c.getDay() !== d.getDay()) {
      result = d.getDay() + ' ' + d.getMonth() + ' ' + result;
    }
    return result;
  };

  sendMessage = async () => {
    if (this.state.textMessage.length > 0) {
      const fromId = firebase.auth().currentUser.uid;
      const toId = this.state.person.uid;

      let messageFromRef = this.state.userMessagesRef
        .child(fromId)
        .child(toId)
        .push();
      let messageToRef = this.state.userMessagesRef
        .child(toId)
        .child(fromId)
        .push();
      let latestMessageFromRef = this.state.latestMessagesRef
        .child(fromId)
        .child(toId)
        .push();
      let latestMessageToRef = this.state.latestMessagesRef
        .child(toId)
        .child(fromId)
        .push();

      let message = {
        message: this.state.textMessage,
        time: firebase.database.ServerValue.TIMESTAMP,
        fromId: fromId,
        toId: toId,
        id: (await messageFromRef).key,
      };

      (await messageFromRef).set(message);
      (await messageToRef).set(message);
      (await latestMessageFromRef).set(message);
      (await latestMessageToRef).set(message);
      this.setState({textMessage: ''});
    }
  };

  renderRow = ({item}) => {
    const fromId = firebase.auth().currentUser.uid;
    return (
      <View
        style={{
          flexDirection: 'row',
          maxWidth: '60%',
          alignSelf: item.fromId === fromId ? 'flex-end' : 'flex-start',
          backgroundColor: item.fromId === fromId ? '#00897b' : '#7cb342',
          borderRadius: 5,
          marginBottom: 10,
        }}>
        <Text style={{color: '#fff', padding: 7, fontSize: 16}}>
          {item.message}
        </Text>
        <Text style={{color: '#eee', padding: 3, fontSize: 12}}>
          {this.convertTime(item.time)}
        </Text>
      </View>
    );
  };

  render() {
    let {height} = Dimensions.get('window');
    return (
      <KeyboardAvoidingView behavior="height" style={{flex: 1}}>
        <Animated.View
          style={[styles.bottomBar, {bottom: this.keyboardHeight}]}>
          <TextInput
            style={styles.inputMessage}
            value={this.state.textMessage}
            placeholder="Type message..."
            onChangeText={this.handleChange('textMessage')}
          />
          <TouchableOpacity
            onPress={this.sendMessage}
            style={{paddingBottom: 10, marginLeft: 15}}>
            <Icon name="paper-plane" size={30} color="skyblue" />
          </TouchableOpacity>
        </Animated.View>
        <FlatList
          ref={ref => (this.flatList = ref)}
          onContentSizeChange={() =>
            this.flatList.scrollToEnd({animated: true})
          }
          onLayout={() => this.flatList.scrollToEnd({animated: true})}
          style={{padding: 5, paddingHorizontal: 5, height}}
          data={this.state.messageList}
          renderItem={this.renderRow}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={
            <Animated.View style={{height: this.bottomPadding}} />
          }
        />
      </KeyboardAvoidingView>
    );
  }
}
