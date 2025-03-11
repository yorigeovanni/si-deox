import { View, Text, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { useState, useCallback, useRef, useMemo } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useModelQuery } from "@/services/queryClientPublic";
const { width } = Dimensions.get("window");



export default function TarifBatasAtas() {
  const router = useRouter();
  const [{ domain, limit, offset, order }, setParams ] = useState({
    domain: [],
    searchQuery: "",
    filterStatus: null,
    limit: 10,
    offset: 0,
    order: "create_date DESC",
  });

  const queryOptions = useMemo(
    () => ({
      model: "x_mobile_tarif_tba",
      selectedFields: {
        x_studio_from: {
            fields : {
                x_name : {},
                x_studio_kota : {}
            }
        },
        x_studio_dest: {
            fields : {
                x_name : {},
                x_studio_kota : {}
            }
        },
        x_studio_tba: {},
      },
      offset: offset,
      order: order,
      limit: limit,
      count_limit: 100001,
      domain: domain,
    }),
    [domain, limit, offset, order]
  );

  const { data, isLoading, isError, refetch } = useModelQuery(queryOptions);
  
  useFocusEffect(
    useCallback(() => {
        refetch();
    }, []));


    
  if(isLoading){
    return <Text>Loading...</Text>
  }


  if(isError){
    return <Text>Error...</Text>
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
        {data?.records?.map((route, index) => (
          <View
            key={index}
            className="bg-white p-4 rounded-xl border border-gray-200"
            style={{
              width: width * 0.7,
              marginRight: index === data?.records.length - 1 ? 0 : 12,
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
