import React, { Fragment, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList, Dimensions } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import ExternalHeader from '@/components/external/header';
const screenWidth = Dimensions.get('window').width;
import externalUserActions from '@/state/externalUser/externalUserSlice';

export default function AmcIndex() {
  const { user } = useSelector((state) => state.externalUser);
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useDispatch();


    const logout = useCallback(()=>{
      dispatch(externalUserActions.logout())
    },[dispatch])


    return (
      <Fragment>
        <ExternalHeader 
          title={user.company?.name}
          subtitle={`Welcome, ${user.name}`}
        />
        <ScrollView className="flex-1 bg-white">
        <TouchableOpacity onPress={logout}>  
          <Text>Logout</Text>
        </TouchableOpacity>
        </ScrollView>
       
   
      </Fragment>
       
    );
}
