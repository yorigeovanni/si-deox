import { Stack } from 'expo-router';
import { useState,useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, ActivityIndicator, Text } from 'react-native';
import { jwtDecode } from 'jwt-decode';
import { useRouter, useSegments, usePathname, Redirect, useFocusEffect } from 'expo-router';




export default function ProtectedLandingInternal() {
  const checkedChildrenSegment = useRef(false);
  const latestChildrenSegment = useRef('');
  const [allow, setAllow] = useState(null);
  const segments = useSegments();
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const { internalUser } = useSelector(state => state.auth);
  const { user, loading, jwtAccessToken } = internalUser;


  if(!user){
    return (
      <Redirect href="/auth/login-internal" />
    )
  }

  if(loading){
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#007AFF" />
        <Text className="mt-4 text-gray-600">Loading...</Text>
      </View>
    )
  }

  return (
      <Stack screenOptions={{headerShown: false}} />
  );
}
