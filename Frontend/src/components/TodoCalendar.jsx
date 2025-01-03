import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { useCompletedTodoMutation, useGetDateTodosMutation, useDeleteTodoMutation } from '../app/api/TodoApi';
import { IconButton, Surface } from 'react-native-paper';
import { format } from 'date-fns';
import { LocaleConfig } from 'react-native-calendars';
import ConfettiCannon from 'react-native-confetti-cannon';
import notification from './notification';
LocaleConfig.locales['tr'] = {
  monthNames: [
    'Ocak',
    'Şubat',
    'Mart',
    'Nisan',
    'Mayıs',
    'Haziran',
    'Temmuz',
    'Ağustos',
    'Eylül',
    'Ekim',
    'Kasım',
    'Aralık'
  ],
  monthNamesShort: ['Oca.', 'Şub.', 'Mar.', 'Nis.', 'May.', 'Haz.', 'Tem.', 'Ağu.', 'Eyl.', 'Eki.', 'Kas.', 'Ara.'],
  dayNames: ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'],
  dayNamesShort: ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'],
  today: 'Bugün'
};

LocaleConfig.defaultLocale = 'tr';

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'high':
      return '#FF5252';
    case 'medium':
      return '#FFA726';
    case 'low':
      return '#66BB6A';
    default:
      return '#757575';
  }
};

const getCategoryIcon = (category) => {
  switch (category) {
    case 'İş':
      return 'briefcase';
    case 'Kişisel':
      return 'account';
    case 'Alışveriş':
      return 'cart';
    case 'Sağlık':
      return 'hospital';
    default:
      return 'format-list-bulleted';
  }
};

const priorityConfig = {
  high: {
    color: '#FF5252',
    label: 'Yüksek',
    icon: 'alert-circle'
  },
  medium: {
    color: '#FFA726',
    label: 'Orta',
    icon: 'alert'
  },
  low: {
    color: '#66BB6A',
    label: 'Düşük',
    icon: 'alert-circle-outline'
  }
};

