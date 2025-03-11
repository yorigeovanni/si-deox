import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Image } from "expo-image";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useState, useCallback, useRef, useMemo, Fragment } from "react";
import { useRouter, useFocusEffect } from "expo-router";
import { useModelQuery, useModelMutations } from "@/services/queryClientPublic";
import { ImageGrid } from "@/components/ui/ImageGrid";
import DeoLogo from "@/assets/deo.jpg";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault();

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";
const baseURL =
  process.env.NODE_ENV === "production"
    ? process.env.EXPO_PUBLIC_API_URL
    : process.env.EXPO_PUBLIC_API_DEV;

export default function ContentFasilitas() {
  const router = useRouter();
  const { phoneNumber } = useSelector((state) => state.device);
  const [refreshing, setRefreshing] = useState(false);

  const [
    { domain, limit, offset, order, searchQuery, filterStatus },
    setParams,
  ] = useState({
    domain: [["x_studio_mobile_number", "=", phoneNumber]],
    searchQuery: "",
    filterStatus: null,
    limit: 5,
    offset: 0,
    order: "create_date DESC",
  });

  const queryOptions = useMemo(
    () => ({
      model: "x_mobile_pengaduan",
      selectedFields: {
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
    }),
    [domain, limit, offset, order]
  );

  const canCreate = useMemo(() => {
    return true;
  }, []);

  const posting = useModelQuery(queryOptions);

  useFocusEffect(
    useCallback(() => {
      posting.refetch();
    }, [])
  );

  const onRefresh = useCallback(() => {
    //setRefreshing(true);
    posting.refetch();
  }, []);

  if (posting.isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  console.log("DALAMPUKI ANJING");
  console.log(posting.data);

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
                LAYANAN PENGADUAN
              </Text>
              <Text className="text-xs text-red-800">
                BLU UPBU KELAS I DEO - SORONG
              </Text>
            </View>
          </View>
          <View className="flex-row items-center"></View>
        </View>
      </View>

      {canCreate && (
        <View className="bg-white p-2 mb-3">
          <View className="flex-row pt-2 border-gray-100 justify-between">
            <TouchableOpacity
              onPress={() =>
                router.push("./create", { relativeToDirectory: true })
              }
              className="flex-1 flex-row items-center justify-center"
            >
              <View className=" bg-slate-100 rounded-full p-3 w-[100%] ml-3">
                <Text className="ml-2 font-medium text-gray-400">
                  buat pengaduan baru ...
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={posting.isLoading}
            onRefresh={onRefresh}
          />
        }
      >
        {/* Create Post Card */}

        {/* Posts */}
        {(posting.data?.records || []).map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

function PostCard({ post }) {
  const { phoneNumber } = useSelector((state) => state.device);
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
                  {phoneNumber}
                </Text>
              </View>
              <View className="flex-row items-center">
                <Text className="text-gray-500 text-sm">
                  {dayjs().to(dayjs.utc(post?.create_date))}
                </Text>
              </View>
            </View>
          </View>

          <View className=" flex-row items-center">
            {post.x_studio_show_in_home && (
              <View className="bg-green-500 px-2 py-1 rounded-full">
                <Text className="text-white text-xs uppercase">
                  HOME BANNER
                </Text>
              </View>
            )}

            <View className=" flex-row rounded-full bg-gray-50 items-center justify-center">
              <Ionicons name="ellipsis-horizontal" size={20} color="#6b7280" />
              <Text className=" text-xs ml-4">WAITING</Text>
            </View>
          </View>
        </View>

        {/* Post Content */}
        <View>
          {Array.isArray(post.x_studio_content) &&
            post.x_studio_content.map((content, index) => (
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
