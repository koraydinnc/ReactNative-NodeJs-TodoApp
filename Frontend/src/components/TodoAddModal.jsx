import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Modal, Portal, Text, TextInput, Button, RadioButton, Snackbar } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';

const TodoAddModal = ({ visible, hideModal, addTodo }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('İş');
  const [priority, setPriority] = useState('medium');
  const [snackbar, setSnackbar] = useState({ visible: false, message: '' });

 
 

  const addTask = async () => {
    if (!title || !description) {
      return setSnackbar({visible:true, message:'Başlık ve Açıklama Kısımları Boş Bırakılamaz.', error:true})
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
      setCategory('İş');
      setPriority('medium');
      hideModal();
      setSnackbar({ visible: true, message: 'Görev başarıyla eklendi!' });
    } catch (err) {
      console.error('Error adding task:', err);
      setSnackbar({ visible: true, message: 'Görev eklenirken bir hata oluştu.' });
    }
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={styles.modalStyle}
      >
        <Text style={styles.modalTitle}>Yeni Görev Ekle</Text>
        <TextInput
          autoFocus={true}
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

      <Snackbar
        visible={snackbar.visible}
        onDismiss={() => setSnackbar({ visible: false, message: '' })}
        duration={3000}
        style={{ backgroundColor: '#4CAF50' }}
      >
        {snackbar.message}
      </Snackbar>
    </Portal>
  );
};

const styles = StyleSheet.create({
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

export default TodoAddModal;
