import React, { useState, useCallback, Fragment, useEffect } from 'react';
import { View, Text, TouchableOpacity, Platform, TextInput, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from '@/utils';
// STATE MANAGEMENT
import externalUserActions from '@/state/externalUser/externalUserSlice';



export default function SelectCompany() {
    return (<View className=' flex-col items-center justify-center space-y-0 mt-8'>
        <Text>COMPANY</Text>
    </View>)

}











