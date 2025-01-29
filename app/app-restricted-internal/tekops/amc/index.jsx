import React, { Fragment, useCallback, useMemo } from 'react';
import { View, Text, Button, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import InternalHeader from '@/components/internal/header';

// STATE MANAGEMENT
import { useDispatch, useSelector } from 'react-redux';
const rootPath = '/app-restricted-internal/amc';




export default function AmcUnscheduledIndex() {
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useDispatch();
    const { tokenInternal, userInternal } = useSelector((state) => state.auth);
    const menu = [
        {
            icon: 'time-outline',
            label: 'SCHEDULED',
            path: `berjadwal`,
        },
        {
            icon: 'airplane-outline',
            label: 'UN-SCEDULED',
            path: `unsceduled`,
        },
        {
            icon: 'business-outline',
            label: 'OPERATOR',
            path: `operator`,
        },
        {
            icon: 'location-outline',
            label: 'BANDARA',
            path: `airport`,
        },
        {
            icon: 'pause-circle-outline',
            label: 'PARKING STAND',
            path: `parking-stand`,
        },

        {
            icon: 'book-outline',
            label: 'LOG-BOOK',
            path: `log-book`,
        },
        {
            icon: 'book-outline',
            label: 'SOP',
            path: `log-book`,
        },
        {
            icon: 'book-outline',
            label: 'LAPORAN',
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
            icon: 'calendar-number-outline',
            label: 'ASSETS',
            path: `jadwal-dinas`,
        },
        {
            icon: 'calendar-number-outline',
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
        <Fragment>
            <InternalHeader 
                    backPath='/app-restricted-internal/tekops'
                    title="DASHBOARD - UNIT AMC"
                    subtitle="SUMMARY REPORT - UNIT AMC"
                    />
            <View className="flex-1 bg-white">
            {/**<Text className="text-2xl font-bold text-red-800 mt-4 mx-4">UNIT AMC</Text>
            <View className=" w-full items-start py-4 border-b border-gray-200">
                <FlatList
                    horizontal
                    data={menu}
                    renderItem={renderMenuItem}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={{ paddingHorizontal: 16 }}
                    showsHorizontalScrollIndicator={false}
                />
            </View> */}

            <ScrollView className="flex-1">

            </ScrollView>
        </View>

        </Fragment>
        

    );
}
