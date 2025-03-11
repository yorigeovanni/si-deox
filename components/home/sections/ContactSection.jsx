import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const ContactSection = () => {
  return (
    <View className="p-4">
      <View className="bg-white rounded-xl p-6">
        <Text className="text-2xl font-bold mb-6">Hubungi Kami</Text>

        <View className="mb-6">
          <View className="flex-row items-center mb-4">
            <View className="w-10 h-10 rounded-full bg-blue-100 items-center justify-center mr-4">
              <Ionicons name="location" size={20} color="#2196F3" />
            </View>
            <View>
              <Text className="font-bold mb-1">Alamat</Text>
              <Text className="text-gray-600">
                Jl. Bandara DEO, Sorong, Papua Barat
              </Text>
            </View>
          </View>

          <View className="flex-row items-center mb-4">
            <View className="w-10 h-10 rounded-full bg-green-100 items-center justify-center mr-4">
              <Ionicons name="call" size={20} color="#4CAF50" />
            </View>
            <View>
              <Text className="font-bold mb-1">Telepon</Text>
              <Text className="text-gray-600">(0951) 321776</Text>
            </View>
          </View>

          <View className="flex-row items-center">
            <View className="w-10 h-10 rounded-full bg-red-100 items-center justify-center mr-4">
              <Ionicons name="mail" size={20} color="#F44336" />
            </View>
            <View>
              <Text className="font-bold mb-1">Email</Text>
              <Text className="text-gray-600">info@deoairport.co.id</Text>
            </View>
          </View>
        </View>

        <View className="pt-6 border-t border-gray-200">
          <Text className="font-bold mb-4">Ikuti Kami</Text>
          <View className="flex-row space-x-4">
            <TouchableOpacity className="w-10 h-10 rounded-full bg-blue-500 items-center justify-center">
              <Ionicons name="logo-facebook" size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity className="w-10 h-10 rounded-full bg-pink-500 items-center justify-center">
              <Ionicons name="logo-instagram" size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity className="w-10 h-10 rounded-full bg-red-500 items-center justify-center">
              <Ionicons name="logo-youtube" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};