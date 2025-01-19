import React, { useCallback } from "react";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, Platform, Image } from 'react-native';
import { classNames } from '@/utils';


import Aaaaa from '@/assets/images/about-us.jpg';
import Adfsdfsdfsd from '@/assets/icon-baru.png';
import createRequest from '@/core/api';

// STATE MANAGEMENT
import authActions from '@/state/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';

const { post } = createRequest();




export default function MainHeader() {
    const router = useRouter();
    const dispatch = useDispatch();
    const { tokenInternal, userInternal } = useSelector((state) => state.auth);



    const goToMyAccount = useCallback(() => {
        router.replace(`/my-account`);
    }, [router]);


    return (

        <View className={classNames('bg-white px-4 pb-4 flex-row justify-between border-b border-red-800/25', Platform.OS === 'android' ? "pt-8" : "pt-16")}>
            <View className="flex-col items-start space-y-0">
                <Text className="text-red-700 text-xl font-extrabold ">DEO AIRPORT</Text>
                <Text className="text-red-700 text-sm leading-4 ">TERDEPAN - BERKUALITAS - BERSINAR</Text>
            </View>
            <View className="flex-row items-center space-x-8">
                <Image source={Adfsdfsdfsd} style={{ width: 100, height: 40 }} />
                {userInternal && (<View>
                    <TouchableOpacity onPress={goToMyAccount}>
                        <Image source={Aaaaa} style={{ width: 40, height: 40, borderRadius: 20 }} />
                    </TouchableOpacity>
                </View>)}
            </View>
        </View>




    );
}

