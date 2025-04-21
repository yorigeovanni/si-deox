import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
} from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {
  Fragment,
  useState,
  useCallback,
  useRef,
  useMemo,
  useEffect,
} from "react";
import { ErrorState } from "@/components/ui/ErrorState";
import { useQuery } from "@tanstack/react-query";
import createRequest from "@/services/api-secure-portal";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault();
const { post } = createRequest();
//================================= QUERY KEY =================================
const query_keys = ["global-informasi-search"];
//===================================================================================

export default function DinamicInformasiCard() {
  const router = useRouter();
  const firstTimeRef = useRef(true);

  const [selectedJenisInformasi, setJenisInformasi] = useState(null);
  const [selectedKategori, setSelectedKategori] = useState();
  const [selectedTahunInformasi, setSelectedTahunInformasi] = useState(null);

  const [showTerminalModal, setShowTerminalModal] = useState(false);
  const [showAreaModal, setShowAreaModal] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: [...query_keys],
    queryFn: async () => {
      try {
        const { data } = await post("/mobile/api/portal/home/dinamic-informasi-search", {});
        return data;
      } catch (error) {
        throw error;
      }
    },
  });


  const jenis_informasi = useMemo(() => {
    if (data) {
      return data.jenis_informasi ?? [];
    }
    return [];
  }, [data]);




  

  const kategori_informasi = useMemo(() => {
    if (!data) {
      return [];
    }
    if (!selectedJenisInformasi) {
      return [];
    }
    return data.kategori_informasi.filter((item) => {
      return item.parent === selectedJenisInformasi.id;
    });
  }, [data, selectedJenisInformasi]);

  const tahun_informasi = useMemo(() => {
    if (data) {
      return data.tahun_informasi ?? [];
    }
    return [];
  }, [data]);

  const tags_informasi = useMemo(() => {
    if (data) {
      return data.tags_informasi ?? [];
    }
    return [];
  }, [data]);

  const disabled = useMemo(() => {
    return (
      !selectedJenisInformasi || !selectedKategori || !selectedTahunInformasi
    );
  }, [selectedJenisInformasi, selectedKategori, selectedTahunInformasi]);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  useEffect(() => {
    if (!selectedJenisInformasi && jenis_informasi.length > 0) {
      setJenisInformasi(jenis_informasi[0]);
    }
  }, [jenis_informasi, selectedJenisInformasi]);

  useEffect(() => {
    if (!selectedKategori && kategori_informasi.length > 0) {
      setSelectedKategori(kategori_informasi[0]);
    }
  }, [kategori_informasi, selectedKategori]);

  useEffect(() => {
    if (!selectedTahunInformasi && tahun_informasi.length > 0) {
      setSelectedTahunInformasi(tahun_informasi[0]);
    }
  }, [tahun_informasi, selectedTahunInformasi]);

  const onChangeJenisInformasi = useCallback((jenis) => {
    setSelectedKategori(null);
    setSelectedTahunInformasi(null);
    setJenisInformasi(jenis);
    setShowTerminalModal(false);
  }, []);


  
  return (
    <Fragment>
      <View className="px-6 pt-6 pb-12">
        <View className="bg-white rounded-xl p-4 shadow-lg">
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-1">
              <Text className="text-gray-500 text-sm mb-1">
                JENIS INFORMASI
              </Text>
              <TouchableOpacity
                onPress={() => setShowTerminalModal(true)}
                className="flex-row items-center"
              >
                <Text className="text-2xl font-bold mr-2">
                  {!isLoading && selectedJenisInformasi?.code}
                </Text>
                <Text className="text-gray-600">
                  {isLoading ? "Loading ..." : selectedJenisInformasi?.type}
                </Text>
              </TouchableOpacity>
            </View>
            <View className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center">
              <Ionicons name="map-outline" size={20} color="#991B1B" />
            </View>
            <View className="flex-1 items-end">
              <Text className="text-gray-500 text-sm mb-1">
                KATEGORI INFORMASI
              </Text>
              <TouchableOpacity
                onPress={() => setShowAreaModal(true)}
                className="flex-row items-center"
              >
                <Text className="text-2xl font-bold mr-2">
                  {!isLoading && selectedKategori?.code}
                </Text>
                <Text className="text-gray-600">
                  {isLoading ? "Loading ..." : selectedKategori?.type}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="flex-row mb-4">
            <View className="flex-1 mr-2">
              <Text className="text-gray-500 text-sm mb-1">TAHUN LAYANAN</Text>
              <TouchableOpacity
                className="flex-row items-center bg-gray-100 p-3 rounded-lg"
                onPress={() => setShowServiceModal(true)}
              >
                {!isLoading && (
                  <Ionicons name="list-outline" size={20} color="#666" />
                )}
                <Text className="ml-2">
                  {isLoading ? "Loading ..." : selectedTahunInformasi?.name}
                </Text>
              </TouchableOpacity>
            </View>
            <View className="flex-1 ml-2">
              <Text className="text-gray-500 text-sm mb-1">LABEL</Text>
              <TouchableOpacity
                className="flex-row items-center bg-gray-100 p-3 rounded-lg"
                //onPress={() => setShowLocationModal(true)}
              >
                {!isLoading && (
                  <Ionicons name="list-outline" size={20} color="#666" />
                )}
                <Text className="ml-2 text-gray-400">
                  {isLoading ? "Loading ..." : "No Label"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            disabled={disabled}
            className="bg-[#991B1B] p-4 rounded-lg"
            onPress={() => router.push(`/dinamic-informasi-render/${selectedJenisInformasi?.value}/${selectedKategori?.value}/${selectedTahunInformasi?.value}`)}
          >
            <Text className="text-white text-center font-semibold">
              Lihat Detail Informasi
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={showTerminalModal}
        transparent={true}
        animationType="slide"
      >
        <View className="flex-1 bg-black/50 justify-center items-center px-4">
          <View className="bg-white w-full max-w-md rounded-2xl overflow-hidden">
            <View className="p-4 border-b border-gray-200 bg-red-800">
              <View className="flex-row justify-between items-center">
                <Text className="text-xl font-bold text-white">
                  Jenis Informasi
                </Text>
                <TouchableOpacity
                  onPress={() => setShowTerminalModal(false)}
                  className="p-2"
                >
                  <Ionicons name="close" size={24} color="#ffffff" />
                </TouchableOpacity>
              </View>
            </View>
            <ScrollView className="max-h-[50vh]">
              {jenis_informasi.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  className="p-4 border-b border-gray-100 flex-row justify-between items-center"
                  onPress={() => onChangeJenisInformasi(item)}
                >
                  <View>
                    <Text className="text-lg font-semibold">{item?.name}</Text>
                    <Text className="text-gray-600">{item?.type}</Text>
                  </View>
                  {selectedJenisInformasi?.id === item?.id && (
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
        <View className="flex-1 bg-black/50 justify-center items-center px-4">
          <View className="bg-white w-full max-w-md rounded-2xl overflow-hidden">
            <View className="p-4 border-b border-gray-200 bg-red-800">
              <View className="flex-row justify-between items-center">
                <Text className="text-xl font-bold text-white">
                  Kategori Informasi
                </Text>
                <TouchableOpacity
                  onPress={() => setShowAreaModal(false)}
                  className="p-2"
                >
                  <Ionicons name="close" size={24} color="#ffffff" />
                </TouchableOpacity>
              </View>
            </View>
            <ScrollView className="max-h-[50vh]">
              {kategori_informasi.map((area) => (
                <TouchableOpacity
                  key={area.id}
                  className="p-4 border-b border-gray-100 flex-row justify-between items-center"
                  onPress={() => {
                    setSelectedKategori(area);
                    setShowAreaModal(false);
                  }}
                >
                  <View>
                    <Text className="text-lg font-semibold">{area.name}</Text>
                    <Text className="text-gray-600">{area.type}</Text>
                  </View>
                  {selectedKategori?.id === area.id && (
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
        <View className="flex-1 bg-black/50 justify-center items-center px-4">
          <View className="bg-white w-full max-w-md rounded-2xl overflow-hidden">
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
              {tahun_informasi.map((service) => (
                <TouchableOpacity
                  key={service.id}
                  className="p-4 border-b border-gray-100 flex-row items-center"
                  onPress={() => {
                    setSelectedTahunInformasi(service);
                    setShowServiceModal(false);
                  }}
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
              {tags_informasi.map((location) => (
                <TouchableOpacity
                  key={location.id}
                  className="p-4 border-b border-gray-100 flex-row items-center"
                  //  onPress={() => handleLocationSelect(location)}
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
    </Fragment>
  );
}
