import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {
  AuthLoadingScreen,
  ChatScreen,
  HomeScreen,
  LoginScreen,
  ProfileScreen,
  RegisterScreen,
  NewChatScreen,
} from '../screens';

import {
  PUBLIC_ROUTE,
  PRIVATE_ROUTE,
  CHECK_AUT_ROUTE,
  NAVIGATION_BOTTOM_CHATS,
  NAVIGATION_BOTTOM_PROFILE,
  NAVIGATION_CHAT_SCREEN,
  NAVIGATION_HOME_SCREEN,
  NAVIGATION_PROFILE_SCREEN,
  NAVIGATION_LOGIN_SCREEN,
  NAVIGATION_REGISTER_SCREEN,
  NAVIGATION_NEW_CHAT_SCREEN,
} from './routes';

export const defaultHeader = {
  headerStyle: {
    backgroundColor: 'skyblue',
  },
  headerTitleStyle: {
    fontFamily: 'sans-serif',
    color: '#fff',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: 'bold',
  },
  headerBackTitle: null,
  headerTintColor: 'white',
};

const HomeStack = createStackNavigator(
  {
    [NAVIGATION_HOME_SCREEN]: HomeScreen,
    [NAVIGATION_CHAT_SCREEN]: ChatScreen,
    [NAVIGATION_NEW_CHAT_SCREEN]: NewChatScreen,
  },
  {
    defaultNavigationOptions: defaultHeader,
  },
);

HomeStack.navigationOptions = ({navigation}) => {
  let tabBarVisible = navigation.state.index === 0;

  return {
    tabBarVisible,
  };
};

const ProfileStack = createStackNavigator(
  {
    [NAVIGATION_PROFILE_SCREEN]: ProfileScreen,
  },
  {
    defaultNavigationOptions: defaultHeader,
  },
);

const AuthStack = createStackNavigator(
  {
    [NAVIGATION_LOGIN_SCREEN]: LoginScreen,
    [NAVIGATION_REGISTER_SCREEN]: RegisterScreen,
  },
  {
    initialRouteName: NAVIGATION_REGISTER_SCREEN,
  },
);

const TabNavigator = createBottomTabNavigator(
  {
    [NAVIGATION_BOTTOM_CHATS]: HomeStack,
    [NAVIGATION_BOTTOM_PROFILE]: ProfileStack,
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let iconName;
        if (routeName === NAVIGATION_BOTTOM_CHATS) {
          iconName = 'home';
        } else if (routeName === NAVIGATION_BOTTOM_PROFILE) {
          iconName = 'user-alt';
        }

        return <Icon name={iconName} size={20} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'skyblue',
      inactiveTintColor: 'grey',
    },
  },
);

const Navigator = createSwitchNavigator(
  {
    [CHECK_AUT_ROUTE]: AuthLoadingScreen,
    [PRIVATE_ROUTE]: TabNavigator,
    [PUBLIC_ROUTE]: AuthStack,
  },
  {
    initialRouteName: CHECK_AUT_ROUTE,
  },
);

export default createAppContainer(Navigator);
