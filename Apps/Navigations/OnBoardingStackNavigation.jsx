import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import OnBordingScreen from "../Screens/OnBoardingScreen";
import SignInStackNavigation from "./SignInStackNavigation";

export default function OnBoardingStackNavigation() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="onboarding"
        component={OnBordingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="signIn"
        component={SignInStackNavigation}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
