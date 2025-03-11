import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState, useCallback } from "react";
import { useRouter } from "expo-router";

import { HomeSection } from "@/components/ppid/sections/HomeSection";
import { HistorySection } from "@/components/ppid/sections/HistorySection";
import { VisionMissionSection } from "@/components/ppid/sections/VisionMissionSection";
import { NewsSection } from "@/components/ppid/sections/NewsSection";
import { OrganizationSection } from "@/components/ppid/sections/GallerySection";
import { ContactSection } from "@/components/ppid/sections/ContactSection";
import {
  organizationInfo,
  quickStats,
  quickLinks,
  announcements,
  aboutSections,
  services,
  news,
  gallery,
} from "@/constants/homeData";

import IconBaru from "@/assets/icon-baru.png";

export default function HomeScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [activeSection, setActiveSection] = useState("beranda");
  const tabs = [
    { id: "beranda", label: "TENTANG PPID" },
    { id: "sejarah", label: "MAKLUMAT & STANDAR BIAYA" },
    { id: "kontak", label: "PROSEDUR" },
    { id: "galeri", label: "INFORMASI DIKECUALIKAN" },
    { id: "visi-misi", label: "INFORMASI BERKALA" },
    { id: "penghargaan", label: "INFORMASI SETIAP SAAT" },
    { id: "berita", label: "INFORMASI SERTA MERTA" },
    { id: "permohonan-anda", label: "PERMOHONAN ANDA" },
  ];

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  const renderContent = useCallback(() => {
    switch (activeSection) {
      case "beranda":
        return (
          <HomeSection
            organizationInfo={organizationInfo}
            quickStats={quickStats}
            quickLinks={quickLinks}
            announcements={announcements}
          />
        );
      case "sejarah":
        return <HistorySection aboutSections={aboutSections} />;
      case "visi-misi":
        return <VisionMissionSection services={services} />;
      case "berita":
        return <NewsSection news={news} />;
      case "galeri":
        return <OrganizationSection gallery={gallery} />;
      case "kontak":
        return <ContactSection />;
      default:
        return null;
    }
  }, [activeSection]);

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="bg-white border-b border-gray-200">
        <View className="px-4 py-3 flex-row items-center justify-between">
          <View className="flex-row items-start justify-start">
            <TouchableOpacity
              onPress={() => router.replace("/")}
              className="w-10 h-10 mt-1 bg-red-100 rounded-full items-center justify-center"
            >
              <Ionicons name="home" size={22} color="#991B1B" />
            </TouchableOpacity>
            <View className=" flex-col items-start justify-start ml-3">
              <Text className="text-xl font-bold text-red-700">
                INFORMASI PUBLIK
              </Text>
              <Text className="text-xs text-red-800">
                PPID - BLU UPBU KELAS I DEO - SORONG
              </Text>
            </View>
          </View>
          <View className="flex-row items-center">
            <Image source={IconBaru} className=" w-24 h-10 rounded-full" />
          </View>
        </View>
      </View>

      <View className="bg-red-800 border-b border-gray-500">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        >
          {tabs.map((tab, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setActiveSection(tab.id)}
              className="mr-8 relative"
            >
              <View className="py-4">
                <Text
                  className={`text-sm font-medium ${
                    activeSection === tab.id
                      ? "text-red-800 bg-white p-1 rounded-md"
                      : "text-white p-1"
                  }`}
                >
                  {tab.label}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {renderContent()}
      </ScrollView>
    </SafeAreaView>
  );
}
