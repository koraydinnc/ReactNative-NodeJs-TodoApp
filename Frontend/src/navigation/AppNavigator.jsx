import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TabNavigator from './TabNavigator'; 
import OnboardingScreen from '../screens/OnboardingScreen';
import { View, ActivityIndicator, Text } from 'react-native';

const App = () => {
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const login = async () => {
    try {
      setHasSeenOnboarding(!!loginOnboarding);
    } catch (error) {
      console.error('Error checking onboarding status:', error);
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
      await login();
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
