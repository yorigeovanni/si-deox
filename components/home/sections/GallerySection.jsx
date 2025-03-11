import { View, Text, ScrollView, Image, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useMemo } from 'react';

const PersonCard = ({ name, title, photo, department, color = "#00796B" }) => (
  <View 
    className="bg-white rounded-2xl overflow-hidden mx-2 mb-4"
    style={{
      width: 280,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 5,
    }}
  >
    <LinearGradient
      colors={[color + '20', color + '10']}
      className="p-4"
    >
      <View className="flex-row items-center">
        <Image
          source={{ uri: photo }}
          className="w-16 h-16 rounded-full border-2 border-white"
          resizeMode="cover"
        />
        <View className="flex-1 ml-4">
          <Text className="text-lg font-bold text-gray-900">{name}</Text>
          <Text className="text-sm text-gray-600">{title}</Text>
          {department && (
            <View className="mt-2 bg-white/50 self-start px-3 py-1 rounded-full">
              <Text className="text-xs font-medium" style={{ color }}>
                {department}
              </Text>
            </View>
          )}
        </View>
      </View>
    </LinearGradient>
  </View>
);

const ConnectingLine = ({ color = "#E5E7EB", style }) => (
  <View 
    className="absolute left-1/2 w-px" 
    style={[{ 
      backgroundColor: color,
      transform: [{ translateX: -0.5 }]
    }, style]} 
  />
);

const OrgChart = () => {
  const leader = {
    name: "Dr. John Smith",
    title: "Kepala Kantor UPBU",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&fit=crop&q=60",
    color: "#1E3A8A"
  };

  const directors = [
    {
      name: "Sarah Johnson",
      title: "Kepala Bagian TU",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&fit=crop&q=60",
      department: "Tata Usaha",
      color: "#2563EB"
    },
    {
      name: "Michael Chen",
      title: "Kepala Seksi Operasi",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&fit=crop&q=60",
      department: "Operasional",
      color: "#7C3AED"
    },
    {
      name: "Emily Davis",
      title: "Kepala Seksi Teknik",
      photo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&fit=crop&q=60",
      department: "Teknik",
      color: "#EA580C"
    },
    {
      name: "David Wilson",
      title: "Kepala Seksi Keamanan",
      photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&fit=crop&q=60",
      department: "Keamanan",
      color: "#DC2626"
    },
  ];

  const managers = [
    {
      name: "Alex Thompson",
      title: "Manager PKP-PK",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&fit=crop&q=60",
      department: "PKP-PK",
      color: "#2563EB"
    },
    {
      name: "Lisa Anderson",
      title: "Manager Navigasi",
      photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&fit=crop&q=60",
      department: "Navigasi",
      color: "#7C3AED"
    },
    {
      name: "James Martin",
      title: "Manager Pelayanan",
      photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&fit=crop&q=60",
      department: "Pelayanan",
      color: "#EA580C"
    },
    {
      name: "Maria Garcia",
      title: "Manager Fasilitas",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&fit=crop&q=60",
      department: "Fasilitas",
      color: "#DC2626"
    },
    {
      name: "Robert Taylor",
      title: "Manager Avsec",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&fit=crop&q=60",
      department: "Aviation Security",
      color: "#0891B2"
    },
    {
      name: "Jennifer Lee",
      title: "Manager SDM",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&fit=crop&q=60",
      department: "SDM",
      color: "#0D9488"
    },
  ];

  const stats = [
    {
      icon: "people",
      color: "#2563EB",
      title: "Total Personel",
      value: "120+",
      subtitle: "Karyawan Aktif"
    },
    {
      icon: "business",
      color: "#059669",
      title: "Departemen",
      value: "6",
      subtitle: "Departemen Utama"
    },
    {
      icon: "trophy",
      color: "#7C3AED",
      title: "Sertifikasi",
      value: "ISO 9001:2015",
      subtitle: "Certified"
    }
  ];

  return (
    <View className="p-4">
      {/* Stats Cards - Now at the top and horizontally scrollable */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        className="mb-8"
      >
        {stats.map((stat, index) => (
          <View 
            key={index}
            className="bg-white rounded-2xl p-4 flex-row items-center mr-4"
            style={{
              width: 280,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.05,
              shadowRadius: 8,
              elevation: 3,
            }}
          >
            <View 
              className="w-16 h-16 rounded-xl items-center justify-center mr-4"
              style={{ backgroundColor: stat.color + '10' }}
            >
              <Ionicons name={stat.icon} size={24} color={stat.color} />
            </View>
            <View>
              <Text className="text-sm text-gray-500">{stat.title}</Text>
              <Text className="text-xl font-bold text-gray-900">{stat.value}</Text>
              <Text className="text-sm text-gray-500">{stat.subtitle}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Top Level */}
      <View className="items-center mb-16 relative">
        <PersonCard {...leader} />
        <ConnectingLine style={{ height: 40, top: '100%' }} />
      </View>

      {/* Directors Level */}
      <View className="mb-16 relative">
        <Text className="text-2xl font-bold mb-6 text-gray-800">
          Kepala Bagian & Seksi
        </Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          className="pb-8"
        >
          {directors.map((director, index) => (
            <View key={index} className="relative">
              <PersonCard {...director} />
              <ConnectingLine style={{ height: 40, top: '100%' }} />
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Managers Level */}
      <View className="relative">
        <Text className="text-2xl font-bold mb-6 text-gray-800">
          Kepala Unit
        </Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          className="pb-8"
        >
          {managers.map((manager, index) => (
            <PersonCard key={index} {...manager} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export const OrganizationSection = () => {
  return (
    <ScrollView className="flex-1 bg-gray-50">
      <LinearGradient
        colors={['#1E3A8A', '#1E40AF']}
        className="px-4 py-12"
      >
        <Text className="text-white text-3xl font-bold text-center">
          Struktur Organisasi
        </Text>
        <Text className="text-white/80 text-center mt-2 text-lg">
          Bandara DEO Sorong
        </Text>
      </LinearGradient>
      
      <OrgChart />
    </ScrollView>
  );
};