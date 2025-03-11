import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCallback } from "react";
import { useRouter, useFocusEffect } from "expo-router";
import { useCustomQuery } from "@/services/queryClient";

const mainModules = [
  {
    name: "FASILITAS",
    icon: "people",
    color: "#EC4899",
    route: "./content-fasilitas",
  },
  {
    name: "LAYANAN",
    icon: "people",
    color: "#9D174D",
    route: "./content-layanan",
  },
  {
    name: "INFORMASI",
    icon: "people",
    color: "#DB2777",
    route: "./content-informasi",
  },
  {
    name: "KEGIATAN",
    icon: "people",
    color: "#BE123C",
    route: "./content-kegiatan",
  },
  {
    name: "PERATURAN",
    icon: "people",
    color: "#F43F5E",
    route: "./content-peraturan",
  },
  {
    name: "TARIF BATAS",
    icon: "checkbox",
    color: "#F472B6",
    route: "./content-tarif-batas",
  },
];

export default function StakeholderScreen() {
  const router = useRouter();
  const { data, isLoading, isError, refetch } = useCustomQuery({
    keys: "/mobile/api/internal/tu-humas/dashboard",
    params: {},
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  );

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#007AFF" />
        <Text className="mt-4 text-gray-600">Loading...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-gray-600">Error while fetching data</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#9F1239]" edges={["top"]}>
      <View className="px-6 py-3 bg-[#9F1239]">
        <View className="flex-row justify-between items-center mb-8">
          <TouchableOpacity
            className="w-10 h-10 bg-white/20 rounded-full items-center justify-center"
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={20} color="white" />
          </TouchableOpacity>
          <View className="items-end justify-end">
            <Text className="text-white text-2xl font-bold">TU - HUMAS</Text>
            <Text className="text-white/80">DEO AIRPORT</Text>
          </View>
        </View>
      </View>

      <ScrollView className="flex-1 bg-gray-50 ">
        <LinearGradient colors={["#9F1239", "#500724"]}>
          <View className="px-3 pb-10">
            {/* Quick Stats */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-4"
            >
              <View className="bg-white/10 backdrop-blur-lg p-4 rounded-xl mr-4 w-56">
                <Text className="text-white/80 mb-2">CAPAIAN KPI UNIT</Text>
                <Text className="text-white text-xl font-bold">
                  2025 - 0.00%
                </Text>
                <View className="flex-row items-center mt-2">
                  <Ionicons name="trending-up" size={16} color="#4CAF50" />
                  <Text className="text-green-400 ml-1">
                    + 0% vs last month
                  </Text>
                </View>
              </View>

              <View className="bg-white/10 backdrop-blur-lg p-4 rounded-xl mr-4 w-56">
                <Text className="text-white/80 mb-2">CAPAIAN KPI PERSONIL</Text>
                <Text className="text-white text-xl font-bold">
                  2025 - 0.00%
                </Text>
                <View className="flex-row items-center mt-2">
                  <Ionicons name="time" size={16} color="#FFC107" />
                  <Text className="text-yellow-400 ml-1">0 need attention</Text>
                </View>
              </View>

              <View className="bg-white/10 backdrop-blur-lg p-4 rounded-xl w-56">
                <Text className="text-white/80 mb-2">KEHADIRAN PERSONIL</Text>
                <Text className="text-white text-xl font-bold">
                  2025 - 0.00%
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

        <View className="px-2 -mt-12">
          <View className=" rounded-xl p-3 ">
            {/* Quick Stats */}
            <View className="flex-row justify-between mb-6">
              <TouchableOpacity 
              onPress={() => router.push("./content-pengaduan", { relativeToDirectory: true })}
              className="bg-white p-4 rounded-xl border border-gray-300  flex-1 mr-2">
                <Text className="text-gray-600 mb-1 text-xs">
                  PENGADUAN MASYARAKAT
                </Text>
                <Text className="text-2xl font-bold">
                  {" "}
                  {data?.pengaduan || 0}
                </Text>
                <View className="flex-row items-center mt-1">
                  <Ionicons name="alert-circle" size={16} color="#FF9800" />
                  <Text className="text-orange-600 text-sm ml-1">
                    {data.pengaduan_unclose || 0} belum diproses
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity className="bg-white p-4 rounded-xl border border-gray-300 flex-1 ml-2">
                <Text className="text-gray-600 mb-1 text-xs ">
                  PERMINTAAN INFORMASI
                </Text>
                <Text className="text-2xl font-bold">{data?.ppid || 0}</Text>
                <Text className="text-orange-600 text-sm ml-1">
                {data.ppid_unclose || 0} belum diproses
                </Text>
              </TouchableOpacity>
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
