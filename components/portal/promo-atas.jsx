import React, { useRef, useState, useCallback } from 'react';
import { useRouter, useFocusEffect } from "expo-router";
import { Animated } from 'react-native';
import { StyleSheet } from 'react-native';
import {  useTheme } from '@/config';
import * as Utils from '@/utils';
import { useTranslation } from 'react-i18next';
import { Image } from '@/components';
import Swiper from 'react-native-swiper';
import { Placeholder, Loader, PlaceholderLine } from 'rn-placeholder';
import { useFindMany } from "@/services/portal/@default-query";

const deltaY = new Animated.Value(0);
const baseURL =
  process.env.NODE_ENV === "production"
    ? process.env.EXPO_PUBLIC_API_URL
    : "http://10.8.0.2:4002";

const model = "x_mobile_top_banner";
const selectedFields = {
  x_name: true,
  x_studio_description: true,
};
const DEFAULT_LIMIT = 10;



export default function AirportIndex() {
  const { colors } = useTheme();
  const { t } = useTranslation();
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
    limit,
  });


  const records = data?.records ?? [];
  useFocusEffect(
    useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false;
        return;
      }
      refetch();
    }, [])
  );


    if (isLoading || isError) {
      return (
        <Placeholder Animation={Loader}>
          <PlaceholderLine style={{height: '98%'}} />
        </Placeholder>
      );
    }

    
    return (
      <Swiper
        dotStyle={{
          backgroundColor: colors.text,
        }}
        activeDotColor={colors.primary}
        paginationStyle={styles.contentPage}
        removeClippedSubviews={false}
        autoplay={true}
        autoplayTimeout={2}>
        {records?.map((item, index) => {
          return (
            <Image
              key={`top_atas-${index}`}
              source={{uri: `${baseURL}/web/image?model=${model}&id=${item.id}&field=x_studio_image`}}
              style={{width: '100%', height: '100%'}}
            />
          );
        })}
      </Swiper>
    );


}









const styles = StyleSheet.create({
  imageBackground: {
    height: 140,
    width: '100%',
    position: 'absolute',
  },
  contentPage: {
    bottom: 50,
  },
  searchForm: {
    marginHorizontal: 15,
    padding: 10,
    borderRadius: 10,
    borderWidth: 0.5,
    shadowOffset: {width: 1.5, height: 1.5},
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 1,
  },
  lineForm: {
    width: 1,
    height: '100%',
    margin: 10,
  },
  serviceContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginVertical: 10,
  },
  serviceItem: {
    alignItems: 'center',
    marginBottom: 15,
  },
  serviceCircleIcon: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    marginBottom: 5,
  },
  contentPopular: {
    marginHorizontal: 20,
    marginBottom: 15,
  },
  promotionBanner: {
    height: Utils.scaleWithPixel(100),
    width: '100%',
    marginTop: 10,
  },
  popularItem: {
    width: Utils.scaleWithPixel(255),
    height: Utils.scaleWithPixel(140),
    borderRadius: 8,
  },
  menuIcon: {
    width: 40,
    height: 40,
    position: 'absolute',
    bottom: 15,
    right: 15,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
