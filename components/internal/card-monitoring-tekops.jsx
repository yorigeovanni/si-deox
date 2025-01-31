import React, { useCallback, useState, useRef } from "react";
import { useRouter, useFocusEffect } from "expo-router";
import { Dimensions, View, Text, Pressable, TouchableOpacity } from "react-native";
import { Code } from "react-content-loader/native";
import ReanimatedCarousel from "react-native-reanimated-carousel";
import { Ionicons } from "@expo/vector-icons";
import { useFindMany } from "@/services/internal/@default-query";
const { width, height } = Dimensions.get("window");
const baseURL = process.env.NODE_ENV === "production" ? process.env.EXPO_PUBLIC_API_URL : "http://10.8.0.2:4002";



export default function MonitoringTekops() {
  const router = useRouter();
  const firstTimeRef = useRef(true);
  const { data, isLoading, isError, error, refetch } = useFindMany({
    pathname : '/mobile/api/internal/monitoring/tekops',
    params : {}
  });

  // Data yang diambil
  const records = data?.records ?? [];

  // Fokus effect untuk refresh data ketika screen di-revisit
  useFocusEffect(
    useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false;
        return;
      }
      refetch();
    }, [])
  );

  // 1. Loading State
  if (isLoading) {
    return (
      <View className="pt-8 px-8">
        <Code
          speed={1}
          width={400}
          height={160}
          viewBox="0 0 400 160"
          backgroundColor="#F3F4F6"
          foregroundColor="#D1D5DB"
        >
        </Code>
      </View>
    );
  }

  // 2. Error State - UI/UX yang lebih rapi
  if (isError) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#fef2f2",
          alignItems: "center",
          justifyContent: "center",
          padding: 16,
        }}
      >
        {/* Ikon Peringatan */}
        <Ionicons name="warning-outline" size={64} color="#b91c1c" />
        {/* Judul / Pesan Error */}
        <Text
          style={{
            color: "#b91c1c",
            fontWeight: "bold",
            fontSize: 20,
            marginTop: 16,
          }}
        >
          Terjadi Error
        </Text>
        {/* Detail pesan error */}
        <Text
          style={{
            color: "#b91c1c",
            fontSize: 14,
            marginTop: 8,
            textAlign: "center",
          }}
        >
          {error?.message || "Mohon periksa koneksi atau coba lagi nanti."}
        </Text>
        {/* Tombol Coba Lagi */}
        <TouchableOpacity
          onPress={refetch}
          style={{
            marginTop: 20,
            backgroundColor: "#b91c1c",
            paddingHorizontal: 20,
            paddingVertical: 12,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "600", fontSize: 16 }}>
            Coba Lagi
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  // 3. State Normal (Tidak Error, Tidak Loading)
  return (
    <View className="my-4">
      <ReanimatedCarousel
        autoPlay
        autoPlayInterval={5000}
        autoPlayReverse={false}
        snapEnabled
        vertical={false}
        width={width}
        loop
        style={{ width: "100%" }}
        height={width * 0.5}
        data={records}
        renderItem={({ item }) => (
          <View style={{ height: width * 0.5 }} className=" p-4 flex  items-center justify-center">
            <View style={{ height: width * 0.48, width: "100%" }} className=" flex-col p-2  border border-gray-700 rounded-lg bg-gray-800">
              <Text className="text-white font-bold text-lg">{item.title}</Text>
              <Text className="text-white text-sm leading-4">{item.subtitle}</Text>

              <View className="flex-row items-center justify-between mt-4">  
                {item.data?.map((child, index_child)=>{
                  return (<View key={index_child} className="flex-col items-center">
                    <Text className="text-white text-lg font-bold">{child.title}</Text>
                    <Text className="text-white text-2xl font-bold">{child.value}</Text>
                    </View>)
                })}
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}
