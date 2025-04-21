import { View, Text, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { useCallback, useRef, useMemo } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import createRequest from "@/services/api-secure-portal";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault();
const { post } = createRequest();
const { width } = Dimensions.get("window");

//================================= QUERY KEY =================================
const query_keys = ["home_tba"];
//===================================================================================



export default function TarifBatasAtas() {
  const router = useRouter();
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: query_keys,
    queryFn: async () => {
      try {
        const { data : { records, length } } = await post('/mobile/api/portal/home/tarif-batas-atas',{});
        return {
          data: records || [],
          totalData: length || 0,
        };
      } catch (error) {

        throw error;
      }
    }
  });
  
  useFocusEffect(
    useCallback(() => {
        refetch();
    }, []));


    
  if(isLoading){
    return null
  }


  if(isError){
    return null
  }


  return (
    <View className="px-6 mb-6">
      <Text className="text-lg font-bold mb-4 text-gray-600 ml-3 uppercase">
        Tarif Batas Atas
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="space-x-4"
      >
        {data?.data?.map((route, index) => (
          <View
            key={index}
            className="bg-white p-4 rounded-xl border border-gray-200"
            style={{
              width: width * 0.7,
              marginRight: index === data?.data?.length - 1 ? 0 : 12,
            }}
          >
            <View className="flex-row items-center justify-between mb-4">
              <View>
                <Text className="text-2xl font-bold uppercase">{route.x_studio_from?.x_name}</Text>
                <Text className="text-gray-500">{route.x_studio_from?.x_studio_kota}</Text>
              </View>
              <View className="items-center">
                <Ionicons name="airplane" size={20} color="#991B1B" />
              </View>
              <View className="items-end">
                <Text className="text-2xl font-bold uppercase">{route.x_studio_dest?.x_name}</Text>
                <Text className="text-gray-500">{route.x_studio_dest?.x_studio_kota}</Text>
              </View>
            </View>
            <View className="flex-row items-center justify-between">
              <Text className="text-[#991B1B] font-bold">
                MAX - Rp {route.x_studio_tba}
              </Text>
              <TouchableOpacity className="bg-[#991B1B] px-4 py-2 rounded-lg">
                <Text className="text-white">Report</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
