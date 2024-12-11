import { StyleSheet, View } from "react-native";
import { Button, Paragraph, Title } from "react-native-paper";

const TaskDetails = ({ route, navigation }) => {
    const { task } = route.params || {}; // Prevent crash if route.params is undefined
  
    console.log('Task:', task); // Debugging
    if (!task) {
      return <Paragraph>Görev bilgisi bulunamadı!</Paragraph>;
    }
  
    return (
      <View style={styles.container}>
        <View style={styles.detailsContainer}>
          <Title style={styles.taskTitle}>{task.title}</Title>
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
      </View>
    );
  };
  
  const styles = StyleSheet.create({

    detailsContainer: {
      padding: 20,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    taskTitle: {
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