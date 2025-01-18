import React, { useCallback, useState, useRef } from "react";
import { useRouter, useNavigation, usePathname, useFocusEffect } from "expo-router";
import { Dimensions, View, ScrollView, Text, TouchableOpacity, ImageBackground, StatusBar, Platform, Image, Button } from 'react-native';
import { classNames } from '@/utils';
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from '@tanstack/react-query';


//import SwiperFlatList from 'react-native-swiper-flatlist';
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native"
import ReanimatedCarousel from "react-native-reanimated-carousel";


import Aaaaa from '@/assets/images/about-us.jpg';
import Adfsdfsdfsd from '@/assets/icon-baru.png';
import BackGroud from '@/assets/white-pattern-indonesia-yKnkleLe.webp';
import createRequest from '@/core/api';

// STATE MANAGEMENT
import authActions from '@/state/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';

const { post } = createRequest();
const { width, height } = Dimensions.get('window');





export default function RootIndex() {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const { tokenInternal, userInternal } = useSelector((state) => state.auth);



  const goToMyAccount = useCallback(() => {
    router.replace(`/my-account`);
  }, [router]);



  return (
    <View className="flex-1 bg-gray-200">
      <StatusBar barStyle={Platform.OS === 'android' ? "light-content" : "dark-content"} translucent backgroundColor="#b91c1c" />

      <View className={classNames('bg-white px-4 pb-4 flex-row justify-between border-b border-red-800/25', Platform.OS === 'android' ? "pt-8" : "pt-16")}>


        <View className="flex-col items-start space-y-0">
          <Text className="text-red-700 text-xl font-extrabold ">DEO AIRPORT</Text>
          <Text className="text-red-700 text-sm leading-4 ">TERDEPAN - BERKUALITAS - BERSINAR</Text>
        </View>
        <View className="flex-row items-center space-x-8">
          <Image source={Adfsdfsdfsd} style={{ width: 100, height: 40 }} />
          {userInternal && (<View>
            <TouchableOpacity onPress={goToMyAccount}>
              <Image source={Aaaaa} style={{ width: 40, height: 40, borderRadius: 20 }} />
            </TouchableOpacity>
          </View>)}
        </View>
      </View>


      <ScrollView className="flex-1 bg-white">
        <ImageBackground source={BackGroud} resizeMode="cover">

          <View className="flex-row justify-around mt-6">
            {[
              { name: "PENERBANGAN", icon: "airplane-outline", bgColor: "bg-blue-500", route: "/penerbangan" },
              { name: "FASILITAS", icon: "bed-outline", bgColor: "bg-green-400", route: "/fasilitas" },
              { name: "PENUMPANG", icon: "person-outline", bgColor: "bg-yellow-500", route: "/penumpang" },
              { name: "TRANSPORTASI", icon: "car-outline", bgColor: "bg-red-400", route: "/transportasi" },
            ].map((item, index) => (
              <TouchableOpacity key={index} className="items-center" onPress={() => router.push(item.route)}>
                <View className={`  bg-red-700 justify-center items-center rounded-full p-4 border border-red-800`}>
                  <Ionicons name={item.icon} size={35} color="#ffffff" />
                </View>
                <Text className="mt-1 text-red-700 text-sm ">{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View className="flex-row justify-around mt-4">
            {[
              { name: "PERATURAN", icon: "document-text-outline", bgColor: "bg-purple-500", route: "/peraturan" },
              { name: "SOP", icon: "clipboard-outline", bgColor: "bg-pink-500", route: "/sop" },
              { name: "PPID", icon: "information-circle-outline", bgColor: "bg-indigo-500", route: "/ppid" },
              { name: "PENGADUAN", icon: "chatbubble-outline", bgColor: "bg-orange-400", route: "/pengaduan" },
            ].map((item, index) => (
              <TouchableOpacity key={index} className="items-center" onPress={() => router.push(item.route)}>
                <View className={`  bg-red-700 justify-center items-center rounded-full p-4 border border-red-800`}>
                  <Ionicons name={item.icon} size={35} color="#ffffff" />
                </View>
                <Text className="mt-1 text-red-700 text-sm ">{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View className="flex-row justify-around mt-4 mb-6">
            {[
              { name: "STATISTIK", icon: "stats-chart-outline", bgColor: "bg-teal-500", route: "/statistik" },
              { name: "LAYANAN", icon: "settings-outline", bgColor: "bg-cyan-500", route: "/layanan" },
              { name: "STACKHOLDER", icon: "people-outline", bgColor: "bg-lime-500", route: "/mitra" },
              { name: "APLIKASI", icon: "apps-outline", bgColor: "bg-gray-500", route: "/aplikasi" },
            ].map((item, index) => (
              <TouchableOpacity key={index} className="items-center" onPress={() => router.push(item.route)}>
                <View className={`  bg-red-700 justify-center items-center rounded-full p-4 border border-red-800`}>
                  <Ionicons name={item.icon} size={35} color="#ffffff" />
                </View>
                <Text className="mt-1 text-red-700 text-sm ">{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>

        </ImageBackground>



        <View className="my-2">
          <View className="flex-col items-start">
            <Text className=" text-xl font-bold mx-4 my-2 text-red-800">Informasi Tebaru</Text>
          </View>
          <Top10News />
        </View>


        {/**<View className="flex-row justify-around mt-6 mb-6">
        {[
          { name: "Pariwisata", icon: "earth-outline", bgColor: "bg-blue-300" },
          { name: "Berita", icon: "newspaper-outline", bgColor: "bg-red-300" },
          { name: "Penghargaan", icon: "trophy-outline", bgColor: "bg-yellow-300" },
          { name: "Promo", icon: "pricetag-outline", bgColor: "bg-green-300" },
        ].map((item, index) => (
          <View key={index} className="items-center">
            <View
              className={`w-16 h-16 ${item.bgColor} rounded-lg justify-center items-center`}
            >
              <Ionicons name={item.icon} size={30} color="#ffffff" />
            </View>
            <Text className="mt-2 text-gray-700">{item.name}</Text>
          </View>
        ))}
      </View> */}







        <View className=" mx-4 max-w-screen-sm mt-8 flex flex-col space-y-2">
          <ContentLoader
            speed={2}
            width={400}
            height={160}
            viewBox="0 0 400 160"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"

          >
            <Rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
            <Rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
            <Rect x="0" y="56" rx="3" ry="3" width="410" height="6" />
            <Rect x="0" y="72" rx="3" ry="3" width="380" height="6" />
            <Rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
            <Circle cx="20" cy="20" r="20" />
          </ContentLoader>


        </View>


        {/* Footer */}

      </ScrollView>


      <View className="flex flex-col items-center justify-center bg-white pt-3 pb-6 border-t border-red-800/25">
        <Text className="text-red-800 text-xs font-bold">BLU UPBU KELAS I DOMINE EDUARD OSOK - SORONG </Text>
        <Text className="text-red-800 text-xs">DIREKTORAT JENDERAL PERHUBUNGAN UDARA </Text>
        <Text className="text-red-800 text-xs">KEMENTERIAN PERHUBUNGAN</Text>
      </View>
    </View>
  );
}









const Top10News = () => {
  const firstTimeRef = useRef(true);
  const { data: dataTop10, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['top-10'],
    queryFn: async () => {
      try {
        const { data } = await post(`/mobile/api/portal/top-10`);
        return data;
      }
      catch (error) {
        throw new Error(error.response?.data?.message || error.message);
      }
    },
    //subscribed: isFocused,
  })





  useFocusEffect(useCallback(() => {
    if (firstTimeRef.current) {
      firstTimeRef.current = false;
      return;
    }
    refetch();
  }, [])
  );


  console.log(dataTop10);




  if (isLoading) {
    return (<ReanimatedCarousel
      {...{
        autoPlayInterval: 3000,
        autoPlayReverse: false,
        snapEnabled: true,
        vertical: false,
        width: window.width,
        loop: true,
      }}
      style={{ width: "100%" }}
      width={width * 0.8}
      height={width * 0.3}
      data={[1, 2, 3]}
      renderItem={({ item }) => (
        <View className="px-1.5">
          <ContentLoader
            speed={2}
            width={400}
            height={160}
            viewBox="0 0 400 160"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"

          >
            <Rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
            <Rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
            <Rect x="0" y="56" rx="3" ry="3" width="410" height="6" />
            <Rect x="0" y="72" rx="3" ry="3" width="380" height="6" />
            <Rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
            <Circle cx="20" cy="20" r="20" />
          </ContentLoader>
        </View>
      )}
    />)
  }

  if (isError) {
    return (
      <View>
        <Text style={{ color: 'red' }}>Terjadi error: {error.message}</Text>
        <Button title="Coba Lagi" onPress={refetch} />
      </View>
    );
  }



  return (<ReanimatedCarousel
    {...{
      autoPlay: true,
      autoPlayInterval: 3000,
      autoPlayReverse: false,
      snapEnabled: true,
      vertical: false,
      width: window.width,
      loop: true,
    }}
    style={{ width: "100%" }}
    width={width * 0.8}
    height={width * 0.4}
    //autoPlay={true}
    data={dataTop10}
    // scrollAnimationDuration={1000}
    renderItem={({ item }) => (
      <View className="px-1.5">

        <ImageBackground
          source={{ uri: item.image }}
          resizeMode="cover"
          className="rounded-lg overflow-hidden mx-1.5" // margin horizontal untuk jarak antar gambar
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          <View className="flex-1 justify-end p-4 bg-black/45 rounded-lg">
            <Text className="text-white text-lg font-bold">{item.title}</Text>
            <Text className=" text-white text-sm leading-4">{item.description}</Text>
          </View>
        </ImageBackground>
      </View>


    )}
  />
  )


}