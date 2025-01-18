import React, { useCallback, useState } from "react";
import { useRouter } from "expo-router";
import { View, ScrollView, Text, TouchableOpacity, StatusBar, Platform, Image } from 'react-native';
import { classNames } from '@/utils';
import DeoLogo from '@/assets/icon-baru.png';

// STATE MANAGEMENT



export default function RootIndex() {
  const router = useRouter();




  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle={Platform.OS === 'android' ? "light-content" : "dark-content"} translucent backgroundColor="#b91c1c" />

      <View className={classNames('bg-white px-4 pb-4 flex-1 flex-col justify-center items-center', Platform.OS === 'android' ? "" : "")}>


        <View className="flex-row items-center space-x-8">
          <Image source={DeoLogo} style={{ width: 150, height: 60 }} />

        </View>
        <View className="flex-col items-center justify-center space-y-0">
          <Text className="text-red-700 text-xl font-extrabold ">DEO AIRPORT</Text>
          <Text className="text-red-700 text-lg leading-6 ">TERDEPAN - BERKUALITAS - BERSINAR</Text>
        </View>

        <View className="flex-col items-center justify-center space-y-0 mx-12 mt-12">
          <Text className="  text-red-700 mt-8 text-center">Maaf, Modul ini sedang dalam pemeliharaan, silahkan kembali lagi nanti</Text>
          <TouchableOpacity className="bg-red-700 rounded-full p-2 mt-4" onPress={() => router.canGoBack() ? router.back() : router.replace('/')}>
            <Text className="text-white text-sm">KEMBALI</Text>
          </TouchableOpacity>
        </View>

      </View>






      <View className="flex flex-col items-center justify-center bg-white pt-3 pb-6 ">
        <Text className="text-red-800 text-xs font-bold">BLU UPBU KELAS I DOMINE EDUARD OSOK - SORONG </Text>
        <Text className="text-red-800 text-xs">DIREKTORAT JENDERAL PERHUBUNGAN UDARA </Text>
        <Text className="text-red-800 text-xs">KEMENTERIAN PERHUBUNGAN</Text>
      </View>
    </View>
  );
}






