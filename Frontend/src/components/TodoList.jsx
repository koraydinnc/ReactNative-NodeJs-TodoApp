import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Alert } from 'react-native';
import { Card, IconButton, Paragraph, Button, Text, Snackbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDeleteTodoMutation } from '../app/api/TodoApi';

const TodoList = ({ tasks, navigation, refetch }) => {
  const [deleteTodo] = useDeleteTodoMutation();
  const [visible, setVisible] = useState(false);
  const [loadingId, setLoadingId] = useState(null);

  const onDismissSnackBar = () => setVisible(false);

  const handleDeleteTodo = async (id) => {
    setLoadingId(id);
    try {
      await deleteTodo(id).unwrap();
      refetch();
      setVisible(true);
    } catch (error) {
      console.error('Görev silme hatası:', error);
      Alert.alert('Hata', 'Görev silinirken bir sorun oluştu.');
    } finally {
      setLoadingId(null);
    }
  };


  const handleCompleted = () => {
    console.log('completed')
  }

  const getPriorityColor = (priority) => (priority === 'high' ? '#FF3B30' : '#4CAF50');

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        {tasks && tasks.todos && tasks.todos.length > 0 ? (
          tasks.todos.map((task) => (
            <Card
              key={task.id}
              style={styles.card}
              onPress={() => navigation.navigate('TaskDetails', { task })}
            >
              <View style={styles.cardContent}>
                <IconButton icon="note-text-outline" color="#6200EE" size={36} />
                <View style={styles.textContainer}>
                  <Text style={styles.title}>{task.title}</Text>
                  <Text style={styles.subtitle}>{task.description}</Text>
                  <Text style={[styles.priorityText, { color: getPriorityColor(task.priority) }]}>
                    {task.priority === 'high' ? 'Yüksek Öncelik' : 'Normal Öncelik'}
                  </Text>
                </View>
              </View>
              <Card.Actions style={styles.actions}>
                <Button 
                onPress={() => handleCompleted(task.id)}
                mode="contained" color="#4CAF50">
                  Onayla
                </Button>
                <Button
                  mode="outlined"
                  color="#FF3B30"
                  loading={loadingId === task.id}
                  onPress={() => handleDeleteTodo(task.id)}
                >
                  Sil
                </Button>
              </Card.Actions>
            </Card>
          ))
        ) : (
          <Paragraph style={styles.noTasks}>
            <IconButton icon="clipboard-text-outline" size={36} color="#6200EE" />
            Göreviniz Bulunmamaktadır
          </Paragraph>
        )}
      </ScrollView>
      <Snackbar
        style={{ backgroundColor: '#4CAF50' }}
        visible={visible}
        onDismiss={onDismissSnackBar}
        duration={3000}
      >
        Görev başarıyla silindi!
      </Snackbar>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
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
  noTasks: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#777',
    fontSize: 16,
  },
});

export default TodoList;
