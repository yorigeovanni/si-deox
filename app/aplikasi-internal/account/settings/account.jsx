import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Image } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';


//import { useAuth } from '@/contexts/AuthContext';
//import { updateProfile, uploadAvatar } from '@/lib/auth';
import { Ionicons } from '@expo/vector-icons';




export default function AccountScreen() {
  const router = useRouter();
  //const { profile, setProfile } = useAuth();
  const [formData, setFormData] = useState({
    full_name: 'sdasdasd asdasd asdas as',
    email: 'sdasdasdasdasdasdas',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    try {
      setLoading(true);
      setError(null);

      /*const updatedProfile = await updateProfile({
        full_name: formData.full_name,
      });

      setProfile(updatedProfile);*/
      router.back();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleUploadAvatar() {
    /*try {
      setLoading(true);
      setError(null);
      const updatedProfile = await uploadAvatar();
      if (updatedProfile) {
        setProfile(updatedProfile);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }*/
  }

  if (!profile) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <Stack.Screen 
        options={{
          title: "Account Settings",
          headerShown: true
        }}
      />

      <View className="p-6">
        {error ? (
          <View className="bg-red-100 p-4 rounded-xl mb-4">
            <Text className="text-red-600">{error}</Text>
          </View>
        ) : null}

        {/* Profile Photo */}
        <View className="items-center mb-6">
          <View className="relative">
            {profile.avatar_url ? (
              <Image
                source={{ uri: ``}}
                className="w-24 h-24 rounded-full"
              />
            ) : (
              <View className="w-24 h-24 rounded-full bg-gray-200 items-center justify-center">
                <Ionicons name="person" size={40} color="#999" />
              </View>
            )}
            <TouchableOpacity 
              className="absolute bottom-0 right-0 bg-primary w-8 h-8 rounded-full items-center justify-center"
              onPress={handleUploadAvatar}
              disabled={loading}
            >
              <Ionicons name="camera" size={18} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="space-y-4">
          {/* Full Name */}
          <View>
            <Text className="text-gray-600 mb-2">Full Name</Text>
            <TextInput
              className="bg-white p-4 rounded-lg border border-gray-200"
              placeholder="Enter your full name"
              value={formData.full_name}
              onChangeText={(text) => setFormData(prev => ({ ...prev, full_name: text }))}
            />
          </View>

          {/* Email (read-only) */}
          <View>
            <Text className="text-gray-600 mb-2">Email</Text>
            <TextInput
              className="bg-gray-100 p-4 rounded-lg border border-gray-200"
              value={formData.email}
              editable={false}
            />
            <Text className="text-gray-500 text-sm mt-1">
              Email cannot be changed
            </Text>
          </View>

          {/* Submit Button */}
          <TouchableOpacity 
            className={`bg-primary py-4 rounded-lg mt-6 ${loading ? 'opacity-70' : ''}`}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text className="text-white text-center font-semibold">
              {loading ? 'Saving Changes...' : 'Save Changes'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}