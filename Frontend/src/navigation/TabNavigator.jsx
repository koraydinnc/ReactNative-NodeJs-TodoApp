import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import TodoScreen from '../screens/TodoScreen';
import TaskDetails from '../screens/TaskDetailsScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TodoStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="TodoList" 
        component={TodoScreen} 
        options={{ title: 'Görev Analizi' }}
      />
      <Stack.Screen
        name='TodoDetail'
        component={TaskDetails}
        options={{title:'Görev Detayları'}}
        
      />
  
    </Stack.Navigator>
  );
};

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
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      
      <Tab.Screen name="Todo" component={TodoStackNavigator} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
