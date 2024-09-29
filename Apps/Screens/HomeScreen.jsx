import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import DisableKeyboardHoc from '../components/DisableKeyBoardHoc';
import Header from '../components/HomeScreen/Header';
import Slider from '../components/HomeScreen/Slider';

import { collection, getDocs, orderBy } from "firebase/firestore";
import { db } from '../../firebaseConfig';
import Categories from '../components/HomeScreen/Categories';
import LatestItemScreen from '../components/HomeScreen/LatestItemList';
import { useRoute } from '@react-navigation/native';



export default function HomeScreen({navigation}) {
  const[sliderList, setSliderList] = useState([]);
  const[categoryList, setCategoryList] = useState([]);
  const[latestItems, setLatestItems] = useState([]);
  const[isLoading, setIsLoading] = useState(false);
  // const[userName, setUserName] = useState('');

  const {userName} = useRoute();
  
  useEffect(()=>{
      getSliderImages();
      getCategoryList();
  },[])

  // useEffect(()=>{
  //   if(params?.userName){
  //     setUserName(params.userName);
  //   }
  // },[params?.userName]);
  
      
    const getSliderImages = async () => {
      setSliderList([]);
      const querySnapshot = await getDocs(collection(db, "HomeScreenSlider"));
  querySnapshot.forEach((doc) => {
    
    setSliderList(list=> [...list, doc.data()]);
  });
    }

    const getCategoryList = async ()=> {
    setCategoryList([]);
      const querySnapshot = await getDocs(collection(db, "Category"));
  querySnapshot.forEach((doc) => {
  
    setCategoryList(categoryList=>[...categoryList, doc.data()]);
    console.log(categoryList);

  });
  };

  useEffect(()=>{
    navigation.addListener('focus', (e)=>{
      getAllLatestItemsFromUserPost();
    });
   }, [navigation]);

  const getAllLatestItemsFromUserPost = async () => {
    setLatestItems([]);
    setIsLoading(true);
      const querySnapshot = await getDocs(collection(db, 'UserPost'),orderBy('createdAt', 'desc'))
      querySnapshot.forEach((doc)=>{
        setLatestItems((latestItem)=> [...latestItem, doc.data()])
        setIsLoading(false);
      });
  };

  

  return (
    
    <DisableKeyboardHoc>
    <ScrollView className='p-8 bg-white flex-1'>
      <Header userName={userName}/>
      <Slider sliderList={sliderList}/>
      <Categories categoryList={categoryList}/>
      <LatestItemScreen latestItems={latestItems} isLoading={isLoading} title={'Latest ads'}/>
    </ScrollView>
    </DisableKeyboardHoc>
  
  )
}