const TodoCalendar = () => {
   const [items, setItems] = useState({});
   const [refreshing, setRefreshing] = useState(false); 
   const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
   const [showConfetti, setShowConfetti] = useState(false);
   
   const [getTodoDate] = useGetDateTodosMutation();
const [completeTodo] = useCompletedTodoMutation();
const [deleteTodo] = useDeleteTodoMutation();
   const renderItem = (item) => {
    const priorityDetails = priorityConfig[item.priority];
    
    return (
      <Surface style={styles.itemContainer} elevation={2}>
        <View style={styles.item}>
          <View style={styles.itemHeader}>
            <View style={[styles.priorityBadge, { backgroundColor: priorityDetails.color }]}>
              <IconButton icon={priorityDetails.icon} size={16} iconColor="#FFF" />
              <Text style={styles.priorityText}>{priorityDetails.label}</Text>
            </View>
            <View style={styles.actionButtons}>
              <IconButton
                icon={item.completed ? "check-circle" : "circle-outline"}
                iconColor={item.completed ? '#4CAF50' : '#757575'}
                size={24}
                onPress={() => handleCheck(item.id)}
                style={styles.iconButton}
              />
              <IconButton
                icon="delete-outline"
                iconColor="#FF5252"
                size={24}
                onPress={() => handleDelete(item.id)}
                style={styles.iconButton}
              />
            </View>
          </View>
          
          <View style={styles.contentContainer}>
            <Text style={[
              styles.itemTitle,
              item.completed && styles.completedText
            ]}>{item.name}</Text>
            
            {item.description && (
              <Text style={[
                styles.itemDescription,
                item.completed && styles.completedText
              ]}>{item.description}</Text>
            )}
            
            <View style={styles.metaContainer}>
              <View style={styles.categoryBadge}>
                <IconButton
                  icon={getCategoryIcon(item.category)}
                  size={16}
                  iconColor="#757575"
                />
                <Text style={styles.categoryText}>{item.category}</Text>
              </View>
            </View>
          </View>
        </View>
      </Surface>
    );
   };

   const fetchItems = async () => {
       setItems({})
       try {
          const response = await getTodoDate(selectedDate).unwrap();
          setItems(response);
       } catch (error) {
        console.error('Todo yükleme hatası:', error);
       } 
  }

  const handleCheck = async(id) => {
    setRefreshing(true);
    try {
      const response = await completeTodo(id);
      await fetchItems();
      
      notification.localNotification(
        "Görev Tamamlandı! 🎉",
        "Harika iş çıkardın! Bir görevi daha tamamladın."
      );

      if (response.data.todo.completed) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2000);
      }
      
      Alert.alert(
        "Başarılı",
        "Görev durumu güncellendi",
        [{ text: "Tamam" }]
      );
    } catch (error) {
      Alert.alert(
        "Hata",
        "Görev güncellenirken bir hata oluştu",
        [{ text: "Tamam" }]
      );
      console.error('Todo tamamlama hatası:', error);
    } finally {
      setRefreshing(false);
    }
  }

  const handleDelete = async(id) => {
    Alert.alert(
      "Görevi Sil",
      "Bu görevi silmek istediğinizden emin misiniz?",
      [
        {
          text: "İptal",
          style: "cancel"
        },
        {
          text: "Sil",
          style: "destructive",
          onPress: async () => {
            setRefreshing(true);
            try {
              await deleteTodo(id);
              await fetchItems();
              Alert.alert(
                "Başarılı",
                "Görev başarıyla silindi",
                [{ text: "Tamam" }]
              );
            } catch (error) {
              Alert.alert(
                "Hata",
                "Görev silinirken bir hata oluştu",
                [{ text: "Tamam" }]
              );
              console.error('Todo silme hatası:', error);
            } finally {
              setRefreshing(false);
            }
          }
        }
      ]
    );
  }

  useEffect(() => {
    fetchItems();
  }, [selectedDate]);

   const renderEmptyDate = () => {
    return (
      <Surface style={styles.emptyDate} elevation={1}>
        <IconButton
          icon="calendar-blank"
          size={30}
          iconColor="#9E9E9E"
        />
        <Text style={styles.emptyDateText}>Bu tarih için görev bulunmuyor</Text>
      </Surface>
    );
   };

  // Planlanmış görev için bildirim ayarlama örneği
  const scheduleTaskReminder = (task) => {
    const reminderTime = new Date(task.dueDate);
    reminderTime.setHours(reminderTime.getHours() - 1); // 1 saat önce hatırlat

    NotificationService.scheduleNotification(
      "Görev Hatırlatması ⏰",
      `'${task.name}' görevi için 1 saat kaldı!`,
      reminderTime
    );
  }

  return (
    <View style={styles.container}>
      <Agenda
        refreshing={refreshing}
        onRefresh={fetchItems}
        items={items}
        showClosingKnob={true}
        reservationContainerColor="#fff"
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
        }}
        selectedDay={selectedDate}
        theme={calendarTheme}
        style={{
          backgroundColor: '#FFFFFF'
        }}
        contentContainerStyle={{
          backgroundColor: '#FFFFFF'
        }}
      />
      {showConfetti && (
        <ConfettiCannon
          count={50}
          origin={{x: -10, y: 0}}
          autoStart={true}
          fadeOut={true}
          duration={2000}
          colors={['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff']}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  itemContainer: {
    marginRight: 16,
    marginTop: 16,
    marginBottom: 8,
    borderRadius: 16,
    elevation: 5,
  },
  item: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  priorityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingRight: 12,
  },
  priorityText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: -4,
  },
  contentContainer: {
    padding: 16,
    paddingTop: 8,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#9E9E9E',
  },
  itemDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    marginBottom: 12,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    paddingRight: 12,
  },
  categoryText: {
    fontSize: 12,
    color: '#757575',
    marginLeft: -4,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    margin: 0,
  },
  emptyDate: {
    height: 120,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginRight: 16,
    marginTop: 16,
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F0F0F0',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  emptyDateText: {
    color: '#9E9E9E',
    fontSize: 14,
    marginTop: 8,
  },
});

const calendarTheme = {
  backgroundColor: '#FFFFFF',
  calendarBackground: '#FFFFFF',
  agendaDayTextColor: '#1976D2',
  agendaDayNumColor: '#1976D2',
  agendaTodayColor: '#1976D2',
  agendaKnobColor: '#1976D2',
  selectedDayBackgroundColor: '#1976D2',
  dotColor: '#1976D2',
  todayTextColor: '#1976D2',
  textSectionTitleColor: '#1A1A1A',
  dayTextColor: '#1A1A1A',
  textDisabledColor: '#BDBDBD',
  monthTextColor: '#1A1A1A',
  reservationsBackgroundColor: '#FFFFFF',
  agendaBackgroundColor: '#FFFFFF',
  reservationContainerColor: '#FFFFFF'
};

export default TodoCalendar;
