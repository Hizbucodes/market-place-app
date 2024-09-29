import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Linking, ScrollView, Share, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function ProductDetailsScreen({navigation}) {
  const {params} = useRoute();
  const[product, setProduct] = useState([]);

  useEffect(()=>{
    setProduct(params.product);
   console.log(product.title);
    handleShareProductOnOtherPlatforms();
  },[params, navigation]);

  const handleEmailMessage = () =>{
    Linking.openURL('mailto:'+ 'qwerty@gmail.com')
  };

  const shareProduct = async () => {
    try {
      const result = await Share.share({
        message: `Product Item: ${product?.title}`,
       
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
    
        } else {

        }
      } else if (result.action === Share.dismissedAction) {

      }
    } catch (error) {
      Alert.alert(error.message);
    }
    
  };

  const handleShareProductOnOtherPlatforms = () => {
      navigation.setOptions({
        headerRight: () => (
          <FontAwesome onPress={shareProduct} name="share-square-o" size={32} color="white" style={{marginRight: 30}}/>
        )
      })
  };

  return (
    <ScrollView className='pt-2 px-2 min-h-full bg-white' showsVerticalScrollIndicator={false}>
    <View className='w-full h-[400px] bg-gray-400 rounded-xl p-2'>
    <Image source={{uri: product.image}} className='w-[100%] h-[100%] object-cover rounded-xl'/>
    </View>

    <View className='p-3 '>
      <Text className='font-bold text-2xl'>{product.title}</Text>
      <Text className='font-semibold text-gray-500 mb-2'>{product.createdAt}</Text>

      <View className='bg-[#4f46e5] py-1 items-center rounded-full  border-yellow-400 border-2 max-w-[110px]'>
      <Text className='text-white font-bold'>{product.category}</Text>
      </View>      
    </View>

    <View className='p-3 gap-y-2'>
      <Text className='font-bold text-xl'>Description</Text>
      <Text className='font-semibold text-gray-500'>{product.description}</Text>
    </View>



    <View className='flex flex-row mt-5 items-center bg-indigo-100 p-2 px-8'>

        <Image source={{uri: 'https://cdn-icons-png.flaticon.com/128/149/149071.png'}} width={50} height={50} />
  

        <View className='ml-5'>
            <Text className='font-bold text-gray-500'>Welcome,</Text>
            <Text className='font-bold  text-xl tracking-wider'>Hizbullah</Text>
        </View>
    </View>

    <TouchableOpacity className='bg-indigo-500 p-5 rounded-full items-center m-[30px]' onPress={handleEmailMessage}>
      <Text className='text-white font-bold text-lg'>Send Message Via Email</Text>
    </TouchableOpacity>




    </ScrollView>
  )
}