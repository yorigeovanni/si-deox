import React, { useState, useRef, useCallback, useEffect, Fragment } from 'react';
import { View, ScrollView, Text, Pressable } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { classNames } from '@/utils';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import createRequest from '@/core/api-secure';
import InternalHeader from '@/components/ui/app-internal/header';






const { post } = createRequest();

export default function Berjadwal() {
  const router = useRouter();
  const firstTimeRef = useRef(true);

  const { deviceId } = useSelector((state) => state.config);
  const { jwtAccessToken } = useSelector((state) => state.aplikasiInternal);

  // ENV
  const baseURL =
    process.env.NODE_ENV === "production"
      ? process.env.EXPO_PUBLIC_API_URL
      : "http://10.8.0.2:4002";

  // State pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(0);
  const [selectedRowId, setSelectedRowId] = useState(null);
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

  // Query data Odoo
  const {
    data,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['amc-un-scheduled', offset, limit],
    queryFn: async () => {
      const model = "x_data_amc";
      const action = "web_search_read";
      const response = await post(
        `/mobile/api/internal/${model}/${action}`,
        {
          jsonrpc: "2.0",
          method: "call",
          params: {
            model,
            method: action,
            args: [],
            kwargs: {
              specification: {
                x_studio_sequence: {},
                x_studio_reg_number: {},
                x_studio_operator: {
                  fields: {
                    display_name: {}
                  }
                },
                x_studio_type_pesawat: {
                  fields: {
                    display_name: {}
                  }
                },
                x_studio_status: {},
                x_studio_ata: {},
                x_studio_atd: {},
                x_studio_type_penerbangan: {},
                x_studio_block_on: {},
                x_studio_block_off: {},
                x_studio_parking_stand: {
                  fields: {
                    display_name: {}
                  }
                },
                write_date: {},
                write_uid: {
                  fields: {
                    display_name: {}
                  }
                },
                create_uid: {
                  fields: {
                    display_name: {}
                  }
                },
                create_date: {}
              },
              offset: offset,
              order: "write_date DESC",
              context: {
                lang: "id_ID",
                tz: "Asia/Jakarta",
                uid: 2
              },
              limit: limit,
              count_limit: 10001,
              domain: [
                ["x_studio_type_penerbangan", "=", "LAINNYA"]
              ]
            }
          }
        },
        {
          deviceId,
          jwtAccessToken
        }
      );
      return response.data;
    },
    keepPreviousData: true,
  });


  const totalData = data?.result?.length || 0;
  const records = data?.result?.records || []; // data per halaman

  // Hitung total pages
  const totalPages = Math.ceil(totalData / limit);

  // Event tombol Next / Prev
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

  // Update offset setiap kali currentPage berubah
  useEffect(() => {
    setOffset((currentPage - 1) * limit);
  }, [currentPage, limit]);


  // Refetch saat screen berfokus kembali (kecuali pertama kali)
  useFocusEffect(
    useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false;
        return;
      }
      refetch();
    }, [refetch])
  );


  return (
    <Fragment>
       <InternalHeader 
                          backPath='/app-restricted-internal/tekops'
                          subtitle="UNIT AMC - PENERBANGAN TIDAK BERJADWAL"
                          />
      <View className="flex-1 bg-white pt-8">
      <View className="flex-1 flex-col">

        {/* HEADER */}
        <View className="flex-row justify-between p-4">
          <Text className="text-red-700">Header</Text>
          <Text className="text-red-700">+ DATA BARU</Text>
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
                  <Text className="p-4 text-gray-600">Loading...</Text>
                )}
                {isError && (
                  <Text className="p-4 text-red-600">
                    Terjadi kesalahan: {error?.message}
                  </Text>
                )}

                {/* Jika records berisi array data */}
                {records.length > 0 ? (
                  records.map((rowData, index) => {
                    const isSelected = rowData.id === selectedRowId;
                    const rowBgClass = isSelected
                      ? "bg-blue-500"
                      : index % 2 === 0
                        ? "bg-gray-50"
                        : "bg-white";

                    return (
                      <Pressable
                        key={rowData.id}
                        onPress={() => {
                       
                          setSelectedRowId(rowData.id);
                          router.push(`./view/${rowData.id}`, { relativeToDirectory: true });

                        }}
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

        {/*  Paginate */}
        <View className="flex-row justify-between bg-red-800 px-8 pt-2 h-20 items-center">
          {/* Tombol Prev */}
          <Pressable
            onPress={handlePrevPage}
            disabled={currentPage <= 1}
            className="mr-4"
          >
            <Text
              className={classNames(
                "text-white px-4 py-2 border rounded-md",
                currentPage <= 1 ? "border-white/50" : "border-white/75"
              )}
            >
              Prev
            </Text>
          </Pressable>

          {/* Info Halaman */}
          <Text className="text-white">
            Halaman {currentPage} dari {totalPages}
          </Text>

          {/* Tombol Next */}
          <Pressable
            onPress={handleNextPage}
            disabled={currentPage >= totalPages}
          >
            <Text
              className={classNames(
                "text-white px-4 py-2 border rounded-md",
                currentPage >= totalPages ? "border-white/50" : "border-white/75"
              )}
            >
              Next
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
    </Fragment>
  );
}
