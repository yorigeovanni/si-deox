import React, { useCallback, useState, useRef } from "react";
import { useRouter, useFocusEffect } from "expo-router";
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons"; 
import { useFindMany } from '@/services/portal/@default-query';
import { Placeholder, Progressive, PlaceholderMedia } from 'rn-placeholder';
import * as Utils from '@/utils';
import { Text, Card } from '@/components';


const baseURL = process.env.NODE_ENV === 'production' ? process.env.EXPO_PUBLIC_API_URL : 'http://10.8.0.2:4002';
const model = 'x_mobile_headline_news';
const selectedFields = {
  x_name: true,
  x_studio_description: true,
};
const DEFAULT_LIMIT = 10;



export default function HeadlineNews() {
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
    limit
  });

  const records = data?.records ?? [];


  useFocusEffect(useCallback(() => {
    if (firstTimeRef.current) {
      firstTimeRef.current = false;
      return;
    }
    refetch();
  }, [])
  );


  if (isLoading) {
    return (<FlatList
      contentContainerStyle={{ paddingLeft: 5, paddingRight: 15 }}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      data={[1, 2, 3, 4, 5]}
      keyExtractor={(item, index) => `Popular ${index}`}
      renderItem={({ item, index }) => {
        return (
          <View style={[styles.popularItem, { marginLeft: 15 }]}>
            <Placeholder Animation={Progressive}>
              <PlaceholderMedia
                style={{ width: '100%', height: '100%', borderRadius: 8 }}
              />
            </Placeholder>
          </View>
        );
      }}
    />)
  }

  // 2. Error State - UI/UX yang lebih rapi
  if (isError) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#ffffff", // Latar merah muda
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
            marginTop: 6,
            //backgroundColor: "#b91c1c",
            paddingHorizontal: 12,
            paddingVertical: 12,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: "#b91c1c", fontWeight: "600", fontSize: 16 }}>
            Coba Lagi
          </Text>
        </TouchableOpacity>
      </View>
    );
  }



  return (
    <FlatList
      contentContainerStyle={{ paddingLeft: 5, paddingRight: 15 }}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      data={records}
      keyExtractor={(item, index) => `${index}`}
      renderItem={({ item, index }) => {
        return (
          <Card
            style={[styles.popularItem, { marginLeft: 15 }]}
            image={{ uri: `${baseURL}/web/image?model=${model}&id=${item.id}&field=x_studio_gambar` }}
            onPress={() => {
              router.push(`/portal/headline-news/${item.id}`)
            }}>
            <Text headline whiteColor semibold>
              {item.x_name}
            </Text>
          </Card>
        );
      }}
    />
  )


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
    shadowOffset: { width: 1.5, height: 1.5 },
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
