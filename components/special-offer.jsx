import { View, Text, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { useState, useCallback, useRef, useMemo } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useModelQuery } from "@/services/queryClientPublic";
import { Image } from "expo-image";
const { width } = Dimensions.get("window");
const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";
  const baseURL =
  process.env.NODE_ENV === "production"
    ? process.env.EXPO_PUBLIC_API_URL
    : process.env.EXPO_PUBLIC_API_DEV;





const promoCards = [
  {
    id: "1",
    title: "Year End Sale",
    subtitle: "Get up to 30% off on domestic flights",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80",
    tag: "Limited Time",
  },
  {
    id: "2",
    title: "Business Class Upgrade",
    subtitle: "Fly in comfort with special upgrade rates",
    image:
      "https://images.unsplash.com/photo-1540339832862-474599807836?auto=format&fit=crop&w=1200&q=80",
    tag: "Premium Offer",
  },
  {
    id: "3",
    title: "Family Holiday Package",
    subtitle: "Special rates for family travelers",
    image:
      "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&w=1200&q=80",
    tag: "Family Deal",
  },
];







export default function SpecialOffer() {
  const router = useRouter();
  const [{ domain, limit, offset, order }, setParams ] = useState({
    domain: [[
      "x_studio_show_in_home", "=", true
    ]],
    searchQuery: "",
    filterStatus: null,
    limit: 10,
    offset: 0,
    order: "write_date DESC",
  });
  const queryOptions = useMemo(
    () => ({
      model: "x_humas_berita",
      selectedFields: {
        x_name: {},
        x_studio_description : {},
        x_studio_image_cover : {},
        x_studio_tags : {
          fields: {
            x_name : {}
          }
        }
      },
      offset: offset,
      order: order,
      limit: limit,
      count_limit: 100001,
      domain: domain,
    }),
    [domain, limit, offset, order]
  );
  const { data, isLoading, isError, refetch } = useModelQuery(queryOptions);


  useFocusEffect(
    useCallback(() => {
        refetch();
    }, []));


    
  if(isLoading){
    return <Text>Loading...</Text>
  }


  if(isError){
    return <Text>Error...</Text>
  }

  console.log(data);



  return (
    <View className="px-6 mb-8">
    <Text className="text-lg font-bold mb-4">Special Offers</Text>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToInterval={width - 48}
      decelerationRate="fast"
    >
      {data?.records?.map((promo, index) => (
        <View
          key={promo.id}
          className="relative"
          style={{
            width: width - 48,
            marginRight: index === data?.records?.length - 1 ? 0 : 12,
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
            <TouchableOpacity className="absolute bottom-4 right-4 px-4 py-2 rounded-lg">
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
