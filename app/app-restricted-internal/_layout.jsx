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
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { listMenu, basePath } = useSelector((state) => state.aplikasiInternal);
  const { tokenInternal, userInternal } = useSelector((state) => state.auth);




  const textHeader = useCallback(() => {
    const item = listMenu.find((item) => pathname == `${basePath}${item.path}`);
    if (item?.exact) {
      return item?.headerTitle;
    }
    return item ? item.headerTitle : '';
  }, [listMenu, pathname, basePath]);



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

          <View className={classNames('', 'flex items-start justify-start')}>
            <Text className="text-white text-lg font-bold ">{textHeader()} </Text>
            <Text className="text-white text-sm leading-4">BLU UPBU KELAS I DEO - SORONG</Text>
          </View>
        </View>

        {tokenInternal && (<View className="flex-row items-center">
          <TouchableOpacity className="bg-white rounded-full p-2 mx-4" onPress={() => logout()}>
            <Ionicons name="log-out" size={24} color="red" />
          </TouchableOpacity>
        </View>)}
      </View>

      <Stack screenOptions={{ headerShown: false }} />


    </View>
  );
}
