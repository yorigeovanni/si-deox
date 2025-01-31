import React, { useCallback, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Platform, FlatList, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { classNames } from "@/utils";
import { useRouter, usePathname } from "expo-router";
import { useDispatch, useSelector } from 'react-redux';
import ExternalHeader from '@/components/external/header';
import externalUserActions from '@/state/externalUser/externalUserSlice';



const basePath = "/app-restricted-external/operator-airlines";
const colorMap = {
    "border-blue-600": "#2563eb",
    "border-pink-600": "#db2777",
    "border-yellow-600": "#ca8a04",
    "border-amber-600": "#d97706",
    "border-red-600": "#dc2626",
    "border-purple-600": "#7e22ce",
    "border-green-600": "#16a34a",
};

export default function IndexOperatorAirlines() {
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.externalUser);
    const { width: screenWidth } = Dimensions.get("window");
    const menuItems = [
        {
            name: "DASHBOARD AIRLINES",
            icon: "information-circle-outline",
            bgColor: "bg-blue-600",
            borderColor: "border-blue-600",
            route: `${basePath}`,
        },
        {
            name: "REKON DATA ANGKUTAN UDARA",
            icon: "document-attach-outline",
            bgColor: "bg-pink-600",
            borderColor: "border-pink-600",
            route: `${basePath}/data-angkutan-udara`,
        },
        {
            name: "INFORMASI TAGIHAN",
            icon: "folder-open-outline",
            bgColor: "bg-yellow-600",
            borderColor: "border-yellow-600",
            route: `${basePath}/data-informasi-berkala`,
        },
        {
            name: "INFORMASI PEMBAYARAN",
            icon: "folder-open-outline",
            bgColor: "bg-yellow-600",
            borderColor: "border-yellow-600",
            route: `${basePath}/data-informasi-setiap-saat`,
        },
        {
            name: "PERSONIL",
            icon: "folder-open-outline",
            bgColor: "bg-yellow-600",
            borderColor: "border-yellow-600",
            route: `${basePath}/data-informasi-setiap-saat`,
        },
    ];



    const logout = useCallback(()=>{
        dispatch(externalUserActions.logout())
    },[dispatch])


    const itemWidth = useMemo(() => {
        const totalHorizontalSpace = 32;
        const availableWidth = screenWidth - totalHorizontalSpace;
        // 4 item per 'halaman':
        return availableWidth / 4;
    }, [screenWidth]);


    const renderItem = ({ item }) => {
        const isActive = pathname === item.route;
        const iconColor = isActive ? "#ffffff" : colorMap[item.borderColor] || "#000000";

        return (
            <TouchableOpacity
                onPress={() => router.push(item.route)}
                style={{
                    width: itemWidth,
                    alignItems: "center",
                    marginRight: 8, // jarak antar item
                }}
            >
                <View
                    className={classNames(
                        "justify-center items-center rounded-lg p-4 border",
                        item.borderColor,
                        isActive ? item.bgColor : ""
                    )}
                >
                    <Ionicons name={item.icon} size={28} color={iconColor} />
                </View>
                <Text numberOfLines={2} className="mt-2 text-gray-800 text-xs text-center">
                    {item.name}
                </Text>
            </TouchableOpacity>
        );
    };


    return (
        <View className=' flex-1'>
            <ExternalHeader
                title={user.company?.name}
                subtitle={` PARTNER - DEO AIRPORT ${new Date().getFullYear()}`}
            />
            <ScrollView className="flex-1 bg-white">

                <View className="pt-4 pb-4 border-b border-gray-700/20">
                    <FlatList
                        data={menuItems}
                        horizontal
                        keyExtractor={(item, index) => `${item.name}-${index}`}
                        renderItem={renderItem}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingHorizontal: 16, // agar tidak mepet tepi
                        }}
                    />
                </View>

            </ScrollView>
            <View className='flex-row justify-between h-16 items-center px-8 py-4 bg-red-700 rounded-tl-lg rounded-tr-lg'>
                <View className=' flex-col'>
                    <Text className=' text-white text-base font-bold'>{user.name}</Text>
                </View>
                <View>
                    <TouchableOpacity className='flex-row items-center space-x-2' onPress={logout}>
                        <Text className="text-white text-sm font-extrabold">LOGOUT</Text>
                        <Ionicons name="chevron-forward-outline" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};


