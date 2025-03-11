import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useCallback, Fragment } from "react";
import createRequest from "@/services/api-secure-internal";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(utc);
dayjs.extend(customParseFormat);

const model_name = "x_data_airport";
const selectedFields = {
  x_name: {},
  x_studio_nama_bandara: {},
  x_studio_kota: {},
  x_studio_lat: {},
  write_date: {},
  write_uid: {
    fields: {
      display_name: {},
    },
  },
  create_uid: {
    fields: {
      display_name: {},
    },
  },
  create_date: {},
};

export default function AmcParkingStand() {
  const { post } = createRequest();
  const router = useRouter();
  const [filterOptions, setFilterOptions] = useState([]);
  const [
    { domain, limit, offset, order, searchQuery, activeFilters },
    setParams,
  ] = useState({
    domain: [],
    searchQuery: "",
    activeFilters: [],
    limit: 20,
    offset: 0,
    order: "write_date DESC",
  });

  const [{ data, totalCount, loading, error }, setState] = useState({
    data: [],
    totalCount: 0,
    loading: true,
    error: null,
  });

  const setOffset = useCallback(
    (offset) => {
      setParams((prevState) => ({
        ...prevState,
        offset: offset,
      }));
    },
    [setParams]
  );

  const setSearch = useCallback(
    (search) => {
      setParams((prevState) => ({
        ...prevState,
        searchQuery: search,
      }));
    },
    [setParams]
  );

  const constructDomain = useCallback(() => {
    let newDomain = [];
    if (searchQuery) {
      newDomain.push(["x_name", "ilike", searchQuery]);
    }
    return newDomain;
  }, [searchQuery, domain, activeFilters]);

  const loadData = useCallback(async () => {
    try {
      setState((prevState) => ({
        ...prevState,
        loading: true,
      }));
      const finalDomain = constructDomain();
      const { data } = await post(`/mobile/api/internal/mobile-data`, {
        jsonrpc: "2.0",
        method: "call",
        params: {
          model: model_name,
          method: "web_search_read",
          args: [],
          kwargs: {
            specification: selectedFields,
            offset: offset,
            order: order,
            limit: limit,
            count_limit: 100001,
            domain: finalDomain,
          },
        },
      });

      setState((prevState) => ({
        ...prevState,
        totalCount: data.length,
        data: data.records,
        error: null,
      }));
    } catch (e) {
      //console.log(e);
      setState((prevState) => ({
        ...prevState,
        error: e.message,
      }));
    } finally {
      setState((prevState) => ({
        ...prevState,
        loading: false,
      }));
    }
  }, [offset, limit, order, constructDomain]);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [domain, searchQuery, activeFilters, limit, offset, order])
  );

  const totalPages = Math.ceil(totalCount / 20);

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* HEADER */}
      <LinearGradient colors={["#004D40", "#00251a"]} className="pt-12 pb-6">
        <View className="px-6 flex-row items-center justify-between py-4">
          <TouchableOpacity
            className="w-10 h-10 bg-white/20 rounded-full items-center justify-center mb-4"
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <View className="flex-col items-end justify-end">
            <Text className="text-white text-2xl font-bold">AIRPORT LIST</Text>
            <Text className="text-white/80">AMC - DEO AIRPORT</Text>
          </View>
        </View>
      </LinearGradient>

      {/* SEARCH BAR + ADD */}
      <View className=" flex-row">
        <View className="w-[80%] bg-white rounded-lg px-2 py-3 m-2 border border-gray-200">
          <View className="flex-row items-center">
            <Ionicons name="search" size={20} color="#666" />
            <TextInput
              className="flex-1 ml-2 text-base"
              placeholder="Search Data..."
              value={searchQuery}
              onChangeText={setSearch}
            />
          </View>
        </View>
        <View className=" flex items-center justify-center">
          <TouchableOpacity
            className="bg-white p-2 rounded-xl border border-gray-200"
            onPress={() =>
              router.push("./create", { relativeToDirectory: true })
            }
          >
            <View className="flex-row items-center justify-center">
              <Ionicons name="add-circle" size={28} color="#004D40" />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/** RENDER CONTENT */}
      <ScrollView className="flex-1">
        {loading ? (
          <View className="flex-col items-center justify-center p-6">
            <ActivityIndicator
              size="large"
              color="#009688"
              className=" mt-16"
            />
            <Text className="text-gray-600 mt-4">Load Data...</Text>
          </View>
        ) : error ? (
          <View className="flex-1 justify-center items-center p-6">
            <Ionicons name="alert-circle" size={48} color="#ef4444" />
            <Text className="text-red-600 text-center mt-4">{error}</Text>
            <TouchableOpacity
              onPress={() => loadData()}
              className="mt-4 bg-teal-600 px-6 py-3 rounded-lg"
            >
              <Text className="text-white font-medium">Retry</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <RenderContent data={data} />
        )}
      </ScrollView>

      {/** PAGINATION */}
      <View className="bg-white border-t border-gray-200 px-4 py-3">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center space-x-2">
            <TouchableOpacity
              className={`p-2 rounded-lg mr-4 ${
                offset === 0 ? "bg-gray-100 opacity-50" : "bg-gray-100"
              }`}
              onPress={() => {
                if (offset !== 0) {
                  setOffset(0);
                  loadData();
                }
              }}
              disabled={offset === 0}
            >
              <Ionicons name="play-skip-back" size={18} color="#009688" />
            </TouchableOpacity>

            <TouchableOpacity
              className={`p-2 rounded-lg ${
                offset === 0 ? "bg-gray-100 opacity-50" : "bg-gray-100"
              }`}
              onPress={() => {
                if (offset >= 20) {
                  setOffset(offset - 20);
                  loadData();
                }
              }}
              disabled={offset === 0}
            >
              <Ionicons name="chevron-back" size={18} color="#009688" />
            </TouchableOpacity>
          </View>

          <View className="flex-row items-center space-x-1">
            <View className="w-8 h-8 rounded-lg bg-teal-600 items-center justify-center">
              <Text className="text-white font-medium">
                {Math.floor(offset / 20) + 1}
              </Text>
            </View>
            <Text className="text-gray-600">/</Text>
            <Text className="text-gray-800 font-medium">{totalPages}</Text>
          </View>

          <View className="flex-row items-center space-x-2">
            <TouchableOpacity
              className={`p-2 rounded-lg ${
                offset >= (totalPages - 1) * 20
                  ? "bg-gray-100 opacity-50"
                  : "bg-gray-100"
              }`}
              onPress={() => {
                if (offset < (totalPages - 1) * 20) {
                  setOffset(offset + 20);
                  loadData();
                }
              }}
              disabled={offset >= (totalPages - 1) * 20}
            >
              <Ionicons name="chevron-forward" size={18} color="#009688" />
            </TouchableOpacity>

            <TouchableOpacity
              className={`p-2 rounded-lg ml-4 ${
                offset >= (totalPages - 1) * 20
                  ? "bg-gray-100 opacity-50"
                  : "bg-gray-100"
              }`}
              onPress={() => {
                if (offset < (totalPages - 1) * 20) {
                  setOffset((totalPages - 1) * 20);
                  loadData();
                }
              }}
              disabled={offset >= (totalPages - 1) * 20}
            >
              <Ionicons name="play-skip-forward" size={18} color="#009688" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="mt-3 flex-row items-end justify-end px-3 border-t border-gray-100 pt-3">
          <View className="flex-row items-center">
            <Text className="text-gray-600 text-sm">
              Showing{" "}
              <Text className="font-medium text-gray-800">
                {offset + 1} - {Math.min(offset + 20, totalCount)}
              </Text>{" "}
              of <Text className="font-medium text-gray-800">{totalCount}</Text>{" "}
              entries
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const RenderContent = ({ data }) => {
  const router = useRouter();
  return (
    <View className="p-6">
      {data.map((airport, index) => (
        <View
          key={index}
          className="bg-white rounded-xl p-4 mb-4 border border-gray-200"
        >
          <View className="flex-row justify-between items-start mb-3">
            <View>
              <View className="flex-row items-center">
                <Text className="text-xl font-bold">
                  {airport.x_name} - {airport.x_studio_kota}
                </Text>
              </View>
              <Text className="text-gray-600">
                {airport.x_studio_nama_bandara}
              </Text>
            </View>
            <View
              className={`px-3 py-1 rounded-full ${
                airport.status === "Aktif" ? "bg-green-100" : "bg-yellow-100"
              }`}
            >
              <Text
                className={`text-xs font-medium ${
                  airport.status === "Aktif"
                    ? "text-green-600"
                    : "text-yellow-600"
                }`}
              >
                {airport.status}
              </Text>
            </View>
          </View>

          <View className="bg-gray-50 p-3 rounded-lg mb-4">
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-gray-600">RUNWAY</Text>
                <Text className="font-bold text-lg">2500M</Text>
              </View>
              <View className="h-12 w-[1px] bg-gray-200" />
              <View>
                <Text className="text-gray-600">FROM</Text>
                <Text className="font-bold text-lg">12</Text>
              </View>
              <View className="h-12 w-[1px] bg-gray-200" />
              <View>
                <Text className="text-gray-600">DEST</Text>
                <Text className="font-bold text-sm">0</Text>
              </View>
            </View>
          </View>

          <View className="flex-row mt-4 pt-4 border-t border-gray-100">
            <TouchableOpacity
              className="flex-1 flex-row items-center justify-center"
              onPress={() => router.push(`./edit/${airport.id}`)}
            >
              <Ionicons name="create" size={20} color="#00796B" />
              <Text className="text-teal-700 ml-2">Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 flex-row items-center justify-center">
              <Ionicons name="map" size={20} color="#00796B" />
              <Text className="text-teal-700 ml-2">Peta</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 flex-row items-center justify-center">
              <Ionicons name="trash" size={20} color="#ef4444" />
              <Text className="text-red-500 ml-2">Hapus</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
};

/*import { View, Text, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

const airports = [
  {
    id: "APT001",
    code: "SOQ",
    name: "Bandar Udara DEO Sorong",
    city: "Sorong",
    province: "Papua Barat",
    status: "Aktif",
    runwayLength: "2.500m",
    category: "Kelas I",
    coordinates: "-0.894386, 131.287512",
  },
  {
    id: "APT002",
    code: "DJJ",
    name: "Bandar Udara Sentani",
    city: "Jayapura",
    province: "Papua",
    status: "Aktif",
    runwayLength: "2.300m",
    category: "Kelas I",
    coordinates: "-2.576912, 140.516403",
  },
  {
    id: "APT003",
    code: "TIM",
    name: "Bandar Udara Mozes Kilangin",
    city: "Timika",
    province: "Papua Tengah",
    status: "Aktif",
    runwayLength: "2.200m",
    category: "Kelas II",
    coordinates: "-4.528249, 136.887375",
  },
];

const filterOptions = {
  category: [
    { label: "Semua", value: "all" },
    { label: "Kelas I", value: "class1" },
    { label: "Kelas II", value: "class2" },
    { label: "Kelas III", value: "class3" },
  ],
};

export default function AirportScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <LinearGradient colors={["#00796B", "#004D40"]} className="pt-12 pb-6">
        <View className="px-6 flex-row items-center justify-between py-4">
          <TouchableOpacity
            className="w-10 h-10 bg-white/20 rounded-full items-center justify-center mb-4"
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <View className="flex-col items-end justify-end">
            <Text className="text-white text-2xl font-bold">Data Bandara</Text>
            <Text className="text-white/80">Manajemen informasi bandara</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView className="flex-1">
        <View className="p-6 -mt-6">
         
          <View className="bg-white rounded-xl px-4 py-3 mb-4 border border-gray-200">
            <View className="flex-row items-center">
              <Ionicons name="search" size={20} color="#666" />
              <TextInput
                className="flex-1 ml-2 text-base"
                placeholder="Cari bandara..."
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </View>

          
          <TouchableOpacity
            className="bg-white p-4 rounded-xl border border-gray-200 mb-6"
            onPress={() => router.push("./create")}
          >
            <View className="flex-row items-center justify-center">
              <Ionicons name="add-circle" size={20} color="#00796B" />
              <Text className="text-teal-700 font-semibold ml-2">
                Tambah Data Bandara
              </Text>
            </View>
          </TouchableOpacity>

        
          {airports.map((airport) => (
            <View
              key={airport.id}
              className="bg-white rounded-xl p-4 mb-4 border border-gray-200"
            >
              <View className="flex-row justify-between items-start mb-3">
                <View>
                  <View className="flex-row items-center">
                    <Text className="text-xl font-bold">{airport.code}</Text>
                    <Text className="text-gray-500 ml-2">-</Text>
                    <Text className="text-gray-700 ml-2 font-medium">
                      {airport.name}
                    </Text>
                  </View>
                  <Text className="text-gray-600">
                    {airport.city}, {airport.province}
                  </Text>
                </View>
                <View
                  className={`px-3 py-1 rounded-full ${
                    airport.status === "Aktif"
                      ? "bg-green-100"
                      : "bg-yellow-100"
                  }`}
                >
                  <Text
                    className={`text-xs font-medium ${
                      airport.status === "Aktif"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {airport.status}
                  </Text>
                </View>
              </View>

              <View className="bg-gray-50 p-3 rounded-lg mb-4">
                <View className="flex-row justify-between items-center">
                  <View>
                    <Text className="text-gray-600">Panjang Runway</Text>
                    <Text className="font-bold text-lg">
                      {airport.runwayLength}
                    </Text>
                  </View>
                  <View className="h-12 w-[1px] bg-gray-200" />
                  <View>
                    <Text className="text-gray-600">Kategori</Text>
                    <Text className="font-bold text-lg">
                      {airport.category}
                    </Text>
                  </View>
                  <View className="h-12 w-[1px] bg-gray-200" />
                  <View>
                    <Text className="text-gray-600">Koordinat</Text>
                    <Text className="font-bold text-sm">
                      {airport.coordinates}
                    </Text>
                  </View>
                </View>
              </View>

              <View className="flex-row mt-4 pt-4 border-t border-gray-100">
                <TouchableOpacity
                  className="flex-1 flex-row items-center justify-center"
                  onPress={() => router.push(`./edit/${airport.id}`)}
                >
                  <Ionicons name="create" size={20} color="#00796B" />
                  <Text className="text-teal-700 ml-2">Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-1 flex-row items-center justify-center">
                  <Ionicons name="map" size={20} color="#00796B" />
                  <Text className="text-teal-700 ml-2">Peta</Text>
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
*/
