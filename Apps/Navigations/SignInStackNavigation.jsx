import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import SignInScreen from '../Screens/SignInScreen';
import SignUpScreen from '../Screens/SignUpScreen';

export default function SignInStackNavigation() {
    const Stack = createStackNavigator();

  return (
   <Stack.Navigator>
    <Stack.Screen name='SignIn' component={SignInScreen} options={{headerShown: false}}/>
    <Stack.Screen name='sign-up' component={SignUpScreen} options={{headerShown: false}}/>
   </Stack.Navigator>
  )
};