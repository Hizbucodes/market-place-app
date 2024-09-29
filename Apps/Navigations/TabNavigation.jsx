import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import AddPostScreen from '../Screens/AddPostScreen';
import { Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import HomeStackNavigation from './HomeStackNavigation';
import ExploreStackNavigation from './ExploreStackNavigation';
import ProfileStackNavigation from './ProfileStackNavigation';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false, tabBarActiveTintColor: '#4f46e5',tabBarInactiveTintColor:'#9ca3af',tabBarHideOnKeyboard: true, tabBarStyle: {height: 60}}}>
        <Tab.Screen name='Home' component={HomeStackNavigation} options={{
          tabBarLabel:({color})=>(
            <Text style={{color:color, fontSize: 12, marginBottom: 3, fontWeight: 'bold'}}>Home</Text>
          ),
          tabBarIcon: ({color, size})=>(
            <Ionicons name="home" size={size} color={color}/>
          )
        }}/>

        <Tab.Screen name='Explore' component={ExploreStackNavigation} options={{
          tabBarLabel:({color})=>(
            <Text style={{color:color, fontSize: 12, marginBottom: 3,fontWeight: 'bold'}}>Explore</Text>
          ),
          tabBarIcon: ({color, size})=>(
            <MaterialIcons name="travel-explore" size={size} color={color} />
          )
        }}/>

        <Tab.Screen name='Add Post' component={AddPostScreen} options={{
          tabBarLabel:({color})=>(
            <Text style={{color:color, fontSize: 12, marginBottom: 3,fontWeight: 'bold'}}>Add Post</Text>
          ),
          tabBarIcon: ({color, size})=>(
            <FontAwesome6 name="add" size={size} color={color} />
          )
        }}/>

        <Tab.Screen name='Profile' component={ProfileStackNavigation} options={{
          
          tabBarLabel:({color})=>(
            <Text style={{color:color, fontSize: 12, marginBottom: 3,fontWeight: 'bold'}}>Profile</Text>
          ),
          tabBarIcon: ({color, size})=>(
            <AntDesign name="user" size={size} color={color} />
          )
        }}/>
    </Tab.Navigator>
  )
}