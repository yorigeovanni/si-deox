import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const VisionMissionSection = ({ services }) => {
  return (
    <View className="p-4">
      {services.map((service, index) => (
        <View key={index} className="bg-white rounded-xl p-4 mb-4">
          <View className="flex-row items-center mb-3">
            <View
              className="w-12 h-12 rounded-full items-center justify-center mr-4"
              style={{ backgroundColor: `${service.color}20` }}
            >
              <Ionicons
                name={service.icon}
                size={24}
                color={service.color}
              />
            </View>
            <Text className="text-xl font-bold">{service.title}</Text>
          </View>
          <Text className="text-gray-600">{service.description}</Text>
        </View>
      ))}


    </View>
  );
};