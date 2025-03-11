import { View, Text, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

const aircraftTypes = [
  {
    id: "AT001",
    code: "B738",
    name: "Boeing 737-800",
    manufacturer: "Boeing",
    category: "Narrow Body",
    wingspan: "35.8m",
    length: "39.5m",
    maxTakeoffWeight: "79,010 kg",
    engineCount: 2,
    status: "Aktif"
  },
  {
    id: "AT002",
    code: "A320",
    name: "Airbus A320",
    manufacturer: "Airbus",
    category: "Narrow Body",
    wingspan: "35.8m",
    length: "37.6m",
    maxTakeoffWeight: "78,000 kg",
    engineCount: 2,
    status: "Aktif"
  },
  {
    id: "AT003",
    code: "ATR72",
    name: "ATR 72-600",
    manufacturer: "ATR",
    category: "Regional",
    wingspan: "27.05m",
    length: "27.17m",
    maxTakeoffWeight: "23,000 kg",
    engineCount: 2,
    status: "Aktif"
  }
];

const filterOptions = {
  category: [
    { label: "Semua", value: "all" },
    { label: "Narrow Body", value: "narrow" },
    { label: "Wide Body", value: "wide" },
    { label: "Regional", value: "regional" }
  ],
  manufacturer: [
    { label: "Semua", value: "all" },
    { label: "Boeing", value: "boeing" },
    { label: "Airbus", value: "airbus" },
    { label: "ATR", value: "atr" }
  ]
};

export default function AircraftTypeScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState({
    category: "all",
    manufacturer: "all"
  });

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <LinearGradient colors={["#00695C", "#004D40"]} className="pt-12 pb-6">
        <View className="px-6 flex-row items-center justify-between py-4">
          <TouchableOpacity
            className="w-10 h-10 bg-white/20 rounded-full items-center justify-center mb-4"
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <View className="flex-col items-end justify-end">
            <Text className="text-white text-2xl font-bold">
              Tipe Pesawat
            </Text>
            <Text className="text-white/80">Manajemen data tipe pesawat</Text>
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
              <View className="w-8 h-8 bg-blue-500/20 rounded-lg items-center justify-center">
                <Ionicons name="airplane" size={18} color="#3b82f6" />
              </View>
            </View>
            <Text className="text-2xl font-bold text-white">25</Text>
            <Text className="text-white/80">Total Tipe</Text>
          </View>

          <View className="bg-white/10 backdrop-blur-lg rounded-xl p-4 mr-4 w-40">
            <View className="flex-row items-center mb-2">
              <View className="w-8 h-8 bg-purple-500/20 rounded-lg items-center justify-center">
                <Ionicons name="business" size={18} color="#a855f7" />
              </View>
            </View>
            <Text className="text-2xl font-bold text-white">8</Text>
            <Text className="text-white/80">Manufaktur</Text>
          </View>

          <View className="bg-white/10 backdrop-blur-lg rounded-xl p-4 mr-4 w-40">
            <View className="flex-row items-center mb-2">
              <View className="w-8 h-8 bg-orange-500/20 rounded-lg items-center justify-center">
                <Ionicons name="apps" size={18} color="#f97316" />
              </View>
            </View>
            <Text className="text-2xl font-bold text-white">4</Text>
            <Text className="text-white/80">Kategori</Text>
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
                placeholder="Cari tipe pesawat..."
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </View>

          {/* Filter Chips */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 mb-2">Kategori</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {filterOptions.category.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  onPress={() => setActiveFilter(prev => ({ ...prev, category: option.value }))}
                  className={`mr-3 px-4 py-2 rounded-full ${
                    activeFilter.category === option.value
                      ? "bg-teal-600"
                      : "bg-white border border-teal-600"
                  }`}
                >
                  <Text
                    className={`${
                      activeFilter.category === option.value ? "text-white" : "text-teal-600"
                    } capitalize`}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 mb-2">Manufaktur</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {filterOptions.manufacturer.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  onPress={() => setActiveFilter(prev => ({ ...prev, manufacturer: option.value }))}
                  className={`mr-3 px-4 py-2 rounded-full ${
                    activeFilter.manufacturer === option.value
                      ? "bg-teal-600"
                      : "bg-white border border-teal-600"
                  }`}
                >
                  <Text
                    className={`${
                      activeFilter.manufacturer === option.value ? "text-white" : "text-teal-600"
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
              <Ionicons name="add-circle" size={20} color="#00695C" />
              <Text className="text-teal-700 font-semibold ml-2">
                Tambah Tipe Pesawat
              </Text>
            </View>
          </TouchableOpacity>

          {/* Aircraft Type List */}
          {aircraftTypes.map((aircraft) => (
            <View
              key={aircraft.id}
              className="bg-white rounded-xl p-4 mb-4 border border-gray-200"
            >
              <View className="flex-row justify-between items-start mb-3">
                <View>
                  <View className="flex-row items-center">
                    <Text className="text-xl font-bold">{aircraft.code}</Text>
                    <Text className="text-gray-500 ml-2">-</Text>
                    <Text className="text-gray-700 ml-2 font-medium">{aircraft.name}</Text>
                  </View>
                  <Text className="text-gray-600">{aircraft.manufacturer}</Text>
                </View>
                <View className="px-3 py-1 rounded-full bg-green-100">
                  <Text className="text-xs font-medium text-green-600">
                    {aircraft.status}
                  </Text>
                </View>
              </View>

              <View className="bg-gray-50 p-3 rounded-lg mb-4">
                <View className="flex-row justify-between items-center">
                  <View>
                    <Text className="text-gray-600">Kategori</Text>
                    <Text className="font-bold text-lg">{aircraft.category}</Text>
                  </View>
                  <View className="h-12 w-[1px] bg-gray-200" />
                  <View>
                    <Text className="text-gray-600">Mesin</Text>
                    <Text className="font-bold text-lg">{aircraft.engineCount}</Text>
                  </View>
                  <View className="h-12 w-[1px] bg-gray-200" />
                  <View>
                    <Text className="text-gray-600">MTOW</Text>
                    <Text className="font-bold text-sm">{aircraft.maxTakeoffWeight}</Text>
                  </View>
                </View>
              </View>

              <View className="bg-gray-50 p-3 rounded-lg mb-4">
                <View className="flex-row justify-between items-center">
                  <View>
                    <Text className="text-gray-600">Panjang</Text>
                    <Text className="font-bold">{aircraft.length}</Text>
                  </View>
                  <View className="h-12 w-[1px] bg-gray-200" />
                  <View>
                    <Text className="text-gray-600">Lebar Sayap</Text>
                    <Text className="font-bold">{aircraft.wingspan}</Text>
                  </View>
                </View>
              </View>

              <View className="flex-row mt-4 pt-4 border-t border-gray-100">
                <TouchableOpacity
                  className="flex-1 flex-row items-center justify-center"
                  onPress={() => router.push(`./edit/${aircraft.id}`)}
                >
                  <Ionicons name="create" size={20} color="#00695C" />
                  <Text className="text-teal-700 ml-2">Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-1 flex-row items-center justify-center">
                  <Ionicons name="document-text" size={20} color="#00695C" />
                  <Text className="text-teal-700 ml-2">Detail</Text>
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