import { View, Text, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { useQuery, useMutation } from '@tanstack/react-query'


const unscheduledFlights = [
  {
    id: "UF001",
    regNumber: "PK-GFQ",
    operator: "Garuda Indonesia",
    aircraftType: "B737-800",
    status: "Darurat",
    estimatedArrival: "14:30",
    reason: "Masalah Teknis",
    parkingStand: "A12"
  },
  {
    id: "UF002",
    regNumber: "PK-LJT",
    operator: "Lion Air",
    aircraftType: "A320",
    status: "VIP",
    estimatedArrival: "15:45",
    reason: "Penerbangan Khusus",
    parkingStand: "B08"
  },
  {
    id: "UF003",
    regNumber: "PK-BTK",
    operator: "Batik Air",
    aircraftType: "A320",
    status: "Pengalihan",
    estimatedArrival: "16:15",
    reason: "Cuaca Buruk",
    parkingStand: "C15"
  }
];

const filterOptions = {
  status: [
    { label: "Semua", value: "all" },
    { label: "Darurat", value: "emergency" },
    { label: "VIP", value: "vip" },
    { label: "Pengalihan", value: "diversion" }
  ]
};

export default function UnscheduledFlightsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");



  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <LinearGradient colors={["#00897B", "#006064"]} className="pt-12 pb-6">
        <View className="px-6 flex-row items-center justify-between py-4">
          <TouchableOpacity
            className="w-10 h-10 bg-white/20 rounded-full items-center justify-center mb-4"
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <View className="flex-col items-end justify-end">
            <Text className="text-white text-2xl font-bold">
              Penerbangan Tidak Terjadwal
            </Text>
            <Text className="text-white/80">Manajemen penerbangan darurat & khusus</Text>
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
              <View className="w-8 h-8 bg-red-500/20 rounded-lg items-center justify-center">
                <Ionicons name="warning" size={18} color="#ef4444" />
              </View>
            </View>
            <Text className="text-2xl font-bold text-white">3</Text>
            <Text className="text-white/80">Darurat</Text>
          </View>

          <View className="bg-white/10 backdrop-blur-lg rounded-xl p-4 mr-4 w-40">
            <View className="flex-row items-center mb-2">
              <View className="w-8 h-8 bg-yellow-500/20 rounded-lg items-center justify-center">
                <Ionicons name="star" size={18} color="#eab308" />
              </View>
            </View>
            <Text className="text-2xl font-bold text-white">2</Text>
            <Text className="text-white/80">VIP</Text>
          </View>

          <View className="bg-white/10 backdrop-blur-lg rounded-xl p-4 mr-4 w-40">
            <View className="flex-row items-center mb-2">
              <View className="w-8 h-8 bg-blue-500/20 rounded-lg items-center justify-center">
                <Ionicons name="shuffle" size={18} color="#3b82f6" />
              </View>
            </View>
            <Text className="text-2xl font-bold text-white">5</Text>
            <Text className="text-white/80">Pengalihan</Text>
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
                placeholder="Cari nomor registrasi..."
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </View>

          {/* Filter Chips */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-4"
          >
            {filterOptions.status.map((option) => (
              <TouchableOpacity
                key={option.value}
                onPress={() => setActiveFilter(option.value)}
                className={`mr-3 px-4 py-2 rounded-full ${
                  activeFilter === option.value
                    ? "bg-teal-600"
                    : "bg-white border border-teal-600"
                }`}
              >
                <Text
                  className={`${
                    activeFilter === option.value ? "text-white" : "text-teal-600"
                  } capitalize`}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Add New Button */}
          <TouchableOpacity
            className="bg-white p-4 rounded-xl border border-gray-200 mb-6"
            onPress={() => router.push("./create")}
          >
            <View className="flex-row items-center justify-center">
              <Ionicons name="add-circle" size={20} color="#00897B" />
              <Text className="text-teal-600 font-semibold ml-2">
                Tambah Penerbangan Tidak Terjadwal
              </Text>
            </View>
          </TouchableOpacity>

          {/* Flight List */}
          {unscheduledFlights.map((flight) => (
            <View
              key={flight.id}
              className="bg-white rounded-xl p-4 mb-4 border border-gray-200"
            >
              <View className="flex-row justify-between items-start mb-3">
                <View>
                  <Text className="text-xl font-bold">{flight.regNumber}</Text>
                  <Text className="text-gray-600">{flight.operator}</Text>
                </View>
                <View
                  className={`px-3 py-1 rounded-full ${
                    flight.status === "Darurat"
                      ? "bg-red-100"
                      : flight.status === "VIP"
                      ? "bg-yellow-100"
                      : "bg-blue-100"
                  }`}
                >
                  <Text
                    className={`text-xs font-medium ${
                      flight.status === "Darurat"
                        ? "text-red-600"
                        : flight.status === "VIP"
                        ? "text-yellow-600"
                        : "text-blue-600"
                    }`}
                  >
                    {flight.status}
                  </Text>
                </View>
              </View>

              <View className="bg-gray-50 p-3 rounded-lg mb-4">
                <View className="flex-row justify-between items-center">
                  <View>
                    <Text className="text-gray-600">Tipe Pesawat</Text>
                    <Text className="font-bold text-lg">{flight.aircraftType}</Text>
                  </View>
                  <View className="h-12 w-[1px] bg-gray-200" />
                  <View>
                    <Text className="text-gray-600">Estimasi Kedatangan</Text>
                    <Text className="font-bold text-lg">{flight.estimatedArrival}</Text>
                  </View>
                  <View className="h-12 w-[1px] bg-gray-200" />
                  <View>
                    <Text className="text-gray-600">Parkir</Text>
                    <Text className="font-bold text-lg">{flight.parkingStand}</Text>
                  </View>
                </View>
              </View>

              <View className="bg-gray-50 p-3 rounded-lg mb-4">
                <Text className="text-gray-600 mb-1">Alasan</Text>
                <Text className="font-medium">{flight.reason}</Text>
              </View>

              <View className="flex-row mt-4 pt-4 border-t border-gray-100">
                <TouchableOpacity
                  className="flex-1 flex-row items-center justify-center"
                  onPress={() => router.push(`./edit/${flight.id}`)}
                >
                  <Ionicons name="create" size={20} color="#00897B" />
                  <Text className="text-teal-600 ml-2">Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-1 flex-row items-center justify-center">
                  <Ionicons name="document-text" size={20} color="#00897B" />
                  <Text className="text-teal-600 ml-2">Detail</Text>
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