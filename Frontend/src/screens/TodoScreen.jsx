import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph, Button, Text, ActivityIndicator } from 'react-native-paper';
import { BarChart } from 'react-native-chart-kit'; 
import { Dimensions } from 'react-native';
import { useGetTodoQuery } from '../app/api/TodoApi';

const screenWidth = Dimensions.get("window").width;

const TodoScreen = ({ navigation }) => {
   const {data, refetch, isLoading, isError} = useGetTodoQuery()
   
   useEffect(() => {
       refetch()
   },[])

   if(isError) {
     return <View><Text>Bir hata oluştu!</Text></View>
   }

   if(isLoading || !data?.data) {
     return <ActivityIndicator style={{flex:1, justifyContent:'center', alignItems:'center'}} size="large" color="#0000ff" />
   }

   const totalCompleted = data.data.filter((todo) => todo.completed === true);
   const totalPending = data.data.filter((todo) => todo.completed === false);

   
   const chartData = {
     labels: ['Tamamlandı', 'Devam Ediyor'],
     datasets: [
       {
         data: [totalCompleted?.length || 0, totalPending?.length || 0]
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
