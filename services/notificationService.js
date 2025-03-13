import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createRequest from "@/services/api-secure-portal";
const { post } = createRequest();
const PUSH_TOKEN_STORAGE_KEY = 'pushNotificationToken';


// Configure how notifications appear when the app is in the foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});



export async function registerForPushNotificationsAsync() {
  let token;
  
  // Check if this is a physical device (not a simulator/emulator)
  if (Device.isDevice) {
    // Check if we have permission to send notifications
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    // If we don't have permission, ask for it
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    // If we still don't have permission, return null
    if (finalStatus !== 'granted') {
      //console.log('Failed to get push token for push notification!');
      return null;
    }
    
    // Get the token
    try {
      token = (await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig?.extra?.eas?.projectId,
      })).data;
      
      // Save the token to AsyncStorage
      await AsyncStorage.setItem(PUSH_TOKEN_STORAGE_KEY, token);
      
      //console.log('Push token:', token);
    } catch (error) {
      //console.error('Error getting push token:', error);
      return null;
    }
  } else {
    //console.log('Must use physical device for push notifications');
  }





  // For Android, we need to set a notification channel
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}



export async function getStoredPushToken() {
  try {
    return await AsyncStorage.getItem(PUSH_TOKEN_STORAGE_KEY);
  } catch (error) {
    //console.error('Error getting stored push token:', error);
    return null;
  }
}




export async function sendPushTokenToBackend(userId) {
  try {
    const token = await getStoredPushToken();
    if (!token) {
      //console.log('No push token available to send to backend');
      return false;
    }
    const deviceInfo = {
      platform: Platform.OS,
      model: Device.modelName || 'Unknown',
      osVersion: Platform.Version,
    };
    
    const { data } = await post(`/mobile/api/portal/push-notification-token`, {
        pushToken: token,
        deviceInfo,
    });
    //console.log('Push token successfully sent to backend');
    return true;
  } catch (error) {
    //console.error('Error sending push token to backend:', error);
    return false;
  }
}

/**
 * Remove push token from backend (e.g., on logout)
 * @param {string} userId - The user ID
 * @returns {Promise<boolean>} Whether the token was removed successfully
 */
export async function removePushTokenFromBackend(userId) {
  try {
    const token = await getStoredPushToken();
    
    if (!token) {
      //console.log('No push token available to remove from backend');
      return false;
    }
    
    // Make API call to your backend
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/users/${userId}/push-token`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${await AsyncStorage.getItem('authToken')}`, // Assuming you store auth token
      },
      body: JSON.stringify({
        pushToken: token,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to remove push token from backend: ${response.status}`);
    }
    
    //console.log('Push token successfully removed from backend');
    return true;
  } catch (error) {
    //console.error('Error removing push token from backend:', error);
    return false;
  }
}

/**
 * Send a local notification
 * @param {Object} notification - The notification object
 * @param {string} notification.title - The notification title
 * @param {string} notification.body - The notification body
 * @param {Object} notification.data - The notification data
 * @returns {Promise<string>} The notification ID
 */
export async function sendLocalNotification({ title, body, data = {} }) {
  try {
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data,
      },
      trigger: null, // null means send immediately
    });
    return notificationId;
  } catch (error) {
    //console.error('Error sending local notification:', error);
    throw error;
  }
}

/**
 * Schedule a notification for a future time
 * @param {Object} notification - The notification object
 * @param {string} notification.title - The notification title
 * @param {string} notification.body - The notification body
 * @param {Object} notification.data - The notification data
 * @param {Date} notification.date - When to send the notification
 * @returns {Promise<string>} The notification ID
 */
export async function scheduleNotification({ title, body, data = {}, date }) {
  try {
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data,
      },
      trigger: {
        date,
      },
    });
    return notificationId;
  } catch (error) {
    //console.error('Error scheduling notification:', error);
    throw error;
  }
}

/**
 * Cancel a scheduled notification
 * @param {string} notificationId - The notification ID to cancel
 */
export async function cancelScheduledNotification(notificationId) {
  try {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
  } catch (error) {
    //console.error('Error canceling scheduled notification:', error);
    throw error;
  }
}

/**
 * Cancel all scheduled notifications
 */
export async function cancelAllScheduledNotifications() {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
  } catch (error) {
    //console.error('Error canceling all scheduled notifications:', error);
    throw error;
  }
}

/**
 * Get all scheduled notifications
 * @returns {Promise<Array>} Array of scheduled notifications
 */
export async function getAllScheduledNotifications() {
  try {
    return await Notifications.getAllScheduledNotificationsAsync();
  } catch (error) {
    //console.error('Error getting all scheduled notifications:', error);
    throw error;
  }
}

/**
 * Dismiss all delivered notifications
 */
export async function dismissAllNotifications() {
  try {
    await Notifications.dismissAllNotificationsAsync();
  } catch (error) {
    //console.error('Error dismissing all notifications:', error);
    throw error;
  }
}

/**
 * Get all delivered notifications
 * @returns {Promise<Array>} Array of delivered notifications
 */
export async function getDeliveredNotifications() {
  try {
    return await Notifications.getPresentedNotificationsAsync();
  } catch (error) {
    //console.error('Error getting delivered notifications:', error);
    throw error;
  }
}

/**
 * Set the notification badge count
 * @param {number} count - The badge count
 */
export async function setBadgeCount(count) {
  try {
    await Notifications.setBadgeCountAsync(count);
  } catch (error) {
    //console.error('Error setting badge count:', error);
    throw error;
  }
}

/**
 * Get the notification badge count
 * @returns {Promise<number>} The badge count
 */
export async function getBadgeCount() {
  try {
    return await Notifications.getBadgeCountAsync();
  } catch (error) {
    //console.error('Error getting badge count:', error);
    throw error;
  }
}