import React from 'react';
import { 
  Modal, 
  View, 
  TouchableOpacity, 
  Dimensions,
  StyleSheet,
  Text,
  Animated,
  PanResponder
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRef, useState, useEffect } from 'react';
import { Image } from 'expo-image';
const blurhash ='|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
const baseURL = process.env.NODE_ENV === 'production' ? process.env.EXPO_PUBLIC_API_URL : process.env.EXPO_PUBLIC_API_DEV;




const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const ImageViewer = ({ 
  visible, 
  images, 
  initialIndex = 0,
  onClose 
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const translateX = useRef(new Animated.Value(0)).current;
  const startX = useRef(0);


  useEffect(() => {
    setCurrentIndex(initialIndex);
    translateX.setValue(0);
  }, [initialIndex, visible]);


  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      startX.current = translateX._value;
    },
    onPanResponderMove: (_, { dx }) => {
      translateX.setValue(startX.current + dx);
    },
    onPanResponderRelease: (_, { dx, vx }) => {
      const swipeThreshold = SCREEN_WIDTH * 0.3;
      
      if (Math.abs(dx) > swipeThreshold || Math.abs(vx) > 0.5) {
        if (dx > 0 && currentIndex > 0) {
          // Swipe right - show previous image
          slideToImage(currentIndex - 1);
        } else if (dx < 0 && currentIndex < images.length - 1) {
          // Swipe left - show next image
          slideToImage(currentIndex + 1);
        } else {
          // Bounce back if can't change image
          resetPosition();
        }
      } else {
        // Not enough to trigger change - bounce back
        resetPosition();
      }
    }
  });

  const slideToImage = (index) => {
    setCurrentIndex(index);
    Animated.spring(translateX, {
      toValue: 0,
      useNativeDriver: true,
      bounciness: 0,
    }).start();
  };

  const resetPosition = () => {
    Animated.spring(translateX, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      slideToImage(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      slideToImage(currentIndex + 1);
    }
  };

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* Close button */}
        <TouchableOpacity
          style={styles.closeButton}
          onPress={onClose}
        >
          <Ionicons name="close" size={28} color="#fff" />
        </TouchableOpacity>

        {/* Image counter */}
        <View style={styles.counter}>
          <Text style={styles.counterText}>
            {currentIndex + 1} / {images.length}
          </Text>
        </View>

        {/* Main image view */}
        <Animated.View
          style={[
            styles.imageContainer,
            {
              transform: [{ translateX }]
            }
          ]}
          {...panResponder.panHandlers}
        >
          <Image
            source={{ uri: `${baseURL}${images[currentIndex]?.image_src}` }}
            style={styles.image}
            placeholder={{ blurhash }}
            contentFit="contain"
            transition={1000}
            
          />
        </Animated.View>

        {/* Navigation buttons */}
        <View style={styles.navigation}>
          {currentIndex > 0 && (
            <TouchableOpacity
              style={[styles.navButton, styles.prevButton]}
              onPress={handlePrevious}
            >
              <Ionicons name="chevron-back" size={30} color="#fff" />
            </TouchableOpacity>
          )}

          {currentIndex < images.length - 1 && (
            <TouchableOpacity
              style={[styles.navButton, styles.nextButton]}
              onPress={handleNext}
            >
              <Ionicons name="chevron-forward" size={30} color="#fff" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
    padding: 10,
  },
  counter: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
    padding: 10,
  },
  counterText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  imageContainer: {
    width: SCREEN_WIDTH,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: SCREEN_WIDTH,
    height: '80%',
  },
  navigation: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  navButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  prevButton: {
    position: 'absolute',
    left: 20,
  },
  nextButton: {
    position: 'absolute',
    right: 20,
  },
});