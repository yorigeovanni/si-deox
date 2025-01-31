import React, { Fragment, useRef, useCallback, useState } from 'react';
import { View, ActivityIndicator, Dimensions, Text, Pressable, FlatList, RefreshControl, TouchableOpacity, Image } from 'react-native';
import { SimpleLineIcons, Octicons, AntDesign } from '@expo/vector-icons';
import { useRouter, useFocusEffect } from 'expo-router';
import InternalHeader from '@/components/internal/header';
import { Code } from "react-content-loader/native";
import ReanimatedCarousel from "react-native-reanimated-carousel";

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import { useInfiniteFindMany } from '@/services/internal/@default-query';
import { useQueryClient } from '@tanstack/react-query';
const { width, height } = Dimensions.get("window");
dayjs.extend(utc);
dayjs.extend(customParseFormat);



const model = 'x_data_amc';
const selectedFields = {
  x_studio_reg_number: {},
  x_studio_operator: { fields: { display_name: {} } },
  x_studio_type_pesawat: { fields: { display_name: {} } },
  x_studio_status: {},
  x_studio_sta: {},
  x_studio_ata: {},
  x_studio_std: {},
  x_studio_atd: {},
  x_studio_type_penerbangan: {},
  x_studio_block_on: {},
  x_studio_block_off: {},
  x_studio_parking_stand: { fields: { display_name: {} } },
  write_date: {},
  write_uid: { fields: { display_name: {} } },
  create_uid: { fields: { display_name: {} } },
  create_date: {},
  
  x_studio_extra_arrivals_flight_number: {
    limit: 40,
    order: "x_studio_sequence ASC, id ASC",
    fields: {
      x_studio_from: {
        fields: {
          display_name: {}
        }
      },
      x_studio_destination: {
        fields: {
          display_name: {}
        }
      },
      x_studio_flight_number: {},
      x_studio_infant: {},
      x_studio_adult: {},
      x_studio_transit: {},
      x_studio_transfer: {},
      x_studio_cargo: {},
      x_studio_baggage: {},
      x_studio_personil_operator_1: {
        fields: {
          display_name: {}
        }
      },
    },
  },
  x_studio_extra_departures_flight_number: {
    limit: 40,
    order: "x_studio_sequence ASC, id ASC",
    fields: {
      x_studio_from: {
        fields: {
          display_name: {}
        }
      },
      x_studio_destination: {
        fields: {
          display_name: {}
        }
      },
      x_studio_flight_number: {},
      x_studio_infant: {},
      x_studio_adult: {},
      x_studio_transit: {},
      x_studio_transfer: {},
      x_studio_cargo: {},
      x_studio_baggage: {},
      x_studio_personil_operator_1: {
        fields: {
          display_name: {}
        }
      }
    }
  }
};
const DEFAULT_LIMIT = 20;


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
    domain: [
      // "&",
      // ['x_studio_status', '=', 'SCHEDULE'],
      // ['x_studio_status', '!=', 'CANCEL']
    ],
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
      <View className=" px-8 pt-4">
        {dummyArray.map((item) => (
          <Code
            key={item}
            speed={1}
            width={400}
            height={160}
            viewBox="0 0 400 160"
            backgroundColor="#F3F4F6"
            foregroundColor="#D1D5DB"
          >
          </Code>

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

          {/** <SimpleLineIcons name="eye" size={18} color="black" className='mr-6' />
          <AntDesign name="edit" size={18} color="black" className='mr-6' />
          <AntDesign name="delete" size={18} color="black" className='mr-0' /> */}
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
            <View className='flex-row justify-between h-16 items-center px-8 py-4 bg-red-700 rounded-tl-lg rounded-tr-lg '>
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





function RenderItem({ item }) {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [itemHeights, setItemHeights] = useState({});
  const [containerHeight, setContainerHeight] = useState(200);




  const onEdit = useCallback((id) => {
    router.push(`./edit/${id}`, { relativeToDirectory: true });
  }, [router]);





  const onLayoutItem = useCallback((index, layoutHeight) => {
    setItemHeights((prev) => {
      // Di sini 'prev' adalah state lama itemHeights
      if (index === 0 && !prev[index]) {
        setContainerHeight(layoutHeight);
      }
      // Lalu kembalikan state baru
      return {
        ...prev,
        [index]: layoutHeight,
      };
    });
  }, [setItemHeights]);


  const handleSnapToItem = useCallback((index) => {
    setActiveIndex(index);
    // Cek apakah kita sudah punya catatan height untuk slide tersebut
    if (itemHeights[index]) {
      setContainerHeight(itemHeights[index]);
    }
  }, [itemHeights]);





  return (<View className=' flex-col bg-white mx-2 my-2 rounded-lg'>
    {/* Header Card */}
    <View className="flex-row justify-between py-2 px-4 border-b border-gray-200 ">
      <View className="flex-col space-x-4">
        <View className='mr-4'>
          <Text className="text-gray-800 text-lg font-bold">{item.x_studio_operator.display_name}</Text>
        </View>
        <View>
          {/**<Text className="text-gray-800 text-xl font-bold">{item.operator}</Text> */}
          <Text className="text-gray-700 text-sm font-bold">{item.x_studio_reg_number}</Text>
        </View>
      </View>
      <View className='flex-end items-end justify-end'>
        <Text className=" text-gray-700 text-xl font-bold mr-2">{item.x_studio_type_pesawat.display_name}</Text>
        <Text className="text-green-700 text-xs border border-green-700 py-1 px-2 rounded-full">{item.x_studio_status}</Text>
      </View>
    </View>


    {/* Detail Card */}
    <View className=' mx-2'>


      <ReanimatedCarousel
        autoPlay={false}
        //autoPlayInterval={4000}
        //autoPlayReverse={false}
        snapEnabled
        vertical={false}
        width={width * 0.92}
        //loop
        style={{ width: width * 0.92 }}
        height={containerHeight} // Tergantung slide aktif
        onSnapToItem={handleSnapToItem}
        data={['x_studio_extra_arrivals_flight_number', 'x_studio_extra_departures_flight_number']}
        renderItem={(pppp) => {

          switch (pppp.item) {
            case 'x_studio_extra_arrivals_flight_number': {
              return (<View
                className='flex-col bg-white mx-2 my-1'
                onLayout={(e) => {
                  const h = e.nativeEvent.layout.height;
                  onLayoutItem(pppp.index, h);
                }}>
                <View className='flex-col mt-4 mb-2 mx-4'>
                  <Text className=' text-lg font-bold text-gray-500'>ARRIVAL STATUS</Text>
                </View>
                <View className="flex-row  justify-between mx-4">
                  <View className=" items-start">
                    <Text className="text-gray-500 text-sm">STA</Text>
                    <Text className="text-black text-lg font-bold">{item.x_studio_sta ? dayjs.utc(item.x_studio_sta, "YYYY-MM-DD HH:mm:ss").local().format("HH:mm") : '-'}</Text>
                  </View>
                  <View className=" items-center">
                    <Text className="text-gray-500 text-sm">ATA</Text>
                    <Text className="text-black text-lg font-bold">{item.x_studio_ata ? dayjs.utc(item.x_studio_ata, "YYYY-MM-DD HH:mm:ss").local().format("HH:mm") : '-'}</Text>
                  </View>

                  <View className=" items-end">
                    <Text className="text-gray-500 text-sm">BLOCK ON</Text>
                    <Text className="text-black text-lg font-bold">{item.x_studio_block_on ? dayjs.utc(item.x_studio_block_on, "YYYY-MM-DD HH:mm:ss").local().format("HH:mm") : '-'}</Text>
                  </View>
                </View>

                <View className="flex-col mx-4 mt-4">
                  <Text className="text-gray-500 text-lg font-bold">ROUTE</Text>
                  {item.x_studio_extra_arrivals_flight_number.map((flight, index) => {
                    return (<View className="flex-row justify-between mb-6" key={index}>
                      <View className=" items-start">
                        <Text className="text-gray-500 text-sm">FLIGHT. NUMBER</Text>
                        <Text className="text-black text-lg font-bold">{flight.x_studio_flight_number}</Text>
                      </View>

                      <View className="items-center">
                        <Text className="text-gray-500 text-sm">FROM</Text>
                        <Text className="text-black text-lg font-bold">{flight.x_studio_from?.display_name}</Text>
                      </View>

                      <View className=" items-end">
                        <Text className="text-gray-500 text-sm">DEST</Text>
                        <Text className="text-black text-lg font-bold">{flight.x_studio_destination?.display_name}</Text>
                      </View>

                    </View>)
                  })}
                </View>

                <View className="flex-row items-center justify-between py-4 px-4 border-t border-gray-200 ">
                  <View className='flex-row items-center space-x-2'>
                    {item.x_studio_status === 'SCHEDULE' && (
                      <TouchableOpacity className="border border-red-700 rounded-lg items-center mx-1 p-2">
                        <Text className="text-red-700 font-bold text-xs">CANCEL</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                  <View className='flex-row items-center space-x-2'>
                    <TouchableOpacity onPress={() => onEdit(item.id)} className="border border-green-700 rounded-lg items-center mx-1 p-2">
                      <Text className="text-green-700 font-bold text-xs">EDIT DATA</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>)
            }
            case 'x_studio_extra_departures_flight_number': {
              return (<View
                className='flex-col bg-white mx-2 my-1'
                onLayout={(e) => {
                  const h = e.nativeEvent.layout.height;
                  onLayoutItem(pppp.index, h);
                }}>
                <View className='flex-col mt-4 mb-2 mx-4'>
                  <Text className=' text-lg font-bold text-gray-500'>DEPARTURE STATUS</Text>
                </View >
                <View className="flex-row  justify-between mx-4">
                  <View className=" items-start">
                    <Text className="text-gray-500 text-sm">STD</Text>
                    <Text className="text-black text-lg font-bold">{item.x_studio_std ? dayjs.utc(item.x_studio_std, "YYYY-MM-DD HH:mm:ss").local().format("HH:mm") : '-'}</Text>
                  </View >
                  <View className=" items-center">
                    <Text className="text-gray-500 text-sm">ATD</Text>
                    <Text className="text-black text-lg font-bold">{item.x_studio_atd ? dayjs.utc(item.x_studio_atd, "YYYY-MM-DD HH:mm:ss").local().format("HH:mm") : '-'}</Text>
                  </View>

                  <View className=" items-end">
                    <Text className="text-gray-500 text-sm">BLOCK OFF</Text>
                    <Text className="text-black text-lg font-bold">{item.x_studio_block_off ? dayjs.utc(item.x_studio_block_off, "YYYY-MM-DD HH:mm:ss").local().format("HH:mm") : '-'}</Text>
                  </View>
                </View>

                <View className="flex-col mx-4 mt-4">
                  <Text className="text-gray-500 text-lg font-bold">ROUTE</Text>
                  {item.x_studio_extra_departures_flight_number.map((flight, index) => {
                    return (<View className="flex-row justify-between mb-6" key={index}>
                      <View className=" items-start">
                        <Text className="text-gray-500 text-sm">FLIGHT. NUMBER</Text>
                        <Text className="text-black text-lg font-bold">{flight.x_studio_flight_number}</Text>
                      </View>

                      <View className="items-center">
                        <Text className="text-gray-500 text-sm">FROM</Text>
                        <Text className="text-black text-lg font-bold">{flight.x_studio_from?.display_name}</Text>
                      </View>

                      <View className=" items-end">
                        <Text className="text-gray-500 text-sm">DEST</Text>
                        <Text className="text-black text-lg font-bold">{flight.x_studio_destination?.display_name}</Text>
                      </View>

                    </View>)
                  })}
                </View>

                <View className="flex-row items-center justify-between py-4 px-4 border-t border-gray-200 ">
                  <View className='flex-row items-center space-x-2'>
                    {item.x_studio_status === 'SCHEDULE' && (
                      <TouchableOpacity className="border border-red-700 rounded-lg items-center mx-1 p-2">
                        <Text className="text-red-700 font-bold text-xs">CANCEL</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                  <View className='flex-row items-center space-x-2'>
                    <TouchableOpacity onPress={() => onEdit(item.id)} className="border border-green-700 rounded-lg items-center mx-1 p-2">
                      <Text className="text-green-700 font-bold text-xs">EDIT DATA</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>)
            }

            default: {
              return null
            }
          }
        }}
      />
    </View>

  </View>)
}




