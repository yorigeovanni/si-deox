import React, { Fragment, useCallback, useRef, useState, useEffect } from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  Pressable,
  FlatList,
  RefreshControl,
  TouchableOpacity
} from 'react-native';
import {
  SimpleLineIcons,
  Octicons,
  AntDesign
} from '@expo/vector-icons';
import { useRouter, useFocusEffect } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import InternalHeader from '@/components/internal/header';
import { useFindMany } from '@/services/internal/@default-query';

// ----- CONSTANT / CONFIG ----- //
const model = 'x_mobile_dummy';
const selectedFields = {
  x_name: true,
  x_studio_integer: true,
};
const DEFAULT_LIMIT = 10;

// ----- SCREEN COMPONENT ----- //
export default function DataTestIndex() {
  const router = useRouter();
  const firstTimeRef = useRef(true);

  // State untuk pagination & filter
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(DEFAULT_LIMIT);
  const [offset, setOffset] = useState(0);
  const [filter, setFilter] = useState([]);

  // Untuk menampung data hasil merge (pagination manual)
  const [listData, setListData] = useState([]);

  // Query TanStack
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
    isFetching
  } = useFindMany({
    model: model,
    fields: selectedFields,
    domain: filter,
    offset,
    limit
  });

  const totalData = data?.totalData ?? 0;
  const records = data?.records ?? [];
  const totalPages = data?.totalPages ?? 1;


  // Ketika screen difokuskan ulang, lakukan refetch
  useFocusEffect(
    useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false;
        return;
      }
      // refetch data
      refetch();
    }, [refetch])
  );

  // Fungsi handle "Tambah" data
  const onAddClick = () => {
    router.push(`./add`, { relativeToDirectory: true });
  };

  // Fungsi untuk reload data (pull to refresh)
  const handleRefresh = () => {
    // Set offset = 0 untuk memulai data dari awal
    setOffset(0);
    setCurrentPage(1);
    // refetch() akan meng-trigger `useEffect` di atas yang me-reset listData
    refetch();
  };


  // Fungsi untuk load data halaman berikutnya
  const handleLoadMore = () => {
    // Hanya loadMore jika belum mencapai totalPages
    if (currentPage < totalPages && !isLoading && !isFetching) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      // Offset = current offset + limit
      setOffset((prevOffset) => prevOffset + limit);
    }
  };


  // ----- RENDER LOADING SKELETON ----- //
  const renderSkeleton = () => {
    // Misal kita buat 5 skeleton baris
    const dummyArray = Array.from({ length: 5 }, (_, i) => i);
    return (
      <View className="px-8 pt-4">
        {dummyArray.map((item) => (
          <View
            key={item}
            className="flex-row justify-between items-center py-4 border-b border-gray-200"
          >
            <View className="bg-gray-200 h-4 w-1/2 rounded" />
            <View className="bg-gray-200 h-4 w-1/6 rounded" />
          </View>
        ))}
      </View>
    );
  };



  // ----- RENDER ITEM DATA ----- //
  const renderItem = ({ item }) => (
    <View className="flex-row justify-between items-center px-8 py-4 border-b border-gray-200">
      <Text className="text-sm">{item.x_name}</Text>
      <Text className="text-sm">{item.x_studio_integer}</Text>
    </View>
  );


  // onSuccess manual (merge data pagination)
  // Bisa juga dihandle langsung di custom hook `useFindMany` jika ingin lebih rapi
  /*useEffect(() => {
    // Jika offset = 0, berarti pertama kali load data atau refresh
    // maka timpa (replace) data
    if (offset === 0) {
      setListData(records);
    } else {
      // Jika offset != 0, berarti kita sedang loadMore
      // maka append data baru ke state lama
      setListData((prevData) => [...prevData, ...records]);
    }
  }, [records, offset]);
*/


  // ----- JIKA ERROR ----- //
  if (isError) {
    return (
      <Fragment>
        <InternalHeader
          backPath="/app-restricted-internal/jasban"
          title="JASBAN - TIK"
          subtitle="TIK & DEV"
        />
        <View className="flex-1 justify-center items-center bg-white px-4">
          <Text className="mb-2">Terjadi error: {error?.message}</Text>
          <Pressable
            onPress={handleRefresh}
            className="px-4 py-2 bg-blue-600 rounded"
          >
            <Text className="text-white">Coba Lagi</Text>
          </Pressable>
        </View>
      </Fragment>
    );
  }




  // ----- JIKA SUCCESS ATAU LOADING ----- //
  return (
    <Fragment>
      {/* HEADER */}
      <InternalHeader
        backPath="/app-restricted-internal/jasban"
        title="JASBAN - TIK"
        subtitle="TIK & DEV"
      />

      {/** HEADER CRUD */}
      <View className='flex-row justify-between items-center px-8 py-4 bg-white'>
        <View className='flex-row items-center space-x-4'>
          <AntDesign name="table" size={18} color="black" className='ml-0' />
          <SimpleLineIcons name="cloud-download" size={18} color="black" className='ml-6' />
          <Octicons name="search" size={18} color="black" className='ml-6' />
          <Octicons name="filter" size={18} color="black" className='ml-6' />
        </View>
        <View className='flex-row items-center space-x-4'>
          <Pressable onPress={onAddClick}>
            <SimpleLineIcons name="plus" size={18} color="black" className='mr-6' />
          </Pressable>

          <SimpleLineIcons name="eye" size={18} color="black" className='mr-6' />
          <AntDesign name="edit" size={18} color="black" className='mr-6' />
          <AntDesign name="delete" size={18} color="black" className='mr-0' />
        </View>
      </View>

      {/* DATA TABLE */}
      <View className="flex-1 bg-white">
        {/** 
         * Jika baru pertama kali loading (tidak ada data sama sekali),
         * tampilkan skeleton / placeholder
         */}
        {isLoading && listData.length === 0 ? (
          renderSkeleton()
        ) : (
          <FlatList
            data={records}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            // Pull-to-refresh
            refreshControl={
              <RefreshControl
                refreshing={isRefetching} // bisa juga memanfaatkan isFetching
                onRefresh={handleRefresh}
              />
            }
            onEndReached={handleLoadMore}       // Saat list mendekati akhir
            onEndReachedThreshold={0.5}         // 0.5 = 50% sebelum akhir
            ListFooterComponent={() => {
              // Jika masih ada halaman berikutnya, tampilkan indikator "Memuat..."
              if (isFetching && currentPage < totalPages) {
                return (
                  <View className="py-4">
                    <ActivityIndicator size="small" color="#999999" />
                  </View>
                );
              }
              // Jika semua data sudah dimuat atau tidak ada data lagi
              return null;
            }}
          />
        )}
      </View>

      {/** LOADING OVERLAY (untuk menutupi layar jika diinginkan) */}
      {isLoading && listData.length > 0 && (
        <View className="absolute inset-0 bg-white bg-opacity-30 justify-center items-center">
          <ActivityIndicator size="large" color="red" />
          <Text>Memproses...</Text>
        </View>
      )}
    </Fragment>
  );
}
