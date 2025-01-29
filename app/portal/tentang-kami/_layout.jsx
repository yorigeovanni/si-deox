import { useRouter, Stack, usePathname } from "expo-router";
import React, { useMemo } from "react";
import { View, Text, TouchableOpacity, Platform, FlatList, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { classNames } from "@/utils";

const basePath = "/portal/tentang-kami";

// Fungsi mapping borderColor Tailwind ke heksadesimal
const colorMap = {
  "border-blue-600": "#2563eb",
  "border-pink-600": "#db2777",
  "border-yellow-600": "#ca8a04",
  "border-amber-600": "#d97706",
  "border-red-600": "#dc2626",
  "border-purple-600": "#7e22ce",
  "border-green-600": "#16a34a",
};

export default function LayoutPpid() {
  const router = useRouter();
  const pathname = usePathname();

  // Daftar menu
  const menuItems = [
    {
      name: "PROFILE BLU",
      icon: "document-attach-outline",
      bgColor: "bg-pink-600",
      borderColor: "border-pink-600",
      route: `${basePath}`,
    },
    
    {
      name: "VISI & MISI",
      icon: "document-attach-outline",
      bgColor: "bg-pink-600",
      borderColor: "border-pink-600",
      route: `${basePath}/visi-misi`,
    },
    {
      name: "KONTRAK KERJA",
      icon: "document-attach-outline",
      bgColor: "bg-pink-600",
      borderColor: "border-pink-600",
      route: `${basePath}/kontrak-kerja`,
    },
    {
      name: "STRUKTUR ORGANISASI",
      icon: "folder-open-outline",
      bgColor: "bg-yellow-600",
      borderColor: "border-yellow-600",
      route: `${basePath}/struktur-organisasi`,
    },
    
    {
      name: "PENGHARGAAN",
      icon: "happy-outline",
      bgColor: "bg-amber-600",
      borderColor: "border-amber-600",
      route: `${basePath}/penghargaan`,
    },
    {
      name: "RIWAYAT PIMPINAN",
      icon: "alert-circle-outline",
      bgColor: "bg-red-600",
      borderColor: "border-red-600",
      route: `${basePath}/riwayat-pimpinan`,
    },
    {
      name: "SEJARAH",
      icon: "information-circle-outline",
      bgColor: "bg-blue-600",
      borderColor: "border-blue-600",
      route: `${basePath}/sejarah`,
    }
  ];

  // Dapatkan lebar layar
  const { width: screenWidth } = Dimensions.get("window");

  // Lebar item => 1/4 lebar layar - spasi horizontal
  // Sesuaikan marginHorizontal agar tiap item pas 4 per layar
  const itemWidth = useMemo(() => {
    const totalHorizontalSpace = 32; // misal margin total untuk FlatList content
    const availableWidth = screenWidth - totalHorizontalSpace;
    // 4 item per 'halaman':
    return availableWidth / 4;
  }, [screenWidth]);

  // Render item FlatList
  const renderItem = ({ item }) => {
    const isActive = pathname === item.route;
    const iconColor = isActive ? "#ffffff" : colorMap[item.borderColor] || "#000000";

    return (
      <TouchableOpacity
        onPress={() => router.push(item.route)}
        style={{
          width: itemWidth,
          alignItems: "center",
          marginRight: 8, // jarak antar item
        }}
      >
        <View
          className={classNames(
            "justify-center items-center rounded-lg p-4 border",
            item.borderColor,
            isActive ? item.bgColor : ""
          )}
        >
          <Ionicons name={item.icon} size={28} color={iconColor} />
        </View>
        <Text numberOfLines={2} className="mt-2 text-gray-800 text-xs text-center">
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View
        className={classNames(
          "bg-white px-4 pb-4 flex-row justify-between items-center border-b border-red-700/20",
        
        )}
      >
        {/* Tombol Kembali */}
        <TouchableOpacity
          className="flex-row items-center space-x-2"
          onPress={() => router.replace("/")}
        >
          <Ionicons name="chevron-back-outline" size={24} color="#DC2626" />
          <Text className="text-red-700 text-sm font-extrabold">KEMBALI</Text>
        </TouchableOpacity>

        {/* Judul */}
        <View className="flex-col items-end">
          <Text className="text-red-700 text-xl font-extrabold">TENTANG KAMI - DEO AIRPORT</Text>
          <Text className="text-red-700 text-sm leading-4">KANTOR BLU UPBU KELAS I DEO - SORONG</Text>
        </View>
      </View>

      {/* Konten Menu Horizontal */}
      <View className="pt-4 pb-4 border-b border-red-700/20">
        <FlatList
          data={menuItems}
          horizontal
          keyExtractor={(item, index) => `${item.name}-${index}`}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16, // agar tidak mepet tepi
          }}
        />
      </View>

      {/* Tumpukan screen di bawah menu */}
      <Stack screenOptions={{ headerShown: false }} />
    </View>
  );
}
