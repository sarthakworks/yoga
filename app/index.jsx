import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import { useEffect, useState } from 'react';
import { getItem } from './utils/asyncStorage';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  const [showOnboarding, setShowOnboarding] = useState(null)

  useEffect(() => {
    checkIfAlradyOnboarded();
  }, []);

  const checkIfAlradyOnboarded = async () => {
    let onboarded = await getItem("onboarded");
    if (onboarded ) {
      //hide onboarding
      setShowOnboarding(false)
    } else {
      //show onboarding
      setShowOnboarding(true)
    }
  }

  if (showOnboarding === null) {
    return null;
  }

  if (showOnboarding) {
    return (
      <>
        <Stack.Navigator initialRouteName='Onboarding'>
          <Stack.Screen name="Onboarding" options={{ headerShown: false }} component={OnboardingScreen} />
          <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
        </Stack.Navigator>
      </>
    )
  } else {
    return (
      <>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name="Onboarding" options={{ headerShown: false }} component={OnboardingScreen} />
          <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
        </Stack.Navigator>
      </>
    )
  }
}

export default AppNavigation