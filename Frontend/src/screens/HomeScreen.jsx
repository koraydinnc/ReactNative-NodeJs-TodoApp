import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Paragraph, Card, IconButton, FAB, ActivityIndicator, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGetTodoQuery } from '../app/api/TodoApi';

const HomeScreen = ({ navigation }) => {
  const { data: tasks, isLoading, error, refetch } = useGetTodoQuery();

  console.log("Todolar getirildi:", JSON.stringify(tasks));

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
      <ScrollView contentContainerStyle={styles.content}>
        {tasks && tasks.todos ? (
          <Card
            key={tasks.todos.id}
            style={[styles.card, { borderLeftColor: tasks.todos.priority === "high" ? '#FF0000' : '#000' }]}
            onPress={() => navigation.navigate('TaskDetails', { task: tasks.todos })}
          >
            <Card.Title
              title={tasks.todos.title}
              subtitle={tasks.todos.description}
              left={(props) => (
                <IconButton
                  {...props}
                  icon="note"
                  color="#000"
                  size={32}
                  style={styles.icon}
                />
              )}
            />
          </Card>
        ) : (
          <Paragraph>Görev bulunamadı.</Paragraph>
        )}
      </ScrollView>

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
  content: {
    padding: 20,
  },
  card: {
    marginBottom: 16,
    borderLeftWidth: 6,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  icon: {
    margin: 0,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#6200EE',
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default HomeScreen;
