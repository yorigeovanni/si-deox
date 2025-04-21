import {
  View,
  Pressable,
  TouchableOpacity,
  Text,
  Dimensions,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useState } from "react";
import { ImageViewer } from "@/components/ui/ImageViewer";
const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const baseURL =
  process.env.NODE_ENV === "production"
    ? process.env.EXPO_PUBLIC_API_URL
    : process.env.EXPO_PUBLIC_API_DEV;

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const GRID_PADDING = 16;
const GAP = 4;

export const ImageGrid = ({
  images,
  onRemoveImage,
  onReorderImages,
  readonly = false,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [viewerVisible, setViewerVisible] = useState(false);

  const getGridLayout = (index, total) => {
    // Single image
    if (total === 1) {
      return {
        width: SCREEN_WIDTH - GRID_PADDING * 2,
        height: (SCREEN_WIDTH - GRID_PADDING * 2) * 0.75,
        marginBottom: 0,
        marginRight: 0,
      };
    }

    // Two images
    if (total === 2) {
      return {
        width: (SCREEN_WIDTH - GRID_PADDING * 2 - GAP) / 2,
        height: (SCREEN_WIDTH - GRID_PADDING * 2 - GAP) / 2,
        marginRight: index === 0 ? GAP : 0,
        marginBottom: 0,
      };
    }

    // Three images
    if (total === 3) {
      if (index === 0) {
        return {
          width: SCREEN_WIDTH - GRID_PADDING * 2,
          height: (SCREEN_WIDTH - GRID_PADDING * 2) * 0.75,
          marginRight: 0,
          marginBottom: GAP,
        };
      }
      return {
        width: (SCREEN_WIDTH - GRID_PADDING * 2 - GAP) / 2,
        height: (SCREEN_WIDTH - GRID_PADDING * 2 - GAP) / 3,
        marginRight: index === 1 ? GAP : 0,
        marginBottom: 0,
      };
    }

    // Four images (2x2 grid)
    if (total === 4) {
      const isFirstRow = index < 2;
      const isFirstColumn = index % 2 === 0;

      return {
        width: (SCREEN_WIDTH - GRID_PADDING * 2 - GAP) / 2,
        height: (SCREEN_WIDTH - GRID_PADDING * 2 - GAP) / 2,
        marginRight: isFirstColumn ? GAP : 0,
        marginBottom: isFirstRow ? GAP : 0,
      };
    }

    // Five or more images
    const isFirstRow = index < 2;

    if (isFirstRow) {
      return {
        width: (SCREEN_WIDTH - GRID_PADDING * 2 - GAP) / 2,
        height: (SCREEN_WIDTH - GRID_PADDING * 2 - GAP) / 2,
        marginRight: index === 0 ? GAP : 0,
        marginBottom: GAP,
      };
    }

    // For second row and beyond (3 columns)
    const secondRowIndex = index - 2; // Adjust index for second row
    const isLastInRow = (secondRowIndex + 1) % 3 === 0;
    const columnWidth = (SCREEN_WIDTH - GRID_PADDING * 2 - GAP * 2) / 3;

    return {
      width: columnWidth,
      height: columnWidth,
      marginRight: !isLastInRow ? GAP : 0,
      marginBottom: GAP,
    };
  };

  const renderRemainingCount = (index, total) => {
    if (index === 5 && total > 6) {
      return (
        <View className="absolute inset-0 bg-black/60 items-center justify-center rounded-xl">
          <Text className="text-white text-2xl font-bold">+{total - 6}</Text>
          <Text className="text-white/80">more photos</Text>
        </View>
      );
    }
    return null;
  };

  const handleImagePress = (index) => {
    setSelectedImageIndex(index);
    setViewerVisible(true);
  };

  return (
    <View className="p-4">
      <View className="flex-row flex-wrap">
        {images.slice(0, 6).map((image, index) => {
          ////console.log(`${baseURL}${image.image_src}`)
          const layout = getGridLayout(index, images.length);
          return (
            <Pressable
              key={index}
              onPress={() => handleImagePress(index)}
              style={{
                width: layout.width,
                height: layout.height,
                marginRight: layout.marginRight,
                marginBottom: layout.marginBottom,
              }}
            >
              {image?.image_src && (
                <Image
                  style={styles.image}
                  source={{ uri: `${baseURL}${image.image_src}` }}
                  placeholder={{ blurhash }}
                  contentFit="cover"
                  //transition={1000}
                  // className="w-full h-full rounded-xl"
                />
              )}

              {!readonly && (
                <TouchableOpacity
                  onPress={() => onRemoveImage(index)}
                  className="absolute top-2 right-2 w-8 h-8 bg-black/50 rounded-full items-center justify-center"
                >
                  <Ionicons name="close" size={20} color="#fff" />
                </TouchableOpacity>
              )}

              {index === 0 && !readonly && (
                <View className="absolute bottom-2 left-2 bg-black/50 px-3 py-1.5 rounded-lg flex-row items-center">
                  <Ionicons name="images" size={16} color="#fff" />
                  <Text className="text-white text-sm font-medium ml-1">
                    Cover
                  </Text>
                </View>
              )}

              {renderRemainingCount(index, images.length)}
            </Pressable>
          );
        })}
      </View>

      <ImageViewer
        visible={viewerVisible}
        images={images}
        initialIndex={selectedImageIndex}
        onClose={() => {
          setViewerVisible(false);
          setSelectedImageIndex(null);
        }}
      />

      {!readonly && images.length > 0 && (
        <View className="mt-4 flex-row items-center justify-between">
          <Text className="text-gray-600">
            {images.length} {images.length === 1 ? "photo" : "photos"} selected
          </Text>
          {images.length >= 10 && (
            <Text className="text-red-500">Maximum photos reached</Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: "100%",
    backgroundColor: "#0553",
    borderRadius: 8,
  },
});
