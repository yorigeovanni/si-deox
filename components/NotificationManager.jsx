import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, SafeAreaView } from 'react-native';
import * as Notifications from 'expo-notifications';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { registerForPushNotificationsAsync } from '@/services/notificationService';
import Constants from 'expo-constants';

export default function NotificationManager({ children }) {
  const [notification, setNotification] = useState(null);
  const [permissionStatus, setPermissionStatus] = useState(null);
  const notificationListener = useRef();
  const responseListener = useRef();
  const router = useRouter();

  useEffect(() => {
    // Register for push notifications
    registerForPushNotificationsAsync().then(token => {
      if (token) {
        setPermissionStatus('granted');
      } else {
        setPermissionStatus('denied');
      }
    });

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      const { data } = response.notification.request.content;
      
      // Handle notification tap - navigate to the appropriate screen
      if (data.screen) {
        router.push(data.screen);
      }
    });

    // Clean up the listeners on unmount
    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <View style={styles.container}>
      {children}
      
      {/* Position the banner as an absolute overlay at the top of the screen */}
      {/*permissionStatus === 'denied' && Platform.OS !== 'web' && (
        <View style={styles.bannerContainer} className='bg-black/50'>
          <SafeAreaView>
            <TouchableOpacity 
           
              style={styles.permissionBanner}
              onPress={() => Notifications.requestPermissionsAsync()}
            >
              <Ionicons name="notifications-off" size={24} color="#fff" />
              <Text style={styles.permissionText}>
                Enable notifications to stay updated
              </Text>
              <Ionicons name="chevron-forward" size={14} color="#fff" />
            </TouchableOpacity>
          </SafeAreaView>
        </View>
      )*/}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bannerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000, // Ensure it's above other content
  //  backgroundColor: '#3b82f6',
    paddingTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0,
  },
  permissionBanner: {
  //  backgroundColor: '#3b82f6',
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  permissionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
    marginHorizontal: 12,
  },
});