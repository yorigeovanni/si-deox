import React, { useState, useRef, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import createRequest from '@/core/api-secure-internal';
const { post } = createRequest();



const class_map_status = {
  SCH: ' text-gray-400',
  CKO: ' font-bold text-green-300',
  TWR: ' font-semibold text-yellow-300',
  LAS: 'text-lg font-semibold text-red-600',
  BOR: 'text-lg font-semibold text-red-600',
  SEC: 'text-lg font-semibold text-red-600',
  DEP: 'text-lg font-semibold text-red-600',
}



export default function Kedatangan() {
  const router = useRouter();
  const firstTimeRef = useRef(true);
  const baseURL = process.env.NODE_ENV === "production" ? process.env.EXPO_PUBLIC_API_URL : "http://10.8.0.2:4002";


  const {
    data,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['penerbangan-arrivals'],
    queryFn: async () => {
      const { data } = await post(`/mobile/api/portal/penerbangan/arrivals`);
      return data;
    },
    rrefetchInterval: 5000
  });

  useFocusEffect(
    useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false;
        return;
      }
      refetch();
    }, [refetch])
  );

  return (
    <ScrollView className="flex-1 bg-white px-4">
      {/* Tampilkan jumlah data */}
      {/** <Text className="text-black mt-4 font-bold">
        {data?.hari_ini?.length} Data
      </Text>  */}

      {/* Kondisi loading/error/data */}
      {isLoading ? (
        <Text className="text-gray-700 mt-4">Loading...</Text>
      ) : isError ? (
        <Text className="text-red-500 mt-4">Error: {error.message}</Text>
      ) : (
        // Map data jika ada
        data?.hari_ini?.map((item, index) => (
          <View
            key={index}
            className="bg-white rounded-xl p-4 mt-4 shadow-lg"
          >
            {/* Header Card */}
            <View className="flex-row justify-between mb-4">
              <View className="flex-col space-x-4">
                <View className='mr-4'>
                  <Image resizeMode="contain" source={{ uri: `${baseURL}/fids-assets/img/AL_S_small_${item.airline}.jpg` }} style={{ width: 150, height: 40, borderRadius: 2 }} />
                </View>
                <View>
                  {/**<Text className="text-gray-800 text-xl font-bold">{item.operator}</Text> */}
                  <Text className="text-gray-700 text-sm font-bold ml-2">{item.nama_kota}</Text>
                </View>
              </View>
              <View className='flex-end items-end justify-end'>
                <Text className=" text-gray-700 text-xl font-bold">{item.airline} - {item.flight_no}</Text>
                <Text className="text-gray-500 text-sm font-bold">{item.dest_from} - SOQ</Text>
              </View>
            </View>

            {/* Detail Card */}
            <View className="flex-row justify-between mb-4">
              <View className="flex-1 items-center">
                <Text className="text-gray-500 text-sm">ESTIMATE</Text>
                {item.is_besok ? (<Text className="text-red-700 text-xs">{item.text_tanggal?.toUpperCase()}</Text>) : null}
                <Text className="text-black text-lg font-bold">{item.jadwal_local} WIT</Text>
              </View>
              <View className="flex-1 items-center">
                <Text className="text-gray-500 text-sm">ACTUAL</Text>
                <Text className="text-black text-lg font-bold">{item.actual_local} WIT</Text>
              </View>
            </View>

            <View className="flex-row justify-between mb-4">
              <View className="flex-1 items-center">
                <Text className="text-gray-600 text-sm">STATUS</Text>
                <Text className="text-gray-700 text-lg font-bold">{item.status_text}</Text>
              </View>
              <View className="flex-1 items-center">
                <Text className="text-gray-600 text-sm">BAGGAGE CLAIM</Text>
                <Text className="text-gray-700 text-xl font-bold">{item.belt || ' - '}</Text>
              </View>
            </View>

            {/* Footer Card */}
            <View className="flex-row justify-between">
              <TouchableOpacity className="flex-1 bg-white py-2 rounded-lg items-center mx-1">

              </TouchableOpacity>
              <TouchableOpacity className="flex-1 bg-gray-100 py-2 rounded-lg items-center mx-1">
                <Text className="text-gray-700 font-bold text-xs">NOTIFICATION</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
}
