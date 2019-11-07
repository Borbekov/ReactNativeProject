import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import LoginScreen from '../src/screens/SigninScreens/LoginScreen';
import SignupNameScreen from '../src/screens/SigninScreens/SignupNameScreen';
import SignupEmailAndPasswordScreen from '../src/screens/SigninScreens/SignupEmailAndPasswordScreen';

const LoginStack = createStackNavigator({
  Login: { screen: LoginScreen },
  SignupName: { screen: SignupNameScreen },
  SignupEmailAndPassword: { screen: SignupEmailAndPasswordScreen},
});

export default createAppContainer(createSwitchNavigator({
  Login: LoginStack,
  Main: MainTabNavigator,
}));
