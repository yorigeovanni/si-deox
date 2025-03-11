import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  Animated,
} from "react-native";
import { v4 as uuidv4 } from "uuid";
import { Image } from "expo-image";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useState, useCallback, useRef, useMemo, Fragment } from "react";
import { useRouter, useFocusEffect } from "expo-router";
import { ImageGrid } from "@/components/ui/ImageGrid";
import { useModelQuery, useModelMutations } from "@/services/queryClientPublic";
import DeoLogo from "@/assets/deo.jpg";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";
const baseURL =
  process.env.NODE_ENV === "production"
    ? process.env.EXPO_PUBLIC_API_URL
    : process.env.EXPO_PUBLIC_API_DEV;
const x_studio_tags = [3]; // INFORMASI
const title = "INFORMASI";

export default function MobileContent() {
  const router = useRouter();
  const { phoneNumber } = useSelector((state) => state.device);
  const [refreshing, setRefreshing] = useState(false);
  const [
    { domain, limit, offset, order, searchQuery, filterStatus },
    setParams,
  ] = useState({
    domain: [
      "&",
      ["x_studio_publish", "=", true],
      ["x_studio_tags", "in", x_studio_tags],
    ],
    searchQuery: "",
    filterStatus: null,
    limit: 10,
    offset: 0,
    order: "create_date DESC",
  });

  const queryOptions = useMemo(
    () => ({
      model: "x_humas_berita",
      selectedFields: {
        x_studio_content: {},
        x_studio_likes_1: {
          fields: {
            x_studio_phone_number: {},
          },
        },
        create_uid: { fields: { display_name: {} } },
        create_date: {},
        write_uid: { fields: { display_name: {} } },
        write_date: {},
      },
      offset: offset,
      order: order,
      limit: limit,
      count_limit: 100001,
      domain: domain,
    }),
    [domain, limit, offset, order]
  );

  const { data, isLoading, refetch } = useModelQuery(queryOptions);
  const { updateMutation } = useModelMutations("x_humas_berita");

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  );

  const onRefresh = useCallback(() => {
    //setRefreshing(true);
    refetch();
  }, []);



  const handleLike = (postId, action, idLike) => {
    let data = {
      x_studio_likes_1: [[0, uuidv4(), { x_studio_phone_number: phoneNumber }]],
    };
    if (action === "delete") {
      data = {
        x_studio_likes_1: [[2, idLike]],
      };
    }
    updateMutation.mutate({ id: postId, data: data });
  };


  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

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
              <Text className="text-xl font-bold text-red-700">{title}</Text>
              <Text className="text-xs text-red-800">
                BLU UPBU KELAS I DEO - SORONG
              </Text>
            </View>
          </View>
          {/**<View className="flex-row items-center">
            <View className=" flex-col items-end justify-end">
              <TouchableOpacity className="w-10 h-10 mt-1 rounded-full items-center justify-center">
                <Ionicons name="search-outline" size={22} color="#991B1B" />
              </TouchableOpacity>
            </View>
          </View> */}
        </View>
      </View>

      <View className="bg-white p-2 mb-3">
        <View className="flex-row pt-2 border-gray-100 justify-between">
          <TouchableOpacity className="flex-1 flex-row items-center justify-center">
            <View className=" bg-slate-100 rounded-full p-3 w-[100%] ml-3">
              <Text className="ml-2 font-medium text-gray-400">Search ...</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
      >
        {(data?.records || []).map((post) => (
          <PostCard key={post.id} post={post} user={2} onLike={handleLike} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

function PostCard({ post, user, onLike }) {
  const { phoneNumber } = useSelector((state) => state.device);
  const likeScale = useRef(new Animated.Value(1)).current;
  const [showFullContent, setShowFullContent] = useState(false);
  const contentMaxLength = 150;

  const timeAgo = (timestamp) => {
    const seconds = Math.floor((new Date() - new Date(timestamp)) / 1000);
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;
    const days = Math.floor(hours / 24);
    return `${days}d`;
  };

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

  const isLike = useMemo(() => {
    return post.x_studio_likes_1?.some(
      (like) => like.x_studio_phone_number === phoneNumber
    );
  }, [post.x_studio_likes_1]);

  const handleLike = useCallback(async () => {
    const idLike = post.x_studio_likes_1?.find(
      (like) => like.x_studio_phone_number === phoneNumber
    )?.id;
    if (!idLike) {
      onLike(post.id, "add");
    } else {
      onLike(post.id, "delete", idLike);
    }
    animateLike();
  }, [post.x_studio_likes_1]);

  return (
    <View className="bg-white mb-3 rounded-2xl shadow-sm overflow-hidden">
      {/* Post Header */}
      <View className="p-4 flex-row items-center justify-between">
        <View className="flex-row items-center flex-1 border-b border-gray-100 pb-2">
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
              <Text className=" text-gray-600 font-bold text-sm">
                DEO AIRPORT
              </Text>
            </View>
            <Text className="text-gray-500 text-xs">
              Oleh - {post.write_uid?.display_name}
            </Text>
          </View>
        </View>
        <Text className="text-gray-500 text-sm">
          {timeAgo(post.create_date)} ago
        </Text>
      </View>

      {/* Post Content */}
      <View>
        {Array.isArray(post.x_studio_content) &&
          post.x_studio_content.map((content, index) => {
            return (
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
            );
          })}
      </View>

      {/* Post Stats */}
      <View className="px-4 py-3 border-t border-gray-100">
        <View className="flex-row items-center justify-between mb-3">
          <View className="flex-row items-center">
            {isLike && (
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
              {post.x_studio_likes_1?.length} Likes
            </Text>
            <Text className="text-gray-600 ml-2">0 comments</Text>
          </View>
        </View>

        <View className="flex-row items-center justify-between border-t border-gray-100 pt-3">
          <TouchableOpacity
            onPress={handleLike}
            className="flex-1 flex-row items-center justify-center py-2"
            disabled={isLike === undefined}
          >
            <Animated.View style={{ transform: [{ scale: likeScale }] }}>
              <Ionicons
                name={isLike ? "heart" : "heart-outline"}
                size={24}
                color={isLike ? "#ef4444" : "#6b7280"}
              />
            </Animated.View>
            <Text
              className={`ml-2 font-medium ${
                isLike ? "text-red-500" : "text-gray-600"
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
  );
}
