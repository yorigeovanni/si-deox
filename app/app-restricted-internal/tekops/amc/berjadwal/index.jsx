import React, { Fragment, useRef, useCallback } from 'react';
import { View, ActivityIndicator, Text, Pressable, FlatList, RefreshControl, TouchableOpacity, Image } from 'react-native';
import { SimpleLineIcons, Octicons, AntDesign } from '@expo/vector-icons';
import { useRouter, useFocusEffect } from 'expo-router';
import InternalHeader from '@/components/ui/internal/header';
import { useInfiniteFindMany } from '@/services/internal/@default-query';
import { useQueryClient } from '@tanstack/react-query';


const model = 'x_data_amc';
const selectedFields = {
  x_studio_sequence: {},
  x_studio_reg_number: {},
  x_studio_operator: { fields: { display_name: {} } },
  x_studio_type_pesawat: { fields: { display_name: {} } },
  x_studio_status: {},
  x_studio_ata: {},
  x_studio_atd: {},
  x_studio_type_penerbangan: {},
  x_studio_block_on: {},
  x_studio_block_off: {},
  x_studio_parking_stand: { fields: { display_name: {} } },
  write_date: {},
  write_uid: { fields: { display_name: {} } },
  create_uid: { fields: { display_name: {} } },
  create_date: {},
};
const DEFAULT_LIMIT = 20;




const RenderItem = ({ item }) => {
  const router = useRouter();


  const onEditInitialClick = useCallback((id) => {
    router.push(`./edit-initial/${id}`, { relativeToDirectory: true });
  }, [router]);


  const onEditLandingClick = useCallback((id) => {
    router.push(`./edit-landing/${id}`, { relativeToDirectory: true });
  }, [router]);


  const onEditTakeoffClick = useCallback((id) => {
    router.push(`./edit-takeoff/${id}`, { relativeToDirectory: true });
  }, [router]);

  const onEditCancelClick = useCallback((id) => {
    router.push(`./edit-takeoff/${id}`, { relativeToDirectory: true });
  }, [router]);



  return (<View className=' flex-col bg-white mx-2 my-2 rounded-lg'>
    {/* Header Card */}
    <View className="flex-row justify-between py-2 px-4 border-b border-gray-200 ">
      <View className="flex-col space-x-4">
        <View className='mr-4'>
          <Text className="text-gray-800 text-lg font-bold">{item.x_studio_operator.display_name}</Text>
        </View>
        <View>
          {/**<Text className="text-gray-800 text-xl font-bold">{item.operator}</Text> */}
          <Text className="text-gray-700 text-sm font-bold">{item.x_studio_type_pesawat.display_name}</Text>
        </View>
      </View>
      <View className='flex-end items-end justify-end'>
        <Text className=" text-gray-700 text-xl font-bold mr-2">PK - 234</Text>
        <Text className="text-green-700 text-xs border border-green-700 py-1 px-2 rounded-full">{item.x_studio_status}</Text>
      </View>
    </View>


    {/* Detail Card */}
    <View className='mt-6 mx-2'>
      <View className="flex-row justify-between mb-6">
        <View className="flex items-center">
          <Text className="text-gray-500 text-sm">FROM</Text>
          <Text className="text-black text-lg font-bold">SOQ</Text>
        </View>
        <View className="flex-1 items-center">
          <Text className="text-gray-500 text-sm">FLIGHT. N</Text>
          <Text className="text-black text-lg font-bold"> SJ-435</Text>
        </View>
        <View className="flex-1 items-center">
          <Text className="text-gray-500 text-sm">STA</Text>
          <Text className="text-black text-lg font-bold"> 21:55</Text>
        </View>
        <View className="flex-1 items-center">
          <Text className="text-gray-500 text-sm">ATA</Text>
          <Text className="text-black text-lg font-bold">21:34</Text>
        </View>
        <View className="flex items-center">
          <Text className="text-gray-500 text-sm">BLOCK ON</Text>
          <Text className="text-black text-lg font-bold">22:56</Text>
        </View>
      </View>

      <View className="flex-row justify-between mb-4 mx-2">
        <View className="flex items-center">
          <Text className="text-gray-500 text-sm">DEST</Text>
          <Text className="text-black text-lg font-bold">CGK</Text>
        </View>
        <View className="flex-1 items-center">
          <Text className="text-gray-500 text-sm">FLIGHT. N</Text>
          <Text className="text-black text-lg font-bold"> SJ-435</Text>
        </View>
        <View className="flex-1 items-center">
          <Text className="text-gray-500 text-sm">STD</Text>
          <Text className="text-black text-lg font-bold"> -</Text>
        </View>
        <View className="flex-1 items-center">
          <Text className="text-gray-500 text-sm">ATD</Text>
          <Text className="text-black text-lg font-bold">-</Text>
        </View>
        <View className="flex items-center">
          <Text className="text-gray-500 text-sm">BLOCK OFF</Text>
          <Text className="text-black text-lg font-bold">-</Text>
        </View>
      </View>
    </View>

    <View className="flex-row items-center justify-between py-2 px-4 border-t border-gray-200 ">
      
    <View className='flex-row items-center space-x-2'>
    <TouchableOpacity className="border border-red-700 rounded-lg items-center mx-1 p-2">
          <Text className="text-red-700 font-bold text-xs">CANCEL</Text>
        </TouchableOpacity>
      </View>

      <View className='flex-row items-center space-x-2'>
        <TouchableOpacity 
            onPress={() => onEditInitialClick(item.id)}
            className="border border-gray-700 rounded-lg items-center mx-1 p-2"
        >
          <Text className="text-gray-700 font-bold text-xs">INITIAL</Text>
        </TouchableOpacity>
        <TouchableOpacity className="border border-green-700 rounded-lg items-center mx-1 p-2">
          <Text className="text-green-700 font-bold text-xs">LANDING</Text>
        </TouchableOpacity>
        <TouchableOpacity className="border border-yellow-700 rounded-lg items-center mx-1 p-2">
          <Text className="text-yellow-700 font-bold text-xs">TAKEOFF</Text>
        </TouchableOpacity>
        
      </View>
    </View>
  </View>)
}






