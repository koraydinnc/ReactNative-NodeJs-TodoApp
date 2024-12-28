import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, ScrollView } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { Card, IconButton, RadioButton, Snackbar } from 'react-native-paper';
import moment from 'moment';
import { useGetDateTodosMutation, useCompletedTodoMutation, useDeleteTodoMutation } from '../app/api/TodoApi';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const TodoCalendar = ({navigation}) => {
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  const [todos, setTodos] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  

  const [deleteTodo] = useDeleteTodoMutation()
  const [getDateTodos, {isLoading: getDateLoading}] = useGetDateTodosMutation();
  const [completed, { isLoading: isCompleting }] = useCompletedTodoMutation();

  useEffect(() => {
    fetchTodosForDate(selectedDate);
  }, [selectedDate]);

  const formatTodosForAgenda = (todosArray) => {
    const formattedTodos = {};
    todosArray.forEach((todo) => {
      const date = moment(todo.createdAt).format('YYYY-MM-DD');
      if (!formattedTodos[date]) {
        formattedTodos[date] = [];
      }
      formattedTodos[date].push(todo);
    });
    return formattedTodos;
  };

  const fetchTodosForDate = async (date) => {
    try {
      const response = await getDateTodos(date).unwrap();
      const formattedTodos = formatTodosForAgenda(response.todos || []);
      setTodos(formattedTodos);
    } catch (err) {
      console.error('Error fetching todos:', err);
      setTodos({});
      setSnackbarMessage(err?.data?.message || 'Bir hata oluştu.');
      setSnackbarVisible(true);
    } finally {
    }
  };

  const completedTodo = async (id) => {
    try {
      await completed(id).unwrap();
      fetchTodosForDate(selectedDate);
    } catch (error) {
      console.error('Error completing todo:', error);
      setSnackbarMessage('Görev tamamlanamadı, lütfen tekrar deneyin.');
      setSnackbarVisible(true);
    }
  };


  const handleDeleteTodo = async(id) => {
       try {
              await deleteTodo(id).unwrap();
              await fetchTodosForDate(selectedDate)
              setSnackbarMessage('Görev Başarıyla Silindi!')
              setSnackbarMessage(true)
       } catch (error) {
              setSnackbarMessage('Görev Silinirken Bir Hata Oluştur, Lütfen Tekrar Deneyin!')
              setSnackbarMessage(true)
       }
  }

  const renderItem = ({ item }) => {
    if (!item) return null;
  
    return (
<Card style={styles.todoCard} onPress={() => navigation.navigate('Todo', { screen: 'TodoDetail', params: { todo: item } })}>
          <Card.Content>
          <View style={styles.headerRow}>
            <Text style={[styles.todoTitle, item.completed && styles.completedText]}>
              {item.title}
            </Text>
            <IconButton
            animated={true}
              value={item.id.toString()}
              status={item.completed ? 'checked' : 'unchecked'}
              onPress={() => completedTodo(item.id)}
              disabled={isCompleting}
              iconColor="green" 
              icon={item.completed ? 'check-circle' : 'checkbox-blank-circle-outline'}              
            />
          <IconButton
          animated={true}
              icon="delete"
              onPress={() => handleDeleteTodo(item.id)} 
              iconColor="red" 
            />
          </View>
          <Text style={styles.todoDescription}>
            {item.description || 'Açıklama bulunmuyor.'}
          </Text>
          <View style={styles.footerRow}>
            <Text style={styles.todoDate}>
              {moment(item.createdAt).format('DD MMM YYYY')}
            </Text>
            {item.completed && (
              <Text style={styles.completedLabel}>Tamamlandı</Text>
            )}
          </View>
        </Card.Content>
      </Card>
    );
  };
  

  const renderEmptyData = () => (
    <View style={styles.emptyState}>
      <MaterialIcons name="event-busy" size={50} color="#FF6F61" />
      <Text style={styles.emptyText}>Seçili Güne Ait Görev Bulunamadı!</Text>
      <Text style={styles.suggestionText}>
        Yeni bir görev ekleyerek başlayabilirsiniz.
      </Text>
    </View>
  );
  

  if (isCompleting || getDateLoading) {
    return (
      <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
        <ActivityIndicator size="small" color="blue" backgroundColor='transparent' />
      </View>
    );
  }

  return (
    <View  style={{ flex: 1  }}>
    <Agenda
  
  items={todos}
  renderItem={(item) => renderItem({ item })}
  renderEmptyData={renderEmptyData}
  hideKnob={false} 
  showClosingKnob={true}
  pastScrollRange={1}
  futureScrollRange={1}
  selected={selectedDate}
  onDayPress={(day) => {
    if (day.dateString !== selectedDate) {
      setSelectedDate(day.dateString);
    }
  }}
  theme={{
    renderItemColor:'#fff',
    backgroundColor: '#f4f4f4', // Tüm ekranın arka planı
    calendarBackground: '#fff', // Takvimin arka planı
    agendaDayTextColor: '#007bff', // Gün ismi rengi
    agendaDayNumColor: '#007bff', // Gün numarası rengi
    agendaTodayColor: '#ff5722', // Bugünün rengi
    agendaKnobColor: '#4caf50', // Knob rengi
    textSectionTitleColor: '#333', // Ayın gün başlıkları
    dayTextColor: '#000', // Günlerin yazı rengi
    selectedDayBackgroundColor: 'red', // Seçili günün arka plan rengi
    selectedDayTextColor: '#fff', // Seçili gün yazı rengi
    todayTextColor: '#ff5722', // Bugünün yazı rengi
    dotColor: '#4caf50', // Günlere nokta eklenmişse rengi
    selectedDotColor: '#ffffff', // Seçili günün noktası
  }}
  
/>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        elevation={5}
        error={true}
      >
        {snackbarMessage}
      </Snackbar>
    </View>
  );
};

export default TodoCalendar;

const styles = StyleSheet.create({
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9', // Hafif gri arka plan
    padding: 20,
    borderRadius: 10,
    margin: 10,
    elevation: 2, // Gölge etkisi
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
    marginTop: 10,
    textAlign: 'center',
  },
  suggestionText: {
    fontSize: 14,
    color: '#888',
    marginTop: 8,
    textAlign: 'center',
  },
  loadingContainer: {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backfaceVisibility:'hidden'

  }, 
  todoCard: {
    margin: 12,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: '#fff',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  todoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1, // Başlık taşmasın diye
    marginRight: 10,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  todoDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
    lineHeight: 20,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  todoDate: {
    fontSize: 12,
    color: '#999',
  },
  completedLabel: {
    fontSize: 12,
    color: '#4caf50',
    fontWeight: 'bold',
  },
});

