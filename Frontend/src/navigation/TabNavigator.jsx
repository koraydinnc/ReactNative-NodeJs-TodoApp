import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import TodoScreen from '../screens/TodoScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TaskDetails from '../screens/TaskDetailsScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
    
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
  
        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline'; 
        } else if (route.name === 'Todo') {
          iconName = focused ? 'list' : 'list-outline'; 
        }
  
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'blue',
      tabBarInactiveTintColor: 'gray',
      animation:'shift',
      headerShown:false,
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Todo" component={TodoScreen} />
  </Tab.Navigator>
  
  );
};

export default TabNavigator;
