import React, { useEffect, useState } from 'react';
import { StyleSheet, ActivityIndicator, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Paragraph, Button, FAB, TextInput, RadioButton, Menu, Divider, Provider as PaperProvider } from 'react-native-paper';
import { useAddTodoMutation, useGetTodoQuery } from '../app/api/TodoApi';
import TodoList from '../components/TodoList';
import { Modal, Portal, Text } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';

const HomeScreen = ({ navigation }) => {
  const { data: tasks, isLoading, error, refetch } = useGetTodoQuery();
  const [addTodo] = useAddTodoMutation();
  const [visible, setVisible] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('İş');
  const [priority, setPriority] = useState('medium');

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  useEffect(() => {
    refetch();
  }, []);

  const addTask = async () => {
    if (!title || !description) {
      return;
    }

    const newTask = {
      title,
      description,
      category,
      priority,
      completed: false,
    };

    try {
      await addTodo(newTask).unwrap();
      setTitle('');
      setDescription('');
      setCategory('Yazılım');
      setPriority('medium');
      refetch();
      hideModal();
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

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
        <ScrollView style={styles.scrollView}>
          <TodoList tasks={tasks} navigation={navigation} refetch={refetch} />
        </ScrollView>

        <Portal styles={styles.portal}>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={styles.modalStyle}
          >
            <Text style={styles.modalTitle}>Yeni Görev Ekle</Text>
            <TextInput
              mode="outlined"
              label="Görev Başlığı"
              value={title}
              onChangeText={(text) => setTitle(text)}
              style={styles.input}
            />
            <TextInput
              mode="outlined"
              label="Görev Açıklaması"
              value={description}
              onChangeText={(text) => setDescription(text)}
              style={styles.input}
            />

            <Text>Kategori Seçin</Text>
            <Picker
              selectedValue={category}
              onValueChange={(itemValue) => setCategory(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="İş" value="İş" />
              <Picker.Item label="Genel" value="Genel" />
              <Picker.Item label="Çalışma" value="Çalışma" />
              <Picker.Item label="Eğitim" value="Eğitim" />
              <Picker.Item label="Sağlık" value="Sağlık" />
              <Picker.Item label="Ev Düzeni" value="Ev Düzeni" />
              <Picker.Item label="Mali" value="Mali" />
              <Picker.Item label="Kişisel Gelişim" value="Kişisel Gelişim" />
            </Picker>

            <Text>Öncelik Seçin</Text>
            <RadioButton.Group
              onValueChange={(newPriority) => setPriority(newPriority)}
              value={priority}
            >
              <RadioButton.Item label="Yüksek" value="high" />
              <RadioButton.Item label="Orta" value="medium" />
              <RadioButton.Item label="Düşük" value="low" />
            </RadioButton.Group>

            <Button mode="contained" onPress={addTask} style={styles.addButton}>
              Görevi Ekle
            </Button>
          </Modal>
        </Portal>

        <View style={styles.portal}>
          <FAB
            icon="plus"
            style={styles.fab}
            label="Görev Ekle"
            onPress={showModal}
          />
        </View>
      </PaperProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
    position: 'relative',
  },
  scrollView: {
    flex: 1,
    marginBottom: 80,
  },
  portal: {
   backgroundColor: 'transparent',
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
  modalStyle: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    width: '85%',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    marginBottom: 12,
  },
  picker: {
    marginBottom: 12,
  },
  addButton: {
    marginTop: 12,
  },
});

export default HomeScreen;
