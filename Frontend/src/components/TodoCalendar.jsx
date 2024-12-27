import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, ScrollView } from 'react-native';
import { Agenda, LocaleConfig } from 'react-native-calendars';
import moment from 'moment';
import TodoList from './TodoList';
LocaleConfig.locales['tr'] = {
  dayNames: ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'],
  dayNamesShort: ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'],
  monthNames: [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık',
  ],
  monthNamesShort: [
    'Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara',
  ],
};
LocaleConfig.defaultLocale = 'tr';
const TodoCalendar = ({ todos, refetch, isLoading }) => {
  const [agendaItems, setAgendaItems] = useState({});
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));

  

  useEffect(() => {
    const formatTodosForAgenda = (todos) => {
      const formatted = {};
      todos.forEach((todo) => {
        const date = moment(todo.createdAt).format('YYYY-MM-DD');
        if (!formatted[date]) {
          formatted[date] = [];
        }
        formatted[date].push({
          id: todo.id,
          name: todo.title,
          description: todo.description,
          category: todo.category,
          priority: todo.priority,
          completed: todo.completed,
        });
      });
      return formatted;
    };

    if (todos?.todos?.length) {
      setAgendaItems(formatTodosForAgenda(todos.todos));
    } else {
      setAgendaItems({});
    }
  }, [todos]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#ffcc00" />
      </View>);}

  const renderItem = (item) => {

    return (
      <View>
          <ScrollView>
          <TodoList item={item} />
          </ScrollView>
      </View>
    );
  };

  const handleDateSelection = (date) => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    setSelectedDate(formattedDate);
  };

  const filteredAgendaItems = {
    [selectedDate]: agendaItems[selectedDate] || [],
  };



  return (
    <Agenda
      items={filteredAgendaItems}
      selected={selectedDate}
      renderItem={renderItem}
      renderEmptyDate={() => {
        return (
          <View>
            <Text style={{ textAlign: 'center', marginTop:44, fontSize: 16, color: '#333' }}>
               Bu Tarihe Ait Görev Bulunamadı
            </Text>
            
          </View>
        );
      }}
      pastScrollRange={1}
      futureScrollRange={1}
      onDayPress={(day) => handleDateSelection(day.dateString)}
      theme={{
        agendaDayTextColor: '#2d4150',
        agendaDayNumColor: '#2d4150',
        agendaTodayColor: '#ffcc00',
        agendaKnobColor: '#ffcc00',
      }}
    />
  );
};

export default TodoCalendar;

const styles = StyleSheet.create({
  
    completedCard: {
      borderLeftColor: '#4caf50', 
    },
    
    todoCompletedContainer: {
      position:'absolute',
      top:0,
      right:0,
       borderWidth:1,
       borderRadius:'50%',
      borderBlockColor:'#4caf50',
      borderColor:'#4caf50',
    }
  });
  
