import React, { Fragment, useCallback, useEffect } from "react";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { classNames } from '@/utils';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView} from '@/components';




export default function InternalHeader({
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
        <SafeAreaView style={{width: '100%'}} edges={['top', 'left', 'right']}>
            <View className={classNames('bg-red-800 px-4 flex-row items-center justify-between rounded-bl-lg rounded-br-lg ')}>
                <TouchableOpacity className='flex-row items-center space-x-2' onPress={() => onBackCustom()}>
                    <Ionicons name="chevron-back-outline" size={24} color="#fff" />
                    <Text className="text-white text-sm font-extrabold">KEMBALI</Text>
                </TouchableOpacity>
                <View className="flex-col items-end py-2">
                    <Text className="text-white text-xl font-extrabold ">{title}</Text>
                    <Text className="text-white text-sm font-bold ">{subtitle}</Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

