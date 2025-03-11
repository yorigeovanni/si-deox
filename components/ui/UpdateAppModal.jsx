import { View, Text, Modal, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function UpdateModal({ 
  visible, 
  onDismiss, 
  onUpdate,
  isUpdating = false 
}) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onDismiss}
    >
      <View className="flex-1 bg-black/50 justify-center items-center p-6">
        <View className="w-full max-w-sm bg-white rounded-3xl overflow-hidden">
          <LinearGradient
            colors={["#991B1B", "#500724"]}
            className="p-6"
          >
            <View className=" flex-row p-2">
              <View className="w-16 h-16 bg-white/20 rounded-full items-center justify-center mb-4">
                <Ionicons name="arrow-down-circle" size={32} color="white" />
              </View>
              <View className=" flex-col items-start justify-start ml-6 py-2">
              <Text className="text-2xl font-bold text-white text-center">
                Update Tersedia
              </Text>
              <Text className="text-white/80 text-center">
                Versi baru aplikasi telah tersedia 
              </Text>
              </View>
            </View>
          </LinearGradient>

          <View className="p-6">
            <View className="bg-red-50 rounded-xl p-4 mb-6">
              <View className="flex-row items-start">
                <View className="w-8 h-8 bg-red-100 rounded-full items-center justify-center mt-1">
                  <Ionicons name="information" size={20} color="#500724" />
                </View>
                <Text className="flex-1 ml-3 text-teal-800">
                  Kami merekomendasikan untuk selalu menggunakan versi terbaru untuk pengalaman yang lebih baik dan aman.
                </Text>
              </View>
            </View>

            <View className="flex-row space-x-3">
              <TouchableOpacity
                onPress={onDismiss}
                className="flex-1 py-3.5 rounded-xl bg-gray-100"
                disabled={isUpdating}
              >
                <Text className="text-center font-medium text-gray-700">
                  Nanti
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={onUpdate}
                disabled={isUpdating}
                className="flex-1 py-3.5 rounded-xl bg-red-800"
              >
                {isUpdating ? (
                  <View className="flex-row items-center justify-center space-x-2">
                    <ActivityIndicator color="white" size="small" />
                    <Text className="text-white font-medium">
                      Mengupdate...
                    </Text>
                  </View>
                ) : (
                  <Text className="text-center font-medium text-white">
                    Update Sekarang
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}