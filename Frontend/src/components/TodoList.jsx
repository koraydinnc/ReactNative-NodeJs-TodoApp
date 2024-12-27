import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Card, IconButton, Text, Snackbar, ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCompletedTodoMutation, useDeleteTodoMutation, useGetTodoQuery } from '../app/api/TodoApi';
import { useNavigation } from '@react-navigation/native';

const TodoList = ({ item }) => {
  const [deleteTodo] = useDeleteTodoMutation();
  const [completed, { isLoading }] = useCompletedTodoMutation();
  const { refetch } = useGetTodoQuery();
  const [loadingId, setLoadingId] = useState(null);
  const [snackbar, setSnackbar] = useState({ visible: false, message: '', error: false });
  const [errorSnack, setErrorSnack] = useState({ visible: false, message: '', error: true });
  const navigation = useNavigation();
  const items = Array.isArray(item) ? item : [item];

  const handleDeleteTodo = async (id) => {
    setLoadingId(id);
    try {
      await deleteTodo(id).unwrap();
      await refetch();
      setSnackbar({ visible: true, message: 'Görev başarıyla silindi!', error: false });
    } catch (error) {
      console.error('Görev silme hatası:', error);
      setErrorSnack({ visible: true, message: 'Görev silinirken bir hata oluştu!', error: true });
    } finally {
      setLoadingId(null);
    }
  };

  const handleCompleted = async (id) => {
    setLoadingId(id);
    try {
      await completed(String(id));
      setSnackbar({ visible: true, message: 'Görev başarıyla tamamlandı!', error: false });
    } catch (error) {
      console.error('Görev tamamlama hatası:', error);
      setErrorSnack({ visible: true, message: 'Görev tamamlanırken bir hata oluştu!', error: true });
    } finally {
      setLoadingId(null);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return '#FF3B30';
      case 'medium':
        return '#FFCC00'; 
      default:
        return '#4CAF50'; 
    }
  };

  useEffect(() => {
    refetch();
  }, [item]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.content}>
        {items?.map((todo) => (
          <Card
  onPress={() => navigation.navigate('Todo', { screen: 'TodoDetail', params:  todo  })}
  key={todo.id}
  style={styles.card}
>


          <Card.Content style={styles.cardContent}>
              <View style={styles.textContainer}>
                <Text style={styles.title}>{todo.name}</Text>
                <Text style={styles.subtitle}>{todo.description}</Text>
                <Text
                  className='text-red-600'
                  style={[styles.priorityText, { color: getPriorityColor(todo.priority) }]}
                >
                  {todo.priority}
                </Text>
              </View>
              <IconButton
                animated={true}
                icon="delete"
                color="#FF3B30"
                size={24}
                onPress={() => handleDeleteTodo(todo.id)}
                disabled={loadingId === todo.id}
              />
              {/* Completed button with loading indicator */}
              {isLoading && loadingId === todo.id ? (
                <ActivityIndicator size="small" color="#4CAF50" style={styles.loadingIndicator} />
              ) : (
                <IconButton
                  icon={todo.completed ? 'checkbox-marked-circle' : 'checkbox-blank-circle-outline'}
                  animated={true}
                  onPress={() => handleCompleted(todo.id)}
                  color="#4CAF50"
                  disabled={loadingId === todo.id}
                />
              )}
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
      <Snackbar
        style={{
          backgroundColor: snackbar.error ? '#FF3B30' : '#4CAF50',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        }}
        visible={snackbar.visible}
        onDismiss={() => setSnackbar({ visible: false, message: '', error: false })}
        duration={3000}
      >
        {snackbar.message}
      </Snackbar>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'transparent',
  },
  content: {
    padding: 16,
  },
  card: {
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 12,
    marginBottom: 16,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginVertical: 4,
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '600',
  },
  loadingIndicator: {
    marginLeft: 8,
  },
});

export default TodoList;
