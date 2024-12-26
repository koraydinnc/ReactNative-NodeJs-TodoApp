import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Alert } from 'react-native';
import { Card, IconButton, Paragraph, Button, Text, Snackbar, RadioButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCompletedTodoMutation, useDeleteTodoMutation } from '../app/api/TodoApi';

const TodoList = ({ tasks, navigation, refetch }) => {
  const [deleteTodo] = useDeleteTodoMutation();
  const [completedTodo] = useCompletedTodoMutation();
  const [loadingId, setLoadingId] = useState(null);
  const [snackbar, setSnackbar] = useState({ visible: false, message: '', error: false });

  const handleDeleteTodo = async (id) => {
    setLoadingId(id);
    try {
      await deleteTodo(id).unwrap();
      await refetch();
      setSnackbar({ visible: true, message: 'Görev başarıyla silindi!', error: false });
    } catch (error) {
      console.error('Görev silme hatası:', error);
      Alert.alert('Hata', 'Görev silinirken bir sorun oluştu.');
      setSnackbar({ visible: true, message: 'Görev silinirken bir hata oluştu!', error: true });
    } finally {
      setLoadingId(null);
    }
  };

  const handleCompleted = async (id) => {
    try {
      await completedTodo(id).unwrap();
      await refetch();
      setSnackbar({ visible: true, message: 'Görev başarıyla tamamlandı!', error: false });
    } catch (error) {
      console.error('Tamamlama hatası:', error);
      Alert.alert('Hata', 'Görev tamamlanırken bir sorun oluştu.');
      setSnackbar({ visible: true, message: 'Görev tamamlanırken bir hata oluştu!', error: true });
    }
  };

  const getPriorityColor = (priority) => (priority === 'high' ? '#FF3B30' : '#4CAF50');

  const getTextDecoration = (completed) => (completed ? 'line-through' : 'none');

  const sortedTasks = [...(tasks?.todos || [])].sort((a, b) => {
    if (a.completed === b.completed) return 0;
    return a.completed ? 1 : -1;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        {sortedTasks.length > 0 ? (
          sortedTasks.map((task) => (
            <Card
              key={task.id}
              style={styles.card}
              onPress={() => navigation.navigate('Todo', { screen: 'TodoDetail', params: { task } })}
            >
              <View style={styles.cardContent}>
                <IconButton icon="note-text-outline" color="#6200EE" size={36} />
                <View style={styles.textContainer}>
                  <Text style={{ textDecorationLine: getTextDecoration(task.completed) }}>{task.title}</Text>
                  <Text style={styles.subtitle}>{task.description}</Text>
                  <Text style={[styles.priorityText, { color: getPriorityColor(task.priority) }]}>
                    {task.priority === 'high' ? 'Yüksek Öncelik' : 'Normal Öncelik'}
                  </Text>
                </View>
              </View>
             
            </Card>
          ))
        ) : (
          <SafeAreaView style={styles.noTasksContainer}>
            <IconButton icon="clipboard-text-outline" size={36} color="#6200EE" />
            <Text style={styles.noTasksText}>Göreviniz Bulunmamaktadır</Text>
          </SafeAreaView>
        )}
      </ScrollView>

      <Snackbar
        style={{ backgroundColor: snackbar.error ? '#FF3B30' : '#4CAF50' }}
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
    backgroundColor: '#FFF',
    height: '100vh',
  },
  content: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
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
  actions: {
    justifyContent: 'flex-end',
    paddingBottom: 12,
    paddingRight: 16,
  },
  noTasksContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  noTasksText: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
  },
});

export default TodoList;
