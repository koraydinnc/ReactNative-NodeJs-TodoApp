import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { Agenda, LocaleConfig } from 'react-native-calendars';
import moment from 'moment';
import { AntDesign } from '@expo/vector-icons';
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

  useEffect(() => {
    const formatTodosForAgenda = (todos) => {
      const formatted = {};

      todos.forEach((todo) => {
        const date = moment(todo.createdAt).format('YYYY-MM-DD');
        if (!formatted[date]) {
          formatted[date] = [];
        }
        formatted[date].push({
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

  const renderItem = (item) => (
    <View style={[styles.card, item.completed && styles.completedCard]}>
      <View style={styles.cardHeader}>
        <Text style={[styles.cardTitle, item.completed && styles.completedText]}>{item.name}</Text>
        {item.completed && <AntDesign name="checkcircle" size={16} color="#4caf50" />}
      </View>
      <Text style={styles.cardDescription}>{item.description}</Text>
      <View style={styles.cardFooter}>
        <Text style={[styles.tag, styles.categoryTag]}>{item.category}</Text>
        <Text
  style={[
    styles.tag,
    item.priority === 'high'
      ? styles.highPriority
      : item.priority === 'medium'
      ? styles.mediumPriority
      : styles.lowPriority, 
  ]}
>
  {item.priority === 'high'
    ? 'Yüksek'
    : item.priority === 'medium'
    ? 'Orta'
    : 'Düşük'} 
</Text>

      </View>
    </View>
  );
  
  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator animating={true} size="large" />
      </View>
    );
  }

  return (
    <Agenda
      items={agendaItems}
      selected={moment().format('YYYY-MM-DD')}
      renderItem={renderItem}
      renderEmptyDate={() => (
        <View style={styles.emptyDate}>
          <Text style={{ color: '#bbb', fontSize: 14 }}>Bu tarihte görev yok</Text>
        </View>
      )}
      pastScrollRange={1}
      futureScrollRange={1}
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
    card: {
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 12,
      marginVertical: 8,
      marginHorizontal: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      borderLeftWidth: 4,
      borderLeftColor: '#ff9800', 
    },
    completedCard: {
      borderLeftColor: '#4caf50', 
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: '#333',
    },
    completedText: {
      color: '#4caf50',
      textDecorationLine: 'line-through',
    },
    cardDescription: {
      fontSize: 14,
      color: '#666',
      marginVertical: 8,
    },
    cardFooter: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      marginTop: 8,
    },
    tag: {
      fontSize: 12,
      fontWeight: '500',
      color: '#fff',
      backgroundColor: '#ddd',
      borderRadius: 12,
      paddingHorizontal: 8,
      paddingVertical: 4,
      marginRight: 8,
    },
    categoryTag: {
      backgroundColor: '#3f51b5',
    },
    highPriority: {
      backgroundColor: '#e53935',
    },
    lowPriority: {
      backgroundColor: '#43a047',
    },
    mediumPriority: {
      backgroundColor: '#ccc',
    },
  });
  
