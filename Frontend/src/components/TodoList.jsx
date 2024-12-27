import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { RadioButton } from 'react-native-paper';
import { useCompletedTodoMutation } from '../app/api/TodoApi';

const TodoList = ({ item, refetch }) => {
  const [completed, { isLoading }] = useCompletedTodoMutation();

  const [items, setItems] = useState([]);
  
  useEffect(() => {
    const normalizedItems = Array.isArray(item) ? item : [item];
    
    const uniqueItems = normalizedItems.filter((value, index, self) =>
      index === self.findIndex((t) => t.id === value.id)
    );
    
    setItems(uniqueItems);
  }, [item]);
  
  const completedTodo = async (id) => {
    try {
      await completed(id);
      await refetch();
    } catch (error) {
      console.error('Error completing todo:', error)
    }
  };

  console.log(items, 'Sorted Items'); 
  
  return (
    <View style={styles.container}>
      {items.map((todo) => (
        <View key={todo.id} style={styles.todoContainer}>
          <View style={styles.row}>
            <Text>{todo.title}</Text>
            <RadioButton
              isLoading={isLoading}
              value={todo.id}
              status={todo.completed ? 'checked' : 'unchecked'}
              onPress={() => completedTodo(todo.id)}
            />
            <Text style={styles.todoText}>{todo.name}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default TodoList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  todoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  todoText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
});
