import React, { Fragment, useCallback } from "react";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, Platform, Image } from 'react-native';
import { classNames } from '@/utils';
import * as Updates from 'expo-updates';

import Aaaaa from '@/assets/images/about-us.jpg';
import Adfsdfsdfsd from '@/assets/icon-baru.png';
import createRequest from '@/core/api';

// STATE MANAGEMENT
import internalUserActions from '@/state/internalUser/internalUserSlice';
import { useDispatch, useSelector } from 'react-redux';

const { post } = createRequest();




export default function MainHeader() {
    const router = useRouter();
    const dispatch = useDispatch();
    const {  user } = useSelector((state) => state.internalUser);
    const {
        currentlyRunning,
        isUpdateAvailable,
        isUpdatePending
    } = Updates.useUpdates();



    const goToMyAccount = useCallback(() => {
        router.replace(`/my-account`);
    }, [router]);


    const handleUpdate = useCallback(async () => {
        try {
            await Updates.reloadAsync();
        } catch (e) {
            console.log("Update error:", e);
        }
    }, []);


    return (
        <Fragment>
            <View className={classNames('bg-white px-4 pb-4 flex-row justify-between border-b border-red-800/25', Platform.OS === 'android' ? "pt-8" : "pt-16")}>
                <View className="flex-col items-start space-y-0">
                    <Text className="text-red-700 text-xl font-extrabold ">DEO AIRPORT</Text>
                    <Text className="text-red-700 text-sm leading-4 ">TERDEPAN - BERKUALITAS - BERSINAR</Text>
                </View>
                <View className="flex-row items-center space-x-8">
                    <Image source={Adfsdfsdfsd} style={{ width: 100, height: 40 }} />
                    {user && (<View>
                        <TouchableOpacity onPress={goToMyAccount}>
                            <Image source={Aaaaa} style={{ width: 40, height: 40, borderRadius: 20 }} />
                        </TouchableOpacity>
                    </View>)}
                </View>
            </View>
            {isUpdateAvailable && (<View className="bg-red-800 flex-row justify-between px-4 py-2">
                <Text className="text-white font-medium">
                    Versi baru tersedia. 
                </Text>
                <TouchableOpacity onPress={handleUpdate}>
                    <Text className="text-white font-bold underline">
                        PERBAHARUI
                    </Text>
                </TouchableOpacity>
            </View>)}

        </Fragment>
    );
}

