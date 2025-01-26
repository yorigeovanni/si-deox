import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import createRequest from '@/core/api-secure-internal'; 
import { useSelector } from 'react-redux';
import WebView from 'react-native-webview';
import { useAssets } from 'expo-asset';

const { post } = createRequest();

export default function ViewId() {
  const [htmlContent, setHtmlContent] = useState(null);
  const baseURL =
  process.env.NODE_ENV === "production"
    ? process.env.EXPO_PUBLIC_API_URL
    : "http://10.8.0.2:4002";


  useEffect(() => {
    async function loadHtml() {
      // Jika assets sudah dimuat
      if (assets) {
        try {
          console.log('sdas')
        } catch (error) {
         console.log('sdas')
        }
      }
    }

    loadHtml();
  }, []);



  return (
    <View className='flex-1'>
      <View className='bg-blue-500 mt-24'>
        <Text>sdfsdfsdfsdfsd</Text>
      </View>
      <View className=' flex-1 py-4 bg-white'>
      <WebView
        className='flex-1'
        originWhitelist={['*']}
        source={{ uri: `${baseURL}/mobile/api/portal/content` }}
      />
    </View>
    </View>
  );
}


