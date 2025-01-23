import React, { useCallback, useMemo } from 'react';
import { View, Text, TouchableOpacity, StatusBar, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import { Stack } from 'expo-router';
import { classNames } from '@/utils';

// STATE MANAGEMENT
import authActions from '@/state/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';



export default function AplikasiInternal() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { listMenu, basePath, headerTitle, headerDescription } = useSelector((state) => state.aplikasiInternal);
  const { user } = useSelector((state) => state.internalUser);




  const onBackCustom = useCallback(() => {
    router.canGoBack() ? router.back() : router.replace('/')
  }, [router]);



  const logout = useCallback((data) => {
    dispatch(authActions.logoutInternal(data));
  },
    [dispatch]
  );



  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Header */}
      <View className={classNames('bg-red-800 pb-5 flex-row justify-between', Platform.OS === 'android' ? "pt-8" : "pt-16")}>

        <View className="flex-row items-center">
          <TouchableOpacity className="bg-white rounded-full p-2 mx-2" onPress={onBackCustom}>
            <Ionicons name="arrow-back" size={18} color="red" />
          </TouchableOpacity>

         
        </View>

        {user && ( <View className={classNames('', 'flex items-end justify-end mr-4')}>
            <Text className="text-white text-lg font-bold "> {user.name}</Text>
            <Text className="text-white text-sm leading-4">{user.department_id?.name} - {user.job_id?.display_name}</Text>
          </View>)}
      </View>

      <Stack screenOptions={{ headerShown: false }} />


    </View>
  );
}
