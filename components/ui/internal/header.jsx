import React, { Fragment, useCallback, useEffect } from "react";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { classNames } from '@/utils';
import { Ionicons } from '@expo/vector-icons';



export default function InternalHeader({
    backPath = '/', 
    title = 'DEO AIRPORT', 
    subtitle = 'APLIKASI INTERNAL OPERASIONAL',
    isBack = false
}) {
    
    const router = useRouter();
    const onBackCustom = useCallback(() => {
        if(isBack) {
            router.back();
        }else{
            router.replace(backPath);
        }
    }, [router, backPath, isBack]);


    return (
        <Fragment>
            <View className={classNames('bg-white px-4 pb-4 flex-row justify-between  border-b border-gray-200', Platform.OS === 'android' ? "pt-8" : "pt-16")}>
                <View className='flex-row items-center space-x-6 mr-8'>
                    <TouchableOpacity onPress={() => onBackCustom()}>
                        <Ionicons name="arrow-back" size={28} color="#991b1b" />
                    </TouchableOpacity>
                </View>
                <View className="flex-col items-end space-y-0">
                    <Text className="text-red-700 text-xl font-extrabold ">{title}</Text>
                    <Text className="text-red-700 text-sm leading-4 ">{subtitle}</Text>
                </View>
            </View>
        </Fragment>
    );
}

