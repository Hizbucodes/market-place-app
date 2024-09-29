import React from 'react'
import {createStackNavigator, Stack} from '@react-navigation/stack'
import CategoryScreen from '../Screens/CategoryScreen';
import HomeScreen from '../Screens/HomeScreen';
import ProductDetailsScreen from '../Screens/ProductDetailsScreen';

export default function HomeStackNavigation() {
    const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
        <Stack.Screen name='home' component={HomeScreen} options={{
            headerShown: false
        }}/>
        <Stack.Screen name='category' component={CategoryScreen} options={({route})=> ({title: route.params.category})}/>
          <Stack.Screen name='PRODUCT_DETAILS' component={ProductDetailsScreen} options={{
            headerTitle: 'Product',
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: '#6366f1'
              
            }
          }}/>
    </Stack.Navigator>
  )
}