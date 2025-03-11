import { View, Text, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useCallback, useRef } from "react";
import createRequest from "@/services/api-secure-internal";
import dayjs from "dayjs";

const model_name = "maintenance.request";
const selectedFields = {
  name: {},
  maintenance_type: {},
  priority: {},
  stage_id: {
    fields: {
      name: {},
    },
  },
  equipment_id: {
    fields: {
      name: {},
      category_id: {
        fields: {
          name: {},
        },
      },
    },
  },
  user_id: {
    fields: {
      name: {},
    },
  },
  schedule_date: {},
  duration: {},
  description: {},
  write_date: {},
  write_uid: {
    fields: {
      name: {},
    },
  },
};

const filterOptions = {
  type: [
    { label: "Semua", value: "all" },
    { label: "Korektif", value: "corrective" },
    { label: "Preventif", value: "preventive" },
  ],
  priority: [
    { label: "Semua", value: "all" },
    { label: "Rendah", value: "0" },
    { label: "Normal", value: "1" },
    { label: "Tinggi", value: "2" },
    { label: "Sangat Tinggi", value: "3" },
  ],
};

export default function MaintenanceScreen() {
  const { post } = createRequest();
  const router = useRouter();

  const [filters, setFilters] = useState({
    type: "all",
    priority: "all",
    search: ""
  });

  const [maintenanceState, setMaintenanceState] = useState({
    data: [],
    totalCount: 0,
    loading: false,
    error: null,
    quickStats: {
      scheduled: 0,
      inProgress: 0,
      done: 0
    }
  });



  const constructDomain = useCallback(() => {
    let domain = [];

    if (filters.search) {
      domain.push(["name", "ilike", filters.search]);
    }

    if (filters.type !== "all") {
      domain.push(["maintenance_type", "=", filters.type]);
    }

    if (filters.priority !== "all") {
      domain.push(["priority", "=", filters.priority]);
    }
    return domain;
  }, [filters]);




  const loadData = useCallback(async () => {
    if (!post) return;

    
    try {
      setMaintenanceState(prev => ({ 
        ...prev, 
        loading: true, 
        error: null 
    }));
    //  return ;
      const domain = constructDomain();
      //console.log('Current Domain:', JSON.stringify(domain, null, 2));
      
      const response = await post("/mobile-data", {
        jsonrpc: "2.0",
        method: "call",
        params: {
          model: model_name,
          method: "web_search_read",
          args: [],
          kwargs: {
            specification: selectedFields,
            offset: 0,
            order: "write_date DESC",
            limit: 20,
            count_limit: 10001,
            domain: domain,
          },
        },
      });

      if (response.data?.result) {
        const stats = {
          scheduled: 0,
          inProgress: 0,
          done: 0,
        };

        response.data.result.records.forEach((record) => {
          const stage = record.stage_id?.name?.toLowerCase();
          if (stage?.includes("new") || stage?.includes("submitted")) {
            stats.scheduled++;
          } else if (stage?.includes("progress") || stage?.includes("repair")) {
            stats.inProgress++;
          } else if (stage?.includes("done") || stage?.includes("complete")) {
            stats.done++;
          }
        });

        setMaintenanceState(prev => ({
          ...prev,
          data: response.data.result.records,
          totalCount: response.data.result.length,
          quickStats: stats,
          loading: false,
          error: null
        }));
      }
    } catch (error) {
      //console.error("Error loading maintenance data:", error);
      setMaintenanceState(prev => ({
        ...prev,
        error: error.message || 'Terjadi kesalahan saat memuat data.',
        loading: false
      }));
    }
  }, [ constructDomain]);




  const handleSearch = useCallback((text) => {
    setFilters(prev => ({ 
        ...prev, 
        search: text 
    }));
  }, [setFilters]);





  const handleFilterType = useCallback((value) => {
    setFilters(prev => ({ 
        ...prev, 
        type: value 
    }));
  }, [setFilters]);



  const handleFilterPriority = useCallback((value) => {
    setFilters(prev => ({ 
        ...prev, 
        priority: value 
    }));
  }, [setFilters]);




  const getPriorityColor = (priority) => {
    switch (priority) {
      case "3":
        return "bg-red-100 text-red-600";
      case "2":
        return "bg-orange-100 text-orange-600";
      case "1":
        return "bg-blue-100 text-blue-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };



  const getPriorityText = (priority) => {
    switch (priority) {
      case "3":
        return "Sangat Tinggi";
      case "2":
        return "Tinggi";
      case "1":
        return "Normal";
      default:
        return "Rendah";
    }
  };


  useFocusEffect(
    useCallback(() => {
        loadData();
    }, [loadData, filters])
  );


  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <LinearGradient colors={["#2196F3", "#1976D2"]} className="pt-12 pb-6">
        <View className="px-6 flex-row items-center justify-between py-4">
          <TouchableOpacity
            className="w-10 h-10 bg-white/20 rounded-full items-center justify-center mb-4"
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <View className="flex-col items-end justify-end">
            <Text className="text-white text-2xl font-bold">Pemeliharaan</Text>
            <Text className="text-white/80">Manajemen order pemeliharaan</Text>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-4 px-6"
        >
          <View className="bg-white/10 backdrop-blur-lg rounded-xl p-4 mr-4 w-40">
            <View className="flex-row items-center mb-2">
              <View className="w-8 h-8 bg-yellow-500/20 rounded-lg items-center justify-center">
                <Ionicons name="time" size={18} color="#eab308" />
              </View>
            </View>
            <Text className="text-2xl font-bold text-white">
              {maintenanceState.quickStats.scheduled}
            </Text>
            <Text className="text-white/80">Dijadwalkan</Text>
          </View>

          <View className="bg-white/10 backdrop-blur-lg rounded-xl p-4 mr-4 w-40">
            <View className="flex-row items-center mb-2">
              <View className="w-8 h-8 bg-blue-500/20 rounded-lg items-center justify-center">
                <Ionicons name="construct" size={18} color="#3b82f6" />
              </View>
            </View>
            <Text className="text-2xl font-bold text-white">
              {maintenanceState.quickStats.inProgress}
            </Text>
            <Text className="text-white/80">Dalam Proses</Text>
          </View>

          <View className="bg-white/10 backdrop-blur-lg rounded-xl p-4 mr-4 w-40">
            <View className="flex-row items-center mb-2">
              <View className="w-8 h-8 bg-green-500/20 rounded-lg items-center justify-center">
                <Ionicons name="checkmark-circle" size={18} color="#22c55e" />
              </View>
            </View>
            <Text className="text-2xl font-bold text-white">
              {maintenanceState.quickStats.done}
            </Text>
            <Text className="text-white/80">Selesai</Text>
          </View>
        </ScrollView>
      </LinearGradient>

      <ScrollView className="flex-1">
        <View className="p-6 -mt-6">
          <View className="bg-white rounded-xl px-4 py-3 mb-4 border border-gray-200">
            <View className="flex-row items-center">
              <Ionicons name="search" size={20} color="#666" />
              <TextInput
                className="flex-1 ml-2 text-base"
                placeholder="Cari order pemeliharaan..."
                value={filters.search}
                onChangeText={handleSearch}
              />
            </View>
          </View>

          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 mb-2">Tipe</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {filterOptions.type.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  onPress={() => handleFilterType(option.value)}
                  className={`mr-3 px-4 py-2 rounded-full ${
                    filters.type === option.value
                      ? "bg-blue-600"
                      : "bg-white border border-blue-600"
                  }`}
                >
                  <Text
                    className={`${
                      filters.type === option.value
                        ? "text-white"
                        : "text-blue-600"
                    } capitalize`}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Prioritas
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {filterOptions.priority.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  onPress={() => handleFilterPriority(option.value)}
                  className={`mr-3 px-4 py-2 rounded-full ${
                    filters.priority === option.value
                      ? "bg-blue-600"
                      : "bg-white border border-blue-600"
                  }`}
                >
                  <Text
                    className={`${
                      filters.priority === option.value
                        ? "text-white"
                        : "text-blue-600"
                    } capitalize`}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <TouchableOpacity
            className="bg-white p-4 rounded-xl border border-gray-200 mb-6"
            onPress={() => router.push("./create")}
          >
            <View className="flex-row items-center justify-center">
              <Ionicons name="add-circle" size={20} color="#2196F3" />
              <Text className="text-blue-600 font-semibold ml-2">
                Buat Order Pemeliharaan
              </Text>
            </View>
          </TouchableOpacity>

          {maintenanceState.loading ? (
            <View className="flex-1 justify-center items-center py-12">
              <ActivityIndicator size="large" color="#2196F3" />
              <Text className="text-gray-600 mt-4">
                Memuat data pemeliharaan...
              </Text>
            </View>
          ) : maintenanceState.error ? (
            <View className="flex-1 justify-center items-center p-6">
              <View className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg">
                <View className="items-center mb-4">
                  <Ionicons name="alert-circle" size={48} color="#ef4444" />
                </View>

                <Text className="text-red-600 text-center font-medium text-lg mb-2">
                  Terjadi Kesalahan
                </Text>

                <Text className="text-gray-600 text-center mb-6">
                  {maintenanceState.error}
                </Text>

                <View className="flex-row justify-center">
                  <TouchableOpacity
                    onPress={loadData}
                    className="bg-blue-600 px-6 py-3 rounded-lg flex-row items-center"
                  >
                    <Ionicons
                      name="refresh"
                      size={20}
                      color="white"
                      className="mr-2"
                    />
                    <Text className="text-white font-medium">Muat Ulang</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ) : (
            maintenanceState.data.map((order) => (
              <View
                key={order.id}
                className="bg-white rounded-xl p-4 mb-4 border border-gray-200"
              >
                <View className="flex-row justify-between items-start mb-3">
                  <View>
                    <Text className="text-xl font-bold">{order.name}</Text>
                    <Text className="text-gray-600">
                      {order.equipment_id?.name}
                    </Text>
                  </View>
                  <View
                    className={`px-3 py-1 rounded-full ${getPriorityColor(
                      order.priority
                    )}`}
                  >
                    <Text className="text-xs font-medium">
                      {getPriorityText(order.priority)}
                    </Text>
                  </View>
                </View>

                <View className="bg-gray-50 p-3 rounded-lg mb-4">
                  <View className="flex-row justify-between items-center">
                    <View>
                      <Text className="text-gray-600">Tipe</Text>
                      <Text className="font-bold text-lg">
                        {order.maintenance_type === "corrective"
                          ? "Korektif"
                          : "Preventif"}
                      </Text>
                    </View>
                    <View className="h-12 w-[1px] bg-gray-200" />
                    <View>
                      <Text className="text-gray-600">Status</Text>
                      <Text className="font-bold text-lg">
                        {order.stage_id?.name}
                      </Text>
                    </View>
                    <View className="h-12 w-[1px] bg-gray-200" />
                    <View>
                      <Text className="text-gray-600">Durasi</Text>
                      <Text className="font-bold text-lg">
                        {order.duration} Jam
                      </Text>
                    </View>
                  </View>
                </View>

                {order.description && (
                  <View className="bg-blue-50 p-3 rounded-lg mb-4">
                    <Text className="text-blue-800 font-medium mb-1">
                      Deskripsi:
                    </Text>
                    <Text className="text-blue-600">{order.description}</Text>
                  </View>
                )}

                <View className="flex-row mt-4 pt-4 border-t border-gray-100">
                  <TouchableOpacity
                    className="flex-1 flex-row items-center justify-center"
                    onPress={() => router.push(`./edit/${order.id}`)}
                  >
                    <Ionicons name="create" size={20} color="#2196F3" />
                    <Text className="text-blue-600 ml-2">Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="flex-1 flex-row items-center justify-center">
                    <Ionicons name="document-text" size={20} color="#2196F3" />
                    <Text className="text-blue-600 ml-2">Detail</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="flex-1 flex-row items-center justify-center">
                    <Ionicons
                      name="checkmark-circle"
                      size={20}
                      color="#2196F3"
                    />
                    <Text className="text-blue-600 ml-2">Selesai</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="flex-1 flex-row items-center justify-center">
                    <Ionicons name="trash" size={20} color="#ef4444" />
                    <Text className="text-red-500 ml-2">Hapus</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}