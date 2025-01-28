import React, { Fragment, useRef, useCallback } from 'react';
import { View, ActivityIndicator, Text, Pressable, FlatList, RefreshControl, ImageBackground, Image } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import InternalHeader from '@/components/ui/internal/header';
import { useInfiniteFindMany } from '@/services/portal/@default-query';
import { useQueryClient } from '@tanstack/react-query';
import { LinearGradient } from 'expo-linear-gradient';

const baseURL = process.env.NODE_ENV === 'production' ? process.env.EXPO_PUBLIC_API_URL : 'http://10.8.0.2:4002';
const model = 'x_mobile_headline_news';
const selectedFields = {
    x_name: true,
    x_studio_description: true,
    x_studio_gambar: true,
    create_date: {},
};
const DEFAULT_LIMIT = 20;




const RenderItem = ({ item }) => {
    const router = useRouter();


    return (<View className=' flex-col bg-white my-2 rounded-lg h-52 mx-2'>
        <Pressable onPress={() => router.push(`/portal/headline-news/${item.id}`)}>
            <ImageBackground
                source={{ uri: `${baseURL}/web/image?model=${model}&id=${item.id}&field=x_studio_gambar` }}
                resizeMode="cover"
                className="rounded-lg overflow-hidden"
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'relative'
                }}
            >
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>

                    <LinearGradient
                        colors={['rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0, 0.5)', 'transparent']}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 0, y: 0 }}
                        style={{ height: '100%' }}
                    >
                        <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>

                            <View className=" p-2 pt-6">
                                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
                                    {item.x_name}
                                </Text>
                                <Text style={{ color: '#fff', fontSize: 12 }}>
                                    {item.x_studio_description}
                                </Text>
                            </View>

                        </View>
                    </LinearGradient>



                </View>
            </ImageBackground>
        </Pressable>

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
                    backPath="/"
                    title="HUMAS - DEO AIRPORT"
                    subtitle="KUMPULAN INFORMASI DAN BERITA"
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
                backPath="/"
                title="HUMAS - DEO AIRPORT"
                subtitle="KUMPULAN INFORMASI DAN BERITA"
            />



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
                        <View className='flex-row justify-between h-16 items-center px-8 py-4 bg-white '>
                            <Text className=' text-red-700'>{`halaman ${loadedPages} dari ${totalPages}`}</Text>
                            <Text className=' text-red-700'>{`items ${loadedPages == totalPages ? totalData : loadedPages * DEFAULT_LIMIT} of ${totalData}`}</Text>
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
