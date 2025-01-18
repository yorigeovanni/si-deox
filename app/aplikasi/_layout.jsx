import React, { useCallback, useMemo } from 'react';
import { View, Text, TouchableOpacity, StatusBar, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import { Stack } from 'expo-router';
import { classNames } from '@/utils';

// STATE MANAGEMENT
import authActions from '@/state/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
const rootPath = '/aplikasi';




export default function Statistik() {
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useDispatch();
    const { tokenInternal, userInternal } = useSelector((state) => state.auth);

    const menu = [
        { icon: 'home-outline', label: 'HOME', path: `${rootPath}`, exact: true, headerTitle: "PENTING UNTUK DIKETAHUI" },
        { icon: 'link-outline', label: 'EXTERNAL', path: `${rootPath}/external`, exact: true, headerTitle: "REKONSILIASI MITRA" },
        { icon: 'business-outline', label: 'INTERNAL', path: `${rootPath}/internal`, exact: false, headerTitle: "INTERNAL OPERASIONAL" },
        { icon: 'person-add-outline', label: 'REGISTRASI', path: `${rootPath}/registrasi`, exact: false, headerTitle: "REGISTRASI PERSONIL MITRA" },
        { icon: 'bug-outline', label: 'BUG REPORT', path: `${rootPath}/bug-report`, exact: false, headerTitle: "LAPORKAN MASALAH" },

    ];


    const textHeader = useCallback(() => {
        const item = menu.find((item) => pathname == item.path);
        if (item?.exact) {
            return item?.headerTitle;
        }
        return item ? item.headerTitle : '';
    }, [pathname])


    const navigation = useCallback((path) => {
        // router.push('./add', { relativeToDirectory: true })
        router.replace(path);
    }, [router]);


    const logout = useCallback(
        (data) => {
          dispatch(authActions.logoutInternal(data));
        },
        [dispatch]
      );
    



    return (
        <View className="flex-1 bg-gray-200">
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            {/* Header */}
            <View className={classNames('bg-red-800 pb-5 px-4 flex-row justify-between', Platform.OS === 'android' ? "pt-8" : "pt-16")}>

                <View className="flex-row items-center">
                    <TouchableOpacity className="bg-white rounded-full p-2" onPress={() => router.replace('/')}>
                        <Ionicons name="arrow-back" size={24} color="red" />
                    </TouchableOpacity>
                </View>
                <View className={classNames('', tokenInternal ? 'flex items-center justify-center' : 'flex flex-end items-end')}>
                    <Text className="text-white text-lg font-bold ">APLIKASI - {textHeader()}</Text>
                    <Text className="text-white text-sm leading-4">BLU UPBU KELAS I DEO - SORONG</Text>
                </View>
                {tokenInternal && (<View className="flex-row items-center">
                    <Text className="text-white text-sm">{userInternal?.nama}</Text>
                    <TouchableOpacity className="bg-white rounded-full p-2 ml-2" onPress={() => logout()}>
                        <Ionicons name="log-out" size={24} color="red" />
                    </TouchableOpacity>
                </View>)}
            </View>

            <Stack screenOptions={{ headerShown: false }} />

            {/* Bottom Navigation */}
            <View className="flex-row justify-around bg-red-800 pt-3 pb-6">
                {menu.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        className="items-center"
                        onPress={() => navigation(item.path)}
                    >
                        <Ionicons
                            name={item.icon}
                            size={24}
                            color={
                                item.exact
                                    ? pathname === item.path
                                        ? '#ffffff'
                                        : '#ffffff'
                                    : pathname.includes(item.path)
                                        ? '#ffffff'
                                        : '#ffffff'
                            }
                        />
                        <Text
                            className={`text-sm ${item.exact
                                ? pathname === item.path
                                    ? 'text-white font-extrabold'
                                    : 'text-white'
                                : pathname.includes(item.path)
                                    ? 'text-white font-extrabold'
                                    : 'text-white'
                                }`}
                        >
                            {item.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}
