import React, { useState, useRef, useCallback, useEffect, Fragment } from 'react';
import { View, ScrollView, Text, Pressable, ActivityIndicator } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { classNames } from '@/utils';
import { Ionicons } from '@expo/vector-icons';
import { useFindAll } from '@/services/internal/x_data_amc';
import InternalHeader from '@/components/internal/header';


export default function Berjadwal() {
  const router = useRouter();
  const firstTimeRef = useRef(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(0);
  const [selectedRowId, setSelectedRowId] = useState(null);


  // Tabel header
  const [tableHead] = useState([
    {
      key: "id",
      label: 'ID',
      width: 50,
      render: (row, value) => value
    },
    {
      key: "x_studio_operator",
      label: 'OPERATOR',
      width: 180,
      headerClasname: 'text-left text-sm text-gray-700 w-28',
      className: 'text-left text-sm text-gray-700 w-28',
      render: (row, value) => value?.display_name
    },
    {
      key: "x_studio_type_pesawat",
      label: 'TYPE PESAWAT',
      width: 120,
      render: (row, value) => value?.display_name
    },
    {
      key: "x_studio_status",
      label: 'STATUS',
      width: 120,
      render: (row, value) => value
    },
    {
      key: "x_studio_ata",
      label: 'ATA',
      width: 120,
      render: (row, value) => value
    },
    {
      key: "x_studio_atd",
      label: 'ATD',
      width: 120,
      render: (row, value) => value
    },
    {
      key: "x_studio_type_penerbangan",
      label: 'TYPE PENERBANGAN',
      width: 120,
      render: (row, value) => value
    },
    {
      key: "x_studio_block_on",
      label: 'BLOCK ON',
      width: 120,
      render: (row, value) => value
    },
    {
      key: "x_studio_block_off",
      label: 'BLOCK OFF',
      width: 120,
      render: (row, value) => value
    },
    {
      key: "x_studio_parking_stand",
      label: 'PARKING STAND',
      width: 120,
      render: (row, value) => value?.display_name
    },
    {
      key: "write_date",
      label: 'WRITE DATE',
      width: 120,
      render: (row, value) => value
    }
  ]);


  const { data, isLoading, isError, error, refetch } = useFindAll({
    offset,
    limit
  });

  const totalData = data?.result?.length || 0;
  const records = data?.result?.records || [];
  const totalPages = Math.ceil(totalData / limit);



  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };


  useEffect(() => {
    setOffset((currentPage - 1) * limit);
  }, [currentPage, limit]);



  useFocusEffect(
    useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false;
        return;
      }
      refetch();
    }, [refetch])
  );


  const handleSearch = () => {
    console.log('Pencarian ditekan');
  };


  const handleEdit = () => {
    console.log('Edit ditekan');
  };


  const handleDownload = () => {
    console.log('Download ditekan');
  };


  const navigateToAdd = () => {
    router.push(`./add`, { relativeToDirectory: true });
  };



  return (
    <Fragment>
      <InternalHeader
        backPath='/app-restricted-internal/tekops'
        title='UNIT AMC - DATA MOVEMENT'
        subtitle="PENERBANGAN BERJADWAL"
      />


      <View className="flex-1 bg-white">
        <View className="flex-1 flex-col bg-white">

          <View className="flex-row items-center justify-between bg-white px-4 py-2 border-b border-gray-200 mt-2">
            <View className="flex-row justify-between items-center">
              {/* Tombol Prev */}
              <Pressable
                onPress={handlePrevPage}
                disabled={currentPage <= 1}
                className="mr-4 bg-red-700 p-2 rounded-full"
              >
                <Ionicons name="arrow-back" size={18} color="#ffffff" />
              </Pressable>

              {/* Info Halaman */}
              <View className='flex-col items-center'>
                <Text className="text-red-800">
                  Halaman {currentPage} dari {totalPages}
                </Text>
                <Text className="text-red-800">
                  Total Data {totalPages}
                </Text>
              </View>

              {/* Tombol Next */}
              <Pressable
                onPress={handleNextPage}
                disabled={currentPage >= totalPages}
                className="ml-4 bg-red-700 p-2 rounded-full"
              >
                <Ionicons name="arrow-forward" size={18} color="#ffffff" />

              </Pressable>
            </View>


            <View className="flex-row space-x-4">
            <Pressable onPress={() => { }} className='ml-4'>
                <Ionicons name="open" size={28} color="#15803d" />
              </Pressable>

              <Pressable onPress={() => { }} className='ml-4'>
                <Ionicons name="funnel" size={28} color="#15803d" />
              </Pressable>

              <Pressable onPress={() => { }} className='ml-2'>
                <Ionicons name="cloud-download" size={28} color="#15803d" />
              </Pressable>

              <Pressable onPress={() => navigateToAdd()} className='ml-4'>
                <Ionicons name="add" size={32} color="#15803d" />
              </Pressable>
            </View>
          </View>

          <View className=' flex-row items-start justify-start bg-white p-2 mt-2'>
            <View className=' border border-orange-400 rounded-full p-2 mr-1'>
              <Text>asda : sdasd</Text>
            </View>

            <View className=' border border-orange-400 rounded-full p-2 mr-1'>
              <Text>asda : sdasd</Text>
            </View>
            <View className=' border border-orange-400 rounded-full p-2 mr-1'>
              <Text>asda : sdasd</Text>
            </View>

            <View className=' border border-orange-400 rounded-full p-2 mr-1'>
              <Text>asda : sdasd</Text>
            </View>

            <View className=' border border-orange-400 rounded-full p-2 mr-1'>
              <Text>asda : sdasd</Text>
            </View>

          </View>

          {/* TABEL */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View>
              {/* Tabel Header */}
              <View className="bg-white">
                <View className="flex-row overflow-hidden items-center justify-center">
                  {tableHead.map((item, index) => {
                    return (
                      <View
                        style={[{ width: item.width }]}
                        key={index}
                        className="h-14 bg-gray-100 p-2 border-b border-gray-200"
                      >
                        <Text className="bg-gray-100 py-2 text-left text-sm text-gray-700 font-bold">
                          {item.label}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              </View>


              {/* Tabel Body */}
              <ScrollView className="mt-[-1px]">
                <View className="bg-white">
                  {isLoading && (
                    <Fragment >
                      <View className=" flex items-center justify-center">
                        <Text className="p-4 text-gray-600">Loading...</Text>
                      </View>
                    </Fragment>
                  )}
                  {isError && (
                    <Text className="p-4 text-red-600">
                      Terjadi kesalahan: {error?.message}
                    </Text>
                  )}

                  {records.length > 0 ? (
                    records.map((rowData, index) => {
                      const isSelected = rowData.id === selectedRowId;
                      const rowBgClass = isSelected ? "bg-blue-500" : index % 2 === 0 ? "bg-gray-50" : "bg-white";

                      return (
                        <Pressable
                          key={rowData.id}
                          onPress={() => setSelectedRowId(rowData.id)}
                          className={classNames(
                            "flex-row h-14 items-center border-b border-gray-200",
                            rowBgClass
                          )}
                        >
                          {tableHead.map((item, i) => (
                            <Text
                              key={i}
                              style={[{ width: item.width }]}
                              className={classNames(
                                item.className ?? "text-left text-sm",
                                isSelected ? "text-white" : "text-gray-700"
                              )}
                            >
                              {item.render(rowData, rowData[item.key])}
                            </Text>
                          ))}
                        </Pressable>
                      );
                    })
                  ) : (
                    !isLoading && (
                      <Text className="text-center p-4 text-gray-600">
                        Tidak ada data.
                      </Text>
                    )
                  )}
                </View>
              </ScrollView>
            </View>
          </ScrollView>



        </View>
      </View>
    </Fragment>

  );
}
