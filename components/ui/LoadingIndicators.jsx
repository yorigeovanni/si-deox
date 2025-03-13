import { View } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  withRepeat, 
  withSequence, 
  withTiming,
  withDelay,
  useSharedValue,
  withSpring
} from 'react-native-reanimated';
import { useEffect } from 'react';


export const LoadingSpinner = ({ size = 24, color = '#22C55E' }) => {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { 
        duration: 1000
      }),
      -1
    );
  }, []);

  const spinnerStyle = useAnimatedStyle(() => ({
    transform: [{ 
      rotateZ: `${rotation.value}deg` 
    }]
  }));

  return (
    <Animated.View style={[{
      width: size,
      height: size,
      borderRadius: size / 2,
      borderWidth: size / 8,
      borderColor: `${color}40`,
      borderTopColor: color,
    }, spinnerStyle]} />
  );
};

export const ThreeDotsLoader = ({ size = 8, color = '#22C55E', spacing = 4 }) => {
  const dots = [useSharedValue(1), useSharedValue(1), useSharedValue(1)];

  useEffect(() => {
    dots.forEach((dot, index) => {
      dot.value = withRepeat(
        withSequence(
          withDelay(
            index * 200,
            withSpring(1.3, { 
              damping: 4,
              stiffness: 100
            })
          ),
          withSpring(1, { 
            damping: 4,
            stiffness: 100
          })
        ),
        -1
      );
    });
  }, []);

  const dotStyles = dots.map(dot => 
    useAnimatedStyle(() => ({
      transform: [{ scale: dot.value }]
    }))
  );

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing }}>
      {dotStyles.map((style, index) => (
        <Animated.View
          key={index}
          style={[{
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: color,
          }, style]}
        />
      ))}
    </View>
  );
};