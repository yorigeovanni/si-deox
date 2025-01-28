import React, { Fragment, useRef, useCallback, useState } from 'react';
import { useLocalSearchParams, useFocusEffect } from 'expo-router';
import { View, Text, ActivityIndicator } from 'react-native';
import WebView from 'react-native-webview';
import Header from '@/components/ui/portal/header';
import { useFindOne } from '@/services/portal/@default-query';


const baseURL = process.env.NODE_ENV === 'production' ? process.env.EXPO_PUBLIC_API_URL : 'http://10.8.0.2:4002';
const model = 'x_mobile_headline_news';
const selectedFields = {
    x_name: true,
    x_studio_description: true,
    write_date : true,
    write_uid : { 
        fields : {
            display_name : true
        }
    }

    
};

const HeadlineNews = ({ route }) => {
    const { id_record } = useLocalSearchParams();
    const firstTimeRef = useRef(true);
    const [loadingWebView, setLoadingWebView] = useState(true);
    const { data, isLoading, isError, error, refetch } = useFindOne({
        model: model,
        fields: selectedFields,
        domain: [['id', '=', id_record]]
    });



    useFocusEffect(useCallback(() => {
        if (firstTimeRef.current) {
            firstTimeRef.current = false;
            return;
        }
        refetch();
    }, [])
    );



    const handleOnMessage = useCallback((event) => {
        const { data } = event.nativeEvent;
        if (data === 'PAGE_LOADED') {
            setLoadingWebView(false);
        }
    }, [setLoadingWebView]);



    if (isLoading) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }

    if (isError) {
        return (
            <View>
                <Text>ERROR...</Text>
            </View>
        );
    }

    console.log(data)



    return (
        <View className='flex-1 bg-white'>
            <Header
                title={data.x_name}
                isBack={true}
                subtitle={`${data.write_date} - ${data.write_uid.display_name} `}
            />
            <View className=' flex-1 mx-2 bg-white'>
                {loadingWebView && (
                    <View className='bg-white' style={{ position: 'absolute', zIndex: 1, width: '100%', height: '100%', justifyContent: 'center' }}>
                        <ActivityIndicator size="large" color="#000" />
                    </View>
                )}

                <WebView
                    originWhitelist={['*']}
                    source={{ uri: `${baseURL}/mobile/api/portal/content/headline-news/${id_record}` }}
                    injectedJavaScript={`
                        document.body.style.overflow = 'hidden';
                        const style = document.createElement('style');
                        style.innerHTML = \`::-webkit-scrollbar { display: none; }\`;
                        document.head.appendChild(style);
                        true;
                      `}
                    scrollEnabled={false}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    onMessage={handleOnMessage}
                />
            </View>
            <View className=' flex-row justify-between px-4 bg-gray-200 py-6'>
                <Text className=' ml-8'>PREV</Text>
                <Text className=' mr-8'>NEXT </Text>
            </View>
        </View>

    );
};



export default HeadlineNews;