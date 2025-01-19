import { View, ScrollView, StatusBar, Platform } from 'react-native';
//import SwiperFlatList from 'react-native-swiper-flatlist';


import MainHeader from '@/components/ui/main-header';
import HeadlineNews from '@/components/ui/home/headline-news';
import HomeMenu from '@/components/ui/home/global-menu';
import InformasiTerkait from '@/components/ui/home/informasi-terkait';
import MainFooter from '@/components/ui/main-footer';




export default function RootIndex() {
  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle={Platform.OS === 'android' ? "light-content" : "dark-content"} translucent backgroundColor="#b91c1c" />
      <MainHeader />
      <ScrollView className="flex-1">
        <HomeMenu />
        <HeadlineNews />
        <InformasiTerkait />
      </ScrollView>
      <MainFooter />
    </View>
  );
}

