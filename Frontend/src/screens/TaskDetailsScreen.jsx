import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Paragraph,Title } from "react-native-paper";

const TaskDetails = ({ route, navigation }) => {
    const { task } = route.params; 
  
    console.log('Task:', task); 
    if (!task) {
      return <Paragraph>Görev bilgisi bulunamadı!</Paragraph>;
    }
  
    return (
      <ScrollView style={styles.container}>
        <View style={styles.detailsContainer}>
          <name style={styles.taskname}>{task.name}</name>
          <Paragraph style={styles.taskDescription}>{task.description}</Paragraph>
          <Button
            mode="contained"
            onPress={() => alert('Görev tamamlandı!')}
            style={styles.completeButton}
          >
            Görevi Tamamla
          </Button>
          <Button
            mode="outlined"
            onPress={() => navigation.navigate('EditTask', { task })}
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
    taskname: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#3e4a61',
      marginBottom: 10,
    },
    taskDescription: {
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

  export default TaskDetails