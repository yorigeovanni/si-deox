import React, { useCallback, useState, useRef, Fragment } from "react";
import { useRouter, useFocusEffect } from "expo-router";
import { Dimensions, View, Text, TouchableOpacity,Image, Button } from 'react-native';
import { classNames } from '@/utils';
import { Ionicons } from "@expo/vector-icons";


//import SwiperFlatList from 'react-native-swiper-flatlist';
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native"

// STATE MANAGEMENT
import { useDispatch, useSelector } from 'react-redux';



export default function InformasiTerkait() {
  const router = useRouter();
  const dispatch = useDispatch();



  return (<Fragment>
     <View className="  mx-4 max-w-screen-sm mt-8 flex flex-col space-y-2">
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

  </Fragment>);
}

