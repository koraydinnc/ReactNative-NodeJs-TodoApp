import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowInForeground: true
  }),
});

const notification = {
  async requestPermissions() {
    let token;
    
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      
      if (finalStatus !== 'granted') {
        console.log('Bildirim izni alınamadı!');
        return;
      }

      token = (await Notifications.getExpoPushTokenAsync({
        projectId: 'f602d574-49e7-427e-a819-de586d6d3e2a' // Expo projenizin ID'si
      })).data;
      
      console.log('Push Token:', token);
    } else {
      console.log('Fiziksel cihaz gereklidir!');
    }
  },

  // Anlık bildirim gönderme
  async localNotification(title, body) {
    try {
      await this.requestPermissions(); // İzinleri kontrol et

      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          sound: true,
          priority: Notifications.AndroidNotificationPriority.HIGH,
        },
        trigger: null,
      });

      console.log('Bildirim gönderildi:', notificationId);
      return notificationId;
    } catch (error) {
      console.error('Bildirim gönderme hatası:', error);
    }
  },

  // Planlanmış bildirim gönderme
  async scheduleNotification(title, body, date) {
    try {
      await this.requestPermissions(); // İzinleri kontrol et

      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          sound: true,
          priority: Notifications.AndroidNotificationPriority.HIGH,
        },
        trigger: {
          date: date,
        },
      });

      console.log('Planlanmış bildirim ayarlandı:', notificationId);
      return notificationId;
    } catch (error) {
      console.error('Planlanmış bildirim hatası:', error);
    }
  },

  // Tüm bildirimleri iptal et
  async cancelAllNotifications() {
    await Notifications.cancelAllScheduledNotificationsAsync();
  },
};

// Bildirim dinleyicilerini ayarla
Notifications.addNotificationReceivedListener(notification => {
  console.log('Bildirim alındı:', notification);
});

Notifications.addNotificationResponseReceivedListener(response => {
  console.log('Bildirime tıklandı:', response);
});

export default notification;