import React, { useCallback, useState, useRef } from "react";
import { useRouter, useNavigation, usePathname, useFocusEffect } from "expo-router";
import { Dimensions, View, ScrollView, Text, TouchableOpacity, ImageBackground, StatusBar, Platform, Image, Button } from 'react-native';
import { classNames } from '@/utils';
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from '@tanstack/react-query';


import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native"
import ReanimatedCarousel from "react-native-reanimated-carousel";
import createRequest from '@/core/api';
const { post } = createRequest();
const { width, height } = Dimensions.get('window');




export default function HeadlineNews () {
  const firstTimeRef = useRef(true);
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['home-headlineNews'],
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


  console.log(data);




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



  return (
  <View className="my-2">
            <View className="flex-col items-start">
              <Text className=" text-xl font-bold mx-4 my-2 text-red-800">Informasi Terbaru</Text>
            </View>
            
            <ReanimatedCarousel
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
    data={data}
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
  </View>
  )


}