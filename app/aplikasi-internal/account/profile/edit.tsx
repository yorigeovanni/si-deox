import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const profileImage = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80";

export default function EditProfileScreen() {
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-6">
        <View className="items-center mb-8">
          <View className="relative">
            <Image
              source={{ uri: profileImage }}
              className="w-24 h-24 rounded-full"
            />
            <TouchableOpacity 
              className="absolute bottom-0 right-0 bg-primary w-8 h-8 rounded-full items-center justify-center"
            >
              <Ionicons name="camera" size={18} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="space-y-4">
          <View>
            <Text className="text-gray-600 mb-2">Full Name</Text>
            <TextInput
              className="bg-white p-4 rounded-lg"
              placeholder="John Doe"
              defaultValue="John Doe"
            />
          </View>

          <View>
            <Text className="text-gray-600 mb-2">Email</Text>
            <TextInput
              className="bg-white p-4 rounded-lg"
              placeholder="john@example.com"
              defaultValue="john@example.com"
              keyboardType="email-address"
            />
          </View>

          <View>
            <Text className="text-gray-600 mb-2">Phone</Text>
            <TextInput
              className="bg-white p-4 rounded-lg"
              placeholder="+1 234 567 890"
              defaultValue="+1 234 567 890"
              keyboardType="phone-pad"
            />
          </View>

          <View>
            <Text className="text-gray-600 mb-2">Bio</Text>
            <TextInput
              className="bg-white p-4 rounded-lg"
              placeholder="Tell us about yourself"
              defaultValue="Professional Real Estate Agent with 5 years of experience"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          <TouchableOpacity 
            className="bg-primary py-4 rounded-lg mt-6"
            onPress={() => router.back()}
          >
            <Text className="text-white text-center font-semibold">Save Changes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}