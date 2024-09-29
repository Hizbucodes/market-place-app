import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, TextInput, View } from 'react-native';

export default function Header({userName}) {

  return (
    
    <View>
    <View className='flex flex-row gap-x-5 mt-5 items-center'>
        <Image source={{uri: 'https://cdn-icons-png.flaticon.com/128/149/149071.png'}} width={50} height={50}/>

        <View>
            <Text className='font-bold text-gray-500'>Welcome,</Text>
            <Text className='font-bold  text-xl tracking-wider'>{userName || 'user'}</Text>
        </View>
    </View>

    <View className='p-2 rounded-full border mt-8 bg-white flex flex-row items-center'>
    <AntDesign name="search1" size={24} color="black" />
            <TextInput onChangeText={(event)=> console.log(event)} placeholder='Search' className='ml-2 font-bold w-full'/>
    </View>
    </View>
   
  )
}