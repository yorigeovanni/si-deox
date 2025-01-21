import React, { useCallback, useMemo } from 'react';
import { View, Text, Button, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import { classNames } from '@/utils';

// STATE MANAGEMENT
import { useDispatch, useSelector } from 'react-redux';
const rootPath = '/app-restricted-internal/elban';




export default function AmcIndex() {
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useDispatch();
    const { tokenInternal, userInternal } = useSelector((state) => state.auth);
    const menu = [
        {
            icon: 'briefcase-outline',
            label: 'FASILTAS',
            path: `unsceduled`,
        },
        {
            icon: 'construct-outline',
            label: 'PERALATAN',
            path: `berjadwal`,
        },
        {
            icon: 'hammer-outline',
            label: 'PEMELIHARAAN',
            path: `operator`,
        },
        {
            icon: 'alert-circle-outline',
            label: 'KERUSAKAN',
            path: `airport`,
        },
        {
            icon: 'build-outline',
            label: 'PERBAIKAN',
            path: `parking-stand`,
        },
        {
            icon: 'build-outline',
            label: 'SUKU CADANG',
            path: `parking-stand`,
        },
        {
            icon: 'build-outline',
            label: 'PERSEDIAAN',
            path: `parking-stand`,
        },
        {
            icon: 'build-outline',
            label: 'TIKET ORDER',
            path: `parking-stand`,
        },
        {
            icon: 'build-outline',
            label: 'LAPORAN',
            path: `parking-stand`,
        },
        {
            icon: 'build-outline',
            label: 'SOP',
            path: `parking-stand`,
        },
        {
            icon: 'book-outline',
            label: 'LOG-BOOK',
            path: `log-book`,
        },
        {
            icon: 'people-outline',
            label: 'PERSONIL',
            path: `personil`,
        },
        {
            icon: 'calendar-number-outline',
            label: 'JADWAL-DINAS',
            path: `jadwal-dinas`,
        },
        {
            icon: 'albums-outline',
            label: 'ASSETS',
            path: `jadwal-dinas`,
        },
        {
            icon: 'document-outline',
            label: 'FILES',
            path: `jadwal-dinas`,
        },
    ];


    const renderMenuItem = ({ item }) => {
        return (
            <TouchableOpacity
                className="items-center mr-10"
                onPress={() => router.push(`${rootPath}/${item.path}`)}
            >
                <View className="bg-red-700 justify-center items-center rounded-full p-4 border border-red-800">
                    <Ionicons name={item.icon} size={35} color="#ffffff" />
                </View>
                <Text className="mt-1 text-red-700 text-sm">{item.label}</Text>
            </TouchableOpacity>
        );
    };






    return (
        <View className="flex-1 bg-white">
            <Text className="text-2xl font-bold text-red-800 mt-4 mx-4">UNIT ELBAN</Text>
            <View className=" w-full items-start py-4 border-b border-gray-200">
                <FlatList
                    horizontal
                    data={menu}
                    renderItem={renderMenuItem}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={{ paddingHorizontal: 16 }}
                    showsHorizontalScrollIndicator={false}
                />
            </View>

            <ScrollView className="flex-1">

            </ScrollView>
        </View>

    );
}
