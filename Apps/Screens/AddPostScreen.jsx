import { Feather } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { Timestamp, addDoc, collection, getDocs } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { db, storage } from '../../firebaseConfig';
import DisableKeyBoardHoc from '../components/DisableKeyBoardHoc';
import moment from 'moment/moment';

export default function AddPostScreen() {

  const[categoryList, setCategoryList] = useState([]);
  const[isLoading, setIsLoading] = useState(false);
  const [parentWidth, setParentWidth] = useState(0);
  const [image, setImage] = useState(null);


  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  useEffect(()=>{
    setCategoryList([])
    getCategoryList();
  }, []);
  
  const getCategoryList = async ()=> {
    
      const querySnapshot = await getDocs(collection(db, "Category"));
  querySnapshot.forEach((doc) => {
  
    setCategoryList(categoryList=>[...categoryList, doc.data()]);
    console.log(categoryList);

  });
  }

  const handleOnSubmit = async (value) => {
    
    setIsLoading(true);
    //convert the uri to blob file
    const resp = await fetch(image);
    const blob = await resp.blob();

    const storageRef = ref(storage, 'communityPost/'+Date.now() + ".jpg");

    uploadBytes(storageRef, blob).then((snapshot) => {
      
      console.log('Uploaded a blob or file!');
    }).then((res)=>{
      getDownloadURL(storageRef).then(async(downloadURL)=>{
        console.log(downloadURL);
        value.image = downloadURL


        const docRef = await addDoc(collection(db, 'UserPost'), value)
        if(docRef.id){
          setIsLoading(false);
          value.title = '';
          value.description = '';
          value.category = '';
          value.address = '';
          value.price = '';
          value.address = '';
          console.log('Document Added');
        }
      })
    });

  }
  
  
  return (
    <DisableKeyBoardHoc>
    <SafeAreaView className='p-12 mt-10'>
      <Text className="text-[27px] font-bold">Add New Post</Text>
      <Text className="text-[18px] text-gray-500 mb-7">Create New Post and Start Selling</Text>
      
      <Formik 

        initialValues={{title: '', description:'', category: '', address:'', price:'',image: '', createdAt: moment().format('MMMM Do YYYY, h:mm:ss a')}}
        onSubmit={value=> handleOnSubmit(value)}
      >
        {({handleSubmit, handleChange, handleReset, handleBlur, values, setFieldValue})=>(
            <ScrollView showsVerticalScrollIndicator={false} className='gap-y-8 mb-12'>

<TouchableOpacity className='flex min-w-[300px] flex-row items-center gap-x-5' onPress={pickImage} style={{width: parentWidth}}>
      <Image
        source={image ? {uri: image} : require('./../../assets/images/image (1).png')}
        style={{ width: 100, height: 100, borderRadius: 10 }}
        onLayout={(event) => {
          const { width } = event.nativeEvent.layout;
          setParentWidth(width);
        }}
      />
      <Feather name="arrow-left-circle" size={24} color="black" />
      <Text className='font-bold'>Choose Photo</Text>
    </TouchableOpacity>
              
              <TextInput placeholderTextColor='gray' placeholder='Title'
              value={values?.title} onChangeText={handleChange('title')} className="p-5 border-2 rounded-lg text-[18px] px-10 border-gray-400"/>

              <TextInput placeholderTextColor='gray' 
              numberOfLines={5} placeholder='Description'
              value={values?.description} onChangeText={handleChange('description')} className="p-5 border-2 rounded-lg text-[18px] px-10 border-gray-400"/>

<TextInput placeholderTextColor='gray' 
              placeholder='Price'
              keyboardType='numeric'
              value={values?.price} onChangeText={handleChange('price')} className="p-5 border-2 rounded-lg text-[18px] px-10 border-gray-400 "/>

              <View className='p-2 border-2 rounded-lg text-[18px] border-gray-400'>
              <Picker selectedValue={values?.category} onValueChange={itemValue=> setFieldValue('category', itemValue)}>
                
              
                {categoryList && categoryList.map((item, index)=>(
                  
                  <Picker.Item  label={item.name} value={item.name} key={index}/>
                ))}
                  
                 
              </Picker>
              </View>

              <TextInput placeholderTextColor='gray' placeholder='Address'
              value={values?.address} onChangeText={handleChange('address')} className="p-5 border-2 rounded-lg text-[18px] px-10 border-gray-400 "/>
              

              <View className='flex flex-row justify-around'>
{/*          
              <TouchableOpacity onPress={handleReset} className='bg-indigo-700  p-5 rounded-lg items-center'>
                <Text className='font-bold text-white text-lg'>Reset All Fields</Text>
              </TouchableOpacity> */}

              <TouchableOpacity disabled={isLoading} onPress={handleSubmit} style={{backgroundColor: isLoading ?'#d4d4d8' : '#818cf8'}} className='bg-indigo-400  p-5 rounded-lg items-center w-full'>
                {isLoading ? <ActivityIndicator size={'large'} color={'#818cf8'}/> :  <Text className='font-bold text-white text-lg'>Add Post</Text>}
               
              </TouchableOpacity>
              </View>
            </ScrollView>
        )}

      </Formik>
      
    </SafeAreaView>
    </DisableKeyBoardHoc>
  )
}