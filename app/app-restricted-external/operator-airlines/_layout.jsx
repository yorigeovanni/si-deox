import React, { Fragment, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList, Dimensions } from 'react-native';
import { useRouter, usePathname, Stack } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';

const screenWidth = Dimensions.get('window').width;
import externalUserActions from '@/state/externalUser/externalUserSlice';

export default function AmcIndex() {
    const { user } = useSelector((state) => state.externalUser);
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useDispatch();


    const logout = useCallback(() => {
        dispatch(externalUserActions.logout())
    }, [dispatch])


    return (
        <Stack screenOptions={{ headerShown: false }} />
    );
}
