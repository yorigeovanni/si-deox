import React, { useCallback, useState, useRef } from "react";
import { useRouter, useFocusEffect } from "expo-router";
import { Dimensions, View, Text, ImageBackground, Pressable, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native"
import ReanimatedCarousel from "react-native-reanimated-carousel";
import { useFindMany } from '@/services/portal/@default-query';
const { width, height } = Dimensions.get('window');



const baseURL = process.env.NODE_ENV === 'production' ? process.env.EXPO_PUBLIC_API_URL : 'http://10.8.0.2:4002';
const model = 'x_mobile_headline_news';
const selectedFields = {
  x_name: true,
  x_studio_description: true,
};
const DEFAULT_LIMIT = 10;



export default function HeadlineNews() {
  const router = useRouter();
  const firstTimeRef = useRef(true);
  const [limit, setLimit] = useState(DEFAULT_LIMIT);
  const [offset, setOffset] = useState(0);
  const [filter, setFilter] = useState([]);
  const { data, isLoading, isError, error, refetch } = useFindMany({
    model: model,
    fields: selectedFields,
    domain: filter,
    offset,
    limit
  });

  const totalData = data?.totalData ?? 0;
  const records = data?.records ?? [];
  const totalPages = data?.totalPages ?? 1;


  useFocusEffect(useCallback(() => {
    if (firstTimeRef.current) {
      firstTimeRef.current = false;
      return;
    }
    refetch();
  }, [])
  );





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
      <View className="flex-row items-center justify-between mt-6">
        <Text className=" text-xl font-bold mx-4 my-2 text-red-800">Informasi Terbaru</Text>
        <Pressable onPress={() => router.push('/portal/headline-news')}>
          <Text className=" text-lg mx-4 my-2 text-red-800">Selengkapnya</Text>
        </Pressable>
        
      </View>

      <ReanimatedCarousel
        {...{
          autoPlay: false,
          autoPlayInterval: 4000,
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
        data={records}
        // scrollAnimationDuration={1000}
        renderItem={({ item }) => (
          <Pressable className="px-1.5" onPress={() => router.push(`/portal/headline-news/${item.id}`)}>
            <ImageBackground
              source={{ uri: `${baseURL}/web/image?model=${model}&id=${item.id}&field=x_studio_gambar` }}
              resizeMode="cover"
              className="rounded-lg overflow-hidden mx-1.5"
              style={{
                width: '100%',
                height: '100%',
                position: 'relative'
              }}
            >
              <View style={{ flex: 1, justifyContent: 'flex-end' }}>

                <LinearGradient
                  colors={['rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0, 0.5)', 'transparent']}
                  start={{ x: 0, y: 1 }}
                  end={{ x: 0, y: 0 }}
                  style={{ height: '100%' }}
                >
                  <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>

                    <View className=" p-2 pt-6">
                      <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
                        {item.x_name}
                      </Text>
                      <Text style={{ color: '#fff', fontSize: 12 }}>
                        {item.x_studio_description}
                      </Text>
                    </View>

                  </View>
                </LinearGradient>



              </View>
            </ImageBackground>
          </Pressable>


        )}
      />
    </View>
  )


}