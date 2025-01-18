import React, { useState } from 'react';
import { View, Text, ScrollView, Dimensions, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
const screenWidth = Dimensions.get('window').width;




export default function RevenueReportScreen() {
  const router = useRouter();
  const [focusedRow, setFocusedRow] = useState(null);
  const [isSearchModalVisible, setSearchModalVisible] = useState(false);
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);



  // Data untuk grafik batang
  const barData = {
    labels: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        data: [10, 20, 25, 30, 50, 45, 55, 40, 35, 25, 20],
      },
    ],
  };




  // Data untuk tabel
  const tableData = [
    { id: "JAN", kehadiran: 32.6, count: 776, percent1: 85.09, percent2: 96.50, col3: 10, col4: 20, col5: 30, col6: 40, col7: 50, col8: 60, col9: 70, col10: 80 },
    { id: "FEB", kehadiran: 0, count: 786, percent1: 86.18, percent2: 92.57, col3: 15, col4: 25, col5: 35, col6: 45, col7: 55, col8: 65, col9: 75, col10: 85 },
    { id: "MAR", kehadiran: 0, count: 14, percent1: 1.54, percent2: 1.13, col3: 5, col4: 10, col5: 15, col6: 20, col7: 25, col8: 30, col9: 35, col10: 40 },
    { id: "APR", kehadiran: 0, count: 11, percent1: 1.21, percent2: 0.76, col3: 3, col4: 6, col5: 9, col6: 12, col7: 15, col8: 18, col9: 21, col10: 24 },
    { id: "MEI", kehadiran: 0, count: 854, percent1: 93.64, percent2: 91.54, col3: 50, col4: 60, col5: 70, col6: 80, col7: 90, col8: 100, col9: 110, col10: 120 },
    { id: "JUN", kehadiran: 0, count: 0, percent1: 0.0, percent2: 0.0, col3: 0, col4: 0, col5: 0, col6: 0, col7: 0, col8: 0, col9: 0, col10: 0 },
    { id: "JUK", kehadiran: 0, count: 854, percent1: 93.64, percent2: 91.54, col3: 55, col4: 65, col5: 75, col6: 85, col7: 95, col8: 105, col9: 115, col10: 125 },
    { id: "AGU", kehadiran: 0, count: 11, percent1: 1.21, percent2: 0.76, col3: 3, col4: 6, col5: 9, col6: 12, col7: 15, col8: 18, col9: 21, col10: 24 },
    { id: "SEP", kehadiran: 0, count: 854, percent1: 93.64, percent2: 91.54, col3: 50, col4: 60, col5: 70, col6: 80, col7: 90, col8: 100, col9: 110, col10: 120 },
    { id: "OKT", kehadiran: 0, count: 0, percent1: 0.0, percent2: 0.0, col3: 0, col4: 0, col5: 0, col6: 0, col7: 0, col8: 0, col9: 0, col10: 0 },
    { id: "NOV", kehadiran: 0, count: 854, percent1: 93.64, percent2: 91.54, col3: 55, col4: 65, col5: 75, col6: 85, col7: 95, col8: 105, col9: 115, col10: 125 },
  ];

  const openSearchDrawer = () => setSearchModalVisible(true);
  const closeSearchDrawer = () => setSearchModalVisible(false);

  const openFilterDrawer = () => setFilterModalVisible(true);
  const closeFilterDrawer = () => setFilterModalVisible(false);

  return (
    <ScrollView className={`flex-1 bg-white`}>

      {/** STATISTIK */}
      <Text className={`font-bold  mx-4 mt-6`}>A. STATISTIK KEHADIRAN DAN CUTI - TAHUN 2025</Text>
      <View className={`flex-row justify-around mt-2 mb-6`}>
        <View className={`items-center`}>
          <Text className={`text-2xl font-bold text-gray-800`}>125.89 JAM</Text>
          <Text className={`text-sm text-gray-500`}>HADIR</Text>
        </View>
        <View className={`items-center`}>
          <Text className={`text-2xl font-bold text-gray-800`}>2.768 JAM</Text>
          <Text className={`text-sm text-gray-500`}>TERLAMBAT</Text>
        </View>
        <View className={`items-center`}>
          <Text className={`text-2xl font-bold text-gray-800`}>0 JAM</Text>
          <Text className={`text-sm text-gray-500`}>ABSEN</Text>
        </View>
      </View>


      <View className={`flex-row justify-around mt-2 mb-6`}>
        <View className={`items-center`}>
          <Text className={`text-2xl font-bold text-gray-800`}>12 HARI</Text>
          <Text className={`text-sm text-gray-500`}>CUTI SISA</Text>
        </View>
        <View className={`items-center`}>
          <Text className={`text-2xl font-bold text-gray-800`}>12 HARI</Text>
          <Text className={`text-sm text-gray-500`}>CUTI TERSEDIA</Text>
        </View>
        <View className={`items-center`}>
          <Text className={`text-2xl font-bold text-gray-800`}>0 HARI</Text>
          <Text className={`text-sm text-gray-500`}>DIGUNAKAN</Text>
        </View>
      </View>

      <View className={`flex-row items-center mx-4`}>
        {/* Y-Axis (dummy) */}
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
      



      {/* Tabel dengan Kolom Tetap & Scroll */}
      <View className={`flex-row border border-gray-200 rounded-md overflow-hidden mx-4 mb-4`}>

        {/* Kolom Fixed (ID) */}
        <View className={`bg-gray-100 px-2`}>
          <Text className={`bg-gray-300 font-bold text-center p-2 border-b border-gray-200`}>
            BUL.
          </Text>
          {tableData.map((row) => (
            <Text key={row.id} className={`bg-gray-100 p-2 text-center text-sm text-gray-700 border-b border-gray-200`}>
              {row.id}
            </Text>
          ))}
        </View>

        {/* Scrollable Columns */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View>
            {/* Header Row */}
            <View className={`flex-row`}>
              <Text className={`p-2 font-bold text-center bg-gray-200 border border-gray-200 text-sm text-gray-800 w-28`}>
                KEHADIRAN
              </Text>
              <Text className={`p-2 font-bold text-center bg-gray-200 border border-gray-200 text-sm text-gray-800 w-28`}>
                TERLAMBAT
              </Text>
              <Text className={`p-2 font-bold text-center bg-gray-200 border border-gray-200 text-sm text-gray-800 w-28`}>
                ABSEN
              </Text>
              <Text className={`p-2 font-bold text-center bg-gray-200 border border-gray-200 text-sm text-gray-800 w-28`}>
                PERJADIN
              </Text>
              <Text className={`p-2 font-bold text-center bg-gray-200 border border-gray-200 text-sm text-gray-800 w-28`}>
                CUTI
              </Text>
              <Text className={`p-2 font-bold text-center bg-gray-200 border border-gray-200 text-sm text-gray-800 w-28`}>
                TOTAL
              </Text>
             
            </View>

            {/* Data Rows */}
            {tableData.map((row) => (
              <TouchableOpacity
                className='flex-row'
                key={row.id}
                style={[
                  //   focusedRow === row.id ? tw`bg-green-100` : null
                ]}
                onPress={() => setFocusedRow(row.id)}
              >
                <Text className={`p-2 text-center border-b border-gray-200 text-sm text-gray-700 w-28`}>
                  {row.kehadiran === 0 ? '-' : `${row.kehadiran} JAM`}
                </Text>
                <Text className={`p-2 text-center border-b border-gray-200 text-sm text-gray-700 w-28`}>
                  {row.count}
                </Text>
                <Text className={`p-2 text-center border-b border-gray-200 text-sm text-gray-700 w-28`}>
                  {row.percent1}
                </Text>
                <Text className={`p-2 text-center border-b border-gray-200 text-sm text-gray-700 w-28`}>
                  {row.percent2}
                </Text>
                <Text className={`p-2 text-center border-b border-gray-200 text-sm text-gray-700 w-28`}>
                  {row.col3}
                </Text>
                <Text className={`p-2 text-center border-b border-gray-200 text-sm text-gray-700 w-28`}>
                  {row.col4}
                </Text>
             
               
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>


      <Text className={`font-bold  mx-4 mt-6`}>B. CUTI PERSONIL - TAHUN 2025</Text>
      <View className={`flex-row justify-around mt-2 mb-6`}>
        <View className={`items-center`}>
          <Text className={`text-2xl font-bold text-gray-800`}>12 HARI</Text>
          <Text className={`text-sm text-gray-500`}>TERSEDIA</Text>
        </View>
        <View className={`items-center`}>
          <Text className={`text-2xl font-bold text-gray-800`}>12 HARI</Text>
          <Text className={`text-sm text-gray-500`}>TERPAKAI</Text>
        </View>
        <View className={`items-center`}>
          <Text className={`text-2xl font-bold text-gray-800`}>0 HARI</Text>
          <Text className={`text-sm text-gray-500`}>DIGUNAKAN</Text>
        </View>
      </View>

      <View className={`flex-row justify-around my-4`}>
        <View className={`items-center`}>
          <Text className={`text-2xl font-bold text-gray-800`}>1.056 PAX</Text>
          <Text className={`text-sm text-gray-500`}>PESAWAT DATANG</Text>
        </View>
        <View className={`items-center`}>
          <Text className={`text-2xl font-bold text-gray-800`}>2.768 PAX</Text>
          <Text className={`text-sm text-gray-500`}>PESAWAT BERANGKAT</Text>
        </View>
      </View>




      {/* Bar Chart dengan Y-Axis Tetap */}
      <Text className={`text-lg font-bold text-red-800 mx-4`}>PROGRESS HARIAN OPERASIONAL</Text>
      


      {/* Table Title & Actions */}
      <View className={`flex-row justify-between items-center mx-4 mb-4 mt-8`}>
        <Text className={`text-base font-bold text-gray-800`}>DATA MOVEMENT HARI INI - 12 JAN 2014</Text>

      </View>




    </ScrollView>
  );
}
