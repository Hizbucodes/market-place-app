import React from 'react'
import { ActivityIndicator, FlatList, Text, View } from 'react-native'
import PostItem from '../PostItem'

export default function LatestItemList({latestItems, isLoading, title}) {
  
  return (
    <View className='mt-5'>
      <Text className='font-bold text-xl'>{title}</Text>
      {isLoading ? <ActivityIndicator style={{marginTop: '20px'}} size={'large'} color={'#4f46e5'}/> 
      :<FlatList
        data={latestItems}
       numColumns={2}
        renderItem={({item,index})=> (
          <PostItem item={item} index={index}/>

        )}  
      />}
    </View>
  )
}