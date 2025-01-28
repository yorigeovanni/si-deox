import React, { useCallback, useMemo } from 'react';
import { View, Text, TouchableOpacity, StatusBar, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import { Stack } from 'expo-router';
import { classNames } from '@/utils';

// STATE MANAGEMENT
import authActions from '@/state/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
const rootPath = '/portal-penerbangan';




export default function Statistik() {
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useDispatch();
    const { tokenInternal, userInternal } = useSelector((state) => state.auth);

    const menu = [
        {
            icon: 'airplane-takeoff',
            label: 'DEPARTURES',
            path: `${rootPath}`,
            exact: true,
            headerTitle: 'DEPARTURE FLIGHTS',
          },
          {
            icon: 'airplane-landing',
            label: 'ARRIVALS',
            path: `${rootPath}/kedatangan`,
            exact: true,
            headerTitle: 'ARRIVAL FLIGHTS',
          },
         
      ];


    const textHeader = useCallback(() => {
        const item = menu.find((item) => pathname == item.path);
        if (item?.exact) {
            return item?.headerTitle;
        }
        return item ? item.headerTitle : '';
    }, [pathname])


    const navigation = useCallback((path) => {
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
            <View className={classNames('bg-red-800 pb-5 px-4 flex-row justify-between')}>

                <View className="flex-row items-center">
                    <TouchableOpacity className="bg-white rounded-full p-2" onPress={() => router.replace('/')}>
                        <Ionicons name="arrow-back" size={24} color="red" />
                    </TouchableOpacity>
                </View>
                <View className={classNames('', tokenInternal ? 'flex items-center justify-center' : 'flex flex-end items-end')}>
                    <Text className="text-white text-lg font-bold ">{textHeader()}</Text>
                    <Text className="text-white text-sm leading-4">DEO AIRPORT - SOQ</Text>
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
                        <MaterialCommunityIcons
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
