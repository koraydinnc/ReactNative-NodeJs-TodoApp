import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { RadioButton } from 'react-native-paper';

const TodoCompleted = () => {
   
  const [checked, setChecked] = useState('first');
  
  
  return (
    <View>
      <RadioButton
         uncheckedColor='red'
        color='green'
       value='completed'
        status={ checked ? 'checked' : 'unchecked' }
        onPress={() => setChecked(!checked)}
      />
    </View>
  )
}

export default TodoCompleted

const styles = StyleSheet.create({})