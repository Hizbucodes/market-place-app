import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';

export default function  ({categoryList}) {
 const navigation = useNavigation();

  return (
    <View className='mt-5'>
      <Text className='font-bold text-xl'>Categories</Text>
      <FlatList
        data={categoryList}
        numColumns={2}
        
        renderItem={({item, index})=>(
          <TouchableOpacity onPress={()=> navigation.navigate('category',{category: item.name})} key={index} className='border-2 bg-indigo-50 border-indigo-300 p-4 m-2 rounded-lg items-center w-[200px]'>
            <Image className='w-[30px] h-[30px]' source={{uri: item?.icon}}/>
            <Text className='font-bold pt-2'>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}