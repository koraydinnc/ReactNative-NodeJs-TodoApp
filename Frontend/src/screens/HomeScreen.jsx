import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Appbar, Button, Card, Title, Paragraph, FAB, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = ({ navigation }) => {
  const tasks = [
    { id: 1, type: 'meeting', title: 'Toplantıya Katıl', description: 'Saat 14:00\'de müşteri toplantısı.', color: '#3e4a61', icon: 'briefcase' },
    { id: 2, type: 'shopping', title: 'Alışveriş Yap', description: 'Meyve ve sebze alınacak.', color: '#ffa726', icon: 'cart' },
    { id: 3, type: 'exercise', title: 'Spor Yap', description: 'Bugün 30 dakika koşu yap.', color: '#66bb6a', icon: 'run' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        {tasks.map((task) => (
          <Card
            key={task.id}
            style={[styles.card, { borderLeftColor: task.color }]}
            onPress={() => navigation.navigate('TaskDetails', { task })}
          >
            <Card.Title
              title={task.title}
              subtitle={task.description}
              left={(props) => (
                <IconButton
                  {...props}
                  icon={task.icon}
                  color={task.color}
                  size={32}
                  style={styles.icon}
                />
              )}
            />
          </Card>
        ))}
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
    backgroundColor: '#CCC',
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default HomeScreen;
