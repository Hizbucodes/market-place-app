import { View, Text, ScrollView, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {

  const navigation = useNavigation();

  const[listItems, setListItem] = useState([
    {
      id: 1,
      title: 'My Products',
      image: 'https://cdn-icons-png.freepik.com/256/13499/13499294.png?ga=GA1.1.25224160.1712083754&semt=ais_hybrid',
      redirect: 'my-product'
     
    },
    {
      id: 2,
      title: 'Explore More',
      image: 'https://cdn-icons-png.freepik.com/256/9744/9744463.png?ga=GA1.1.25224160.1712083754&semt=ais_hybrid',
      redirect: 'Explore',
    },
    {
      id: 3,
      title: 'Logout',
      image: 'https://cdn-icons-png.freepik.com/256/10027/10027617.png?ga=GA1.1.25224160.1712083754&semt=ais_hybrid',
    },
 
  ]);

  return (
    <ScrollView className='px-5 flex-1 bg-white'>
      <View className='mt-12'>
      <Text className='font-bold text-3xl capitalize'>my profile</Text>
      </View>

      <View className='bg-indigo-500 p-2 w-[150px] h-[150px] rounded-full mx-auto mt-12 items-center'>
      <Image source={{uri: 'https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?w=740&t=st=1720785302~exp=1720785902~hmac=6525f6742d2e43406fb1541cf6ed8cf3c8f55aded1986bdcbfec65f8e16df18e'}} width={'100%'} height={'100%'} className='rounded-full'/>
      </View>
  <View className=' items-center mt-2'>
  <Text className='font-bold text-lg'>Hizbullah</Text>
  <Text className='text-lg text-gray-400 font-bold'>Hizbullah@gmail.com</Text>
  </View>
     

      <View className=' flex items-center mt-20'>
        <FlatList
          numColumns={3}
          data={listItems}
          renderItem={({item})=>(
              <TouchableOpacity key={item.id} className=' items-center mx-10 gap-y-4' onPress={()=> navigation.navigate(`${item.redirect}`)}>
                <Image source={{uri: item.image}} width={50} height={50}/>
                <Text className='font-bold'>{item.title}</Text>
              </TouchableOpacity>
          )}
        />
      </View>
    </ScrollView>
  )
}