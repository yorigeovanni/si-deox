import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

const ppidCategories = [
  {
    id: '1',
    title: 'Informasi Berkala',
    icon: 'time',
    description: 'Informasi yang wajib disediakan dan diumumkan secara berkala'
  },
  {
    id: '2',
    title: 'Informasi Serta Merta',
    icon: 'flash',
    description: 'Informasi yang dapat mengancam hajat hidup orang banyak'
  },
  {
    id: '3',
    title: 'Informasi Setiap Saat',
    icon: 'document-text',
    description: 'Informasi yang wajib tersedia setiap saat'
  },
  {
    id: '4',
    title: 'Permohonan Informasi',
    icon: 'mail',
    description: 'Ajukan permohonan informasi publik'
  }
];

const recentDocuments = [
  {
    id: '1',
    title: 'Laporan Keuangan 2024',
    category: 'Berkala',
    date: '2024-02-15',
    type: 'PDF'
  },
  {
    id: '2',
    title: 'Rencana Strategis 2025',
    category: 'Berkala',
    date: '2024-02-14',
    type: 'PDF'
  },
  {
    id: '3',
    title: 'Data Statistik Penumpang',
    category: 'Serta Merta',
    date: '2024-02-13',
    type: 'Excel'
  }
];

export default function PPIDScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-100" edges={["top"]}>
      <ScrollView>
        <LinearGradient
          colors={['#1a237e', '#0d47a1']}
          className="pt-12 pb-6"
        >
          <View className="px-6">
            <Text className="text-white text-2xl font-bold">PPID</Text>
            <Text className="text-white/80">Pejabat Pengelola Informasi dan Dokumentasi</Text>
          </View>
        </LinearGradient>

        <View className="p-6">
          {/* PPID Categories */}
          <View className="flex-row flex-wrap justify-between mb-6">
            {ppidCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                className="bg-white w-[48%] rounded-xl p-4 mb-4 shadow-sm"
              >
                <View className="w-12 h-12 bg-primary/10 rounded-xl items-center justify-center mb-3">
                  <Ionicons name={category.icon} size={24} color="#007AFF" />
                </View>
                <Text className="font-bold mb-2">{category.title}</Text>
                <Text className="text-gray-600 text-sm">{category.description}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Recent Documents */}
          <View className="bg-white rounded-xl p-4 shadow-sm mb-6">
            <Text className="text-lg font-bold mb-4">Dokumen Terbaru</Text>
            {recentDocuments.map((doc) => (
              <TouchableOpacity
                key={doc.id}
                className="flex-row items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
              >
                <View className="flex-row items-center flex-1">
                  <View className="w-10 h-10 bg-gray-100 rounded-lg items-center justify-center">
                    <Ionicons 
                      name={doc.type === 'PDF' ? 'document-text' : 'document'} 
                      size={20} 
                      color="#007AFF" 
                    />
                  </View>
                  <View className="ml-3 flex-1">
                    <Text className="font-medium">{doc.title}</Text>
                    <Text className="text-gray-500 text-sm">{doc.date}</Text>
                  </View>
                </View>
                <View className="bg-primary/10 px-3 py-1 rounded-full">
                  <Text className="text-primary">{doc.category}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Contact Section */}
          <View className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <Text className="text-lg font-bold mb-4">Hubungi PPID</Text>
            <View className="space-y-4">
              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-primary/10 rounded-lg items-center justify-center">
                  <Ionicons name="mail" size={20} color="#007AFF" />
                </View>
                <View className="ml-3">
                  <Text className="text-gray-600">Email</Text>
                  <Text className="font-medium">ppid@airport.co.id</Text>
                </View>
              </View>
              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-primary/10 rounded-lg items-center justify-center">
                  <Ionicons name="call" size={20} color="#007AFF" />
                </View>
                <View className="ml-3">
                  <Text className="text-gray-600">Telepon</Text>
                  <Text className="font-medium">+62 123-4567-8900</Text>
                </View>
              </View>
              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-primary/10 rounded-lg items-center justify-center">
                  <Ionicons name="location" size={20} color="#007AFF" />
                </View>
                <View className="ml-3">
                  <Text className="text-gray-600">Alamat</Text>
                  <Text className="font-medium">Jl. Bandara No. 1, Sorong</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}