export default () => {
  const router = useRouter();
  const firstTimeRef = useRef(true);
  const queryClient = useQueryClient();

  const {
    data,
    isError,
    error,
    refetch,
    isRefetching,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteFindMany({
    model,
    fields: selectedFields,
    domain: [],
    limit: DEFAULT_LIMIT,
  });


  const listData = data?.pages?.flatMap((page) => page.records) ?? [];
  const totalData = data?.pages?.[0]?.totalData || 0;
  const totalPages = data?.pages?.[0]?.totalPages || 1;
  const loadedPages = data?.pages?.length ?? 0;




  const onAddClick = useCallback(() => {
    router.push('./add', { relativeToDirectory: true });
  }, [router]);



  const handleRefresh = useCallback(() => {
    queryClient.removeQueries(['default-infinity-findAll', model]);
    refetch();
  }, [queryClient, refetch]);




  // Skeleton loading
  const renderSkeleton = () => {
    const dummyArray = Array.from({ length: 10 }, (_, i) => i);
    return (
      <View className="px-8 pt-4">
        {dummyArray.map((item) => (
          <View key={item} className="flex-row justify-between items-center py-4 border-b border-gray-200">
            <View className="bg-gray-200 h-4 w-1/2 rounded" />
            <View className="bg-gray-200 h-4 w-1/6 rounded" />
          </View>
        ))}
      </View>
    );
  };
  
  
  
  // Ketika screen difokuskan ulang, lakukan refetch (opsional)
  useFocusEffect(
    useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false;
        return;
      }
      refetch();
    }, [refetch])
  );

  

  if (isError) {
    return (
      <Fragment>
        <InternalHeader
          backPath="/app-restricted-internal/tekops"
          title="AMC - DEO AIRPORT"
          subtitle="SCHEDULED MOVEMENT"
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



  return (
    <Fragment>
      {/* HEADER */}
      <InternalHeader
          backPath="/app-restricted-internal/tekops"
          title="AMC - DEO AIRPORT"
          subtitle="SCHEDULED MOVEMENT"
        />


      {/** HEADER CRUD */}
      <View className='flex-row justify-between items-center px-8 py-4 bg-white border-b border-gray-200'>
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
      <View className="flex-1 bg-gray-200">
        {isLoading && listData.length === 0 ? (
          renderSkeleton()
        ) : (
          <Fragment>
            <FlatList
              data={listData}
              keyExtractor={(item, index) => {
                return item.id?.toString() || index.toString();
              }}
              renderItem={({ item }) => <RenderItem item={item} />}
              refreshControl={
                <RefreshControl
                  refreshing={isRefetching}
                  onRefresh={handleRefresh}
                />
              }
              onEndReached={() => {
                if (hasNextPage) {
                  fetchNextPage();
                }
              }}
              onEndReachedThreshold={0.5}
              ListFooterComponent={() => {
                if (isFetchingNextPage) {
                  return (
                    <View className="py-4">
                      <ActivityIndicator size="small" color="#999999" />
                    </View>
                  );
                }
                return null;
              }}
            />
            <View className='flex-row justify-between h-16 items-center px-8 py-4 bg-red-700 '>
              <Text className=' text-white'>{`Page ${loadedPages} of ${totalPages}`}</Text>
              <Text className=' text-white'>{`Records ${loadedPages == totalPages ? totalData : loadedPages * DEFAULT_LIMIT} of ${totalData}`}</Text>
            </View>
          </Fragment>
        )}
      </View>

      {/** LOADING OVERLAY untuk menutupi list saat load data tambahan */}
      {/* 
          Skenario: jika sedang loading, tapi data sudah ada (listData.length > 0), 
          artinya user sedang loadMore atau refetch. Anda bisa menampilkan overlay misalnya: 
      */}
      {isLoading && listData.length > 0 && (
        <View className="absolute inset-0 bg-white bg-opacity-30 justify-center items-center">
          <ActivityIndicator size="large" color="red" />
          <Text>Loading...</Text>
        </View>
      )}
    </Fragment>
  );
}
