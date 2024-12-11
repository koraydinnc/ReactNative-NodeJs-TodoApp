import { View, Text, Button } from 'react-native'
import React from 'react'

const TodoScreen = ({navigation}) => {
  return (
    <View>
      <Text>Details Screen</Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  )
}

export default TodoScreen