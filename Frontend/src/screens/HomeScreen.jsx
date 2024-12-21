import React, { useEffect, useState } from 'react';
import { StyleSheet, ActivityIndicator, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Paragraph, Button, FAB, Provider as PaperProvider } from 'react-native-paper';
import { useAddTodoMutation, useGetTodoQuery } from '../app/api/TodoApi';
import TodoAddModal from '../components/TodoAddModal';
import TodoCalendar from '../components/TodoCalendar';
import { AntDesign } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  const { data: tasks, isLoading, error, refetch } = useGetTodoQuery();
  const [addTodo] = useAddTodoMutation();
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  useEffect(() => {
    refetch();
  }, []);

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
      <PaperProvider>
        <TodoCalendar todos={tasks} isLoading={isLoading} navigation={navigation} refetch={refetch} />
        <TodoAddModal
          visible={visible}
          hideModal={hideModal}
          addTodo={addTodo}
          refetch={refetch}
        />
        <FAB
          icon="plus"
          style={styles.fab}
          onPress={showModal}
        />
      </PaperProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#CCC',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
