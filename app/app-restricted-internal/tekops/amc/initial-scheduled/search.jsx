import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Header, SafeAreaView, Icon, ListItem, FilterSort, Text } from '@/components';
import { useRouter, useFocusEffect } from 'expo-router';
import { BaseStyle, BaseColor, useTheme } from '@/config';


const Search = () => {

    const { colors } = useTheme();
    const router = useRouter();
    return (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <Header
                title={'Search'}
                renderLeft={() => (<Icon name="arrow-left" size={20} color={colors.primary} enableRTL={true} />)}
                onPressLeft={() => router.back()}
            />
            <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'left']}>

            </SafeAreaView>
        </View>
    );
};


export default Search;


