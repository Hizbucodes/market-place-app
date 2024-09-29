import { View, Text, ScrollView, TextInput, Image } from 'react-native'
import React, { useState } from 'react';
import { Formik } from 'formik';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {  signUp } from '../../firebaseService';

import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

export default function SignUpScreen() {
  
  const[passwordIsVisible, setPasswordIsVisible] = useState(false); 
  const[confirmPasswordIsVisible, setconfirmPasswordIsVisible] = useState(false); 
  const navigation = useNavigation();

  const validate = (values) => {
    const errors = {};

    if(!values.username){
      errors.username = 'This Field is Required';
    }
  
    if (!values.email) {
      errors.email = 'This Field is Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
  
  
  
    if(!values.password){
      errors.password = 'This Field is Required'
    }

    if(!values.confirmPassword){
      errors.confirmPassword = 'This Field is Required'
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = 'Passwords do not match';
    }


  
    return errors;
  };


  return (
    <ScrollView>
    <Image source={{uri: 'https://images.unsplash.com/photo-1632073591988-be930f98c0bf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}} className='w-screen h-[300px] absolute'/>
<View className='items-center mt-32'>
<View className='items-center'>

<View>
  <Text className='font-bold text-2xl text-white'>Market Link</Text>
</View>


<View className='pt-5 w-full'>
  <Text className='font-bold text-4xl text-white'>Shop Smart, Live Better.</Text>
</View>
</View>

<View className='mt-32'>
<View className='w-full mb-12'>
  <Text className='font-bold text-2xl capitalize'>Create your own account.</Text>
  <Text className=' pt-2 text-gray-500 capitalize'>Let's create an account for you.</Text>
</View>
<Formik 
initialValues={{username: '', email: '', password: '', confirmPassword: ''}}
onSubmit={async (values, { setSubmitting, setErrors }) => {
  try {
    await signUp(values.email, values.password);
    await addDoc(collection(db, "Users"), {
      username: values.username,
      email: values.email
    });
    
   navigation.navigate('SignIn')
  } catch (error) {
    setErrors({ email: error.message });
  } finally {
    setSubmitting(false);
  }

}}
validate={validate}
>
  {({handleChange, handleSubmit, values, errors})=>(
    <View className=''>

{errors.username ? <Text className='text-red-500'>{errors.username}</Text> : null}
<View className='min-w-[350px] mt-2 px-5 mb-8 border border-1 rounded-full justify-start flex flex-row items-center'>
  <Entypo name="user" size={24} color="gray" />
      <TextInput className='p-3 font-semibold w-[300px]' placeholder='Enter Username' value={values.username} onChangeText={handleChange('username')} placeholderTextColor={'gray'}/>
    </View>

    {errors.email ? <Text className='text-red-500'>{errors.email}</Text> : null}
    <View className='min-w-[350px] mt-2 mb-8 px-5 border border-1 rounded-full justify-start flex flex-row items-center'>
    
    <MaterialIcons name="email" size={24} color="gray" />
      <TextInput className='p-3 font-semibold w-[300px]' placeholder='Enter Email Address' value={values.email} onChangeText={handleChange('email')} placeholderTextColor={'gray'}/>
      
    </View>


    {errors.confirmPassword ? <Text className='text-red-500'>{errors.confirmPassword}</Text> : null}
    <View className='min-w-[350px] mt-2 px-5 mb-8 border border-1 rounded-full justify-between flex flex-row items-center'>

<View className='flex flex-row items-center'>
<Entypo name="lock" size={24} color="gray" />
<TextInput secureTextEntry={!passwordIsVisible} className='p-3 font-semibold w-[300px]' placeholder='Enter Password' value={values.password} onChangeText={handleChange('password')} placeholderTextColor={'gray'}/>
</View>

     <TouchableOpacity className=' p-2' onPress={()=>setPasswordIsVisible(!passwordIsVisible)}>
      {passwordIsVisible ?        <AntDesign name="eye" size={24} color="gray" />
    :  <Entypo name="eye-with-line" size={24} color="gray" />}
     </TouchableOpacity>


      
    </View>

{errors.confirmPassword ? <Text className='text-red-500'>{errors.confirmPassword}</Text> : null}
    <View className='min-w-[350px] mt-2 px-5 mb-8 border border-1 rounded-full justify-between flex flex-row items-center'>

<View className='flex flex-row items-center'>
<Entypo name="lock" size={24} color="gray" />
<TextInput secureTextEntry={!confirmPasswordIsVisible} className='p-3 font-semibold w-[300px]' placeholder='Enter Confirm Password' value={values.confirmPassword} onChangeText={handleChange('confirmPassword')} placeholderTextColor={'gray'}/>
</View>

     <TouchableOpacity className=' p-2' onPress={()=>setconfirmPasswordIsVisible(!confirmPasswordIsVisible)}>
      {confirmPasswordIsVisible ?        <AntDesign name="eye" size={24} color="gray" />
    :  <Entypo name="eye-with-line" size={24} color="gray" />}
     </TouchableOpacity>


      
    </View>

    <TouchableOpacity className=" bg-indigo-500 rounded-full p-4 items-center" onPress={handleSubmit}>
      <Text className="font-bold text-lg text-white ">Sign Up</Text>
  </TouchableOpacity>
    
    </View>
  )}

</Formik>
</View>

  <View className='flex flex-row gap-x-2 mt-12'>
    <Text className='font-bold'>Already have an account?</Text>
    <TouchableOpacity onPress={()=> navigation.goBack()}>
    <Text className='font-bold text-indigo-500'>Log in</Text>
    </TouchableOpacity>
  </View>

</View>

</ScrollView>
  )
}