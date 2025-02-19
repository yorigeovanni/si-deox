import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  Modal,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {resetRegistration } from '@/store/slices/deviceSlice';
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

const quickLinks = [
  { id: "1", name: "PPID", icon: "airplane", route: "/penerbangan" },
  { id: "2", name: "PENGADUAN", icon: "log-in" },
  { id: "3", name: "INSPEKSI", icon: "calendar" },
  { id: "4", name: "TENTANG KAMI", icon: "map" },
];

const ancillaryServices = [
  { name: "FASILITAS", icon: "person", route: "/fasilitas" },
  {
    name: "LAYANAN",
    icon: "heart",
    route: "/layanan",
  },
  { name: "INFORMASI", icon: "restaurant", route: "/informasi" }, // pariwisata., PENGINAPAN, TRANSPORTASI
  { name: "KEGIATAN", icon: "briefcase", route: "/kegiatan" },
  { name: "PERATURAN", icon: "shield-checkmark", route: "/peraturan" },
  { name: "PPID", icon: "map", route: "/ppid" },
  { name: "DEWAS BLU", icon: "car", route: "/dewas-blu" },
  { name: "TENTANG KAMI", icon: "wine", route: "/tentang-kami" },
];

const popularRoutes = [
  {
    from: "SOQ",
    fromCity: "Sorong",
    to: "JKT",
    toCity: "Jakarta",
    price: "2.500.000",
  },
  {
    from: "SOQ",
    fromCity: "Sorong",
    to: "MKS",
    toCity: "Makassar",
    price: "1.800.000",
  },
  {
    from: "SOQ",
    fromCity: "Sorong",
    to: "MDC",
    toCity: "Manado",
    price: "1.500.000",
  },
];

const promoCards = [
  {
    id: "1",
    title: "Year End Sale",
    subtitle: "Get up to 30% off on domestic flights",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80",
    tag: "Limited Time",
  },
  {
    id: "2",
    title: "Business Class Upgrade",
    subtitle: "Fly in comfort with special upgrade rates",
    image:
      "https://images.unsplash.com/photo-1540339832862-474599807836?auto=format&fit=crop&w=1200&q=80",
    tag: "Premium Offer",
  },
  {
    id: "3",
    title: "Family Holiday Package",
    subtitle: "Special rates for family travelers",
    image:
      "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&w=1200&q=80",
    tag: "Family Deal",
  },
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
            <Text className="text-white text-2xl font-bold">DEO AIRPOT</Text>
            <Text className="text-white/80">TERDEPAN-BERKUALITAS-BERSINAL</Text>
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
              {ancillaryServices.map((service, index) => (
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

          <View className="px-6 mb-6">
            <Text className="text-lg font-bold mb-4 text-gray-600 ml-3 uppercase">
              Tarif Batas Atas
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="space-x-4"
            >
              {popularRoutes.map((route, index) => (
                <View
                  key={index}
                  className="bg-white p-4 rounded-xl border border-gray-200"
                  style={{
                    width: width * 0.7,
                    marginRight: index === promoCards.length - 1 ? 0 : 12,
                  }}
                >
                  <View className="flex-row items-center justify-between mb-4">
                    <View>
                      <Text className="text-2xl font-bold">{route.from}</Text>
                      <Text className="text-gray-500">{route.fromCity}</Text>
                    </View>
                    <View className="items-center">
                      <Ionicons name="airplane" size={20} color="#991B1B" />
                      <View className="w-20 h-[1px] bg-gray-300 my-2" />
                      <Text className="text-xs text-gray-500">2h 15m</Text>
                    </View>
                    <View className="items-end">
                      <Text className="text-2xl font-bold">{route.to}</Text>
                      <Text className="text-gray-500">{route.toCity}</Text>
                    </View>
                  </View>
                  <View className="flex-row items-center justify-between">
                    <Text className="text-[#991B1B] font-bold">
                      Rp {route.price}
                    </Text>
                    <TouchableOpacity className="bg-[#991B1B] px-4 py-2 rounded-lg">
                      <Text className="text-white">Book Now</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>

          <View className="px-6 mb-8">
            <Text className="text-lg font-bold mb-4">Special Offers</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToInterval={width - 48}
              decelerationRate="fast"
            >
              {promoCards.map((promo, index) => (
                <TouchableOpacity
                  key={promo.id}
                  className="relative"
                  style={{
                    width: width - 48,
                    marginRight: index === promoCards.length - 1 ? 0 : 12,
                  }}
                >
                  <View className="overflow-hidden rounded-xl">
                    <Image
                      source={{ uri: promo.image }}
                      className="w-full h-48"
                      resizeMode="cover"
                    />
                    <LinearGradient
                      colors={["rgba(0,0,0,0.7)", "transparent"]}
                      className="absolute inset-0 h-full"
                    />
                    <View className="absolute top-4 left-4 right-4">
                      <View className="flex-row items-center mb-2">
                        <View className="bg-red-500 px-2 py-1 rounded">
                          <Text className="text-white text-xs font-medium">
                            {promo.tag}
                          </Text>
                        </View>
                      </View>
                      <Text className="text-white text-xl font-bold mb-1">
                        {promo.title}
                      </Text>
                      <Text className="text-white/90">{promo.subtitle}</Text>
                    </View>
                    <TouchableOpacity className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-lg">
                      <Text className="text-[#0d47a1] font-semibold">
                        Learn More
                      </Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View className="p-6">
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
