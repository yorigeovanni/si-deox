import React, { Fragment, useRef, useCallback, useState, useMemo } from 'react';
import { View, Text, Image, ActivityIndicator, TouchableOpacity, Dimensions, TextInput, ImageBackground } from 'react-native';
import { Pressable, FlatList, RefreshControl } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from '@/utils';
import { useQueryClient } from '@tanstack/react-query';
import externalUserActions from '@/state/externalUser/externalUserSlice';
import { useInfiniteFindMany } from '@/services/portal/@default-query';

const baseURL = process.env.NODE_ENV === 'production' ? process.env.EXPO_PUBLIC_API_URL : 'http://10.8.0.2:4002';
const { width, height } = Dimensions.get("window");
const model = 'res.partner';
const selectedFields = {
    image_256: {},
    name: {},
    x_studio_jenis_stackholder: {
        fields: {
            display_name: {}
        }
    },
};
const DEFAULT_LIMIT = 20;


export default function SelectCompany() {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    const firstTimeRef = useRef(true);

    // NEW: State untuk searchTerm
    const [searchTerm, setSearchTerm] = useState('');

    // NEW: Memo domain, tergantung searchTerm
    const domain = useMemo(() => {
        if (!searchTerm) {
            return ["&", 
                ["is_company", "=", true], 
                ["id", "!=", 1],
                ["x_studio_active", "=", true], 
                ["x_studio_is_demo", "!=", true], 
            ];
        }
        return ["&", 
            ["is_company", "=", true], 
            ["x_studio_active", "=", true], 
            ["id", "!=", 1], 
            ["name", "ilike", searchTerm]
            ["x_studio_is_demo", "!=", true], 
        ];
    }, [searchTerm]);

    // Memanggil infiniteFindMany dengan domain hasil search
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
        domain,           // <-- Gunakan domain di sini
        limit: DEFAULT_LIMIT,
    });

    const listData = data?.pages?.flatMap((page) => page.records) ?? [];
    const totalData = data?.pages?.[0]?.totalData || 0;
    const totalPages = data?.pages?.[0]?.totalPages || 1;
    const loadedPages = data?.pages?.length ?? 0;

    // Refresh manual
    const handleRefresh = useCallback(() => {
        // Hapus cache agar data di-load ulang
        queryClient.removeQueries(['portal-default-infinity-findAll', model]);
        refetch();
    }, [queryClient, refetch]);


    const onSelectCompany = useCallback((company) => {
        dispatch(externalUserActions.setCompany(company));
    }, [dispatch]);


    // Saat screen difokuskan ulang, refetch (opsional)
    useFocusEffect(
        useCallback(() => {
            if (firstTimeRef.current) {
                firstTimeRef.current = false;
                return;
            }
            refetch();
        }, [refetch])
    );

    // Render
    return (
        <View className='flex-col items-center justify-center mt-2' style={{ width: '100%' }}>
            <Text className='text-white font-bold mb-2'>
                PILIH PERUSAHAN / INSTANSI ANDA
            </Text>

            {/* NEW: Tambahkan TextInput untuk pencarian */}
            <View style={{ width: width * 0.9 }}>
                <TextInput
                    placeholder="Cari Perusahaan / Instansi..."
                    value={searchTerm}
                    onChangeText={(text) => {
                        setSearchTerm(text);
                        refetch();
                    }}
                    style={{
                        backgroundColor: '#fff',
                        borderRadius: 8,
                        paddingHorizontal: 12,
                        paddingVertical: 12,
                        marginBottom: 8,
                    }}
                />
            </View>

            {isLoading ? (
                <Text style={{ color: '#fff' }}>Loading...</Text>
            ) : isError ? (
                <Text style={{ color: 'red' }}>Error: {error?.message}</Text>
            ) : (
                <View style={{ height: height * 0.64, width: width * 0.9 }}>
                    <FlatList
                        numColumns={1}
                        data={listData}
                        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
                        renderItem={({ item }) => <RenderItem item={item} onSelectCompany={onSelectCompany} />}
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
                </View>
            )}
        </View>
    );
}

// Komponen render item list
function RenderItem({ item, onSelectCompany }) {
    return (<View className='flex-row items-center justify-between px-4 py-3 rounded-lg shadow-md my-1 border border-gray-500/75 bg-gray-800/25'>
        <View className='flex-row items-center justify-between'>
            {item.image_256 ? <Image source={{ uri: `${baseURL}/web/image?field=avatar_128&id=${item.id}&model=${model}` }} className='h-12 w-12 rounded-full' /> : <View className='w-12 h-12 bg-gray-500 rounded-full'></View>}
            <View className='flex-col ml-2'>
                <Text className=' text-white text-lg font-bold'> {item.name}</Text>
                <Text className=' text-yellow-400 text-sm'> {item.x_studio_jenis_stackholder?.display_name}</Text>
            </View>
        </View>
        <View>
            <TouchableOpacity onPress={()=> onSelectCompany(item)} className=' bg-cyan-600 p-2 rounded-lg'>
                <Text className=' text-white '>LOGIN</Text>
            </TouchableOpacity>
        </View>
    </View>)
}
