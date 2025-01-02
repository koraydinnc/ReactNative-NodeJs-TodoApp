import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TabNavigator from './TabNavigator';
import OnboardingScreen from '../screens/OnboardingScreen';
import { View, ActivityIndicator } from 'react-native';

const App = () => {
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOnboardingStatus = async () => {
    try {
      const value = await AsyncStorage.getItem('hasSeenOnboarding');
      return value === 'true';
    } catch (error) {
      console.error('Error fetching onboarding status:', error);
      return false; 
    }
  };

  const handleOnboardingComplete = async () => {
    try {
      await AsyncStorage.setItem('hasSeenOnboarding', 'true');
      setHasSeenOnboarding(true);
    } catch (error) {
      console.error('Error setting onboarding status:', error);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      const status = await fetchOnboardingStatus();
      setHasSeenOnboarding(status);
      setIsLoading(false);
    };

    initialize();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {hasSeenOnboarding ? (
        <TabNavigator />
      ) : (
        <OnboardingScreen onComplete={handleOnboardingComplete} />
      )}
    </NavigationContainer>
  );
};

export default App;
