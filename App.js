import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Text } from "react-native";
import TabNavigation from "./Apps/Navigations/TabNavigation";

import { createStackNavigator } from "@react-navigation/stack";
import SignInStackNavigation from "./Apps/Navigations/SignInStackNavigation";
import { auth, onAuthStateChanged } from "./firebaseConfig";
import OnBoardingScreen from "./Apps/Screens/OnBoardingScreen";
import OnBoardingStackNavigation from "./Apps/Navigations/OnBoardingStackNavigation";

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="onboard"
          component={OnBoardingStackNavigation}
          options={{ headerShown: false }}
        />
        {user ? (
          <Stack.Screen
            name="Main"
            component={TabNavigation}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={SignInStackNavigation}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
