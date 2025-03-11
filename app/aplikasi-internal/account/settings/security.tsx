import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function SecurityScreen() {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const validatePassword = (password: string) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumbers &&
      hasSpecialChar
    );
  };

  const handleUpdatePassword = () => {
    // Reset error
    setError('');

    // Validate current password
    if (!currentPassword) {
      setError('Current password is required');
      return;
    }

    // Validate new password
    if (!validatePassword(newPassword)) {
      setError('New password does not meet requirements');
      return;
    }

    // Validate password match
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    // Here you would typically make an API call to update the password
    //console.log('Password update successful');
    router.back();
  };

  return (
    <ScrollView className="flex-1 bg-gray-100">
      <View className="p-6">
        <View className="bg-white rounded-xl p-4 mb-6">
          <Text className="text-lg font-semibold mb-4">Update Password</Text>
          
          {/* Current Password */}
          <View className="mb-4">
            <Text className="text-gray-600 mb-2">Current Password</Text>
            <View className="flex-row items-center bg-gray-50 rounded-lg">
              <TextInput
                className="flex-1 p-4"
                secureTextEntry={!showCurrentPassword}
                value={currentPassword}
                onChangeText={setCurrentPassword}
                placeholder="Enter current password"
              />
              <TouchableOpacity 
                className="px-4"
                onPress={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                <Ionicons 
                  name={showCurrentPassword ? 'eye-off' : 'eye'} 
                  size={20} 
                  color="#666" 
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* New Password */}
          <View className="mb-4">
            <Text className="text-gray-600 mb-2">New Password</Text>
            <View className="flex-row items-center bg-gray-50 rounded-lg">
              <TextInput
                className="flex-1 p-4"
                secureTextEntry={!showNewPassword}
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="Enter new password"
              />
              <TouchableOpacity 
                className="px-4"
                onPress={() => setShowNewPassword(!showNewPassword)}
              >
                <Ionicons 
                  name={showNewPassword ? 'eye-off' : 'eye'} 
                  size={20} 
                  color="#666" 
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm New Password */}
          <View className="mb-6">
            <Text className="text-gray-600 mb-2">Confirm New Password</Text>
            <View className="flex-row items-center bg-gray-50 rounded-lg">
              <TextInput
                className="flex-1 p-4"
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm new password"
              />
              <TouchableOpacity 
                className="px-4"
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Ionicons 
                  name={showConfirmPassword ? 'eye-off' : 'eye'} 
                  size={20} 
                  color="#666" 
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Password Requirements */}
          <View className="bg-gray-50 p-4 rounded-lg mb-6">
            <Text className="font-semibold mb-2">Password Requirements:</Text>
            <View className="space-y-2">
              <View className="flex-row items-center">
                <Ionicons 
                  name={newPassword.length >= 8 ? 'checkmark-circle' : 'close-circle'} 
                  size={16} 
                  color={newPassword.length >= 8 ? '#34C759' : '#FF3B30'} 
                />
                <Text className="ml-2">Minimum 8 characters</Text>
              </View>
              <View className="flex-row items-center">
                <Ionicons 
                  name={/[A-Z]/.test(newPassword) ? 'checkmark-circle' : 'close-circle'} 
                  size={16} 
                  color={/[A-Z]/.test(newPassword) ? '#34C759' : '#FF3B30'} 
                />
                <Text className="ml-2">At least one uppercase letter</Text>
              </View>
              <View className="flex-row items-center">
                <Ionicons 
                  name={/[a-z]/.test(newPassword) ? 'checkmark-circle' : 'close-circle'} 
                  size={16} 
                  color={/[a-z]/.test(newPassword) ? '#34C759' : '#FF3B30'} 
                />
                <Text className="ml-2">At least one lowercase letter</Text>
              </View>
              <View className="flex-row items-center">
                <Ionicons 
                  name={/\d/.test(newPassword) ? 'checkmark-circle' : 'close-circle'} 
                  size={16} 
                  color={/\d/.test(newPassword) ? '#34C759' : '#FF3B30'} 
                />
                <Text className="ml-2">At least one number</Text>
              </View>
              <View className="flex-row items-center">
                <Ionicons 
                  name={/[!@#$%^&*(),.?":{}|<>]/.test(newPassword) ? 'checkmark-circle' : 'close-circle'} 
                  size={16} 
                  color={/[!@#$%^&*(),.?":{}|<>]/.test(newPassword) ? '#34C759' : '#FF3B30'} 
                />
                <Text className="ml-2">At least one special character</Text>
              </View>
            </View>
          </View>

          {/* Error Message */}
          {error ? (
            <View className="bg-red-100 p-3 rounded-lg mb-4">
              <Text className="text-red-600">{error}</Text>
            </View>
          ) : null}

          {/* Update Button */}
          <TouchableOpacity
            className="bg-primary py-4 rounded-lg"
            onPress={handleUpdatePassword}
          >
            <Text className="text-white text-center font-semibold">Update Password</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}