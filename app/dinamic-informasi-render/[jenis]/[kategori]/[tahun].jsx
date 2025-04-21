import {
  Alert,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  Dimensions,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

import { useRef, useCallback, useState } from "react";
import { useSharedValue, withSpring } from "react-native-reanimated";
import { useRouter, useFocusEffect, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LoadingSpinner } from "@/components/ui/LoadingIndicators";
import { ErrorState } from "@/components/ui/ErrorState";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
const { width: SCREEN_WIDTH } = Dimensions.get("window");

//================================= QUERY KEY =================================
const query_keys = ["global-informasi-read"];
//===================================================================================

export default function GlobalRead() {
  const queryClient = useQueryClient();
  const firstTimeRef = useRef(true);
  const router = useRouter();
  const { jenis, kategori, tahun } = useLocalSearchParams();
  const translateX = useSharedValue(SCREEN_WIDTH);

  const mainModules = [
    {
      name: "PAS BANDARA",
      icon: "cart",
      color: "#4CAF50",
      route: "./pas-bandara",
    },
    {
      name: "REKON DATA",
      icon: "cube",
      color: "#2196F3",
      route: "./rekon-data",
    },
    {
      name: "PUBLIKASI",
      icon: "basket",
      color: "#9C27B0",
      route: "./publikasi",
    },
    {
      name: "PERSURATAN",
      icon: "construct",
      color: "#FF9800",
      route: "./persuratan",
    },
    {
      name: "ACCOUNT",
      icon: "calculator",
      color: "#F44336",
      route: "./personil",
    },
    { name: "TAGIHAN", icon: "people", color: "#00BCD4", route: "./tagihan" },
  ];

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: [...query_keys, jenis, kategori, tahun],
    queryFn: async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        const { data } = await post(`/mobile/api/portal/${jenis}/${kategori}`, {
          tahun: tahun,
        });
        return data;
      } catch (error) {
        throw error;
      }
    },
    keepPreviousData: true,
  });

  useFocusEffect(
    useCallback(() => {
      translateX.value = withSpring(0, {
        damping: 20,
        stiffness: 90,
      });
      if (firstTimeRef.current) {
        firstTimeRef.current = false;
        return;
      }
      refetch();
    }, [refetch])
  );

  const onRefresh = useCallback(() => {
    refetch();
  }, []);

  console.log(data);

  return (
    <SafeAreaView className="flex-1 bg-[#991B1B]" edges={["top"]}>
      <View className="px-6 py-3 bg-[#991B1B]">
        <View className="flex-row justify-between items-center mb-8">
        <TouchableOpacity
            className="w-10 h-10 bg-white/20 rounded-full items-center justify-center"
            onPress={() => router.back()}
          >
            <Ionicons name="person-outline" size={20} color="white" />
          </TouchableOpacity>
          <View className=" flex-col items-end justify-end">
            <Text className="text-white/80">{kategori}</Text>
            <Text className="text-white text-2xl font-bold">{kategori}</Text>
          </View>
          
        </View>
      </View>
      <ScrollView className="flex-1 bg-gray-50 ">
        <LinearGradient colors={["#991B1B", "#500724"]}>
          <View className="px-3 pb-10">
            {/* Quick Stats */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-4"
            >
              <View className="bg-white/10 backdrop-blur-lg p-4 rounded-xl mr-4 w-56">
                <Text className="text-white/80 mb-2">TOTAL HUTANG</Text>
                <Text className="text-white text-xl font-bold">
                  Rp 250,000,000
                </Text>
                <View className="flex-row items-center mt-2">
                  <Ionicons name="trending-up" size={16} color="#4CAF50" />
                  <Text className="text-green-400 ml-1">
                    +15% vs last month
                  </Text>
                </View>
              </View>

              <View className="bg-white/10 backdrop-blur-lg p-4 rounded-xl mr-4 w-56">
                <Text className="text-white/80 mb-2">TOTAL PIUTANG</Text>
                <Text className="text-white text-xl font-bold">24</Text>
                <View className="flex-row items-center mt-2">
                  <Ionicons name="time" size={16} color="#FFC107" />
                  <Text className="text-yellow-400 ml-1">5 need attention</Text>
                </View>
              </View>

              <View className="bg-white/10 backdrop-blur-lg p-4 rounded-xl w-56">
                <Text className="text-white/80 mb-2">Inventory Value</Text>
                <Text className="text-white text-xl font-bold">
                  Rp 1,500,000,000
                </Text>
                <View className="flex-row items-center mt-2">
                  <Ionicons name="alert" size={16} color="#FF5722" />
                  <Text className="text-orange-400 ml-1">
                    3 items low stock
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>
        </LinearGradient>

        <View className="px-3 -mt-12">
          <View className=" rounded-xl p-3 ">
            {/* Quick Stats */}
            <View className="flex-row justify-between mb-6">
              <View className="bg-white p-4 rounded-xl shadow-sm flex-1 mr-2">
                <Text className="text-gray-600 mb-1">Total Tagihan</Text>
                <Text className="text-2xl font-bold">Rp 25M</Text>
                <View className="flex-row items-center mt-1">
                  <Ionicons name="alert-circle" size={16} color="#FF9800" />
                  <Text className="text-orange-600 text-sm ml-1">
                    3 jatuh tempo
                  </Text>
                </View>
              </View>
              <View className="bg-white p-4 rounded-xl shadow-sm flex-1 ml-2">
                <Text className="text-gray-600 mb-1">Status Kontrak</Text>
                <Text className="text-2xl font-bold">Aktif</Text>
                <Text className="text-gray-500 text-sm mt-1">
                  Hingga Des 2024
                </Text>
              </View>
            </View>
          </View>

          <View className=" px-4 ">
            <View className="flex-row flex-wrap justify-start items-center">
              {mainModules.map((module, index) => (
                <TouchableOpacity
                  key={index}
                  className="w-[33%] items-center mb-6"
                  onPress={() =>
                    module.route &&
                    router.push(module.route, { relativeToDirectory: true })
                  }
                >
                  <View
                    className="w-14 h-14 rounded-2xl items-center justify-center mb-2"
                    style={{ backgroundColor: module.color }}
                  >
                    <Ionicons name={module.icon} size={24} color="white" />
                  </View>
                  <Text className="text-center text-xs">{module.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
