import React, { useCallback, useMemo } from 'react';
import { View, Text, TouchableOpacity, StatusBar, Platform, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import { Stack } from 'expo-router';
import { classNames } from '@/utils';

// STATE MANAGEMENT
import internalUserActions from '@/state/internalUser/internalUserSlice';
import { useDispatch, useSelector } from 'react-redux';
const rootPath = '/my-account';




export default function MyAccount() {
    const baseURL = process.env.NODE_ENV === "production" ? process.env.EXPO_PUBLIC_API_URL : "http://10.8.0.2:4002";
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.internalUser);
    const menu = [
        { icon: 'home-outline', label: 'KEHADIRAN', path: `${rootPath}`, exact: true, headerTitle: "MONITORING KEHADIRAN" },
        { icon: 'link-outline', label: 'TARGET KPI', path: `${rootPath}/kpi`, exact: true, headerTitle: "TARGET KINERJA (KPI)" },
        { icon: 'business-outline', label: 'REALISASI KPI', path: `${rootPath}/task`, exact: false, headerTitle: "INTERNAL OPERASIONAL" },
        { icon: 'person-add-outline', label: 'DOKUMENT', path: `${rootPath}/files`, exact: false, headerTitle: "FILES" },
        { icon: 'bug-outline', label: 'SETTING', path: `${rootPath}/settings`, exact: false, headerTitle: "PENGATURAN LANJUTAN" },

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
            dispatch(internalUserActions.logout(data));
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
                <View className='flex-row items-center space-x-8'>
                                    <View className={classNames('',  'flex flex-end items-end mr-4')}>
                                        <Text className="text-white text-lg font-bold ">{user.name}</Text>
                                        <Text className="text-white text-sm leading-4">{user.job_id?.display_name}</Text>
                                    </View>
                                    <View>
                                                        <TouchableOpacity onPress={()=>router.push(`/my-account`)}>
                                                            <Image source={{uri : `${baseURL}/web/image?model=hr.employee&id=${user.id}&field=avatar_128`}} style={{ width: 40, height: 40, borderRadius: 20 }} />
                                                        </TouchableOpacity>
                                                    </View>
                                </View>
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
