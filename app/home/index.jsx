import { View, Text, TouchableOpacity, ScrollView, Modal, Alert } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {resetRegistration } from '@/store/slices/deviceSlice';
import DinamicInformasiCard from "@/components/dinamic-informasi-card";
import TarifBatasAtas from "@/components/tarif-batas-atas";
import SpecialOffer from "@/components/special-offer";



const publicMenu = [
  { name: "FASILITAS", icon: "person", route: "/fasilitas" },
  { name: "LAYANAN", icon: "heart", route: "/layanan" },
  { name: "BERITA", icon: "restaurant", route: "/informasi" }, // pariwisata., PENGINAPAN, TRANSPORTASI
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
          <DinamicInformasiCard />
        </LinearGradient>

        <View className=" bg-gray-50 rounded-t-2xl -mt-4">
          <View className="px-6 my-6">
            <Text className="text-lg font-semibold mb-4 text-gray-600 ml-3">
              QUICK ACCESS
            </Text>
            <View className="flex-row flex-wrap justify-between">
              {publicMenu.map((service, index) => (
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

    </SafeAreaView>
  );
}
