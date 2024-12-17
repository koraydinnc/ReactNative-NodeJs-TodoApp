import React, { useEffect } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Paragraph, Button, FAB } from 'react-native-paper';
import { useGetTodoQuery } from '../app/api/TodoApi';
import TodoList from '../components/TodoList';

const HomeScreen = ({ navigation }) => {
  const { data: tasks, isLoading, error, refetch } = useGetTodoQuery();

  useEffect(() => {
    refetch()
  },[])
  

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ActivityIndicator animating={true} size="large" style={styles.loading} />
      </SafeAreaView>
    );
  }
  if (error) {
    console.log('Error:', error);
    return (
      <SafeAreaView style={styles.safeArea}>
        <Paragraph>Bir hata oluştu: {JSON.stringify(error, null, 2)}</Paragraph>
        <Button mode="contained" onPress={refetch}>Tekrar Dene</Button>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <TodoList tasks={tasks} navigation={navigation} refetch={refetch} />
      <FAB
        icon="plus"
        style={styles.fab}
        label="Görev Ekle"
        onPress={() => navigation.navigate('AddTask')}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#6200EE',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
