import React, { Fragment, useCallback, useEffect } from "react";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { classNames } from '@/utils';
import { Ionicons } from '@expo/vector-icons';



export default function PortalHeader({
    backPath = '/',
    title = 'DEO AIRPORT',
    subtitle = 'APLIKASI INTERNAL OPERASIONAL',
    isBack = false
}) {

    const router = useRouter();
    const onBackCustom = useCallback(() => {
        if (isBack) {
            router.back();
        } else {
            router.replace(backPath);
        }
    }, [router, backPath, isBack]);


    return (
        <Fragment>
            <View className={classNames('bg-red-700 px-4 flex-row justify-between rounded-br-lg rounded-bl-lg')}>

                <TouchableOpacity className='flex-row items-center space-x-2' onPress={() => onBackCustom()}>
                    <Ionicons name="chevron-back-outline" size={24} color="#fff" />
                    <Text className="text-white text-sm font-extrabold">KEMBALI</Text>
                </TouchableOpacity>



                <View className="flex-col items-end py-2">
                    <Text className="text-white text-xl font-extrabold ">{title}</Text>
                    <Text className="text-white text-sm font-bold ">{subtitle}</Text>
                </View>
            </View>
        </Fragment>
    );
}

