import React, { useCallback, useMemo } from 'react';
import { View, Text, Button, TouchableOpacity, StatusBar, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import { Stack } from 'expo-router';
import { classNames } from '@/utils';

// STATE MANAGEMENT
import authActions from '@/state/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';

//FORM COMPONENT
import CharInput from '@/components/form/CharInput';
import Many2OneInput from '@/components/form/Many2OneInput';


export default function AmcIndex() {
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useDispatch();
    const { tokenInternal, userInternal } = useSelector((state) => state.auth);


    return (
        <ScrollView className="flex-1 p-4">
            <CharInput />
            <Many2OneInput/>
            
        </ScrollView>
    );
}
