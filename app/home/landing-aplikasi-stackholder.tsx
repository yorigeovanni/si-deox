import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

const stakeholderModules = [
  {
    id: '1',
    title: 'Tagihan',
    icon: 'receipt',
    description: 'Lihat dan kelola tagihan',
    amount: 'Rp 25.000.000',
    status: 'Belum Lunas'
  },
  {
    id: '2',
    title: 'Laporan',
    icon: 'document-text',
    description: 'Laporan transaksi dan aktivitas',
    count: '12 laporan baru'
  },
  {
    id: '3',
    title: 'Rekonsiliasi',
    icon: 'sync',
    description: 'Rekonsiliasi data dengan mitra',
    lastUpdate: '15 Feb 2024'
  },
  {
    id: '4',
    title: 'Kontrak',
    icon: 'document',
    description: 'Informasi kontrak kerjasama',
    status: 'Aktif'
  }
];

const recentActivities = [
  {
    id: '1',
    type: 'Tagihan',
    description: 'Pembayaran tagihan #INV-001',
    date: '15 Feb 2024',
    amount: 'Rp 5.000.000',
    status: 'Sukses'
  },
  {
    id: '2',
    type: 'Laporan',
    description: 'Upload laporan bulanan',
    date: '14 Feb 2024',
    status: 'Disetujui'
  },
  {
    id: '3',
    type: 'Rekonsiliasi',
    description: 'Rekonsiliasi data Januari',
    date: '13 Feb 2024',
    status: 'Selesai'
  }
];

export default function StakeholderScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView>
        <LinearGradient
          colors={['#1a237e', '#0d47a1']}
          className="pt-12 pb-6"
        >
          <View className="px-6">
            <Text className="text-white text-2xl font-bold">Stakeholder Portal</Text>
            <Text className="text-white/80">Portal Mitra Bandara</Text>
          </View>
        </LinearGradient>

        <View className="p-6">
          {/* Quick Stats */}
          <View className="flex-row justify-between mb-6">
            <View className="bg-white p-4 rounded-xl shadow-sm flex-1 mr-2">
              <Text className="text-gray-600 mb-1">Total Tagihan</Text>
              <Text className="text-2xl font-bold">Rp 25M</Text>
              <View className="flex-row items-center mt-1">
                <Ionicons name="alert-circle" size={16} color="#FF9800" />
                <Text className="text-orange-600 text-sm ml-1">3 jatuh tempo</Text>
              </View>
            </View>
            <View className="bg-white p-4 rounded-xl shadow-sm flex-1 ml-2">
              <Text className="text-gray-600 mb-1">Status Kontrak</Text>
              <Text className="text-2xl font-bold">Aktif</Text>
              <Text className="text-gray-500 text-sm mt-1">Hingga Des 2024</Text>
            </View>
          </View>

          {/* Stakeholder Modules */}
          <View className="flex-row flex-wrap justify-between mb-6">
            {stakeholderModules.map((module) => (
              <TouchableOpacity
                key={module.id}
                className="bg-white w-[48%] rounded-xl p-4 mb-4 shadow-sm"
              >
                <View className="w-12 h-12 bg-primary/10 rounded-xl items-center justify-center mb-3">
                  <Ionicons name={module.icon} size={24} color="#007AFF" />
                </View>
                <Text className="font-bold mb-2">{module.title}</Text>
                <Text className="text-gray-600 text-sm mb-2">{module.description}</Text>
                {module.amount && (
                  <Text className="text-primary font-semibold">{module.amount}</Text>
                )}
                {module.count && (
                  <Text className="text-primary font-semibold">{module.count}</Text>
                )}
                {module.lastUpdate && (
                  <Text className="text-gray-500 text-sm">Update: {module.lastUpdate}</Text>
                )}
                {module.status && (
                  <View className="bg-green-100 px-2 py-1 rounded-full self-start mt-2">
                    <Text className="text-green-600 text-sm">{module.status}</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Recent Activities */}
          <View className="bg-white rounded-xl p-4 shadow-sm mb-6">
            <Text className="text-lg font-bold mb-4">Aktivitas Terbaru</Text>
            {recentActivities.map((activity) => (
              <TouchableOpacity
                key={activity.id}
                className="flex-row items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
              >
                <View className="flex-row items-center flex-1">
                  <View className="w-10 h-10 bg-primary/10 rounded-lg items-center justify-center">
                    <Ionicons 
                      name={
                        activity.type === 'Tagihan' ? 'receipt' :
                        activity.type === 'Laporan' ? 'document-text' :
                        'sync'
                      } 
                      size={20} 
                      color="#007AFF" 
                    />
                  </View>
                  <View className="ml-3 flex-1">
                    <Text className="font-medium">{activity.description}</Text>
                    <Text className="text-gray-500 text-sm">{activity.date}</Text>
                  </View>
                </View>
                <View>
                  {activity.amount && (
                    <Text className="text-primary font-semibold mb-1">{activity.amount}</Text>
                  )}
                  <View className="bg-green-100 px-2 py-1 rounded-full">
                    <Text className="text-green-600 text-xs">{activity.status}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Help Section */}
          <View className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <View className="flex-row items-center mb-4">
              <View className="w-12 h-12 bg-primary/10 rounded-full items-center justify-center">
                <Ionicons name="help-buoy" size={24} color="#007AFF" />
              </View>
              <View className="ml-4">
                <Text className="text-lg font-bold">Butuh Bantuan?</Text>
                <Text className="text-gray-600">Tim support kami siap membantu</Text>
              </View>
            </View>
            <TouchableOpacity className="bg-primary py-3 rounded-lg">
              <Text className="text-white text-center font-semibold">Hubungi Support</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}