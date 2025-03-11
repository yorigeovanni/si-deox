import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

const examCategories = [
  {
    id: '1',
    title: 'Ujian Aktif',
    icon: 'time',
    count: 2,
    description: 'Ujian yang sedang berlangsung'
  },
  {
    id: '2',
    title: 'Ujian Mendatang',
    icon: 'calendar',
    count: 3,
    description: 'Ujian yang akan datang'
  },
  {
    id: '3',
    title: 'Hasil Ujian',
    icon: 'document-text',
    count: 8,
    description: 'Riwayat dan hasil ujian'
  },
  {
    id: '4',
    title: 'Sertifikat',
    icon: 'ribbon',
    count: 5,
    description: 'Sertifikat yang diperoleh'
  }
];

const activeExams = [
  {
    id: '1',
    title: 'Keselamatan dan Keamanan Penerbangan',
    duration: '120 menit',
    questions: 50,
    deadline: '16 Feb 2024 15:00',
    status: 'Belum Mulai'
  },
  {
    id: '2',
    title: 'Regulasi Bandara',
    duration: '90 menit',
    questions: 40,
    deadline: '17 Feb 2024 10:00',
    status: 'Sedang Berlangsung'
  }
];

const examResults = [
  {
    id: '1',
    title: 'Prosedur Operasional Bandara',
    date: '10 Feb 2024',
    score: 85,
    status: 'Lulus'
  },
  {
    id: '2',
    title: 'Manajemen Krisis',
    date: '05 Feb 2024',
    score: 78,
    status: 'Lulus'
  }
];

export default function CATExamScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView>
        <LinearGradient
          colors={['#1a237e', '#0d47a1']}
          className="pt-12 pb-6"
        >
          <View className="px-6">
            <Text className="text-white text-2xl font-bold">CAT Exam</Text>
            <Text className="text-white/80">Computer Assisted Test</Text>
          </View>
        </LinearGradient>

        <View className="p-6">
          {/* Exam Categories */}
          <View className="flex-row flex-wrap justify-between mb-6">
            {examCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                className="bg-white w-[48%] rounded-xl p-4 mb-4 shadow-sm"
              >
                <View className="w-12 h-12 bg-primary/10 rounded-xl items-center justify-center mb-3">
                  <Ionicons name={category.icon} size={24} color="#007AFF" />
                </View>
                <Text className="font-bold mb-1">{category.title}</Text>
                <Text className="text-gray-600 text-sm mb-2">{category.description}</Text>
                <Text className="text-primary font-semibold">{category.count} item</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Active Exams */}
          <View className="bg-white rounded-xl p-4 shadow-sm mb-6">
            <Text className="text-lg font-bold mb-4">Ujian Aktif</Text>
            {activeExams.map((exam) => (
              <TouchableOpacity
                key={exam.id}
                className="bg-gray-50 rounded-lg p-4 mb-3 last:mb-0"
              >
                <View className="flex-row justify-between items-start mb-2">
                  <Text className="font-bold flex-1 mr-2">{exam.title}</Text>
                  <View className={`px-3 py-1 rounded-full ${
                    exam.status === 'Belum Mulai' ? 'bg-yellow-100' : 'bg-green-100'
                  }`}>
                    <Text className={`text-xs ${
                      exam.status === 'Belum Mulai' ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {exam.status}
                    </Text>
                  </View>
                </View>
                
                <View className="flex-row items-center mb-3">
                  <View className="flex-row items-center mr-4">
                    <Ionicons name="time" size={16} color="#666" />
                    <Text className="text-gray-600 ml-1">{exam.duration}</Text>
                  </View>
                  <View className="flex-row items-center">
                    <Ionicons name="help-circle" size={16} color="#666" />
                    <Text className="text-gray-600 ml-1">{exam.questions} soal</Text>
                  </View>
                </View>

                <View className="flex-row items-center justify-between">
                  <Text className="text-gray-600">Deadline: {exam.deadline}</Text>
                  <TouchableOpacity className="bg-primary px-4 py-2 rounded-lg">
                    <Text className="text-white font-semibold">Mulai Ujian</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Recent Results */}
          <View className="bg-white rounded-xl p-4 shadow-sm mb-6">
            <Text className="text-lg font-bold mb-4">Hasil Ujian Terakhir</Text>
            {examResults.map((result) => (
              <TouchableOpacity
                key={result.id}
                className="flex-row items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
              >
                <View className="flex-1 mr-4">
                  <Text className="font-medium">{result.title}</Text>
                  <Text className="text-gray-500 text-sm">{result.date}</Text>
                </View>
                <View className="items-end">
                  <Text className="text-2xl font-bold text-primary">{result.score}</Text>
                  <View className="bg-green-100 px-2 py-1 rounded-full mt-1">
                    <Text className="text-green-600 text-xs">{result.status}</Text>
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