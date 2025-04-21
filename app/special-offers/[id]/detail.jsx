import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Pressable,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState, useCallback, Fragment } from "react";
import { ImageGrid } from "@/components/ui/ImageGrid";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import createRequest from "@/services/api-secure-portal";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault();
const { post } = createRequest();
const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";
const baseURL =
  process.env.NODE_ENV === "production"
    ? process.env.EXPO_PUBLIC_API_URL
    : process.env.EXPO_PUBLIC_API_DEV;

//================================= QUERY KEY =================================
const query_keys = ["public-special-offers"];
//===================================================================================

export default function Detail() {
  const contentMaxLength = 150;
  const [showFullContent, setShowFullContent] = useState(false);
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [refreshing, setRefreshing] = useState(false);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: [...query_keys, id],
    queryFn: async () => {
      try {
        const { data } = await post(
          "/mobile/api/portal/home/special-offers/details",
          {
            id: id,
          }
        );
        return data;
      } catch (error) {
        throw error;
      }
    },
  });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  }, []);



  if (isLoading) {
    return null;
  }


  if (isError) {
    return null;
  }



  return (
    <Fragment>
      <View className="relative">
        <Image
          style={{
            width: "100%",
            height: 250,
          }}
          source={{ uri: `${baseURL}${data?.x_studio_image_cover}` }}
          placeholder={{ blurhash }}
          contentFit="cover"
          transition={1000}
        />
        <LinearGradient
          colors={["rgba(0,0,0,0.7)", "transparent"]}
          className="absolute inset-0 h-full"
        />
        <View className="absolute top-0 left-0 right-0 bottom-0 bg-gray-900/45 p-4">
          <View className="flex-row items-center mb-2 mt-12">
            <TouchableOpacity
              onPress={() => router.back()}
              className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center"
            >
              <Ionicons name="chevron-back" size={24} color="black" />
            </TouchableOpacity>
            <View className="ml-4">
              {data?.x_studio_tags?.length > 0 && (
                <Text className="text-white text-xl font-bold">
                  {data.x_studio_tags[0].x_name}
                </Text>
              )}
              <Text className="text-white/90">sdasdas</Text>
            </View>
          </View>
        </View>
      </View>

      <View className=" bg-gray-50 flex-1 rounded-tl-2xl rounded-tr-2xl -mt-6 py-4">
        <ScrollView>
          {Array.isArray(data.x_studio_content) &&
            data.x_studio_content.map((content, index) => (
              <View key={index}>
                {content.type === "text" && (
                  <View className="px-4 mb-3">
                    <Text className="text-gray-900 text-base leading-6">
                      {content.value}
                    </Text>
                  </View>
                )}
                {content.type === "image" &&
                  Array.isArray(content.value) &&
                  content.value.length > 0 && (
                    <ImageGrid images={content.value} readonly />
                  )}
              </View>
            ))}
        </ScrollView>
      </View>
    </Fragment>
  );
}
