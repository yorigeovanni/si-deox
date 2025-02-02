import React, { Fragment, useRef, useCallback, useState } from 'react';
import { useLocalSearchParams, useFocusEffect } from 'expo-router';
import { View, Text, ActivityIndicator, Modal, Image, TouchableOpacity } from 'react-native';
import WebView from 'react-native-webview';
import Header from '@/components/portal/header';
import Footer from '@/components/portal/footer';
import { useFindOne } from '@/services/portal/@default-query';
import { LinearGradient } from 'expo-linear-gradient';

// 1. Import dayjs + plugin
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import relativeTime from 'dayjs/plugin/relativeTime';

// 2. Extend plugin
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);

const baseURL = process.env.NODE_ENV === 'production' ? process.env.EXPO_PUBLIC_API_URL : 'http://10.8.0.2:4002';
const model = 'x_mobile_headline_news';
const selectedFields = {
  x_name: true,
  x_studio_gambar: true,
  x_studio_description: true,
  write_date: true,
  write_uid: {
    fields: {
      display_name: true
    }
  }
};

export default function HeadlineNews() {
  const { id_record } = useLocalSearchParams();
  const firstTimeRef = useRef(true);
  const [loadingWebView, setLoadingWebView] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const { data, isLoading, isError, error, refetch } = useFindOne({
    model: model,
    fields: selectedFields,
    domain: [['id', '=', id_record]]
  });


  // 3. Helper untuk ubah UTC -> Lokal & relatif
  const getRelativeDate = (utcDateString) => {
    // Pastikan data.write_date bukan null/undefined
    if (!utcDateString) return '';

    // dayjs menebak timezone device. Anda bisa mengganti ke zona spesifik misalnya 'Asia/Jakarta'.
    // Contoh: .tz('Asia/Jakarta')
    const localDate = dayjs.utc(utcDateString).local();
    // Bisa juga pakai .tz(dayjs.tz.guess()) jika perlu dayjs timezone

    // "fromNow" akan menghasilkan string seperti "2 hours ago" (default English)
    // Untuk bahasa Indonesia, dayjs membutuhkan konfigurasi locale 
    // (dayjs.locale('id'), lalu plugin relativeTime dengan locale "id")
    return localDate.fromNow();
  };

  // 4. Konversi write_date jadi relative time
  const relativeDate = getRelativeDate(data?.write_date);


  useFocusEffect(
    useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false;
        return;
      }
      refetch();
    }, [])
  );

  const handleOnMessage = useCallback((event) => {
    const { data } = event.nativeEvent;
    let payload;
    try {
      payload = JSON.parse(data);
    } catch (error) {
      // Jika data bukan JSON, cek manual
      if (data === 'PAGE_LOADED') {
        setLoadingWebView(false);
      }
      return;
    }

    if (payload) {
      if (payload.type === 'PAGE_LOADED') {
        setLoadingWebView(false);
      } else if (payload.type === 'IMG_CLICKED') {
        // Tampilkan modal + set imageUrl
        console.log(`${baseURL}${payload.url}`)
        setImageUrl(`${baseURL}${payload.url}`);
        setShowModal(true);
      }
    }
  }, []);



  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View>
        <Text>ERROR...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <Header
        title={'HUMAS - DEO AIRPORT'}
        isBack={true}
        // Contoh menampilkan local date + relative
        subtitle={`${relativeDate} - ${data?.write_uid?.display_name}`}
      />


      <Modal visible={showModal} transparent={false}>
        <View style={{ flex: 1, backgroundColor: 'black', justifyContent: 'center' }}>
          <TouchableOpacity
            style={{ position: 'absolute', top: 50, right: 20, zIndex: 2 }}
            onPress={() => setShowModal(false)}
          >
            <Text style={{ color: 'white', fontSize: 18 }}>Tutup</Text>
          </TouchableOpacity>

          {imageUrl && (
            <Image
              source={{ uri: imageUrl }}
              resizeMode="contain"
              style={{ width: '100%', height: '100%' }}
            />
          )}
        </View>
      </Modal>
      <View className=" bg-white">
        <Image
          style={{
            width: '100%',

            position: 'relative'
          }}
          className=' h-48'
          source={{ uri: `${baseURL}/web/image?model=${model}&id=${id_record}&field=x_studio_gambar` }}
        />

        <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          <LinearGradient
            colors={['rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0, 0.5)', 'transparent']}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
            style={{ height: '100%' }}
          >
            <View className=" p-2 pt-6">
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
                {data?.x_name}
              </Text>
              <Text style={{ color: '#fff', fontSize: 12 }}>
              {data?.x_studio_description}
              </Text>
            </View>
          </LinearGradient>

        </View>

      </View>
      <View className="flex-1 mx-2 bg-white">
        {loadingWebView && (
          <View
            className="bg-white"
            style={{ position: 'absolute', zIndex: 1, width: '100%', height: '100%', justifyContent: 'center' }}
          >
            <ActivityIndicator size="large" color="#000" />
          </View>
        )}

        <WebView
          originWhitelist={['*']}
          source={{ uri: `${baseURL}/mobile/api/portal/content/headline-news/${id_record}` }}
          injectedJavaScript={`
            document.body.style.overflow = 'hidden';
            const style = document.createElement('style');
            style.innerHTML = \`::-webkit-scrollbar { display: none; }\`;
            document.head.appendChild(style);
            true;
          `}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          onMessage={handleOnMessage}
        />
      </View>
      <Footer />
    </View>
  );
}
