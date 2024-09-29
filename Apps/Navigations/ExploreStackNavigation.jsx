import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ExploreScreen from '../Screens/ExploreScreen';
import ProductDetailsScreen from '../Screens/ProductDetailsScreen';

export default function ExploreStackNavigation() {
    const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
        <Stack.Screen name='explore-more' component={ExploreScreen} options={{headerShown: false}}/>
        <Stack.Screen name='PRODUCT_DETAILS' component={ProductDetailsScreen} options={{headerStyle: {backgroundColor: '#6366f1'}, headerTintColor: 'white', headerTitle: 'Product'}}/>
    </Stack.Navigator>
  )
}