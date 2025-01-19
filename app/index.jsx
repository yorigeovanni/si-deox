
import { Fragment } from "react";
import { ScrollView } from 'react-native';
//import SwiperFlatList from 'react-native-swiper-flatlist';


import MainHeader from '@/components/ui/main-header';
import HeadlineNews from '@/components/ui/home/headline-news';
import HomeMenu from '@/components/ui/home/global-menu';
import InformasiTerkait from '@/components/ui/home/informasi-terkait';
import MainFooter from '@/components/ui/main-footer';




export default function RootIndex() {
  return (
    <Fragment>
      <MainHeader />
      <ScrollView className="flex-1">
        <HomeMenu />
        <HeadlineNews />
        <InformasiTerkait />
      </ScrollView>
      <MainFooter />
    </Fragment>
  );
}

