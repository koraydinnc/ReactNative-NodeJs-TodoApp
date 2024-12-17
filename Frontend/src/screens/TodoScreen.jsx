import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { BarChart } from 'react-native-chart-kit'; 
import { Dimensions } from 'react-native';
import { useGetTodoQuery } from '../app/api/TodoApi';

const screenWidth = Dimensions.get("window").width;

const TodoScreen = ({ navigation }) => {

   const {data, refetch, isLoading} = useGetTodoQuery()
   console.log(data)

   useEffect(() => {
       refetch()
   },[])

   const totalCompleted = data.todos?.filter((todo) => todo.completed === true);
   const totalPending = data.todos?.filter((todo) => todo.completed === false);

   console.log(totalPending)
   
   const chartData = {
     labels: ['Tamamlandı', 'Devam Ediyor'],
     datasets: [
       {
         data: [totalCompleted.length, totalPending.length]
       },
     ],
   };

   return (
     <ScrollView style={styles.container}>
       <Card style={styles.card}>
         <Card.Content>
           <Title>Görev Durumları</Title>
           <BarChart
             data={chartData}
             width={screenWidth - 40}
             height={220}
             showBarTops='true'
             showValuesOnTopOfBars='true'
             yAxisInterval={1}
             fromZero='true' 
             chartConfig={{
               backgroundColor: '#1cc910',
               backgroundGradientFrom: '#eff3ff',
               backgroundGradientTo: '#efefef',
               decimalPlaces: 0,
               color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
               labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
             }}
             style={{
               marginVertical: 10,
               borderRadius: 10,
             }}
           /> 
         </Card.Content>
       </Card>

       <Card style={styles.card}>
         <Card.Content>
           <Title>Onaylanan Görevler</Title>
           <Paragraph>{totalCompleted.length} Görev onaylandı!</Paragraph>
           <Button
             mode="contained"
             onPress={() => navigation.navigate('TodoDetail', { task: { title: 'Örnek Görev', description: 'Bu bir görev açıklamasıdır.' } })}
             style={styles.button}
           >
             Görev Detayını Gör
           </Button>
         </Card.Content>
       </Card>
     </ScrollView>
   );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  card: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  button: {
    marginTop: 10,
  },
});

export default TodoScreen;
