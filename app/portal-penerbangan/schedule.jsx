import React, { useState, useRef, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import createRequest from '@/core/api-secure';
const { post } = createRequest();
const rootKey = 'penerbangan-scedules';


const class_map_status = {
  SCH: ' text-gray-400',
  CKO: ' font-bold text-green-300',
  TWR: ' font-semibold text-yellow-300',
  LAS: 'text-lg font-semibold text-red-600',
  BOR: 'text-lg font-semibold text-red-600',
  SEC: 'text-lg font-semibold text-red-600',
  DEP: 'text-lg font-semibold text-red-600',
}






export default function Keberangkatan() {
  const router = useRouter();
  const firstTimeRef = useRef(true);

  const {
    data,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: [rootKey],
    queryFn: async () => {
      const { data } = await post(`/mobile/api/portal/penerbangan/departures`);
      return data;
    },
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
      </Text> */}

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
            className="bg-white rounded-xl p-4 mt-4 shadow"
          >
            {/* Header Card */}
            <View className="flex-row justify-between mb-4">
              <View>
                <Text className="text-gray-800 text-xl font-bold">GARUDA INDONESIA</Text>
                <Text className="text-gray-700 text-xs">{item.jadwal_local}</Text>
              </View>
              <View className='flex-end items-end justify-end'>
              <Text className=" text-gray-700 text-xl font-bold">{item.airline} - {item.flight_no}</Text>
                <Text className="text-gray-500 text-sm font-bold">SOQ - {item.dest_from}</Text>
              </View>
            </View>
            

            {/* Detail Card */}
            <View className="flex-row justify-between mb-4">
              <View className="flex-1 items-center">
                <Text className="text-gray-500 text-sm">ESTIMATE</Text>
                <Text className="text-black text-lg font-bold">{item.jadwal_local} WIT</Text>
              </View>
              <View className="flex-1 items-center">
                <Text className="text-gray-500 text-sm">STATUS</Text>
                <Text className="text-black text-lg font-bold">{item.status_text}</Text>
              </View>
            </View>

            <View className="flex-row justify-between mb-4">
              <View className="flex-1 items-center">
                <Text className="text-gray-600 text-sm">CHECKIN STATUS</Text>
                <Text className="text-gray-700 text-lg font-bold">{item.counter || 'CLOSED'}</Text>
              </View>
              <View className="flex-1 items-center">
                <Text className="text-gray-600 text-sm">BOARDING GATE</Text>
                <Text className="text-gray-700 text-xl font-bold">{item.gate || ' - '}</Text>
              </View>
            </View>

            {/* Footer Card */}
            <View className="flex-row justify-between">
              <TouchableOpacity className="flex-1 bg-red-700 py-2 rounded-lg items-center mx-1">
                <Text className="text-white font-bold text-xs">CHECK-IN</Text>
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
