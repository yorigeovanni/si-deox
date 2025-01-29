import React, { Fragment } from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { BarChart } from 'react-native-chart-kit';

import InternalHeader from '@/components/internal/header';
import InternalPengumuman from '@/components/internal/pengumuman';
import InternalMenu from '@/components/internal/main-menu';

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
          subtitle={`Selamat Datang, ${'User'}`}
        />
        <ScrollView className="flex-1 bg-white">
        <InternalPengumuman/>
        <InternalMenu/>

        </ScrollView>
       
       {/** <View className="flex-1 bg-white">
            <Text className="text-2xl font-bold text-red-800 mt-4 mx-4">APLIKASI PER UNIT KERJA</Text>
            <View className=" w-full items-start py-4 border-b border-gray-200">
                <FlatList
                    horizontal
                    data={listMenu}
                    renderItem={renderMenuItem}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={{ paddingHorizontal: 16 }}
                    showsHorizontalScrollIndicator={false}
                />
            </View>

            <ScrollView chorizontal showsHorizontalScrollIndicator={false}>

                   <View className={`flex-row items-center mx-4`}>
                  
                     <View className={`justify-between h-56 py-2`}>
                       <Text className={`text-xs text-gray-800 text-right`}>500 JAM</Text>
                       <Text className={`text-xs text-gray-800 text-right`}>200 JAM</Text>
                       <Text className={`text-xs text-gray-800 text-right`}>100 JAM</Text>
                       <Text className={`text-xs text-gray-800 text-right`}>10 JAM</Text>
                       <Text className={`text-xs text-gray-800 text-right`}>0 JAM</Text>
                     </View>
             
                     <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                       <BarChart
                         data={barData}
                         width={screenWidth * 1.5}
                         height={220}
                         yAxisLabel="$"
                         yAxisSuffix="M"
                         chartConfig={{
                           backgroundColor: '#ffffff',
                           backgroundGradientFrom: '#ffffff',
                           backgroundGradientTo: '#ffffff',
                           decimalPlaces: 0,
                           color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
                           labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                           style: {
                             borderRadius: 16,
                           },
                           barPercentage: 0.5,
                         }}
                         className={`ml-2 rounded-xl`}
                       />
                     </ScrollView>
                   </View>
                   
             

            </ScrollView>
        </View> */}
      </Fragment>
       
    );
}
