import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function PostItem({item, index}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={()=> navigation.navigate('PRODUCT_DETAILS',{product: item})} key={index} className='w-auto min-w-[200px] m-2 items-center bg-gray-300 rounded-xl p-2 mb-12'>
    <Image source={{uri: item.image}} className='w-full h-[150px] rounded-lg object-cover'/>

    <View className='w-full'>
      <Text className='font-bold text-lg'>{item.title}</Text>
      </View>

      <View className='w-full mt-2'>
      <Text className='font-bold'>Rs {item.price}</Text>
    </View>

    <View>
      {/* <Text>{item.createdAt}</Text> */}
    </View>

    <View className='bg-[#4f46e5] p-2 px-5 rounded-full absolute right-0 -top-2 border-yellow-400 border-2'>
      <Text className='text-white font-bold'>{item.category}</Text>
      </View>

  </TouchableOpacity>
  )
}