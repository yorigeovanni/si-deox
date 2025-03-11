import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  FlatList,
} from "react-native";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useState, useCallback, useRef, useMemo, Fragment } from "react";
import { useRouter, useFocusEffect } from "expo-router";
import DeoLogo from "@/assets/deo.jpg";
import { ImageGrid } from "@/components/ui/ImageGrid";

import { fetchModelData } from "@/services/queryClient";
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import createRequest from "@/services/api-secure-internal";
import dayjs from "dayjs";
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault();
const { post } = createRequest();


const { width: SCREEN_WIDTH } = Dimensions.get("window");
const blurhash = "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";
const baseURL =
  process.env.NODE_ENV === "production"
    ? process.env.EXPO_PUBLIC_API_URL
    : process.env.EXPO_PUBLIC_API_DEV;





export default function ProsesPengaduan() {
  const router = useRouter();
  const [showFullContent, setShowFullContent] = useState(false);
  const contentMaxLength = 150;
  const [refreshing, setRefreshing] = useState(false);
  const [
    { domain, limit, offset, order, searchQuery, filterStatus },
    setParams,
  ] = useState({
    domain: [
      ["x_studio_is_submit", "=", true]
    ],
    searchQuery: "",
    filterStatus: null,
    limit: 10,
    // offset: 0,
    order: "write_date DESC",
  });


  const queryParams = useMemo(() => {
    return {
      model: "x_mobile_pengaduan",
      selectedFields: {
        x_studio_mobile_number : {},
        x_studio_content_response: {},
        x_studio_sequence: {},
        x_studio_content: {},
        x_studio_is_submit: {},
        create_date: {},
      },
      offset: offset,
      order: order,
      limit: limit,
      count_limit: 100001,
      domain: domain,
    };
  }, [domain, limit, offset, order]);



  const posting = useInfiniteQuery({
    queryKey : [ 'humas_pengaduan' ],
    queryFn: async ({ pageParam = 0 }) => {
      try {
        await new Promise(resolve => setTimeout(resolve, 3000));
        const result = await fetchModelData(post, {
          ...queryParams,
          offset: pageParam
        });
        return {
          records: result?.records || [],
          totalData: result?.length || 0,
          offset: pageParam,
          isOffline: false,
          isStale: false
        };
      } catch (error) {
        throw error;
      }
    },
    getNextPageParam: (lastPage) => {
      const nextOffset = lastPage.offset + queryParams.limit;
      return nextOffset < lastPage.totalData ? nextOffset : undefined;
    },
    keepPreviousData: true
  });





  const onRefresh = useCallback(async () => {
   // setRefreshing(true);
   // posting.refetch();
   // setRefreshing(false);
  }, [posting.refetch]);



  const handleLoadMore = () => {
    if (posting.hasNextPage && !posting.isFetchingNextPage) {
    //  posting.fetchNextPage();
    }
  };



  if (posting.isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  const renderFooter = () => {
    if (!posting.isFetchingNextPage) return null;
    return (
      <View className="py-4 flex items-center justify-center">
        <ActivityIndicator size="small" color="#3b82f6" />
        <Text className="text-gray-500 mt-2">Loading more posts...</Text>
      </View>
    );
  };

  const renderEmpty = () => (
    <View className="py-8 flex items-center justify-center">
      <Ionicons name="document-text-outline" size={48} color="#9ca3af" />
      <Text className="text-gray-500 mt-4 text-center">No posts found</Text>
    </View>
  );


  const sdasda = posting.data?.pages.flatMap((page) => page?.records) ?? [];

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
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
                PROSES PENGADUAN
              </Text>
              <Text className="text-xs text-red-800">HUMAS - DEO AIRPORT</Text>
            </View>
          </View>
          <View className="flex-row items-center"></View>
        </View>
      </View>

      <FlatList
        data={sdasda}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => {
          const post = item;
          return (<View className="bg-white mb-3 rounded-2xl shadow-sm overflow-hidden">
            {/* Post Header */}
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
                     {post.x_studio_mobile_number}
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <Text className="text-gray-500 text-sm">
                      {dayjs().to( dayjs.utc(post?.create_date))}
                    </Text>
                  </View>
                </View>
              </View>
    
              <View className=" flex-row items-center">
                {post?.x_studio_show_in_home && (
                  <View className="bg-green-500 px-2 py-1 rounded-full">
                    <Text className="text-white text-xs uppercase">
                      HOME BANNER
                    </Text>
                  </View>
                )}
    
                <View className=" flex-row rounded-full bg-gray-50 items-center justify-center">
                  <Ionicons name="ellipsis-horizontal" size={20} color="#6b7280" />
                </View>
              </View>
            </View>
    
            <View>
              {Array.isArray(post?.x_studio_content) &&
                post?.x_studio_content?.map((content, index) => (
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
    
            {!post?.x_studio_content_response ? (<View className="px-4 py-3 border-t border-gray-100">
              <View className="flex-col items-center justify-between">
                <TouchableOpacity 
                  onPress={()=> router.push(`./${post.id}/edit`,{ relativeToDirectory: true })}
                  className="flex-col items-center">
                  <View className="flex-col items-center">
                    <Ionicons
                      name="chatbubble-ellipses"
                      size={20}
                      color="#6b7280"
                    />
                    <Text className="ml-1 text-gray-600 text-sm">
                      Create Response
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>) :(<View className="bg-white mb-3 rounded-2xl shadow-sm overflow-hidden">
            {/* Post Header */}
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
                     sdasdasdas
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <Text className="text-gray-500 text-sm">
                    {dayjs().to( dayjs.utc(post?.create_date))}
                      
                    </Text>
                  </View>
                </View>
              </View>
    
              <View className=" flex-row items-center">
                {post?.x_studio_show_in_home && (
                  <View className="bg-green-500 px-2 py-1 rounded-full">
                    <Text className="text-white text-xs uppercase">
                      HOME BANNER
                    </Text>
                  </View>
                )}
    
                <View className=" flex-row rounded-full bg-gray-50 items-center justify-center">
                  <Ionicons name="ellipsis-horizontal" size={20} color="#6b7280" />
                </View>
              </View>
            </View>
    
            <View>
              {Array.isArray(post?.x_studio_content_response) &&
                post?.x_studio_content_response?.map((content, index) => (
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
    
          </View>)}
            
          </View>)
         
        }}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </SafeAreaView>
  );

}






function PostCard({ post }) {
  const [showFullContent, setShowFullContent] = useState(false);
  const contentMaxLength = 150;
  const sdasd = useCallback(() =>{
  
  },[])





  return (
    <Fragment>
      <View className="bg-white mb-3 rounded-2xl shadow-sm overflow-hidden">
        {/* Post Header */}
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
                 {post.x_studio_mobile_number}
                </Text>
              </View>
              <View className="flex-row items-center">
                <Text className="text-gray-500 text-sm">
                  {dayjs().to( dayjs.utc(post?.create_date))}
                </Text>
              </View>
            </View>
          </View>

          <View className=" flex-row items-center">
            {post?.x_studio_show_in_home && (
              <View className="bg-green-500 px-2 py-1 rounded-full">
                <Text className="text-white text-xs uppercase">
                  HOME BANNER
                </Text>
              </View>
            )}

            <View className=" flex-row rounded-full bg-gray-50 items-center justify-center">
              <Ionicons name="ellipsis-horizontal" size={20} color="#6b7280" />
            </View>
          </View>
        </View>

        <View>
          {Array.isArray(post?.x_studio_content) &&
            post?.x_studio_content?.map((content, index) => (
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

        {!post?.x_studio_content_response ? (<View className="px-4 py-3 border-t border-gray-100">
          <View className="flex-col items-center justify-between">
            <TouchableOpacity 
              onPress={sdasd}
              className="flex-col items-center">
              <View className="flex-col items-center">
                <Ionicons
                  name="chatbubble-ellipses"
                  size={20}
                  color="#6b7280"
                />
                <Text className="ml-1 text-gray-600 text-sm">
                  Create Response
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>) :(<View className="bg-white mb-3 rounded-2xl shadow-sm overflow-hidden">
        {/* Post Header */}
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
                 sdasdasdas
                </Text>
              </View>
              <View className="flex-row items-center">
                <Text className="text-gray-500 text-sm">
                {dayjs().to( dayjs.utc(post?.create_date))}
                  
                </Text>
              </View>
            </View>
          </View>

          <View className=" flex-row items-center">
            {post?.x_studio_show_in_home && (
              <View className="bg-green-500 px-2 py-1 rounded-full">
                <Text className="text-white text-xs uppercase">
                  HOME BANNER
                </Text>
              </View>
            )}

            <View className=" flex-row rounded-full bg-gray-50 items-center justify-center">
              <Ionicons name="ellipsis-horizontal" size={20} color="#6b7280" />
            </View>
          </View>
        </View>

        <View>
          {Array.isArray(post?.x_studio_content_response) &&
            post?.x_studio_content_response?.map((content, index) => (
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

      </View>)}
        
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
