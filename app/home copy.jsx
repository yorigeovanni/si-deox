
import { Fragment } from "react";
import { ScrollView } from 'react-native';
import {BaseColor, useTheme, useFont} from '@/config';
import { View, Text, TouchableOpacity, Modal, Dimensions } from "react-native";
//import SwiperFlatList from 'react-native-swiper-flatlist';

import MainHeader from '@/components/main-header';
import PromoAtas from '@/components/portal/promo-atas';
import HeadlineNews from '@/components/portal/headline-news';
import HomeMenu from '@/components/portal/menu';
import InformasiTerkait from '@/components/portal/informasi-terkait';
import MainFooter from '@/components/main-footer';




export default function RootIndex() {
  return (
    <Fragment>
      <MainHeader />
      <ScrollView className="flex-1 bg-white">
      <PromoAtas />
        <HomeMenu />
        <HeadlineNews />
        <InformasiTerkait />
      </ScrollView>
      <MainFooter />
    </Fragment>
  );
}

