import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { 
  useAnimatedStyle, 
  withRepeat, 
  withSequence, 
  withTiming,
  useSharedValue,
  withDelay
} from 'react-native-reanimated';
import { useEffect } from 'react';



export const ErrorState = ({ 
  title = "Oops! Something went wrong",
  message = "We encountered an error while loading your content. Please try again.",
  icon = "alert-circle",
  action,
  actionLabel = "Try Again",
  variant = "default" // default, network, empty, or custom
}) => {
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);


  
  useEffect(() => {
    // Subtle bounce animation
    scale.value = withRepeat(
      withSequence(
        withDelay(
          1000,
          withTiming(1.05, { duration: 200 })
        ),
        withTiming(1, { duration: 200 })
      ),
      -1,
      true
    );

    // Gentle rotation animation for the icon
    rotation.value = withRepeat(
      withSequence(
        withDelay(
          1000,
          withTiming(-0.05, { duration: 300 })
        ),
        withTiming(0.05, { duration: 300 }),
        withTiming(0, { duration: 300 })
      ),
      -1,
      true
    );
  }, []);

  const iconStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotation.value}rad` }
    ]
  }));

  // Variant-specific configurations
  const getVariantConfig = () => {
    switch (variant) {
      case 'network':
        return {
          icon: 'cloud-offline',
          title: 'No Internet Connection',
          message: 'Please check your internet connection and try again.',
          iconColor: '#EF4444',
          actionLabel: 'Retry Connection'
        };
      case 'empty':
        return {
          icon: 'documents',
          title: 'No Content Found',
          message: 'There\'s nothing here yet. Try refreshing or come back later.',
          iconColor: '#6B7280',
          actionLabel: 'Refresh'
        };
      default:
        return {
          icon,
          title,
          message,
          iconColor: '#EF4444',
          actionLabel
        };
    }
  };

  const config = getVariantConfig();

  return (
    <View className="flex-1 justify-center items-center p-6 bg-white">
      <View className="items-center max-w-sm">
        {/* Animated Icon */}
        <Animated.View 
          style={iconStyle}
          className="mb-6"
        >
          <View className="w-20 h-20 rounded-full bg-red-50 items-center justify-center">
            <Ionicons 
              name={config.icon} 
              size={40} 
              color={config.iconColor}
            />
          </View>
        </Animated.View>

        {/* Error Title */}
        <Text className="text-xl font-bold text-gray-900 text-center mb-2">
          {config.title}
        </Text>

        {/* Error Message */}
        <Text className="text-gray-600 text-center mb-8">
          {config.message}
        </Text>

        {/* Action Button */}
        {action && (
          <TouchableOpacity
            onPress={action}
            className="bg-red-600 px-6 py-3 rounded-xl flex-row items-center"
          >
            <Ionicons name="refresh" size={20} color="#fff" />
            <Text className="text-white font-semibold ml-2">
              {config.actionLabel}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};