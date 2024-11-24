import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

class NotificationService {

  //Constructor to initialize the notification handler
  constructor() {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });
  }

  //Method to send the push notification
  async sendPushNotification(expoPushToken, message) {
    const notificationMessage = {
      to: expoPushToken,
      sound: 'default',
      title: message.title,
      body: message.body,
      data: message.data,
      icon: message.icon,
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(notificationMessage),
    });
  }

  //Method to register for push notifications
  async registerForPushNotificationsAsync() {
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
      if (!projectId) {
        alert('Project ID not found');
        return;
      }
      try {
        const pushTokenString = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
        console.log(pushTokenString);
        return pushTokenString;
      } catch (e) {
        alert(`Error getting push token: ${e}`);
      }
    } else {
      alert('Must use physical device for push notifications');
    }
  }
}

export default new NotificationService();