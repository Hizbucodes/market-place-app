import { useNavigation, useRoute } from '@react-navigation/native'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

export default function OnBordingScreen() {
  const navigation = useNavigation();
  return (
    <View className='flex-1 bg-white'>
    <View className="p-5">
    <Image source={require('./../../assets/images/ikman.png')} className="w-full h-[500] mt-5"/>
    </View>

    <View className="w-[400] items-center mx-auto mt-10 px-2 ">
        <Text className="text-3xl font-bold">Welcome to MarketLink</Text>
        <Text className="text-center pt-2 text-[18px] text-slate-500">Your One-Stop Shop for Everything You Need - Buy, Sell, and Earn with Ease! Discover Amazing Deals, List Your Products, and Make Money, All in One Place.</Text>
        <TouchableOpacity className="w-full bg-indigo-500 rounded-full mt-20 p-5 items-center" onPress={()=> navigation.navigate('signIn')}>
            <Text className="font-bold text-lg text-white ">Get Started</Text>
        </TouchableOpacity>
    </View>
        
    </View>
  )
}