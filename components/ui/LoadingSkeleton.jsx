import { View } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  withRepeat, 
  withSequence,
  withTiming,
  useSharedValue,
  withDelay
} from 'react-native-reanimated';
import { useEffect } from 'react';




const LoadingCard = () => {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.7, { duration: 500 }),
        withTiming(0.3, { duration: 500 })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View className="bg-white mb-3 rounded-2xl shadow-sm overflow-hidden p-4">
      <View className="flex-row items-center mb-4">
        {/* Avatar skeleton */}
        <Animated.View 
          className="w-12 h-12 rounded-full bg-gray-200"
          style={animatedStyle}
        />
        <View className="ml-3 flex-1">
          {/* Name skeleton */}
          <Animated.View 
            className="h-4 bg-gray-200 rounded-full w-32 mb-2"
            style={animatedStyle}
          />
          {/* Time skeleton */}
          <Animated.View 
            className="h-3 bg-gray-200 rounded-full w-20"
            style={animatedStyle}
          />
        </View>
      </View>

      {/* Content skeleton */}
      <View className="space-y-2 mb-4">
        <Animated.View 
          className="h-4 bg-gray-200 rounded-full w-full"
          style={animatedStyle}
        />
        <Animated.View 
          className="h-4 bg-gray-200 rounded-full w-3/4"
          style={animatedStyle}
        />
      </View>

      {/* Image skeleton */}
      <Animated.View 
        className="w-full h-48 bg-gray-200 rounded-xl mb-4"
        style={animatedStyle}
      />

      {/* Actions skeleton */}
      <View className="flex-row justify-between pt-2 border-t border-gray-100">
        <Animated.View 
          className="h-8 bg-gray-200 rounded-full w-24"
          style={animatedStyle}
        />
        <Animated.View 
          className="h-8 bg-gray-200 rounded-full w-24"
          style={animatedStyle}
        />
        <Animated.View 
          className="h-8 bg-gray-200 rounded-full w-24"
          style={animatedStyle}
        />
      </View>
    </View>
  );
};



export const LoadingSkeleton = ({ count = [1, 2, 3, 4] }) => {
  return (
    <View className="p-4">
       {count.map((_, index) => <LoadingCard key={index} />)}
    </View>
  );
};
     