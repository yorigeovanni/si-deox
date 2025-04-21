import { View, Text, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { useQuery } from "@tanstack/react-query";
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
const { width } = Dimensions.get("window");
const blurhash = "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";
const baseURL = process.env.NODE_ENV === "production" ? process.env.EXPO_PUBLIC_API_URL : process.env.EXPO_PUBLIC_API_DEV;

//================================= QUERY KEY =================================
const query_keys = ["home_special-offers"];
//===================================================================================


export default function SpecialOffer() {
  const router = useRouter();
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: query_keys,
    queryFn: async () => {
      try {
        const { data : { records, length } } = await post('/mobile/api/portal/home/special-offers',{});
        return {
          data: records || [],
          totalData: length || 0,
        };
      } catch (error) {
        throw error;
      }
    }
  });

  useFocusEffect(
    useCallback(() => {
        refetch();
    }, []));


  if(isLoading){
    return null
  }

  if(isError){
    return null
  }


  return (
    <View className="px-6 mb-8">
    <Text className="text-lg font-bold mb-4">Special Offers</Text>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToInterval={width - 48}
      decelerationRate="fast"
    >
      {data?.data?.map((promo, index) => (
        <View
          key={promo.id}
          className="relative"
          style={{
            width: width - 48,
            marginRight: index === data?.data?.length - 1 ? 0 : 12,
          }}
        >
          <View className="overflow-hidden rounded-xl">
            <Image
              source={{ uri: `${baseURL}${promo.x_studio_image_cover}` }}
              //className="w-full h-48"
              style={{ width: "100%", height: 170 }}
              contentFit="cover"
              transition={1000}
            />
            <LinearGradient
              colors={["rgba(0,0,0,0.7)", "transparent"]}
              className="absolute inset-0 h-full"
            />
            <View className="absolute top-0 left-0 right-0 bottom-0 bg-gray-900/45 p-4 rounded-lg">
              <View className="flex-row items-center mb-2">
                {promo.x_studio_tags?.length > 0 && (<View className="bg-red-500 px-2 py-1 rounded">
                  <Text className="text-white text-sm font-medium uppercase">
                    {promo.x_studio_tags[0].x_name}
                  </Text>
                </View>)}
              </View>
              <Text className="text-white text-xl font-bold mb-1">
                {promo.x_name}
              </Text>
              <Text className="text-white/90">{promo.x_studio_description}</Text>
            </View>
            <TouchableOpacity 
              onPress={() => router.push(`/special-offers/${promo.id}/detail`)}
            className="absolute bottom-4 right-4 px-4 py-2 rounded-lg"
            >
              <Text className="text-white border border-yellow-300/75 p-1 rounded-lg">
                Selegkapnya
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  </View>
  );
}
