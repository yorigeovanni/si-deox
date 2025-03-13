import { View, Text, TouchableOpacity, RefreshControl, ActivityIndicator, Animated, StyleSheet, Dimensions, FlatList, Alert } from "react-native";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useState, useCallback, useRef, Fragment } from "react";
import { useRouter, useFocusEffect } from "expo-router";
import { ImageGrid } from "@/components/ui/ImageGrid";
import { ErrorState } from "@/components/ui/ErrorState";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";
//import { LoadingSpinner, ThreeDotsLoader } from "@/components/ui/LoadingIndicators";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import createRequest from "@/services/api-secure-portal";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import relativeTime from "dayjs/plugin/relativeTime";
import DeoLogo from "@/assets/deo.jpg";
dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault();
const { post } = createRequest();


const { width: SCREEN_WIDTH } = Dimensions.get("window");
const blurhash = "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

//================================= REQUEST KEY =================================
const title = "LAYANAN";
const query_keys = ["public-layanan"];
//===================================================================================


export default function ContentFasilitas() {
  const router = useRouter();
  const firstTimeRef = useRef(true);
  const [refreshing, setRefreshing] = useState(false);
  const { 
    data, 
    isLoading, 
    isError, 
    refetch, 
    hasNextPage, 
    isFetchingNextPage, 
    fetchNextPage  
  } = useInfiniteQuery({
    queryKey: query_keys,
    queryFn: async ({ pageParam = 0 }) => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        const { data : { records, length } } = await post('/mobile/api/portal/layanan',{
          offset: pageParam
        });
        return {
          data: records || [],
          offset: pageParam,
          totalData: length || 0,
        };
      } catch (error) {
        throw error;
      }
    },
    getNextPageParam: (lastPage, pages) => {
      const nextOffset = lastPage.offset + 20;
      return nextOffset < lastPage.totalData ? nextOffset : undefined;
    },
    keepPreviousData: true,
  });


  useFocusEffect(
    useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false;
        return;
      }
      refetch();
    }, [refetch])
  );


  const onRefresh = useCallback(() => {
    refetch();
  }, []);


  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };


  const renderHeader = () => {
    return (
      <Fragment>
        <View className="bg-white border-b border-gray-200">
        <View className="px-4 py-3 flex-row items-center justify-between">
          <View className="flex-row items-start justify-start">
            <TouchableOpacity
              onPress={() => router.back()}
              className="w-10 h-10 mt-1 bg-red-100 rounded-full items-center justify-center"
            >
              <Ionicons name="arrow-back" size={22} color="#991B1B" />
            </TouchableOpacity>

            <View className=" flex-col items-start justify-start ml-3">
              <Text className="text-xl font-bold text-red-700">
                {title}
              </Text>
              <Text className="text-xs text-red-800">BLU UPBU KELAS I DEO - SORONG</Text>
            </View>
          </View>
          <View className="flex-row items-center">
            <View className=" flex-col items-end justify-end">
              <TouchableOpacity className="w-10 h-10 mt-1 rounded-full items-center justify-center">
                <Ionicons name="search" size={22} color="#991B1B" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      </Fragment>
    );
  };
  


  const renderFooter = () => {
    if (!isFetchingNextPage) return null;
    return (
      <View className="py-4 flex items-center justify-center">
        <ActivityIndicator size="small" color="#3b82f6" />
        <Text className="text-gray-500 mt-2">Loading more content...</Text>
      </View>
    );
  };
  

  const renderEmpty = () => (
    <View className="py-8 flex items-center justify-center">
      <Ionicons name="document-text-outline" size={48} color="#9ca3af" />
      <Text className="text-gray-500 mt-4 text-center">No content found</Text>
    </View>
  );


  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-slate-50">
        {renderHeader()}
        <LoadingSkeleton/>
      </SafeAreaView>
    );
  }

  if(isError){
    return(
      <SafeAreaView className="flex-1 bg-slate-50">
        {renderHeader()}
        <ErrorState  
        variant="network"
        action={refetch}
      />
    </SafeAreaView>)
  }
  const dataFlat= data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      {renderHeader()}
      <FlatList
        data={dataFlat}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => {return <ItemCard item_record={item} />}}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </SafeAreaView>
  );
}







