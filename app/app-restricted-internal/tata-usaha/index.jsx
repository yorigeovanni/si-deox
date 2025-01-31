import React, { Fragment } from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { BarChart } from 'react-native-chart-kit';

import InternalHeader from '@/components/internal/header';
import InternalPengumuman from '@/components/internal/card-monitoring-tekops';
import MenuInternal from '@/components/internal/menu';

const screenWidth = Dimensions.get('window').width;


export default function AmcIndex() {
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useDispatch();
    const { listMenu, basePath } = useSelector((state) => state.aplikasiInternal);



  // Data untuk grafik batang
  const barData = {
    labels: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        data: [10, 20, 25, 30, 50, 45, 55, 40, 35, 25, 20],
      },
    ],
  };

    const renderMenuItem = ({ item }) => {
        return (
            <TouchableOpacity
                className="items-center mr-10"
                onPress={() => router.push(`${basePath}/${item.path}`)}
            >
                <View className="bg-red-700 justify-center items-center rounded-full p-4 border border-red-800">
                    <Ionicons name={item.icon} size={35} color="#ffffff" />
                </View>
                <Text className="mt-1 text-red-800 text-sm">{item.label}</Text>
            </TouchableOpacity>
        );
    };

    return (
      <Fragment>
        <InternalHeader 
        backPath='/app-restricted-internal'
        subtitle='SUBBAGIAN TATA USAHA'
        />
        <ScrollView className="flex-1 bg-white">
        <InternalPengumuman/>
        <MenuInternal
                  basePath={'/app-restricted-internal/tata-usaha'}
                  target="menuTataUsaha"
                />

        </ScrollView>
      </Fragment>
       
    );
}
