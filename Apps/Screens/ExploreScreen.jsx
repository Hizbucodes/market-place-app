import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { db } from '../../firebaseConfig';
import LatestItemList from '../components/HomeScreen/LatestItemList';


export default function ExploreScreen({navigation}) {
  const[ads, setAds] = useState([]);
  const[isLoading,setIsLoading] = useState(false);

 
    const fetchAdsFromServer = async () => {
      setIsLoading(true);
      setAds([]);
      const snapshot = await getDocs(collection(db,'UserPost'));
      snapshot.forEach((doc)=>{
        console.log(doc.data());
        setAds(ads=> [...ads, doc.data()]);
        setIsLoading(false);
      });
    }

   useEffect(()=>{
    navigation.addListener('focus', (e)=>{
      fetchAdsFromServer();
    });
   }, [navigation]);

  return (
 
    <ScrollView className='bg-white px-5'>
      <View className=' mt-12'>
      <Text className='font-bold text-3xl'>Explore More</Text>
      </View>

      <View>
        {isLoading ? <ActivityIndicator className='mt-80' size={'large'} color={'#4f46e5'}/> : <LatestItemList latestItems={ads}/>}
      </View>
    </ScrollView>

  )
}