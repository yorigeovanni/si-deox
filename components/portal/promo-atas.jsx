import React, { useCallback, useState, useRef } from "react";
import { useRouter, useFocusEffect } from "expo-router";
import { Dimensions, View, Text, ImageBackground, Pressable, TouchableOpacity } from "react-native";
import { Button } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import ContentLoader, { Rect, Circle } from "react-content-loader/native";
import ReanimatedCarousel from "react-native-reanimated-carousel";
import { Ionicons } from "@expo/vector-icons"; // Icon library

import { useFindMany } from "@/services/portal/@default-query";

const { width, height } = Dimensions.get("window");
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

export default function HeadlineNews() {
  const router = useRouter();
  const firstTimeRef = useRef(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(DEFAULT_LIMIT);
  const [offset, setOffset] = useState(0);
  const [filter, setFilter] = useState([]);
  const [listData, setListData] = useState([]);

  const { data, isLoading, isError, error, refetch } = useFindMany({
    model: model,
    fields: selectedFields,
    domain: filter,
    offset,
    limit,
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
      <ReanimatedCarousel
        autoPlayInterval={3000}
        autoPlayReverse={false}
        snapEnabled
        vertical={false}
        width={width}
        loop
        style={{ width: "100%" }}
        height={width * 0.3}
        data={[1, 2, 3]}
        renderItem={({ item }) => (
          <View className="px-1.5">
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
        )}
      />
    );
  }

  // 2. Error State - UI/UX yang lebih rapi
  if (isError) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#fef2f2", // Latar merah muda
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
        autoPlayInterval={4000}
        autoPlayReverse={false}
        snapEnabled
        vertical={false}
        width={width}
        loop
        style={{ width: "100%" }}
        height={width * 0.3}
        data={records}
        renderItem={({ item }) => (
          <Pressable
            className="px-1.5"
            onPress={() => router.push(`/portal/promo-atas/${item.id}`)}
          >
            <ImageBackground
              source={{
                uri: `${baseURL}/web/image?model=${model}&id=${item.id}&field=x_studio_image`,
              }}
              resizeMode="cover"
              className="rounded-lg overflow-hidden mx-1.5"
              style={{
                width: "100%",
                height: "100%",
                position: "relative",
              }}
            >
              <View style={{ flex: 1, justifyContent: "flex-end" }}>
                <LinearGradient
                  colors={["rgba(0, 0, 0, 0.8)", "rgba(0, 0, 0, 0.5)", "transparent"]}
                  start={{ x: 0, y: 1 }}
                  end={{ x: 0, y: 0 }}
                  style={{ height: "50%" }}
                >
                  <View style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
                    <View className="p-2 pt-6">
                      <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
                        {item.x_name}
                      </Text>
                      <Text style={{ color: "#fff", fontSize: 12 }}>
                        {item.x_studio_description}
                      </Text>
                    </View>
                  </View>
                </LinearGradient>
              </View>
            </ImageBackground>
          </Pressable>
        )}
      />
    </View>
  );
}
