import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import createRequest from '@/core/api-secure'; 
import { useSelector } from 'react-redux';

const { post } = createRequest();

export default function ViewId() {
  const { id_record } = useLocalSearchParams();
  const { deviceId } = useSelector((state) => state.config);
  const { jwtAccessToken } = useSelector((state) => state.aplikasiInternal);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['amc-unscheduled-view', id_record],
    queryFn: async () => {
      const model = "x_data_amc";
      const action = "web_search_read";
      const { data } = await post(
        `/mobile/api/internal/${model}/${action}`,
        {
          jsonrpc: "2.0",
          method: "call",
          params: {
            model,
            method: action,
            args: [],
            kwargs: {
              specification: {
                x_studio_operator: { fields: { display_name: {} } },
                x_studio_type_pesawat: { fields: { display_name: {} } },
                x_studio_status: {},
              },
              offset: 0,
              limit: 1,
              domain: [["id", "=", parseInt(id_record, 10)]],
              context: {
                //lang: "id_ID",
                //tz: "Asia/Jakarta",
                //uid: 2
              }
            }
          }
        },
        {
          deviceId,
          jwtAccessToken
        }
      );
      return data;
    },
    enabled: !!id_record,
  });


  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator />
      </View>
    );
  }


  if (isError) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-red-600">Terjadi Error: {error?.message}</Text>
      </View>
    );
  }


  const records = data?.result?.records;
  if (!records || records.length === 0) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Data tidak ditemukan.</Text>
      </View>
    );
  }


  const detailData = records[0];

  return (
    <View className="flex-1 p-4">
    
      <Text className="mb-1">
        Operator: {detailData.x_studio_operator?.display_name}
      </Text>
      <Text className="mb-1">
        Type Pesawat: {detailData.x_studio_type_pesawat?.display_name}
      </Text>
      <Text className="mb-1">
        Status: {detailData.x_studio_status}
      </Text>
     
    </View>
  );
}
