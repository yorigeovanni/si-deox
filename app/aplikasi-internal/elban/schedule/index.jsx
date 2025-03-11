import { View, Text, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useCallback } from "react";
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
  period: [
    { label: "Hari Ini", value: "today" },
    { label: "Minggu Ini", value: "week" },
    { label: "Bulan Ini", value: "month" },
  ],
  type: [
    { label: "Semua", value: "all" },
    { label: "Korektif", value: "corrective" },
    { label: "Preventif", value: "preventive" },
  ],
};

export default function MaintenanceScheduleScreen() {
  const { post } = createRequest();
  const router = useRouter();

  const [filters, setFilters] = useState({
    period: "week",
    type: "all",
    search: ""
  });

  const [scheduleState, setScheduleState] = useState({
    data: [],
    totalCount: 0,
    loading: false,
    error: null,
    quickStats: {
      today: 0,
      thisWeek: 0,
      thisMonth: 0,
      overdue: 0
    }
  });

  const constructDomain = useCallback(() => {
    let domain = [];
    const today = dayjs().startOf('day');

    // Search filter
    if (filters.search) {
      domain.push("|");
      domain.push(["name", "ilike", filters.search]);
      domain.push(["equipment_id.name", "ilike", filters.search]);
    }

    // Type filter
    if (filters.type !== "all") {
      domain.push(["maintenance_type", "=", filters.type]);
    }

    // Period filter
    switch (filters.period) {
      case "today":
        domain.push(["schedule_date", ">=", today.format("YYYY-MM-DD")]);
        domain.push(["schedule_date", "<", today.add(1, 'day').format("YYYY-MM-DD")]);
        break;
      case "week":
        domain.push(["schedule_date", ">=", today.startOf('week').format("YYYY-MM-DD")]);
        domain.push(["schedule_date", "<=", today.endOf('week').format("YYYY-MM-DD")]);
        break;
      case "month":
        domain.push(["schedule_date", ">=", today.startOf('month').format("YYYY-MM-DD")]);
        domain.push(["schedule_date", "<=", today.endOf('month').format("YYYY-MM-DD")]);
        break;
    }

    return domain;
  }, [filters]);

  const loadScheduleData = useCallback(async () => {
    try {
      setScheduleState(prev => ({ ...prev, loading: true, error: null }));

      const domain = constructDomain();
      
      // Fetch scheduled maintenance tasks
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
            order: "schedule_date ASC",
            limit: 50,
            domain: domain,
          },
        },
      });

      if (response.data?.result) {
        // Calculate quick stats
        const today = dayjs().startOf('day');
        const stats = {
          today: 0,
          thisWeek: 0,
          thisMonth: 0,
          overdue: 0
        };

        response.data.result.records.forEach(task => {
          const scheduleDate = dayjs(task.schedule_date);
          
          if (scheduleDate.isSame(today, 'day')) {
            stats.today++;
          }
          if (scheduleDate.isSame(today, 'week')) {
            stats.thisWeek++;
          }
          if (scheduleDate.isSame(today, 'month')) {
            stats.thisMonth++;
          }
          if (scheduleDate.isBefore(today)) {
            stats.overdue++;
          }
        });

        setScheduleState(prev => ({
          ...prev,
          data: response.data.result.records,
          totalCount: response.data.result.length,
          quickStats: stats,
          loading: false,
          error: null
        }));
      }
    } catch (error) {
      //console.error("Error loading schedule data:", error);
      setScheduleState(prev => ({
        ...prev,
        error: error.message || 'Terjadi kesalahan saat memuat jadwal.',
        loading: false
      }));
    }
  }, [constructDomain]);

  const handleSearch = useCallback((text) => {
    setFilters(prev => ({ ...prev, search: text }));
  }, []);

  const handleFilterPeriod = useCallback((value) => {
    setFilters(prev => ({ ...prev, period: value }));
  }, []);

  const handleFilterType = useCallback((value) => {
    setFilters(prev => ({ ...prev, type: value }));
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadScheduleData();
    }, [loadScheduleData, filters])
  );

  const getStatusColor = (date) => {
    const scheduleDate = dayjs(date);
    const today = dayjs();

    if (scheduleDate.isBefore(today, 'day')) {
      return 'bg-red-100 text-red-600';
    }
    if (scheduleDate.isSame(today, 'day')) {
      return 'bg-yellow-100 text-yellow-600';
    }
    return 'bg-green-100 text-green-600';
  };

  const getStatusText = (date) => {
    const scheduleDate = dayjs(date);
    const today = dayjs();

    if (scheduleDate.isBefore(today, 'day')) {
      return 'Terlambat';
    }
    if (scheduleDate.isSame(today, 'day')) {
      return 'Hari Ini';
    }
    return 'Terjadwal';
  };

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
            <Text className="text-white text-2xl font-bold">Schedule</Text>
            <Text className="text-white/80">Jadwal Pemeliharaan</Text>
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
                <Ionicons name="today" size={18} color="#eab308" />
              </View>
            </View>
            <Text className="text-2xl font-bold text-white">
              {scheduleState.quickStats.today}
            </Text>
            <Text className="text-white/80">Hari Ini</Text>
          </View>

          <View className="bg-white/10 backdrop-blur-lg rounded-xl p-4 mr-4 w-40">
            <View className="flex-row items-center mb-2">
              <View className="w-8 h-8 bg-blue-500/20 rounded-lg items-center justify-center">
                <Ionicons name="calendar" size={18} color="#3b82f6" />
              </View>
            </View>
            <Text className="text-2xl font-bold text-white">
              {scheduleState.quickStats.thisWeek}
            </Text>
            <Text className="text-white/80">Minggu Ini</Text>
          </View>

          <View className="bg-white/10 backdrop-blur-lg rounded-xl p-4 mr-4 w-40">
            <View className="flex-row items-center mb-2">
              <View className="w-8 h-8 bg-red-500/20 rounded-lg items-center justify-center">
                <Ionicons name="alert-circle" size={18} color="#ef4444" />
              </View>
            </View>
            <Text className="text-2xl font-bold text-white">
              {scheduleState.quickStats.overdue}
            </Text>
            <Text className="text-white/80">Terlambat</Text>
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
                placeholder="Cari jadwal..."
                value={filters.search}
                onChangeText={handleSearch}
              />
            </View>
          </View>

          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 mb-2">Periode</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {filterOptions.period.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  onPress={() => handleFilterPeriod(option.value)}
                  className={`mr-3 px-4 py-2 rounded-full ${
                    filters.period === option.value
                      ? "bg-blue-600"
                      : "bg-white border border-blue-600"
                  }`}
                >
                  <Text
                    className={`${
                      filters.period === option.value
                        ? "text-white"
                        : "text-blue-600"
                    }`}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
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
                    }`}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <TouchableOpacity
            className="bg-white p-4 rounded-xl border border-gray-200 mb-6"
            onPress={() => router.push("./create", { relativeToDirectory: true })}
          >
            <View className="flex-row items-center justify-center">
              <Ionicons name="add-circle" size={20} color="#2196F3" />
              <Text className="text-blue-600 font-semibold ml-2">
                Tambah Jadwal
              </Text>
            </View>
          </TouchableOpacity>

          {scheduleState.loading ? (
            <View className="flex-1 justify-center items-center py-12">
              <ActivityIndicator size="large" color="#2196F3" />
              <Text className="text-gray-600 mt-4">
                Memuat jadwal pemeliharaan...
              </Text>
            </View>
          ) : scheduleState.error ? (
            <View className="flex-1 justify-center items-center p-6">
              <View className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg">
                <View className="items-center mb-4">
                  <Ionicons name="alert-circle" size={48} color="#ef4444" />
                </View>
                <Text className="text-red-600 text-center font-medium text-lg mb-2">
                  Terjadi Kesalahan
                </Text>
                <Text className="text-gray-600 text-center mb-6">
                  {scheduleState.error}
                </Text>
                <TouchableOpacity
                  onPress={loadScheduleData}
                  className="bg-blue-600 px-6 py-3 rounded-lg items-center"
                >
                  <Text className="text-white font-medium">Coba Lagi</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : scheduleState.data.length === 0 ? (
            <View className="flex-1 justify-center items-center py-12">
              <Ionicons name="calendar" size={48} color="#9ca3af" />
              <Text className="text-gray-500 text-center mt-4">
                Tidak ada jadwal pemeliharaan untuk periode ini
              </Text>
            </View>
          ) : (
            scheduleState.data.map((schedule) => (
              <View
                key={schedule.id}
                className="bg-white rounded-xl p-4 mb-4 border border-gray-200"
              >
                <View className="flex-row justify-between items-start mb-3">
                  <View>
                    <Text className="text-xl font-bold">{schedule.name}</Text>
                    <Text className="text-gray-600">
                      {schedule.equipment_id?.name}
                    </Text>
                  </View>
                  <View
                    className={`px-3 py-1 rounded-full ${getStatusColor(
                      schedule.schedule_date
                    )}`}
                  >
                    <Text className="text-xs font-medium">
                      {getStatusText(schedule.schedule_date)}
                    </Text>
                  </View>
                </View>

                <View className="bg-gray-50 p-3 rounded-lg mb-4">
                  <View className="flex-row justify-between items-center">
                    <View>
                      <Text className="text-gray-600">Tipe</Text>
                      <Text className="font-bold text-lg">
                        {schedule.maintenance_type === "corrective"
                          ? "Korektif"
                          : "Preventif"}
                      </Text>
                    </View>
                    <View className="h-12 w-[1px] bg-gray-200" />
                    <View>
                      <Text className="text-gray-600">Tanggal</Text>
                      <Text className="font-bold text-lg">
                        {dayjs(schedule.schedule_date).format("DD/MM/YY")}
                      </Text>
                    </View>
                    <View className="h-12 w-[1px] bg-gray-200" />
                    <View>
                      <Text className="text-gray-600">Durasi</Text>
                      <Text className="font-bold text-lg">
                        {schedule.duration} Jam
                      </Text>
                    </View>
                  </View>
                </View>

                <View className="bg-blue-50 p-3 rounded-lg mb-4">
                  <View className="flex-row items-center mb-2">
                    <Ionicons name="person" size={16} color="#2196F3" />
                    <Text className="text-blue-600 ml-2">
                      {schedule.user_id?.name || "Belum ditugaskan"}
                    </Text>
                  </View>
                  {schedule.description && (
                    <Text className="text-blue-600 mt-1">
                      {schedule.description}
                    </Text>
                  )}
                </View>

                <View className="flex-row mt-4 pt-4 border-t border-gray-100">
                  <TouchableOpacity
                    className="flex-1 flex-row items-center justify-center"
                    onPress={() => router.push(`./edit/${schedule.id}`)}
                  >
                    <Ionicons name="create" size={20} color="#2196F3" />
                    <Text className="text-blue-600 ml-2">Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="flex-1 flex-row items-center justify-center">
                    <Ionicons name="calendar" size={20} color="#2196F3" />
                    <Text className="text-blue-600 ml-2">Reschedule</Text>
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