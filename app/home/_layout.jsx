import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View } from "react-native";
import { useSelector } from "react-redux";

export default function HomePublicLayout() {
  const { phoneNumber } = useSelector((state) => state.device);

  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: 'white',
          },
          tabBarActiveTintColor: '#991B1B',
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'HOME',
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="landing-penerbangan"
          options={{
            title: 'FLIGHTS',
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="airplane" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="landing-aplikasi-stackholder"
          options={{
            href: phoneNumber.startsWith('62') ? '/home/landing-aplikasi-stackholder' : null,
            title: 'STACKHOLDERS',
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="wallet" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="landing-aplikasi-internal"
          options={{
            href: phoneNumber.startsWith('62') ? '/home/landing-aplikasi-internal' : null,
            title: 'INTERNALS',
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="document-text" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}