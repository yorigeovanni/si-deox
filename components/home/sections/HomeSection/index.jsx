import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useState, useCallback, Fragment } from "react";
import { useRouter, useFocusEffect } from "expo-router";
import { BarChart } from "react-native-chart-kit";
import IconBaru from "@/assets/images/bg.jpg";
//import homeQueries from "@/hook-queries/portal/tentang-kami/homeQueries";
const screenWidth = Dimensions.get("window").width;

export const HomeSection = ({ quickStats, quickLinks }) => {
 // const { homeDashboard } = homeQueries();
  useFocusEffect(
 //   useCallback(() => {
  //    homeDashboard.refetch();
 //   }, [])
  );

  const barData = {
    labels: [
      "1",
      "2",
      "3",
      "APR",
      "MEI",
      "JUN",
      "JUL",
      "AGU",
      "SEP",
      "OKT",
      "NOV",
      "DES",
    ],
    datasets: [
      {
        data: [998, 998, 998, 998, 998, 998, 998, 998, 998, 998, 998, 998, 12],
      },
    ],
  };

  if (true) {
    return <></>;
  }

 

  //console.log(JSON.stringify(barData, null, 2));

  return (
    <>
      {/* Cover Image */}
      <View className="relative">
        <Image source={IconBaru} className="w-full h-48" resizeMode="cover" />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.7)"]}
          className="absolute inset-0"
        />
        <View className="absolute bottom-4 left-4 right-4">
          <Text className="text-white text-2xl font-bold">sdasdasdasdas</Text>
          <Text className="text-white/90">sdasdasd asdasd asdasdas asdas</Text>
        </View>
      </View>

      <View className="px-4 py-6 bg-white">
        <View className="flex-row justify-between">
          {quickStats.map((stat, index) => (
            <View key={index} className="items-center">
              <View
                className="w-12 h-12 rounded-full items-center justify-center mb-2"
                style={{ backgroundColor: `${stat.color}20` }}
              >
                <Ionicons name={stat.icon} size={24} color={stat.color} />
              </View>
              <Text className="text-xl font-bold">{stat.value}</Text>
              <Text className="text-sm text-gray-600 text-center">
                {stat.label}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Quick Links */}
      <View className="px-4 py-6 bg-white mt-2">
        <Text className="text-lg font-bold mb-4">Akses Cepat</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <BarChart
            data={barData}
            width={screenWidth * 1.5}
            height={220}
            yAxisLabel="Rp."
            yAxisSuffix="M"
            chartConfig={{
              backgroundColor: "#ffffff",
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#ffffff",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              barPercentage: 2,
            }}
            className={`ml-2 rounded-xl`}
          />
        </ScrollView>
      </View>
    </>
  );
};
