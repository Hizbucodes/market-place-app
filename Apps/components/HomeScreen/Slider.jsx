import { View, Text, FlatList, Image } from 'react-native';
import React, { useEffect, useState } from 'react';

export default function Slider({sliderList}) {

  return (
    <View className='mt-5'>
      <FlatList
     
        data={sliderList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        
        renderItem={({item,index})=>(
           <View>
             <Image key={index} className='w-[330px] h-[200px] mr-3 rounded-lg object-cover' source={{uri: item?.image}}/>
           </View>
        )}
      />
    </View>
  )
}