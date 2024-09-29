import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import MyProductScreen from '../Screens/MyProductScreen';
import ProfileScreen from '../Screens/ProfileScreen';

export default function ProfileStackNavigation({navigation,route}) {
    const Stack = createStackNavigator();

    React.useLayoutEffect(() => {
      const routeName = getFocusedRouteNameFromRoute(route);
      if (routeName === "my-product"){
        navigation.setOptions({tabBarStyle: {display: 'none'}});
      } else {
      navigation.setOptions({tabBarStyle: {display: 'flex'}});
     }
  }, [navigation, route]);

  return (
    <Stack.Navigator>
        <Stack.Screen name='Profile' component={ProfileScreen} options={{headerShown: false}}/>
        <Stack.Screen name='my-product' component={MyProductScreen} options={{headerTitle: 'My Product', headerStyle: {backgroundColor: '#6366f1'}, headerTintColor:'white'}}/>
        
    </Stack.Navigator>
  )
}