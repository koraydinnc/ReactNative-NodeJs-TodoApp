import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Paragraph,Text,Title } from "react-native-paper";

const todoDetails = ({ route, navigation }) => {
    const { todo } = route.params; 
  
    console.log('todo:', todo); 
    if (!todo) {
      return <Paragraph>Görev bilgisi bulunamadı!</Paragraph>;
    }
  
    return (
      <ScrollView style={styles.container}>
        <View style={styles.detailsContainer}>
          <Text>{todo.name}</Text>
          <Paragraph>{todo.description}</Paragraph>
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

    detailsContainer: {
      padding: 20,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    todoname: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#3e4a61',
      marginBottom: 10,
    },
    todoDescription: {
      fontSize: 16,
      color: '#6e7881',
      marginBottom: 20,
    },
    completeButton: {
      backgroundColor: '#66bb6a',
      marginBottom: 10,
      width: '60%',
    },
    editButton: {
      borderColor: '#ffa726',
      borderWidth: 1,
      width: '60%',
    },
  });

  export default todoDetails