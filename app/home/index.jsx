import { View, Text, TouchableOpacity, ScrollView, Image, Dimensions, Modal, Alert } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {resetRegistration } from '@/store/slices/deviceSlice';
import TarifBatasAtas from "@/components/tarif-batas-atas";
import SpecialOffer from "@/components/special-offer";

const { width } = Dimensions.get("window");



// Data untuk terminal dan area
const terminals = [{ id: "T1", name: "Gedung Terminal", type: "Domestik" }];
const areas = [
  { id: "A1", name: "Area 1", type: "Keberangkatan" },
  { id: "A2", name: "Area 2", type: "Check-in" },
  { id: "A3", name: "Area 3", type: "Kedatangan" },
];

const services = [
  { id: 1, name: "Check-in Counter", icon: "desktop-outline" },
  { id: 2, name: "Security Check", icon: "shield-checkmark-outline" },
  { id: 3, name: "Immigration", icon: "card-outline" },
  { id: 4, name: "Baggage Claim", icon: "bag-handle-outline" },
  { id: 5, name: "Lost & Found", icon: "help-buoy-outline" },
];

const locations = [
  { id: 1, name: "Food Court", icon: "restaurant-outline" },
  { id: 2, name: "Prayer Room", icon: "moon-outline" },
  { id: 3, name: "Restroom", icon: "water-outline" },
  { id: 4, name: "ATM Center", icon: "card-outline" },
  { id: 5, name: "Information", icon: "information-circle-outline" },
];

const mainMenu = [
  { name: "FASILITAS", icon: "person", route: "/fasilitas" },
  { name: "LAYANAN", icon: "heart", route: "/layanan" },
  { name: "INFORMASI", icon: "restaurant", route: "/informasi" }, // pariwisata., PENGINAPAN, TRANSPORTASI
  { name: "KEGIATAN", icon: "briefcase", route: "/kegiatan" },
  { name: "PERATURAN", icon: "shield-checkmark", route: "/peraturan" },
  { name: "PENGADUAN", icon: "car", route: "/pengaduan" },
  { name: "PPID", icon: "map", route: "/ppid" },
  { name: "TENTANG KAMI", icon: "wine", route: "/tentang-kami" },
];








