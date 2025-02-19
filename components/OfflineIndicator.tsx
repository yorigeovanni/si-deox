import { View, Text, Animated } from 'react-native';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export default function OfflineIndicator() {
  const networkStatus = useSelector((state: RootState) => state.app.networkStatus);
  const slideAnim = useRef(new Animated.Value(-40)).current;

  useEffect(() => {
    if (networkStatus === 'offline') {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(slideAnim, {
        toValue: -40,
        useNativeDriver: true,
      }).start();
    }
  }, [networkStatus]);

  if (networkStatus === 'online') return null;

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transform: [{ translateY: slideAnim }],
      }}
    >
      <View className="bg-red-500/90 px-4 py-1">
        <Text className="text-white text-center text-sm font-medium">
          OFFLINE MODE
        </Text>
      </View>
    </Animated.View>
  );
}