import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useState, useCallback } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import createRequest from "@/services/api-secure-internal";
import dayjs from "dayjs";

const menu = [
  {
    name: "SCHEDULED",
    icon: "airplane",
    color: "#009688",
    route: "/aplikasi-internal/amc/scheduled",
  },
  {
    name: "UNSCEDULED",
    icon: "time",
    color: "#00897B",
    route: "/aplikasi-internal/amc/un-schedule",
  },
  {
    name: "AIRPORT",
    icon: "business",
    color: "#00796B",
    route: "/aplikasi-internal/amc/airport",
  },
  {
    name: "AIRCRAFT TYPE",
    icon: "paper-plane",
    color: "#00695C",
    route: "/aplikasi-internal/amc/aircraft-type",
  },
  {
    name: "PARKING STAND",
    icon: "location",
    color: "#004D40",
    route: "/aplikasi-internal/amc/parking-stand",
  },
  {
    name: "OPERATOR",
    icon: "people",
    color: "#00BFA5",
    route: "/aplikasi-internal/amc/airlines",
  },
];


const recentMovements = [
  {
    id: "M001",
    flightNumber: "GA-234",
    aircraft: "B737-800",
    status: "Mendarat",
    time: "10:45",
    stand: "A12",
    operator: "Garuda Indonesia",
  },
  {
    id: "M002",
    flightNumber: "JT-789",
    aircraft: "A320",
    status: "Lepas Landas",
    time: "11:15",
    stand: "B08",
    operator: "Lion Air",
  },
  {
    id: "M003",
    flightNumber: "ID-567",
    aircraft: "B737-900",
    status: "Terjadwal",
    time: "12:30",
    stand: "C15",
    operator: "Batik Air",
  },
];

