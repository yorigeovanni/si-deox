import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import ProfileScreen from './profile';
import SettingsScreen from './settings';
import { SafeAreaView } from "react-native-safe-area-context";


export default function UserScreen() {
  const [activeTab, setActiveTab] = useState('profile');
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <View className="flex-row bg-white ">
        <TouchableOpacity
          onPress={() => setActiveTab('profile')}
          className={`flex-1 py-4 ${activeTab === 'profile' ? 'border-b-2 border-red-800' : ''}`}
        >
          <Text className={`text-center font-semibold ${activeTab === 'profile' ? 'text-red-800' : 'text-gray-600'}`}>
            PROFILE
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab('settings')}
          className={`flex-1 py-4 ${activeTab === 'settings' ? 'border-b-2 border-red-800' : ''}`}
        >
          <Text className={`text-center font-semibold ${activeTab === 'settings' ? 'text-red-800' : 'text-gray-600'}`}>
            PENGATURAN
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'profile' ? <ProfileScreen /> : <SettingsScreen />}
    </SafeAreaView>
  );
}