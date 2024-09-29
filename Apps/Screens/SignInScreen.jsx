import { View, Text, ScrollView, TextInput, Image } from "react-native";
import React, { useState } from "react";
import { Formik } from "formik";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { loginUser } from "../../firebaseService";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function SignInScreen() {
  const [isVisible, setIsVisible] = useState(false);
  const navigation = useNavigation();

  const handleSignIn = async (values, { setSubmitting, setErrors }) => {
    console.log("0) Sign in Button Clicked");

    try {
      await loginUser(values.email, values.password);
      navigation.navigate("Main");
      const q = query(
        collection(db, "Users"),
        where("email", "==", values.email)
      );

      console.log("1) Sign in Button Clicked");

      const querySnapshot = await getDocs(q);
      let userName;
      querySnapshot.forEach((doc) => {
        userName = doc.data().username;
      });
    } catch (error) {
      console.log("2) Sign in Button Clicked");
      setErrors({ email: error.message }); // Handle Firebase errors
    } finally {
      console.log("3) Sign in Button Clicked");
      setSubmitting(false);
    }
  };

  return (
    <ScrollView>
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1626553683558-dd8dc97e40a4?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        }}
        className="w-screen h-[300px] absolute"
      />
      <View className="items-center mt-32">
        <View className="items-center">
          <View>
            <Text className="font-bold text-2xl text-white">Market Link</Text>
          </View>

          <View className="pt-5 w-full">
            <Text className="font-bold text-4xl text-white">
              Shop Smart, Live Better.
            </Text>
          </View>
        </View>

        <View className="mt-32">
          <View className="w-full mb-12">
            <Text className="font-bold text-2xl capitalize">
              sign in to your account.
            </Text>
            <Text className=" pt-2 text-gray-500 capitalize">
              Let's sign in to you account and get started.
            </Text>
          </View>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={handleSignIn}
          >
            {({ handleChange, handleSubmit, values }) => (
              <View className=" gap-y-8">
                <View className="min-w-[350px] px-5 border border-1 rounded-full justify-start flex flex-row items-center">
                  <MaterialIcons name="email" size={24} color="gray" />
                  <TextInput
                    className="p-3 font-semibold w-[300px]"
                    placeholder="Your Email Address"
                    value={values.email}
                    onChangeText={handleChange("email")}
                    placeholderTextColor={"gray"}
                  />
                </View>

                <View className="min-w-[350px] px-5 border border-1 rounded-full justify-between flex flex-row items-center">
                  <View className="flex flex-row items-center">
                    <Entypo name="lock" size={24} color="gray" />
                    <TextInput
                      secureTextEntry={!isVisible}
                      className="p-3 font-semibold w-[300px]"
                      placeholder="Your Password"
                      value={values.password}
                      onChangeText={handleChange("password")}
                      placeholderTextColor={"gray"}
                    />
                  </View>

                  <TouchableOpacity
                    className=" p-2"
                    onPress={() => setIsVisible(!isVisible)}
                  >
                    {isVisible ? (
                      <AntDesign name="eye" size={24} color="gray" />
                    ) : (
                      <Entypo name="eye-with-line" size={24} color="gray" />
                    )}
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  className=" bg-indigo-500 rounded-full p-4 items-center"
                  onPress={handleSubmit}
                >
                  <Text className="font-bold text-lg text-white ">Sign In</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </View>

        <View className="flex flex-row gap-x-2 mt-12">
          <Text className="font-bold">Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("sign-up")}>
            <Text className="font-bold text-indigo-500">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
