import React, { useRef, useCallback } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { classNames } from '@/utils';
import { useFindOne } from '@/services/portal/@default-query';

const model = 'x_mobile_ppid_data_sha';
const selectedFields = {
    x_studio_inormasi_dan_pengaduan: {
        fields: {
            x_name: {},
            x_studio_tahun: {},
            x_studio_deskripsi: {},
            x_studio_file: {},
        }
    },
    x_studio_rencana_kerja_anggaran: {
        fields: {

        }
    }
};

export default function PpidInformasiSetiapSaat() {
    const firstTimeRef = useRef(true);
    const {
        data,
        isError,
        error,
        refetch,
        isRefetching,
        isFetching,
        isLoading
    } = useFindOne({
        model,
        fields: selectedFields,
        domain: [["id", "=", 2]],
    });


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
        <View className=' flex-1 bg-white'>
            {isLoading ? <Text>Loading...</Text> : isError ? <Text>Error: {error?.response?.data?.message || error?.message}</Text> : (<ScrollView className='mt-4 '>
                <TableItems
                    title='A. SOP YANG TELAH DISAHKAN'
                    items={data.x_studio_inormasi_dan_pengaduan}
                />
                <TableItems
                    title='B. SURAT MENYURAT ANTAR INSTANSI'
                    items={data.x_studio_rencana_kerja_anggaran}
                />

                <TableItems
                    title='C. PERBENDAHAARAAN & IVENTARIS'
                    items={data.x_studio_rencana_kerja_anggaran}
                />

                <TableItems
                    title='D. INFORMASI SETIAP SAAT LAINNYA'
                    items={data.x_studio_rencana_kerja_anggaran}
                />

            </ScrollView>)}
        </View>
    );
};





function TableItems({ title, items = [] }) {
    const tableHeader = [
        { label: 'TAHUN', width: 60, key: 'x_studio_tahun', render: (rowData, value) => value },
        { label: 'ITEM LAYANAN', width: 120, key: 'x_name', render: (rowData, value) => value },
        { label: 'KETERANGAN', width: 180, key: 'x_studio_deskripsi', render: (rowData, value) => value },
        { label: 'DOKUMENT', width: 100, key: 'x_studio_file', render: (rowData, value) => value },

    ];

    if (items && items.length > 0) {
        return (
            <View className='my-4'>
                <Text className='font-bold text-start mx-2 mb-4  text-gray-600'>{title}</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View className=' flex-col items-center justify-center'>
                        <View className="flex-row overflow-hidden items-center justify-center">

                            {tableHeader.map((item, index) => {
                                return (
                                    <View
                                        style={[{ width: item.width }]}
                                        key={index}
                                        className="h-14 bg-gray-100 p-2 border-b border-gray-200"
                                    >
                                        <Text className="bg-gray-100 py-2 text-center text-sm text-gray-700 font-bold">
                                            {item.label}
                                        </Text>
                                    </View>
                                );
                            })}
                        </View>


                        {items.map((rowData, index) => {
                            const rowBgClass = index % 2 === 0 ? "bg-gray-50" : "bg-white";
                            //console.log(rowData);
                            return (
                                <View key={rowData.id}
                                    className={classNames(
                                        "flex-row h-14 items-center justify-center border-b border-gray-200",
                                        rowBgClass
                                    )}
                                >
                                    {tableHeader.map((item, i) => (
                                        <Text
                                            key={i}
                                            style={[{ width: item.width }]}
                                            className={classNames(
                                                item.className ?? "text-left text-sm",
                                                "text-gray-700 px-4 text-center"
                                            )}
                                        >
                                            {item.render(rowData, rowData[item.key])}
                                        </Text>
                                    ))}

                                </View>
                            );
                        })}
                    </View>
                </ScrollView>
            </View>
        )
    } else {
        return (<View className='my-4 flex-col' >
            <Text className='font-bold text-start mx-2 mb-4  text-gray-600'>{title}</Text>
            <View className='flex-row items-center justify-center h-36 bg-gray-200 mx-2 rounded-lg'>
                <Text className='text-gray-700'>data belum tersedia</Text>
            </View>
        </View>)
    }
}
