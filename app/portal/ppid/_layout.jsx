import { useRouter, Stack, usePathname } from "expo-router";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { classNames } from "@/utils";

const basePath = "/portal/ppid";

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

function chunkArray(array, chunkSize) {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

export default function LayoutPpid() {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    {
      name: "TENTANG PPID",
      icon: "information-circle-outline",
      bgColor: "bg-blue-600",
      borderColor: "border-blue-600",
      route: `${basePath}`
    },
    {
      name: "MAKLUMAT & STANDAR BIAYA",
      icon: "document-attach-outline",
      bgColor: "bg-pink-600",
      borderColor: "border-pink-600",
      route: `${basePath}/maklumat-standar-biaya`
    },
    {
      name: "DATA INFORMASI PUBLIK",
      icon: "folder-open-outline",
      bgColor: "bg-yellow-600",
      borderColor: "border-yellow-600",
      route: `${basePath}/data-informasi-publik`
    },
    {
      name: "KEPUASAN LAYANAN",
      icon: "happy-outline",
      bgColor: "bg-amber-600",
      borderColor: "border-amber-600",
      route: `${basePath}/kepuasan-layanan`
    },
    {
      name: "PROSEDUR KEBERATAN",
      icon: "alert-circle-outline",
      bgColor: "bg-red-600",
      borderColor: "border-red-600",
      route: `${basePath}/prosedur-keberatan`
    },
    {
      name: "PROSEDUR SENGKETA",
      icon: "help-circle-outline",
      bgColor: "bg-red-600",
      borderColor: "border-red-600",
      route: `${basePath}/prosedur-sengketa`
    },
    {
      name: "FORMULIR PERMOHONAN",
      icon: "create-outline",
      bgColor: "bg-purple-600",
      borderColor: "border-purple-600",
      route: `${basePath}/formulir-permohonan`
    },
    {
      name: "PERMOHONAN ANDA",
      icon: "document-text-outline",
      bgColor: "bg-green-600",
      borderColor: "border-green-600",
      route: `${basePath}/permohonan-anda`
    },
  ];

  const chunkedMenus = chunkArray(menuItems, 4);

  return (
    <View className="flex-1 bg-white">

      {/* Header */}
      <View
        className={classNames(
          "bg-white px-4 pb-4 flex-row justify-between items-center border-b border-red-700/20"
        )}
      >
        {/* Tombol Kembali */}
        
          <TouchableOpacity className="flex-row items-center space-x-2" onPress={() => router.replace("/")}>
            <Ionicons name="chevron-back-outline" size={24} color="#DC2626" />
            <Text className="text-red-700 text-sm font-extrabold">KEMBALI</Text>
          </TouchableOpacity>
          
      

        {/* Judul */}
        <View className="flex-col items-end">
          <Text className="text-red-700 text-xl font-extrabold">
            PPID - DEO AIRPORT
          </Text>
          <Text className="text-red-700 text-sm leading-4">
            LAYANAN KETERBUKAAN INFORMASI
          </Text>
        </View>
      </View>

      {/* Konten Menu */}
      <View className="pt-2 px-4">
        {chunkedMenus.map((row, rowIndex) => (
          <View
            key={rowIndex}
            className="flex-row justify-around mb-2"
          >
            {row.map((item, index) => {
              // Jika path saat ini sama dengan route item => aktif
              const isActive = pathname === item.route;
              // Warna ikon
              const iconColor = isActive
                ? "#ffffff" // Aktif => putih
                : colorMap[item.borderColor] || "#000000"; // Tidak aktif => warna border

              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => router.push(item.route)}
                  className="items-center w-[23%]"
                >
                  {/* Lingkaran ikon */}
                  <View
                    className={classNames(
                      "justify-center items-center rounded-full p-4 border",
                      item.borderColor,
                      isActive ? item.bgColor : ""
                    )}
                  >
                    <Ionicons name={item.icon} size={28} color={iconColor} />
                  </View>
                  {/* Label menu */}
                  <Text
                    numberOfLines={2} 
                    className="mt-2 text-gray-800 text-xs text-center"
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>

      {/* Tumpukan screen di bawah menu */}
      <Stack screenOptions={{ headerShown: false }} />
    </View>
  );
}
