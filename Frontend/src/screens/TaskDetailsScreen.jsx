import React from 'react';
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Paragraph, Text, Title } from "react-native-paper";

const TodoDetails = ({ route, navigation }) => {
  const { todo } = route.params || {}; 

  if (!todo) {
    return <Paragraph style={styles.errorMessage}>Görev bilgisi bulunamadı!</Paragraph>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.detailsContainer}>
        <Title style={styles.todoname}>{todo.name}</Title>
        <Paragraph style={styles.todoDescription}>{todo.description}</Paragraph>

        <Button
          mode="contained"
          onPress={() => alert('Görev tamamlandı!')}
          style={styles.completeButton}
        >
          Görevi Tamamla
        </Button>

        <Button
          mode="outlined"
          onPress={() => navigation.navigate('Edittodo', { todo })}
          style={styles.editButton}
        >
          Görevi Düzenle
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  detailsContainer: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 10,
    elevation: 2,
  },
  todoname: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3e4a61',
    marginBottom: 10,
    textAlign: 'center',
  },
  todoDescription: {
    fontSize: 16,
    color: '#6e7881',
    marginBottom: 20,
    textAlign: 'center',
  },
  completeButton: {
    backgroundColor: '#66bb6a',
    marginBottom: 10,
    width: '60%',
    alignSelf: 'center',
  },
  editButton: {
    borderColor: '#ffa726',
    borderWidth: 1,
    width: '60%',
    alignSelf: 'center',
  },
  errorMessage: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default TodoDetails;
