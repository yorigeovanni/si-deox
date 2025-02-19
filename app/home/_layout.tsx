import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View } from "react-native";


export default function HomePublicLayout() {
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
            title: 'FLIGHT',
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="airplane" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="landing-aplikasi-stackholder"
          options={{
            title: 'MITRA',
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="wallet" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="landing-aplikasi-internal"
          options={{
            title: 'PERSONIL',
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="document-text" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="landing-cat-exam"
          options={{
            title: 'CAT',
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="construct" size={size} color={color} />
            ),
          }}
        />
       
      </Tabs>
    </View>
  );
}