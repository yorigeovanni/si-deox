import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Animated, ScrollView, Share, View, Alert, Linking, TouchableOpacity, Platform, StyleSheet, Dimensions } from 'react-native';
import WebView from 'react-native-webview';
import { BaseColor, useTheme, Images, BaseStyle } from '@/config';
import { Header, Image, SafeAreaView, Text, Icon } from '@/components';
import { useTranslation } from 'react-i18next';
import * as Utils from '@/utils';
import { Placeholder, PlaceholderLine, Progressive, PlaceholderMedia } from 'rn-placeholder';
import { useLocalSearchParams, useFocusEffect, useRouter } from 'expo-router';
import { useFindOne } from '@/services/portal/@default-query';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import relativeTime from 'dayjs/plugin/relativeTime';



dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);

const height = Dimensions.get('window').height;
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



const SearchHistoryView = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const scrollY = useRef(new Animated.Value(0)).current;
  const { id_record } = useLocalSearchParams();
  const { colors } = useTheme();
  const firstTimeRef = useRef(true);
  const [loadingWebView, setLoadingWebView] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const [heightHeader, setHeightHeader] = useState(Utils.heightHeader());
  const [loading, setLoading] = useState(false);
  const [like, setLike] = useState(false);

  const { data, isLoading, isError, error, refetch } = useFindOne({
    model: model,
    fields: selectedFields,
    domain: [['id', '=', id_record]]
  });





  const [product, setProduct] = useState({
    address: '99 Charing Cross Crossing',
    author: { image: 45, level: 'Developer', name: 'Wem' },
    description:
      'Donec sollicitudin molestie malesuada. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vivamus magna justo,lacinia eget consectetur sed, convallis at tellus...',
    distance: '15 Km',
    email: 'liststar@passionui.com',
    favorite: true,
    gallerys: [{ full: 36 }, { full: 27 }, { full: 28 }, { full: 29 }],
    id: 1,
    image: 36,
    location: { latitude: 40.738119, longitude: -73.98599 },
    numberRate: 340,
    phone: '171-615-0225',
    price: '$6.99',
    promotion: 'Free Shipping',
    rate: 4.5,
    rateStatus: 'Very Good',
    status: 'Opening',
    subtitle: 'Drink',
    title: 'Exotic Eats',
    website: 'www.passionui.com',
  });



  const headerBackgroundColor = scrollY.interpolate({
    inputRange: [0, 140],
    outputRange: [BaseColor.whiteColor, colors.text],
    extrapolate: 'clamp',
    useNativeDriver: true,
  });

  const headerImageOpacity = scrollY.interpolate({
    inputRange: [0, 250 - heightHeader - 20],
    outputRange: [1, 0],
    extrapolate: 'clamp',
    useNativeDriver: true,
  });

  const heightViewImg = scrollY.interpolate({
    inputRange: [0, 250 - heightHeader],
    outputRange: [250, heightHeader],
    useNativeDriver: true,
  });

  const getRelativeDate = (utcDateString) => {
    if (!utcDateString) return '';
    const localDate = dayjs.utc(utcDateString).local();
    return localDate.fromNow();
  };

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
        console.log(`${baseURL}${payload.url}`);
        setImageUrl(`${baseURL}${payload.url}`);
        setShowModal(true);
      }
    }
  }, []);



  const renderBanner = useCallback(() => {
    if (isLoading) {
      return (
        <Placeholder Animation={Progressive}>
          <PlaceholderMedia style={{ width: '100%', height: '100%' }} />
        </Placeholder>
      );
    }
    return (
      <Image style={{ width: '100%', height: '100%' }} source={{ uri: `${baseURL}/web/image?model=${model}&id=${id_record}&field=x_studio_gambar` }} />
    );
  }, [isLoading, id_record]);




  const renderLike = () => {
    return (
      <TouchableOpacity>
        {like ? (
          <Icon name="heart" color={colors.primaryLight} solid size={18} />
        ) : (
          <Icon name="heart" color={colors.primaryLight} size={18} />
        )}
      </TouchableOpacity>
    );
  };



  const renderContent = useCallback(() => {
    if (isLoading) {
      return (
        <View style={{ ...styles.content, marginTop: 30 }}>
          <Placeholder Animation={Progressive}>
            {[...Array(12)].map((_, index) => (
              <PlaceholderLine
                key={index}
                style={{ width: '90%', height: 20, marginTop: 10 }}
              />
            ))}
          </Placeholder>
        </View>
      );
    }

    return (
      <View style={styles.content}>
        {/* Informasi di atas WebView */}
        <View
          style={[
            styles.boxInfo,
            {
              backgroundColor: colors.card,
              shadowColor: colors.border,
              borderColor: colors.border,
            },
          ]}
        >
          <View style={{ flex: 1 }}>
            <Text title1 semibold numberOfLines={1}>
              {data.x_name}
            </Text>
            <View style={styles.contentStatus}>
              <Text caption2 accentColor medium>
                {dayjs(data.write_date).tz('Asia/Jakarta').format('DD MMM YYYY')}
              </Text>
              <View style={styles.dot} />
              <Text caption2 grayColor style={{ flex: 1 }} numberOfLines={1}>
                {data.write_uid.display_name}
              </Text>
            </View>
            <View style={styles.contentStatus}>
              <TouchableOpacity
                style={[styles.tagRate, { backgroundColor: colors.primaryLight }]}
              >
                <Icon name="star" size={10} color={BaseColor.whiteColor} solid />
                <Text caption2 whiteColor semibold style={{ marginLeft: 4 }}>
                  {product.rate}
                </Text>
              </TouchableOpacity>
              <View style={styles.dot} />
              <Text caption2 numberOfLines={1}>
                BANDARA DEO
              </Text>
              <View style={styles.dot} />
              <Text caption2 numberOfLines={1}>
                # BLU INFO
              </Text>
            </View>
          </View>

          <View style={styles.boxContentLeft}>
            <View
              style={[
                styles.promotionTag,
                { backgroundColor: colors.primary + '4D' },
              ]}
            >

            </View>
            {renderLike()}
          </View>
        </View>

        {/* WebView di dalam View dengan ketinggian tertentu */}
        <View style={[styles.boxInfo2]}>
          <WebView
            style={{ flex: 1 }}
            originWhitelist={['*']}
            source={{
              uri: `${baseURL}/mobile/api/portal/content/headline-news/${id_record}`,
            }}
            // Ubah overflow jadi auto atau hapus agar bisa scroll
            injectedJavaScript={`
              document.body.style.overflow = 'auto';
              const style = document.createElement('style');
              style.innerHTML = '::-webkit-scrollbar { display: none; }';
              document.head.appendChild(style);
              true;
            `}
            scrollEnabled={true}
            showsVerticalScrollIndicator={true}
            showsHorizontalScrollIndicator={false}
            onMessage={handleOnMessage}
          />
        </View>
      </View>
    );
  }, [isLoading, data]);





  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <Header title={product?.title ?? ''} />
      <Animated.View
        style={[
          styles.headerImageStyle,
          {
            opacity: headerImageOpacity,
            height: heightViewImg,
          },
        ]}
      >
        {renderBanner()}
      </Animated.View>

      {/* Header overlay (posisi absolute) */}
      <Animated.View style={[styles.headerStyle, { position: 'absolute' }]}>
        <Header
          title=""
          renderLeft={() => (
            <Animated.Image
              resizeMode="contain"
              style={[
                styles.icon,
                {
                  backgroundColor: '#991B1B',
                  tintColor: headerBackgroundColor,
                  // color: '#ffffff',
                  padding: 4,
                  borderRadius: 50,
                },
              ]}
              source={Images.back}
            />
          )}
          renderRightSecond={() => (
            <View style={styles.iconContent}>
              <Animated.Image
                resizeMode="contain"
                style={[
                  styles.icon,
                  {
                    tintColor: headerBackgroundColor,
                  },
                ]}
                source={Images.gallery}
              />
            </View>
          )}
          renderRight={() => (
            <View style={styles.iconContent}>
              <Animated.Image
                resizeMode="contain"
                style={[
                  styles.icon,
                  {
                    tintColor: headerBackgroundColor,
                  },
                ]}
                source={Images.share}
              />
            </View>
          )}
          onPressLeft={() => {
            router.back();
          }}
          onPressRightSecond={() => {
            // navigation.navigate('PreviewImage', { gallery: product.gallerys, });
            console.log('Gallery pressed');
          }}
        />
      </Animated.View>

      <SafeAreaView style={BaseStyle.safeAreaView} edges={['left', 'right']}>
        {/* ScrollView parent di-disable */}
        <ScrollView
          scrollEnabled={false} // <--- MATIKAN SCROLL PARENT
          overScrollMode={'never'}
          scrollEventThrottle={16}
          onContentSizeChange={() => {
            setHeightHeader(Utils.heightHeader());
          }}
        // onScroll di sini sudah tidak akan berpengaruh lagi
        >
          {/* Bagian jarak kosong untuk parallax (opsional) */}
          <View style={{ height: 170 - heightHeader }} />
          {renderContent()}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default SearchHistoryView;





const styles = StyleSheet.create({
  headerStyle: {
    height: 'auto',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerImageStyle: {
    height: 250,
    width: '100%',
    top: 0,
    alignSelf: 'center',
    position: 'absolute',
    paddingBottom: 20,
  },
  iconContent: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BaseColor.dividerColor,
  },
  content: {
    paddingHorizontal: 20,
  },
  icon: {
    width: 24,
    height: 24,
  },
  contentStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: BaseColor.grayColor,
    marginHorizontal: 10,
  },
  tagRate: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  aboutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  contentIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lineSpace: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  boxInfo: {
    padding: 10,
    height: 120,
    width: '100%',
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 0.5,
    shadowOffset: { width: 1.5, height: 1.5 },
    shadowOpacity: 1.0,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boxInfo2: {
    height: height - 350, // Contoh ketinggian. Sesuaikan sesuai kebutuhan Anda
    width: '100%',
  },
  boxContentLeft: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  promotionTag: {
    borderRadius: 7,
    height: 14,
    paddingHorizontal: 7,
  },
});
