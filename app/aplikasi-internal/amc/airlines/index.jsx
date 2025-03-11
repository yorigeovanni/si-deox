import { View, Text, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

const airlines = [
  {
    id: "AL001",
    code: "GA",
    name: "Garuda Indonesia",
    type: "Penumpang",
    status: "Aktif",
    baseAirport: "CGK",
    fleetSize: 142,
    activeRoutes: 120,
    lastFlight: "2024-02-20 10:30",
    contact: {
      phone: "+62 21 2351 9999",
      email: "customer@garuda-indonesia.com"
    }
  },
  {
    id: "AL002",
    code: "JT",
    name: "Lion Air",
    type: "Penumpang",
    status: "Aktif",
    baseAirport: "CGK",
    fleetSize: 112,
    activeRoutes: 183,
    lastFlight: "2024-02-20 11:15",
    contact: {
      phone: "+62 21 6379 8000",
      email: "customercare@lionair.co.id"
    }
  },
  {
    id: "AL003",
    code: "QZ",
    name: "AirAsia Indonesia",
    type: "Penumpang",
    status: "Aktif",
    baseAirport: "CGK",
    fleetSize: 28,
    activeRoutes: 42,
    lastFlight: "2024-02-20 09:45",
    contact: {
      phone: "+62 21 2927 0999",
      email: "support@airasia.com"
    }
  }
];

const filterOptions = {
  type: [
    { label: "Semua", value: "all" },
    { label: "Penumpang", value: "passenger" },
    { label: "Kargo", value: "cargo" },
    { label: "Charter", value: "charter" }
  ],
  status: [
    { label: "Semua", value: "all" },
    { label: "Aktif", value: "active" },
    { label: "Tidak Aktif", value: "inactive" },
    { label: "Ditangguhkan", value: "suspended" }
  ]
};

export default function AirlinesScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState({
    type: "all",
    status: "all"
  });

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <LinearGradient colors={["#00BFA5", "#00796B"]} className="pt-12 pb-6">
        <View className="px-6 flex-row items-center justify-between py-4">
          <TouchableOpacity
            className="w-10 h-10 bg-white/20 rounded-full items-center justify-center mb-4"
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <View className="flex-col items-end justify-end">
            <Text className="text-white text-2xl font-bold">
              Operator Penerbangan
            </Text>
            <Text className="text-white/80">Manajemen data maskapai</Text>
          </View>
        </View>

        {/* Quick Stats */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-4 px-6"
        >
          <View className="bg-white/10 backdrop-blur-lg rounded-xl p-4 mr-4 w-40">
            <View className="flex-row items-center mb-2">
              <View className="w-8 h-8 bg-green-500/20 rounded-lg items-center justify-center">
                <Ionicons name="airplane" size={18} color="#22c55e" />
              </View>
            </View>
            <Text className="text-2xl font-bold text-white">15</Text>
            <Text className="text-white/80">Total Maskapai</Text>
          </View>

          <View className="bg-white/10 backdrop-blur-lg rounded-xl p-4 mr-4 w-40">
            <View className="flex-row items-center mb-2">
              <View className="w-8 h-8 bg-blue-500/20 rounded-lg items-center justify-center">
                <Ionicons name="checkmark-circle" size={18} color="#3b82f6" />
              </View>
            </View>
            <Text className="text-2xl font-bold text-white">12</Text>
            <Text className="text-white/80">Aktif</Text>
          </View>

          <View className="bg-white/10 backdrop-blur-lg rounded-xl p-4 mr-4 w-40">
            <View className="flex-row items-center mb-2">
              <View className="w-8 h-8 bg-purple-500/20 rounded-lg items-center justify-center">
                <Ionicons name="map" size={18} color="#a855f7" />
              </View>
            </View>
            <Text className="text-2xl font-bold text-white">345</Text>
            <Text className="text-white/80">Total Rute</Text>
          </View>
        </ScrollView>
      </LinearGradient>

      <ScrollView className="flex-1">
        <View className="p-6 -mt-6">
          {/* Search Bar */}
          <View className="bg-white rounded-xl px-4 py-3 mb-4 border border-gray-200">
            <View className="flex-row items-center">
              <Ionicons name="search" size={20} color="#666" />
              <TextInput
                className="flex-1 ml-2 text-base"
                placeholder="Cari maskapai..."
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </View>

          {/* Filter Chips */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 mb-2">Tipe</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {filterOptions.type.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  onPress={() => setActiveFilter(prev => ({ ...prev, type: option.value }))}
                  className={`mr-3 px-4 py-2 rounded-full ${
                    activeFilter.type === option.value
                      ? "bg-teal-600"
                      : "bg-white border border-teal-600"
                  }`}
                >
                  <Text
                    className={`${
                      activeFilter.type === option.value ? "text-white" : "text-teal-600"
                    } capitalize`}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 mb-2">Status</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {filterOptions.status.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  onPress={() => setActiveFilter(prev => ({ ...prev, status: option.value }))}
                  className={`mr-3 px-4 py-2 rounded-full ${
                    activeFilter.status === option.value
                      ? "bg-teal-600"
                      : "bg-white border border-teal-600"
                  }`}
                >
                  <Text
                    className={`${
                      activeFilter.status === option.value ? "text-white" : "text-teal-600"
                    } capitalize`}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Add New Button */}
          <TouchableOpacity
            className="bg-white p-4 rounded-xl border border-gray-200 mb-6"
            onPress={() => router.push("./create")}
          >
            <View className="flex-row items-center justify-center">
              <Ionicons name="add-circle" size={20} color="#00BFA5" />
              <Text className="text-teal-600 font-semibold ml-2">
                Tambah Maskapai
              </Text>
            </View>
          </TouchableOpacity>

          {/* Airlines List */}
          {airlines.map((airline) => (
            <View
              key={airline.id}
              className="bg-white rounded-xl p-4 mb-4 border border-gray-200"
            >
              <View className="flex-row justify-between items-start mb-3">
                <View>
                  <View className="flex-row items-center">
                    <Text className="text-xl font-bold">{airline.code}</Text>
                    <Text className="text-gray-500 ml-2">-</Text>
                    <Text className="text-gray-700 ml-2 font-medium">{airline.name}</Text>
                  </View>
                  <Text className="text-gray-600">{airline.type}</Text>
                </View>
                <View className="px-3 py-1 rounded-full bg-green-100">
                  <Text className="text-xs font-medium text-green-600">
                    {airline.status}
                  </Text>
                </View>
              </View>

              <View className="bg-gray-50 p-3 rounded-lg mb-4">
                <View className="flex-row justify-between items-center">
                  <View>
                    <Text className="text-gray-600">Jumlah Armada</Text>
                    <Text className="font-bold text-lg">{airline.fleetSize}</Text>
                  </View>
                  <View className="h-12 w-[1px] bg-gray-200" />
                  <View>
                    <Text className="text-gray-600">Rute Aktif</Text>
                    <Text className="font-bold text-lg">{airline.activeRoutes}</Text>
                  </View>
                  <View className="h-12 w-[1px] bg-gray-200" />
                  <View>
                    <Text className="text-gray-600">Hub</Text>
                    <Text className="font-bold text-lg">{airline.baseAirport}</Text>
                  </View>
                </View>
              </View>

              <View className="bg-gray-50 p-3 rounded-lg mb-4">
                <View className="flex-row justify-between items-center">
                  <View>
                    <Text className="text-gray-600">Kontak</Text>
                    <Text className="font-medium">{airline.contact.phone}</Text>
                    <Text className="font-medium text-sm text-teal-600">{airline.contact.email}</Text>
                  </View>
                  <View>
                    <Text className="text-gray-600">Penerbangan Terakhir</Text>
                    <Text className="font-medium">{airline.lastFlight}</Text>
                  </View>
                </View>
              </View>

              <View className="flex-row mt-4 pt-4 border-t border-gray-100">
                <TouchableOpacity
                  className="flex-1 flex-row items-center justify-center"
                  onPress={() => router.push(`./edit/${airline.id}`)}
                >
                  <Ionicons name="create" size={20} color="#00BFA5" />
                  <Text className="text-teal-600 ml-2">Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-1 flex-row items-center justify-center">
                  <Ionicons name="airplane" size={20} color="#00BFA5" />
                  <Text className="text-teal-600 ml-2">Armada</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-1 flex-row items-center justify-center">
                  <Ionicons name="map" size={20} color="#00BFA5" />
                  <Text className="text-teal-600 ml-2">Rute</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-1 flex-row items-center justify-center">
                  <Ionicons name="trash" size={20} color="#ef4444" />
                  <Text className="text-red-500 ml-2">Hapus</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}