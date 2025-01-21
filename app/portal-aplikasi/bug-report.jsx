import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  Dimensions, 
  TouchableOpacity, 
  Modal, 
  TextInput, 
  Button 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';



export default function AplikasiInternal() {
  const router = useRouter();
  return (
    <ScrollView className={`flex-1 bg-white`}>
      <Button title="AMC" onPress={() => router.push('/app-restricted-internal/amc')} />
 

    </ScrollView>
  );
}
