import React, { Fragment, useCallback } from 'react';
import { View, Text, Pressable } from 'react-native';
import InternalHeader from '@/components/ui/app-internal/header';

import { useDispatch, useSelector } from 'react-redux';
import internalUserActions from '@/state/internalUser/internalUserSlice';



const MyAccount = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.internalUser);

    const logout = useCallback(() => {
        dispatch(internalUserActions.logout());
    }, [dispatch]);


    return (
        <Fragment>
            <InternalHeader
                backPath='/app-restricted-internal'
                title={user?.name}
                subtitle={user?.job_id?.display_name}
            />
            <View className=' flex-1 justify-center items-center bg-white'>
                <Pressable onPress={() => logout()} className='ml-4'>
                    <Text> LOG OUT </Text>
                </Pressable>

            </View>
        </Fragment>
    );
};



export default MyAccount;