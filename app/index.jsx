import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import { useEffect, useState } from "react";
import { getItem } from "./utils/asyncStorage";

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  const [showOnboarding, setShowOnboarding] = useState(null);

  useEffect(() => {
    checkIfAlreadyOnboarded();
  }, []);

  const checkIfAlreadyOnboarded = async () => {
    const onboarded = await getItem("onboarded");
    setShowOnboarding(!onboarded);
  };

  if (showOnboarding === null) return null; // Prevent unnecessary rendering

  return (
    <Stack.Navigator initialRouteName={showOnboarding ? "Onboarding" : "Home"}>
      <Stack.Screen
        name="Onboarding"
        options={{ headerShown: false }}
        component={OnboardingScreen}
      />
      <Stack.Screen
        name="Home"
        options={{ headerShown: false }}
        component={HomeScreen}
      />
    </Stack.Navigator>
  );
};

export default AppNavigation;
