import { View, Text, ScrollView, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react';
import {useRoute} from '@react-navigation/native';
import {collection, getDocs, query, where} from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import LatestItemList from '../components/HomeScreen/LatestItemList';


export default function CategoryScreen() {
    const {params} = useRoute();
    const[categoryItems, setCategoryItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(()=>{

      const getItems = async ()=>{
       
        setCategoryItems([]);
        setIsLoading(true);
        const q = query(collection(db, 'UserPost'), where('category', '==', params.category));

        const snapshot = await getDocs(q);
        setIsLoading(false);
        snapshot.forEach((doc)=>{

          console.log(doc.data());
          setCategoryItems(categoryItem=> [...categoryItem, doc.data()]);
          setIsLoading(false)
        })
      }

      getItems();

    }, [params?.category]);


  return (
    <ScrollView contentContainerStyle={{display: 'flex',height: '100%',backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', }}>
      {isLoading ?  <ActivityIndicator size={'large'} color={'#4f46e5'}/> :
     categoryItems.length>0 ?  <LatestItemList latestItems={categoryItems} title={''}/> :
     <View className='w-full h-screen items-center justify-center gap-y-12'>

      <Image style={{width: 200, height: 200, borderRadius: 20}} source={require('../../assets/images/3304446.jpg')}/>
       <Text className='font-bold text-lg text-gray-400'>No AD POSTED FOR THIS ({params.category}) CATEGORY</Text>
       </View>}
    </ScrollView>
  )
}