export default function LandingScreen() {
  const { phoneNumber } = useSelector((state) => state.device);
  const dispatch = useDispatch();
  const router = useRouter();
  const [selectedTerminal, setSelectedTerminal] = useState({
    id: "T1",
    name: "Terminal 1",
    type: "Domestik",
  });
  const [selectedArea, setSelectedArea] = useState({
    id: "A2",
    name: "Area 2",
    type: "Check-in",
  });
  const [showTerminalModal, setShowTerminalModal] = useState(false);
  const [showAreaModal, setShowAreaModal] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);

  const handleServiceSelect = (service) => {
    Alert.alert(
      service.name,
      `Menampilkan informasi detail untuk layanan ${service.name} di ${selectedTerminal.name} ${selectedArea.name}`,
      [
        {
          text: "Lihat di Peta",
          onPress: () => {
            setShowServiceModal(false);
            router.push("/guide/map");
          },
        },
        {
          text: "Tutup",
          style: "cancel",
        },
      ]
    );
  };

  const handleLocationSelect = (location) => {
    Alert.alert(
      location.name,
      `Menampilkan lokasi ${location.name} di ${selectedTerminal.name} ${selectedArea.name}`,
      [
        {
          text: "Lihat di Peta",
          onPress: () => {
            setShowLocationModal(false);
            router.push("/guide/map");
          },
        },
        {
          text: "Tutup",
          style: "cancel",
        },
      ]
    );
  };

  const handleChangePhoneNumberPress = useCallback((flight) => {
    Alert.alert(
      "Change Phone Number",
      `Would you like to change phone Number +${phoneNumber} ?`,
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            dispatch(resetRegistration());
          },
        },
      ]
    );
  }, [phoneNumber, dispatch]);






  return (
    <SafeAreaView className="flex-1 bg-[#991B1B]" edges={["top"]}>
      <View className="px-6 py-3 bg-[#991B1B]">
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-white text-2xl font-bold">{process.env.EXPO_PUBLIC_HOME_TITLE}</Text>
            <Text className="text-white/80">{process.env.EXPO_PUBLIC_HOME_DESC}</Text>
          </View>
          <TouchableOpacity
            className="w-10 h-10 bg-white/20 rounded-full items-center justify-center"
            onPress={handleChangePhoneNumberPress}
          >
            <Ionicons name="person-outline" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1">
        <LinearGradient colors={["#991B1B", "#500724"]} className="pt-6 pb-6">
          <View className="px-6 pt-6 pb-12">
            <View className="bg-white rounded-xl p-4 shadow-lg">
              <View className="flex-row items-center justify-between mb-4">
                <View className="flex-1">
                  <Text className="text-gray-500 text-sm mb-1">
                    Lokasi Layanan
                  </Text>
                  <TouchableOpacity
                    onPress={() => setShowTerminalModal(true)}
                    className="flex-row items-center"
                  >
                    <Text className="text-2xl font-bold mr-2">
                      {selectedTerminal.id}
                    </Text>
                    <Text className="text-gray-600">
                      {selectedTerminal.type}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center">
                  <Ionicons name="map-outline" size={20} color="#991B1B" />
                </View>
                <View className="flex-1 items-end">
                  <Text className="text-gray-500 text-sm mb-1">
                    Jenis Layanan
                  </Text>
                  <TouchableOpacity
                    onPress={() => setShowAreaModal(true)}
                    className="flex-row items-center"
                  >
                    <Text className="text-2xl font-bold mr-2">
                      {selectedArea.id}
                    </Text>
                    <Text className="text-gray-600">{selectedArea.type}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View className="flex-row mb-4">
                <View className="flex-1 mr-2">
                  <Text className="text-gray-500 text-sm mb-1">
                    Kategori Layanan
                  </Text>
                  <TouchableOpacity
                    className="flex-row items-center bg-gray-100 p-3 rounded-lg"
                    onPress={() => setShowServiceModal(true)}
                  >
                    <Ionicons name="list-outline" size={20} color="#666" />
                    <Text className="ml-2">Pilih Layanan</Text>
                  </TouchableOpacity>
                </View>
                <View className="flex-1 ml-2">
                  <Text className="text-gray-500 text-sm mb-1">Lokasi</Text>
                  <TouchableOpacity
                    className="flex-row items-center bg-gray-100 p-3 rounded-lg"
                    onPress={() => setShowLocationModal(true)}
                  >
                    <Ionicons name="location-outline" size={20} color="#666" />
                    <Text className="ml-2">Pilih Lokasi</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                className="bg-[#991B1B] p-4 rounded-lg"
                onPress={() => router.push("/guide/map")}
              >
                <Text className="text-white text-center font-semibold">
                  Lihat Detail Layanan
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>

        <View className=" bg-gray-50 rounded-t-2xl -mt-4">
          <View className="px-6 my-6">
            <Text className="text-lg font-bold mb-4 text-gray-600 ml-3">
              SERVICES
            </Text>
            <View className="flex-row flex-wrap justify-between">
              {mainMenu.map((service, index) => (
                <TouchableOpacity
                  key={index}
                  className="w-[25%] items-center mb-6"
                  onPress={() => service.route && router.push(service.route)}
                >
                  <View className="w-12 h-12 bg-gray-100 rounded-lg items-center justify-center mb-2">
                    <Ionicons name={service.icon} size={20} color="#991B1B" />
                  </View>
                  <Text className="text-center text-xs">{service.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          

          <TarifBatasAtas />
          <SpecialOffer />



          <View className="p-2">
            {/**
             <Text className="text-lg font-bold mb-4">
              Layanan Pemenrintah lainnya
            </Text>
            <View className="flex-row flex-wrap justify-between">
              {quickLinks.map((link) => (
                <TouchableOpacity
                  key={link.id}
                  className="w-[23%] items-center mb-6"
                  onPress={() => link.route && router.push(link.route)}
                >
                  <View className="w-14 h-14 bg-white rounded-xl shadow-sm items-center justify-center mb-2">
                    <Ionicons name={link.icon} size={24} color="#0d47a1" />
                  </View>
                  <Text className="text-center text-xs">{link.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
             */}
          </View>
        </View>
      </ScrollView>

      <Modal
        visible={showTerminalModal}
        transparent={true}
        animationType="slide"
      >
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-white rounded-t-3xl">
            <View className="p-4 border-b border-gray-200">
              <View className="flex-row justify-between items-center">
                <Text className="text-xl font-bold">Pilih Terminal</Text>
                <TouchableOpacity
                  onPress={() => setShowTerminalModal(false)}
                  className="p-2"
                >
                  <Ionicons name="close" size={24} color="#374151" />
                </TouchableOpacity>
              </View>
            </View>
            <ScrollView className="max-h-[50vh]">
              {terminals.map((terminal) => (
                <TouchableOpacity
                  key={terminal.id}
                  className="p-4 border-b border-gray-100 flex-row justify-between items-center"
                  onPress={() => {
                    setSelectedTerminal(terminal);
                    setShowTerminalModal(false);
                  }}
                >
                  <View>
                    <Text className="text-lg font-semibold">
                      {terminal.name}
                    </Text>
                    <Text className="text-gray-600">{terminal.type}</Text>
                  </View>
                  {selectedTerminal.id === terminal.id && (
                    <Ionicons
                      name="checkmark-circle"
                      size={24}
                      color="#991B1B"
                    />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Modal visible={showAreaModal} transparent={true} animationType="slide">
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-white rounded-t-3xl">
            <View className="p-4 border-b border-gray-200">
              <View className="flex-row justify-between items-center">
                <Text className="text-xl font-bold">Pilih Area</Text>
                <TouchableOpacity
                  onPress={() => setShowAreaModal(false)}
                  className="p-2"
                >
                  <Ionicons name="close" size={24} color="#374151" />
                </TouchableOpacity>
              </View>
            </View>
            <ScrollView className="max-h-[50vh]">
              {areas.map((area) => (
                <TouchableOpacity
                  key={area.id}
                  className="p-4 border-b border-gray-100 flex-row justify-between items-center"
                  onPress={() => {
                    setSelectedArea(area);
                    setShowAreaModal(false);
                  }}
                >
                  <View>
                    <Text className="text-lg font-semibold">{area.name}</Text>
                    <Text className="text-gray-600">{area.type}</Text>
                  </View>
                  {selectedArea.id === area.id && (
                    <Ionicons
                      name="checkmark-circle"
                      size={24}
                      color="#991B1B"
                    />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showServiceModal}
        transparent={true}
        animationType="slide"
      >
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-white rounded-t-3xl">
            <View className="p-4 border-b border-gray-200">
              <View className="flex-row justify-between items-center">
                <Text className="text-xl font-bold">Pilih Layanan</Text>
                <TouchableOpacity
                  onPress={() => setShowServiceModal(false)}
                  className="p-2"
                >
                  <Ionicons name="close" size={24} color="#374151" />
                </TouchableOpacity>
              </View>
            </View>
            <ScrollView className="max-h-[50vh]">
              {services.map((service) => (
                <TouchableOpacity
                  key={service.id}
                  className="p-4 border-b border-gray-100 flex-row items-center"
                  onPress={() => handleServiceSelect(service)}
                >
                  <View className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center mr-3">
                    <Ionicons name={service.icon} size={20} color="#991B1B" />
                  </View>
                  <Text className="text-lg">{service.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showLocationModal}
        transparent={true}
        animationType="slide"
      >
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-white rounded-t-3xl">
            <View className="p-4 border-b border-gray-200">
              <View className="flex-row justify-between items-center">
                <Text className="text-xl font-bold">Pilih Lokasi</Text>
                <TouchableOpacity
                  onPress={() => setShowLocationModal(false)}
                  className="p-2"
                >
                  <Ionicons name="close" size={24} color="#374151" />
                </TouchableOpacity>
              </View>
            </View>
            <ScrollView className="max-h-[50vh]">
              {locations.map((location) => (
                <TouchableOpacity
                  key={location.id}
                  className="p-4 border-b border-gray-100 flex-row items-center"
                  onPress={() => handleLocationSelect(location)}
                >
                  <View className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center mr-3">
                    <Ionicons name={location.icon} size={20} color="#991B1B" />
                  </View>
                  <Text className="text-lg">{location.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