export default function AmcIndex() {
  const router = useRouter();
  const { post } = createRequest();
  const [statistik, setStatistik] = useState([
    { title: "Penerbangan Hari Ini", value: 0, icon: "airplane", color: "#009688", trend: "+12%" },
    { title: "Pendaratan Hari Ini", value: 0, icon: "arrow-down", color: "#FFC107", trend: "+8%" },
    { title: "Lepas Landas Hari Ini", value: 0, icon: "arrow-up", color: "#4CAF50", trend: "+15%" },
    { title: "Pembatalan Hari Ini", value: 0, icon: "close-circle", color: "#F44336", trend: "-50%" },
    { title: "Bermalam", value: 0, icon: "moon", color: "#3F51B5", trend: "Tetap" },
    { title: "Tidak Bermalam", value: 0, icon: "sunny", color: "#FF9800", trend: "+2" },
  ]);




  const loadStatistik = useCallback(async () => {
    try {
      const { data } = await post("/mobile/api/internal/mobile-count", {
        queries: [
          `env['x_data_amc'].sudo().search_count([
            ['create_date', '>=', date.today().strftime('%Y-%m-%d')],
          ])`,
          `env['x_data_amc'].sudo().search_count([
              ['create_date', '>=', date.today().strftime('%Y-%m-%d')],
              ['x_studio_type_penerbangan', '=', 'BERJADWAL']
           ])`,
           `env['x_data_amc'].sudo().search_count([
              ['create_date', '>=', date.today().strftime('%Y-%m-%d')],
              ['x_studio_type_penerbangan', '=', 'EXTRA']
           ])`,
           `env['x_data_amc'].sudo().search_count([
              ['create_date', '>=', date.today().strftime('%Y-%m-%d')],
              ['x_studio_type_penerbangan', '=', 'LAINNYA']
           ])`,
          "env['x_elb_realisasi_harian'].sudo().search_count([])"
        ]
      });

      setStatistik((prevStatistik) =>
        prevStatistik.map((item, index) => ({
          ...item,
          value: data[index] || 0,
        }))
      );

      //console.log(data)
    } catch (error) {
     //console.log(error)
    }
  }, [setStatistik]); 


    useFocusEffect(
      useCallback(() => {
        loadStatistik();
      }, [loadStatistik])
    );
  



  return (
    <SafeAreaView className="flex-1 bg-[#009688]" edges={["top"]}>
      <View className="px-6 py-3 bg-[#009688]">
        <View className="flex-row justify-between items-center mb-8">
          <TouchableOpacity
            className="w-10 h-10 bg-white/20 rounded-full items-center justify-center mb-4"
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <View className="flex-col justify-end items-end">
            <Text className="text-white text-2xl font-bold">
              TEKOPS - UNIT AMC
            </Text>
            <Text className="text-white/80">
              {process.env.EXPO_PUBLIC_OFFICE_NAME}
            </Text>
          </View>
        </View>
      </View>

      <ScrollView className="flex-1 bg-gray-50">
        <LinearGradient colors={["#009688", "#00796B"]}>
          <View className="px-3 pb-10">
            {/* Statistik Cepat */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-4"
            >
              {statistik.map((stat, index) => (
                <View key={index} className="bg-white backdrop-blur-lg p-4 rounded-xl mr-4 w-56">
                  <View className="flex-row justify-between items-center mb-2">
                    <Ionicons name={stat.icon} size={24} color={stat.color} />
                    <Text className={`text-sm ${
                      stat.trend.includes('+') ? 'text-green-600' : 
                      stat.trend.includes('-') ? 'text-red-600' : 
                      'text-gray-600'
                    }`}>{stat.trend}</Text>
                  </View>
                  <Text className="text-2xl font-bold">{stat.value}</Text>
                  <Text className="text-gray-600">{stat.title}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </LinearGradient>

        <View className="px-6 -mt-6">
          {/* Menu Cepat */}
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

          {/* Pergerakan Pesawat Terkini */}
          <View className="bg-white rounded-xl p-4 shadow-sm mb-6">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-bold">Pergerakan Terkini</Text>
              <TouchableOpacity>
                <Text className="text-[#009688]">Lihat Semua</Text>
              </TouchableOpacity>
            </View>
            {recentMovements.map((movement) => (
              <TouchableOpacity
                key={movement.id}
                className="bg-gray-50 rounded-lg p-4 mb-3 last:mb-0"
              >
                <View className="flex-row justify-between items-start mb-2">
                  <View>
                    <Text className="font-semibold">{movement.flightNumber}</Text>
                    <Text className="text-gray-600">{movement.operator}</Text>
                  </View>
                  <View
                    className={`px-2 py-1 rounded-full ${
                      movement.status === "Mendarat"
                        ? "bg-green-100"
                        : movement.status === "Lepas Landas"
                        ? "bg-blue-100"
                        : "bg-yellow-100"
                    }`}
                  >
                    <Text
                      className={`text-xs ${
                        movement.status === "Mendarat"
                          ? "text-green-600"
                          : movement.status === "Lepas Landas"
                          ? "text-blue-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {movement.status}
                    </Text>
                  </View>
                </View>

                <View className="flex-row justify-between items-center">
                  <View className="flex-row items-center">
                    <Ionicons name="airplane" size={16} color="#666" />
                    <Text className="text-gray-600 ml-1">{movement.aircraft}</Text>
                  </View>
                  <View className="flex-row items-center">
                    <Ionicons name="location" size={16} color="#666" />
                    <Text className="text-gray-600 ml-1">Parkir {movement.stand}</Text>
                  </View>
                  <View className="flex-row items-center">
                    <Ionicons name="time" size={16} color="#666" />
                    <Text className="text-gray-600 ml-1">{movement.time}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Status Tempat Parkir */}
          <View className="bg-white rounded-xl p-4 shadow-sm mb-6">
            <Text className="text-lg font-bold mb-4">Status Tempat Parkir</Text>
            <View className="flex-row justify-between">
              <View className="items-center flex-1">
                <View className="w-12 h-12 bg-green-100 rounded-full items-center justify-center mb-2">
                  <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
                </View>
                <Text className="font-bold">12</Text>
                <Text className="text-sm text-center">Tersedia</Text>
              </View>
              <View className="items-center flex-1">
                <View className="w-12 h-12 bg-red-100 rounded-full items-center justify-center mb-2">
                  <Ionicons name="close-circle" size={24} color="#F44336" />
                </View>
                <Text className="font-bold">8</Text>
                <Text className="text-sm text-center">Terpakai</Text>
              </View>
              <View className="items-center flex-1">
                <View className="w-12 h-12 bg-yellow-100 rounded-full items-center justify-center mb-2">
                  <Ionicons name="construct" size={24} color="#FFC107" />
                </View>
                <Text className="font-bold">2</Text>
                <Text className="text-sm text-center">Perbaikan</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}