function ItemCard({ item_record }) {
  const queryClient = useQueryClient();
  const [showFullContent, setShowFullContent] = useState(false);
  const contentMaxLength = 150;
  const likeScale = useRef(new Animated.Value(1)).current;


  const { mutate, isError, error, isPending } = useMutation({
    mutationFn: async (data) => {
      const { data: result } = await post(`/mobile/api/portal/layanan/like`,{
        id : item_record.id,
      });
      return result;
    },
    onMutate: async (newUpdate) => {
      await queryClient.cancelQueries({ queryKey: query_keys });
      const previousData = queryClient.getQueryData(query_keys);
      queryClient.setQueryData(query_keys, (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          pages: oldData.pages.map((page) => {
            return {
              data: page.data?.map((item) =>
                item.id === newUpdate.id ? { ...item, ...newUpdate } : item
              ),
            };
          }),
        };
      });
      return { previousData, newUpdate };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: query_keys });
    },
    onError: (err, newUpdate, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(query_keys, context.previousData);
      }
      Alert.alert("Error", "Failed update Data. Please try again.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: query_keys });
    },
  });



  const animateLike = () => {
    Animated.sequence([
      Animated.spring(likeScale, {
        toValue: 1.2,
        useNativeDriver: true,
        speed: 50,
        bounciness: 12,
      }),
      Animated.spring(likeScale, {
        toValue: 1,
        useNativeDriver: true,
        speed: 50,
        bounciness: 12,
      }),
    ]).start();
  };



  const handleLike = useCallback(async () => {
    mutate({
      ...item_record,
      isLike: !item_record.isLike,
      likes : item_record.isLike ? item_record.likes - 1 : item_record.likes + 1
    });
    animateLike();
  }, [item_record, mutate]);



  return (
    <Fragment>
      <View className="bg-white mb-3 rounded-2xl shadow-sm overflow-hidden">
        {/* CONTENT Header */}
        <View className="p-4 flex-row items-center justify-between">
          <View className="flex-row items-center flex-1">
            <View className="relative">
              <Image
                source={DeoLogo}
                style={{
                  borderRadius: 40,
                  width: 40,
                  height: 40,
                }}
                placeholder={{ blurhash }}
                contentFit="cover"
                transition={1000}
              />
            </View>
            <View className="ml-3 flex-1">
              <View className="flex-row items-center">
                <Text className=" text-gray-600 font-semibold text-sm">
                  DEO AIRPORT
                </Text>
              </View>
              <View className="flex-row items-center">
                <Text className="text-gray-500 text-sm">
                  {dayjs().to(dayjs.utc(item_record?.create_date))}
                </Text>
               
                
              </View>
            </View>
          </View>

         
        </View>

        {/* Body Content */}
        <View>
          {Array.isArray(item_record.x_studio_content) &&
            item_record.x_studio_content.map((content, index) => (
              <View key={index}>
                {content.type === "text" && (
                  <View className="px-4 mb-3">
                    <Text className="text-gray-900 text-base leading-6">
                      {content.value.length > contentMaxLength &&
                      !showFullContent
                        ? `${content.value.substring(0, contentMaxLength)}...`
                        : content.value}
                    </Text>
                    {content.value.length > contentMaxLength && (
                      <TouchableOpacity
                        onPress={() => setShowFullContent(!showFullContent)}
                        className="mt-1"
                      >
                        <Text className="text-blue-600 font-medium">
                          {showFullContent ? "Show less" : "Read more"}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                )}

                {content.type === "image" &&
                  Array.isArray(content.value) &&
                  content.value.length > 0 && (
                    <ImageGrid images={content.value} readonly />
                  )}
              </View>
            ))}
        </View>

        <View className="px-4 py-3 border-t border-gray-100">
                <View className="flex-row items-center justify-between mb-3">
                  <View className="flex-row items-center">
                    {item_record.isLike && (
                      <Fragment>
                        <View className="flex-row items-center -space-x-2">
                          <View className="w-6 h-6 rounded-full bg-red-500 items-center justify-center ml-2">
                            <Ionicons name="heart" size={12} color="#fff" />
                          </View>
                        </View>
                        <Text className="text-gray-600 ml-2">Thank You for Like</Text>
                      </Fragment>
                    )}
                  </View>
        
                  <View className="flex-row items-center space-x-4">
                    <Text className="text-gray-600">
                      {item_record?.likes} Likes
                    </Text>
                    <Text className="text-gray-600 ml-2">0 comments</Text>
                  </View>
                </View>
        
                <View className="flex-row items-center justify-between border-t border-gray-100 pt-3">
                  <TouchableOpacity
                    onPress={handleLike}
                    className="flex-1 flex-row items-center justify-center py-2"
                    disabled={item_record.isLike === undefined}
                  >
                    <Animated.View style={{ transform: [{ scale: likeScale }] }}>
                      <Ionicons
                        name={item_record.isLike ? "heart" : "heart-outline"}
                        size={24}
                        color={item_record.isLike ? "#ef4444" : "#6b7280"}
                      />
                    </Animated.View>
                    <Text
                      className={`ml-2 font-medium ${
                        item_record.isLike ? "text-red-500" : "text-gray-600"
                      }`}
                    >
                      Like
                    </Text>
                  </TouchableOpacity>
        
                  <TouchableOpacity className="flex-1 flex-row items-center justify-center py-2">
                    <Ionicons name="chatbubble-outline" size={22} color="#6b7280" />
                    <Text className="ml-2 font-medium text-gray-600">Comment</Text>
                  </TouchableOpacity>
        
                  <TouchableOpacity className="flex-1 flex-row items-center justify-center py-2">
                    <Ionicons name="share-social-outline" size={22} color="#6b7280" />
                    <Text className="ml-2 font-medium text-gray-600">Share</Text>
                  </TouchableOpacity>
                </View>
              </View>
      </View>

    
    </Fragment>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
  publishButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 10,
    padding: 2,
  },
  closeButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
    padding: 10,
  },

  counter: {
    position: "absolute",
    top: 45,
    left: 20,
    zIndex: 10,
    padding: 10,
  },
  counterText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  imageContainer: {
    width: SCREEN_WIDTH,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: SCREEN_WIDTH,
    height: "80%",
  },
  navigation: {
    position: "absolute",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  navButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  prevButton: {
    position: "absolute",
    left: 20,
  },
  nextButton: {
    position: "absolute",
    right: 20,
  },
  selectionBadge: {
    position: "absolute",
    bottom: 14,
    right: 14,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
});
