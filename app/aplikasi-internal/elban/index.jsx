import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useCallback } from "react";
import createRequest from "@/services/api-secure-internal";
import dayjs from "dayjs";

const menu = [
  {
    name: "FASILITAS",
    icon: "business-outline",
    color: "#2196F3", // Blue
    route: "./fasilitas",
  },
  {
    name: "PERALATAN",
    icon: "cog-outline",
    color: "#1E88E5", // Slightly darker blue
    route: "./peralatan",
  },
  {
    name: "SUKU CADANG",
    icon: "hardware-chip-outline",
    color: "#1976D2", // Darker blue
    route: "./suku-cadang",
  },
  {
    name: "ALAT KERJA",
    icon: "construct-outline",
    color: "#1565C0", // Even darker blue
    route: "./alat-kerja",
  },
  {
    name: "PEMELIHARAAN",
    icon: "settings-outline",
    color: "#0D47A1", // Very dark blue
    route: "./pemeliharaan",
  },
  {
    name: "LAPORAN",
    icon: "bar-chart-outline",
    color: "#0277BD", // Blue-cyan
    route: "./laporan",
  },
  {
    name: "DOKUMENT",
    icon: "folder-open-outline",
    color: "#0288D1", // Light blue
    route: "./document",
  },
  {
    name: "SOP",
    icon: "reader-outline",
    color: "#039BE5", // Bright blue
    route: "./sop",
  },
  {
    name: "ANGGARAN",
    icon: "wallet-outline",
    color: "#03A9F4", // Sky blue
    route: "./anggaran",
  },
];

