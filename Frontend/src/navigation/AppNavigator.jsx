import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import TabNavigator from './TabNavigator'


export default function AppNavigator() {
  return (
     <NavigationContainer>
        <TabNavigator/>
     </NavigationContainer>
  )
}

const styles = StyleSheet.create({})