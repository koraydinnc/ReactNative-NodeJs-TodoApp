import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Card, IconButton, Paragraph, Button, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const TodoList = ({ tasks, navigation }) => {
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
                <View style={styles.iconContainer}>
                  <IconButton
                    icon="note-text-outline"
                    color="#6200EE"
                    size={36}
                  />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.title}>{task.title}</Text>
                  <Text style={styles.subtitle}>{task.description}</Text>
                  <View style={styles.priority}>
                    <Text
                      style={[
                        styles.priorityText,
                        { color: task.priority === "high" ? "#FF3B30" : "#4CAF50" },
                      ]}
                    >
                      {task.priority === "high" ? "Yüksek Öncelik" : "Normal Öncelik"}
                    </Text>
                  </View>
                </View>
              </View>

              <Card.Actions style={styles.actions}>
                <Button
                  mode="contained"
                  icon="check-circle-outline"
                  color="#4CAF50"
                  onPress={() => console.log('Onayla butonuna tıklandı')}
                >
                  Onayla
                </Button>
                <Button
                  mode="outlined"
                  icon="delete-outline"
                  color="#FF3B30"
                  onPress={() => console.log('Sil butonuna tıklandı')}
                >
                  Sil
                </Button>
              </Card.Actions>
            </Card>
          ))
        ) : (
          <Paragraph style={styles.noTasks}>Görev bulunamadı.</Paragraph>
        )}
      </ScrollView>
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
  iconContainer: {
    marginRight: 12,
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
  priority: {
    marginTop: 8,
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
    textAlign: 'center',
    color: '#777',
    fontSize: 16,
    marginTop: 50,
  },
});

export default TodoList;