export default function MaintenanceDashboard() {
  const { post } = createRequest();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const [dashboardState, setDashboardState] = useState({
    loading: true,
    error: null,
    data: {
      quickStats: {
        todayTasks: 12,
        inProgress: 0,
        completed: 0,
        delayed: 0,
        preventive: 0,
        corrective: 0,
      },
      recentTasks: [],
      equipmentStatus: {
        normal: 0,
        warning: 0,
        critical: 0,
      },
    },
  });

  const loadDashboardData = useCallback(async () => {
    try {
      setDashboardState(prev => ({ ...prev, loading: true, error: null }));
      
      const { data } = await post("/mobile/api/internal/mobile-count", {
        queries: [
          "env['x_elb_peralatan'].sudo().search_count([])",
          "env['x_el_kategori_peralata'].sudo().search_count([])",
          "env['x_elb_realisasi_harian'].sudo().search_count([])"
        ]
      });

      // Calculate stats from raw data
      const stats = {
        todayTasks: data?.[0] || 0,
        inProgress: data?.[1] || 0,
        completed: data?.[2] || 0,
        delayed: 0,
        preventive: 0,
        corrective: 0,
      };


     

      const equipmentStats = {
        normal: 0,
        warning: 0,
        critical: 0,
      };

     

      setDashboardState(prev => ({
        ...prev,
        loading: false,
        error: null,
        data: {
          quickStats: stats,
          recentTasks: /*tasksResponse.data?.result ||*/ [],
          equipmentStatus: equipmentStats,
        },
      }));

    } catch (error) {
      //console.error("Error loading dashboard data:", error);
      setDashboardState(prev => ({
        ...prev,
        loading: false,
        error: error.message || "Terjadi kesalahan saat memuat data dashboard",
      }));
    }
  }, []); 

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadDashboardData();
    setRefreshing(false);
  }, [loadDashboardData]);

  useFocusEffect(
    useCallback(() => {
      loadDashboardData();
    }, [loadDashboardData])
  );

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'done':
      case 'completed':
        return 'bg-green-100 text-green-600';
      case 'in_progress':
      case 'progress':
        return 'bg-blue-100 text-blue-600';
      case 'pending':
      case 'delayed':
        return 'bg-yellow-100 text-yellow-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getPriorityInfo = (priority) => {
    switch (priority) {
      case '3':
        return { color: 'text-red-600', label: 'Tinggi' };
      case '2':
        return { color: 'text-orange-600', label: 'Menengah' };
      case '1':
        return { color: 'text-blue-600', label: 'Normal' };
      default:
        return { color: 'text-gray-600', label: 'Rendah' };
    }
  };

  if (dashboardState.loading) {
    return (
      <SafeAreaView className="flex-1 bg-[#2196F3]">
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#ffffff" />
          <Text className="text-white mt-4">Memuat dashboard...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (dashboardState.error) {
    return (
      <SafeAreaView className="flex-1 bg-[#2196F3]">
        <View className="flex-1 justify-center items-center p-6">
          <View className="bg-white rounded-xl p-6 w-full max-w-sm">
            <View className="items-center mb-4">
              <Ionicons name="alert-circle" size={48} color="#ef4444" />
            </View>
            <Text className="text-red-600 text-center font-medium text-lg mb-2">
              Terjadi Kesalahan
            </Text>
            <Text className="text-gray-600 text-center mb-6">
              {dashboardState.error}
            </Text>
            <TouchableOpacity
              onPress={loadDashboardData}
              className="bg-blue-600 px-6 py-3 rounded-lg items-center"
            >
              <Text className="text-white font-medium">Coba Lagi</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#2196F3]" edges={["top"]}>
      <View className="px-6 py-3 bg-[#2196F3]">
        <View className="flex-row justify-between items-center mb-8">
          <TouchableOpacity
            className="w-10 h-10 bg-white/20 rounded-full items-center justify-center mb-4"
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <View className="flex-col justify-end items-end">
            <Text className="text-white text-2xl font-bold">
              TEKOPS - ELBAN
            </Text>
            <Text className="text-white/80">
              BLU UPBU KELAS I DEO - SORONG
            </Text>
          </View>
        </View>
      </View>

      <ScrollView 
        className="flex-1 bg-gray-50"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <LinearGradient colors={["#2196F3", "#1976D2"]}>
          <View className="px-3 pb-10">
            {/* Quick Stats */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-4"
            >
              <View className="bg-white backdrop-blur-lg p-4 rounded-xl mr-4 w-56">
                <View className="flex-row justify-between items-center mb-2">
                  <Ionicons name="document-attach-outline" size={24} color="#2196F3" />
                  <Text className="text-sm text-green-600">
                  PERALATAN
                  </Text>
                </View>
                <View className=" flex-row justify-start items-center">
                <Text className="text-2xl font-bold">{dashboardState.data.quickStats.todayTasks}</Text>
                <Text className="text-gray-600 ml-4"> FASKAMPEN</Text>
                </View>
              </View>

              <View className="bg-white backdrop-blur-lg p-4 rounded-xl mr-4 w-72">
                <View className="flex-row justify-between items-center mb-2">
                  <Ionicons name="checkmark-circle-sharp" size={24} color="green" />
                  <Text className="text-sm text-blue-600">
                  23 FASILITAS
                  </Text>
                </View>
                <Text className="text-2xl font-bold">{dashboardState.data.quickStats.inProgress}</Text>
                <Text className="text-gray-600">PERALATAN NON FASKAMPEN</Text>
              </View>

            

              <View className="bg-white backdrop-blur-lg p-4 rounded-xl mr-4 w-56">
                <View className="flex-row justify-between items-center mb-2">
                  <Ionicons name="checkmark-circle-sharp" size={24} color="green" />
                  <Text className="text-sm text-blue-600">
                    ...
                  </Text>
                </View>
                <Text className="text-2xl font-bold">{dashboardState.data.quickStats.inProgress}</Text>
                <Text className="text-gray-600">OPERASI TERPUTUS</Text>
              </View>

              <View className="bg-white backdrop-blur-lg p-4 rounded-xl mr-4 w-56">
                <View className="flex-row justify-between items-center mb-2">
                  <Ionicons name="checkmark-circle-sharp" size={24} color="green" />
                  <Text className="text-sm text-blue-600">
                    ...
                  </Text>
                </View>
                <Text className="text-2xl font-bold">{dashboardState.data.quickStats.inProgress}</Text>
                <Text className="text-gray-600">OPERASI MENURUN</Text>
              </View>


             
              <View className="bg-white backdrop-blur-lg p-4 rounded-xl mr-4 w-56">
                <View className="flex-row justify-between items-center mb-2">
                  <Ionicons name="checkmark-circle-sharp" size={24} color="green" />
                  <Text className="text-sm text-blue-600">
                    ...
                  </Text>
                </View>
                <Text className="text-2xl font-bold">{dashboardState.data.quickStats.inProgress}</Text>
                <Text className="text-gray-600">OPERASI NORMAL</Text>
              </View>

              


              <View className="bg-white backdrop-blur-lg p-4 rounded-xl mr-4 w-56">
                <View className="flex-row justify-between items-center mb-2">
                  <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
                  <Text className="text-sm text-green-600">
                    {Math.round((dashboardState.data.quickStats.completed / dashboardState.data.quickStats.todayTasks) * 100)}% selesai
                  </Text>
                </View>
                <Text className="text-2xl font-bold">{dashboardState.data.quickStats.completed}</Text>
                <Text className="text-gray-600">Selesai</Text>
              </View>
            </ScrollView>
          </View>
        </LinearGradient>

        <View className="px-6 -mt-6">
          {/* Quick Menu */}
          <View className="bg-white rounded-xl p-4 border border-gray-300/50 mb-6">
            <Text className="text-lg font-bold mb-4">Menu Cepat</Text>
            <View className="flex-row flex-wrap justify-between">
              {menu.map((action, index) => (
                <TouchableOpacity
                  key={index}
                  className="w-[30%] items-center mb-6"
                  onPress={() => router.push(action.route)}
                >
                  <View
                    className="w-14 h-14 rounded-2xl items-center justify-center mb-2"
                    style={{ backgroundColor: action.color }}
                  >
                    <Ionicons name={action.icon} size={24} color="white" />
                  </View>
                  <Text className="text-center text-sm">{action.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Recent Tasks */}
          <View className="bg-white rounded-xl p-4 shadow-sm mb-6">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-bold">Task Terkini</Text>
              <TouchableOpacity onPress={() => router.push("/aplikasi-internal/maintenance/task")}>
                <Text className="text-blue-600">Lihat Semua</Text>
              </TouchableOpacity>
            </View>
            {dashboardState.data.recentTasks.map((task) => (
              <TouchableOpacity
                key={task.id}
                className="bg-gray-50 rounded-lg p-4 mb-3 last:mb-0"
                onPress={() => router.push(`/aplikasi-internal/maintenance/task/${task.id}`)}
              >
                <View className="flex-row justify-between items-start mb-2">
                  <View>
                    <Text className="font-semibold">{task.equipment_id.name}</Text>
                    <Text className="text-gray-600">{task.user_id.name}</Text>
                  </View>
                  <View className={`px-2 py-1 rounded-full ${getStatusColor(task.stage_id.name)}`}>
                    <Text className="text-xs font-medium">
                      {task.stage_id.name}
                    </Text>
                  </View>
                </View>

                <View className="flex-row justify-between items-center">
                  <View className="flex-row items-center">
                    <Ionicons 
                      name={task.maintenance_type === "preventive" ? "shield-checkmark" : "flash"} 
                      size={16} 
                      color="#666" 
                    />
                    <Text className="text-gray-600 ml-1">
                      {task.maintenance_type === "preventive" ? "Preventif" : "Korektif"}
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <Ionicons name="alert-circle" size={16} color="#666" />
                    <Text className={`ml-1 ${getPriorityInfo(task.priority).color}`}>
                      {getPriorityInfo(task.priority).label}
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <Ionicons name="calendar" size={16} color="#666" />
                    <Text className="text-gray-600 ml-1">
                      {dayjs(task.schedule_date).format("DD/MM/YY")}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Equipment Status */}
          <View className="bg-white rounded-xl p-4 shadow-sm mb-6">
            <Text className="text-lg font-bold mb-4">Status Equipment</Text>
            <View className="flex-row justify-between">
              <View className="items-center flex-1">
                <View className="w-12 h-12 bg-green-100 rounded-full items-center justify-center mb-2">
                  <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
                </View>
                <Text className="font-bold">{dashboardState.data.equipmentStatus.normal}</Text>
                <Text className="text-sm text-center">Normal</Text>
              </View>
              <View className="items-center flex-1">
                <View className="w-12 h-12 bg-yellow-100 rounded-full items-center justify-center mb-2">
                  <Ionicons name="warning" size={24} color="#FFC107" />
                </View>
                <Text className="font-bold">{dashboardState.data.equipmentStatus.warning}</Text>
                <Text className="text-sm text-center">Perlu Perhatian</Text>
              </View>
              <View className="items-center flex-1">
                <View className="w-12 h-12 bg-red-100 rounded-full items-center justify-center mb-2">
                  <Ionicons name="alert-circle" size={24} color="#F44336" />
                </View>
                <Text className="font-bold">{dashboardState.data.equipmentStatus.critical}</Text>
                <Text className="text-sm text-center">Kritis</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}