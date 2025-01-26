import React, { Fragment, useCallback, useRef, useState } from 'react';
import { View, ActivityIndicator, Text, Pressable, ScrollView, FlatList, Dimensions } from 'react-native';
import { SimpleLineIcons, Octicons, FontAwesome5, AntDesign } from '@expo/vector-icons';
import { useRouter, useFocusEffect } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { BarChart } from 'react-native-chart-kit';
import InternalHeader from '@/components/ui/internal/header';
import { useFindMany } from '@/services/internal/@default-query';


const model = 'x_mobile_dummy';
const selectedFields = {
  x_name: true,
  x_studio_integer: true,
};




export default function DataTestIndex() {
  const router = useRouter();
  const firstTimeRef = useRef(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(0);
  const [filter, setFilter] = useState([]);

  const { data, isLoading, isError, error, refetch } = useFindMany({
    model: model,
    fields: selectedFields,
    domain: filter
  });

  const totalData = data?.totalData;
  const records = data?.records;
  const totalPages = data?.totalPages;



  const OnAddClick = () => {
    router.push(`./add`, { relativeToDirectory: true });
  };


  useFocusEffect(
    useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false;
        return;
      }
      refetch();
    }, [refetch])
  );



  console.log(records);


  return (
    <Fragment>
      <InternalHeader
        backPath='/app-restricted-internal/jasban'
        title='JASBAN - TIK'
        subtitle='TIK & DEV'
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
          <Pressable onPress={OnAddClick}>
            <SimpleLineIcons name="plus" size={18} color="black" className='mr-6' />
          </Pressable>

          <SimpleLineIcons name="eye" size={18} color="black" className='mr-6' />
          <AntDesign name="edit" size={18} color="black" className='mr-6' />
          <AntDesign name="delete" size={18} color="black" className='mr-0' />
        </View>
      </View>

      {/** DATA TABLE */}

      <View className="flex-1 bg-white">
        <FlatList
          data={records}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View className='flex-row justify-between items-center px-8 py-4 border-b border-gray-200'>
              <Text className='text-sm'>{item.x_name}</Text>
              <Text className='text-sm'>{item.x_studio_integer}</Text>
            </View>
          )}
        />
      </View>




      {/** LOADING */}
      {isLoading && (<View className=' absolute inset-0 bg-white bg-opacity-50'>
        <View className='flex-1 justify-center items-center'>
          <ActivityIndicator className='text-red-600' />
          <Text className=''>Processing...</Text>
        </View>
      </View>
      )}

      {/** ERROR */}


    </Fragment>

  );
}


