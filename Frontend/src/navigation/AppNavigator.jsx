import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import TabNavigator from './TabNavigator'; 
import OnboardingScreen from '../screens/OnboardingScreen';

export default function App() {
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);

  const handleOnboardingComplete = () => {
    setHasSeenOnboarding(true); 
  };

  return (
    <NavigationContainer>
      {hasSeenOnboarding ? (
        <TabNavigator /> 
      ) : (
        <OnboardingScreen onComplete={handleOnboardingComplete} /> 
      )}
    </NavigationContainer>
  );
}
