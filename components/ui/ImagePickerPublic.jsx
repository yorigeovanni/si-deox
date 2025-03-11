import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  FlatList,
  StyleSheet,
  Dimensions,
  Animated,
  StatusBar,
  Platform,
  TextInput,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRef, useEffect, useState, useCallback, useMemo } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as ExpoImagePicker from "expo-image-picker";
import { getNetworkState } from "@/services/mockSocialService";
import { useModelInfinityQuery, useModelMutations } from "@/services/queryClientPublic";
import { useSelector } from "react-redux";

const baseURL =
  process.env.NODE_ENV === "production"
    ? process.env.EXPO_PUBLIC_API_URL
    : process.env.EXPO_PUBLIC_API_DEV;
const { width: SCREEN_WIDTH } = Dimensions.get("window");




export const ImagePicker = ({
  visible,
  onClose,
  selectedImages,
  onSelectImage,
  onAddImages,
}) => {
  const { phoneNumber } = useSelector((state) => state.device);
  const slideAnim = useRef(new Animated.Value(-SCREEN_WIDTH)).current;
  const insets = useSafeAreaInsets();
  //const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const isOffline = getNetworkState();
  const flatListRef = useRef(null);
  const [refreshing, setRefreshing] = useState(false);



  const [
    { domain, limit, offset, order, searchQuery, filterStatus },
    setParams,
  ] = useState({
    domain: [
      "&",
      ["public", "=", true],
      ['x_studio_mobile_number', '=', phoneNumber],
      ["name", "ilike", ""],
      [
        "mimetype",
        "in",
        [
          "image/jpg",
          "image/jpeg",
          "image/jpe",
          "image/png",
          "image/svg+xml",
          "image/gif",
          "image/webp",
        ],
      ]
    ],
    searchQuery: "",
    filterStatus: null,
    limit: 20,
    offset: 0,
    order: "create_date DESC",
  });

  const queryOptions = useMemo(() => {
    return {
      model: "ir.attachment",
      selectedFields: {
        name: {},
        mimetype: {},
        description: {},
        checksum: {},
        url: {},
        public: {},
        access_token: {},
        image_src: {},
        image_width: {},
        image_height: {},
       
      },
      offset: offset,
      order: order,
      limit: limit,
      count_limit: 100001,
      domain: domain,
    }
  },
    [domain, limit, offset, order]
  );

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isOfflineData,
    uploadImage,
    isUploading,
    totalCount,
    refetch,
  } = useModelInfinityQuery(queryOptions);

  const { createMutation  } = useModelMutations("ir.attachment");


  // Debounce search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);





  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -SCREEN_WIDTH,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);





  const handleClose = () => {
    Animated.timing(slideAnim, {
      toValue: -SCREEN_WIDTH,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onClose();
      //setSearchQuery("");
    });
  };




  const handleUploadImage = useCallback(async () => {
    try {
      // Request permission to access the media library
      const { status } =
        await ExpoImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to upload images!");
        return;
      }
      // Launch the image picker
      const result = await ExpoImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        base64: true,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const newImage = result.assets[0];
          createMutation.mutate({
            datas: newImage.base64,
            type: "binary",
            url: false,
            public: true,
            description: false,
            name: newImage.fileName,
            x_studio_mobile_number: phoneNumber,
          });
      }
    } catch (error) {
      console.error( error);
      alert("Failed to upload image. Please try again.");
    }
  },[phoneNumber])





  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage && !refreshing) {
      //console.log("Loading more images...");
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, refreshing]);





  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      // Reset to first page and refetch
      await refetch();

      // Scroll to top after refresh
      if (flatListRef.current) {
        flatListRef.current.scrollToOffset({ offset: 0, animated: true });
      }
    } catch (error) {
      //console.error("Error refreshing images:", error);
    } finally {
      setRefreshing(false);
    }
  }, [refetch]);





  
  const renderItem = useCallback(
    ({ item }) => {
     // console.log(item)
      const isSelected = selectedImages.includes(item);
      const selectionIndex = selectedImages.indexOf(item) + 1;
     // //console.log(item);
      // For local images (like those pending upload), use the URI directly
      const imageSource = item.pendingUri
        ? { uri: item.pendingUri }
        : { uri: `${baseURL}${item.image_src}` };

      // //console.log(item)
      return (
        <TouchableOpacity
          onPress={() => onSelectImage(item)}
          style={styles.imageContainer}
        >
          <Image
            source={imageSource}
            style={[styles.gridImage, isSelected && styles.selectedImage]}
            resizeMode="cover"
          />

          {isSelected && (
            <View style={styles.selectionBadge}>
              <Text style={styles.selectionNumber}>{selectionIndex}</Text>
            </View>
          )}
          {item.isUploaded && (
            <View style={styles.uploadedBadge}>
              <Ionicons name="cloud-done" size={12} color="#fff" />
            </View>
          )}
          {item.status === "pending_sync" && (
            <View style={styles.pendingBadge}>
              <Ionicons name="time-outline" size={12} color="#fff" />
            </View>
          )}
        </TouchableOpacity>
      );
    },
    [selectedImages, onSelectImage]
  );



  const renderFooter = useCallback(() => {
    if (!isFetchingNextPage) return null;
    return (
      <View style={styles.loaderFooter}>
        <ActivityIndicator size="small" color="#3b82f6" />
        <Text style={styles.loaderText}>Loading more images...</Text>
      </View>
    );
  }, [isFetchingNextPage]);




  const renderEmpty = useCallback(() => {
    if (isLoading && !refreshing) {
      return (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color="#3b82f6" />
          <Text style={styles.emptyText}>Loading images...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.emptyContainer}>
          <Ionicons name="alert-circle-outline" size={48} color="#ef4444" />
          <Text style={styles.errorText}>Failed to load images</Text>
          <Text style={styles.errorSubtext}>{error.message}</Text>
        </View>
      );
    }

    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="images-outline" size={48} color="#d1d5db" />
        <Text style={styles.emptyText}>No images found</Text>
        {searchQuery && (
          <Text style={styles.emptySubtext}>Try a different search term</Text>
        )}
      </View>
    );
  }, [isLoading, error, searchQuery, refreshing]);



  const allRecords = data?.pages?.flatMap((page) => page?.records ?? []) ?? [];



  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={handleClose}
      statusBarTranslucent={true}
    >
      <StatusBar backgroundColor="rgba(0,0,0,0.5)" barStyle="light-content" />
      <View style={styles.modalOverlay}>
        <Animated.View
          style={[
            styles.modalContent,
            { transform: [{ translateX: slideAnim }] },
          ]}
        >
          <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.modalHeader}>
              <View style={styles.modalHeaderContent}>
                <Text style={styles.modalTitle}>Add Photos</Text>
                <TouchableOpacity
                  onPress={handleClose}
                  style={styles.closeButton}
                >
                  <Ionicons name="close" size={24} color="#374151" />
                </TouchableOpacity>
              </View>
              <View style={styles.headerInfo}>
                <Text style={styles.photoCount}>
                  {selectedImages.length} Photos Selected
                </Text>
                {isOffline && (
                  <View style={styles.offlineIndicator}>
                    <Ionicons name="cloud-offline" size={14} color="#ef4444" />
                    <Text style={styles.offlineText}>Offline</Text>
                  </View>
                )}
                {isOfflineData && !isOffline && (
                  <View style={styles.cachedIndicator}>
                    <Ionicons name="save-outline" size={14} color="#f59e0b" />
                    <Text style={styles.cachedText}>Cached Data</Text>
                  </View>
                )}
              </View>
            </View>

            <View style={styles.searchContainer}>
              <View style={styles.searchInputContainer}>
                <Ionicons
                  name="search"
                  size={20}
                  color="#6b7280"
                  style={styles.searchIcon}
                />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search images..."
                  value={searchQuery}
                  // onChangeText={setSearchQuery}
                  placeholderTextColor="#9ca3af"
                />
                {searchQuery.length > 0 && (
                  <TouchableOpacity
                    onPress={() => {
                      //setSearchQuery("");
                    }}
                  >
                    <Ionicons name="close-circle" size={20} color="#6b7280" />
                  </TouchableOpacity>
                )}
              </View>

              <TouchableOpacity
                style={styles.uploadButton}
                onPress={handleUploadImage}
                disabled={isUploading}
              >
                {isUploading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Ionicons name="cloud-upload" size={20} color="#fff" />
                )}
              </TouchableOpacity>
            </View>

            <FlatList
              ref={flatListRef}
              data={allRecords}
              numColumns={3}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              contentContainerStyle={styles.gridContainer}
              ListEmptyComponent={renderEmpty}
              ListFooterComponent={renderFooter}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.5}
              initialNumToRender={15}
              maxToRenderPerBatch={15}
              windowSize={10}
              removeClippedSubviews={true}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={handleRefresh}
                  colors={["#3b82f6"]}
                  tintColor="#3b82f6"
                  title="Pull to refresh"
                  titleColor="#6b7280"
                />
              }
            />

            <View
              style={[
                styles.bottomBar,
                { paddingBottom: Math.max(16, insets.bottom) },
              ]}
            >
              <TouchableOpacity
                style={[
                  styles.addPhotosButton,
                  !selectedImages.length && styles.addPhotosButtonDisabled,
                ]}
                onPress={onAddImages}
                disabled={!selectedImages.length}
              >
                <Text style={styles.addPhotosButtonText}>
                  Add {selectedImages.length} Photos
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    height: "100%",
    width: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  modalHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  modalHeaderContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  headerInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
  },
  photoCount: {
    color: "#6b7280",
  },
  offlineIndicator: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fee2e2",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  offlineText: {
    color: "#ef4444",
    fontSize: 12,
    fontWeight: "500",
    marginLeft: 4,
  },
  cachedIndicator: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fef3c7",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  cachedText: {
    color: "#f59e0b",
    fontSize: 12,
    fontWeight: "500",
    marginLeft: 4,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f3f4f6",
    alignItems: "center",
    justifyContent: "center",
  },
  searchContainer: {
    flexDirection: "row",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    alignItems: "center",
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#f3f4f6",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: "center",
    marginRight: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#374151",
    paddingVertical: 4,
  },
  uploadButton: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: "#3b82f6",
    alignItems: "center",
    justifyContent: "center",
  },
  gridContainer: {
    padding: 4,
    flexGrow: 1,
  },
  imageContainer: {
    flex: 1,
    aspectRatio: 1,
    margin: 4,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#f3f4f6",
  },
  gridImage: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  selectedImage: {
    opacity: 0.7,
  },
  selectionBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#3b82f6",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  uploadedBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#10b981",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  pendingBadge: {
    position: "absolute",
    bottom: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#f59e0b",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  selectionNumber: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  bottomBar: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    backgroundColor: "#fff",
  },
  addPhotosButton: {
    backgroundColor: "#3b82f6",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  addPhotosButtonDisabled: {
    backgroundColor: "#93c5fd",
  },
  addPhotosButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  emptyContainer: {
    padding: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    marginTop: 12,
    fontSize: 16,
    color: "#9ca3af",
    textAlign: "center",
  },
  emptySubtext: {
    marginTop: 4,
    fontSize: 14,
    color: "#9ca3af",
    textAlign: "center",
  },
  errorText: {
    marginTop: 12,
    fontSize: 16,
    color: "#ef4444",
    textAlign: "center",
  },
  errorSubtext: {
    marginTop: 4,
    fontSize: 14,
    color: "#ef4444",
    textAlign: "center",
  },
  loaderFooter: {
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  loaderText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#6b7280",
  },
});
