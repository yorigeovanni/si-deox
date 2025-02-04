import React, { useState } from 'react';
import {View, ScrollView, FlatList, Animated, TouchableOpacity, StyleSheet } from 'react-native';
import { BaseColor, useTheme, BaseStyle } from '@/config';
import { Header, SafeAreaView, Icon, Text,  Image,  Tag } from '@/components';
import { useTranslation } from 'react-i18next';
import * as Utils from '@/utils';
import { Placeholder, PlaceholderLine, Progressive, PlaceholderMedia } from 'rn-placeholder';
import FlightCardBlue from '@/assets/amc.avif';
import { useRouter, useFocusEffect } from 'expo-router';



export default function ProductDetail({ navigation, route }) {
    const router = useRouter();
    const { t } = useTranslation();
    const { colors } = useTheme();
    const deltaY = new Animated.Value(0);
    const [loading, setLoading] = useState(false);
    
    const categories = [
        {
            "color": "#5DADE2",
            "icon": "snowboarding",
            "title": "SCHEDULED",
            "path": "/app-restricted-internal/tekops/amc/initial-scheduled"
        },
        {
            "color": "#A569BD",
            "icon": "music",
            "title": "UN-SCHEDULED",
            "path": "/app-restricted-internal/tekops/elban"
        },
        {
            "color": "#5DADE2",
            "icon": "star",
            "title": "AIRPORT",
            "path": "/app-restricted-internal/tekops/bangland"
        },
        {
            "color": "#58D68D",
            "icon": "futbol",
            "title": "PARKING STAND",
            "path": "/app-restricted-internal/tekops/pkp-pk"
        },
        {
            "color": "#5D6D7E",
            "icon": "bullseye",
            "title": "AIRCRAFT TYPE",
            "path": "/app-restricted-internal/tekops/avsec"
        },
        {
            "color": "#5D6D7E",
            "icon": "bullseye",
            "title": "OPERATOR",
            "path": "/app-restricted-internal/tekops/avsec"
        },

    ];
    const [collapseHour, setCollapseHour] = useState(false);
    const [heightHeader, setHeightHeader] = useState(Utils.heightHeader());
    const heightImageBanner = Utils.scaleWithPixel(250, 1);






    const goToApp = (path) => {
        router.push(path);
    };


    const renderBanner = () => {

        if (loading) {
            return (
                <Placeholder Animation={Progressive}>
                    <Animated.View
                        style={[
                            styles.imgBanner,
                            {
                                height: deltaY.interpolate({
                                    inputRange: [
                                        0,
                                        Utils.scaleWithPixel(140),
                                        Utils.scaleWithPixel(140),
                                    ],
                                    outputRange: [heightImageBanner, heightHeader, heightHeader],
                                }),
                            },
                        ]}>
                        <PlaceholderMedia style={{ width: '100%', height: '100%' }} />
                    </Animated.View>
                </Placeholder>
            );
        }

        return (
            <Animated.View
                style={[
                    styles.imgBanner,
                    {
                        height: deltaY.interpolate({
                            inputRange: [
                                0,
                                Utils.scaleWithPixel(140),
                                Utils.scaleWithPixel(140),
                            ],
                            outputRange: [heightImageBanner, heightHeader, heightHeader],
                        }),
                    },
                ]}>
                <Image
                    source={FlightCardBlue}
                    style={{ width: '100%', height: '100%' }}
                />
                <Animated.View
                    style={{
                        position: 'absolute',
                        bottom: 15,
                        left: 20,
                        flexDirection: 'row',
                        opacity: deltaY.interpolate({
                            inputRange: [
                                0,
                                Utils.scaleWithPixel(140),
                                Utils.scaleWithPixel(140),
                            ],
                            outputRange: [1, 0, 0],
                        }),
                    }}>
                    <Image source={124} style={styles.userIcon} />
                    <View>
                        <Text headline semibold whiteColor>
                            YORI GEOVANNI
                        </Text>
                        <Text footnote whiteColor>
                            082291914470
                        </Text>
                    </View>
                </Animated.View>
            </Animated.View>
        );
    };



    const renderCategory = () => {
        if (categories.length > 0) {
            return (
                <FlatList
                    contentContainerStyle={{
                        paddingLeft: 5,
                        paddingRight: 20,
                        marginTop: 5,
                    }}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={categories}
                    keyExtractor={(item, index) => `Category ${index}`}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity
                                style={{ alignItems: 'center', paddingHorizontal: 20 }}
                                onPress={() => goToApp(item.path)}>
                                <View
                                    style={[
                                        styles.categoryContent,
                                        { backgroundColor: item.color + '4D' },
                                    ]}>
                                    <Icon name={item.icon} size={32} color={item.color} />
                                </View>
                                <Text
                                    footnote
                                    style={{
                                        marginTop: 10,
                                    }}>
                                    {item.title}
                                </Text>
                            </TouchableOpacity>
                        );
                    }}
                />
            );
        }

        return (
            <FlatList
                contentContainerStyle={{
                    marginTop: 20,
                }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={[1, 2, 3, 4, 5, 6]}
                keyExtractor={(item, index) => `Category ${index}`}
                renderItem={({ item, index }) => {
                    return (
                        <View style={{ paddingHorizontal: 20 }}>
                            <Placeholder Animation={Progressive}>
                                <View style={{ alignItems: 'center' }}>
                                    <PlaceholderMedia style={styles.categoryContent} />
                                    <PlaceholderLine
                                        style={{ width: 50, height: 8, marginTop: 10 }}
                                    />
                                </View>
                            </Placeholder>
                        </View>
                    );
                }}
            />
        );
    };

    const renderContent = () => {
        if (loading) {
            return (
                <ScrollView
                    onScroll={Animated.event(
                        [
                            {
                                nativeEvent: {
                                    contentOffset: { y: deltaY },
                                },
                            },
                        ],
                        { useNativeDriver: false },
                    )}
                    onContentSizeChange={() => {
                        setHeightHeader(Utils.heightHeader());
                    }}
                    scrollEventThrottle={8}>
                    <View style={{ height: 255 - heightHeader }} />
                    <Placeholder Animation={Progressive}>
                        <View
                            style={{
                                paddingHorizontal: 20,
                                marginBottom: 20,
                            }}>
                            <PlaceholderLine style={{ width: '50%', marginTop: 10 }} />
                            <PlaceholderLine style={{ width: '70%' }} />
                            <PlaceholderLine style={{ width: '40%' }} />
                            <View style={styles.line}>
                                <PlaceholderMedia style={styles.contentIcon} />
                                <View style={{ marginLeft: 10, flex: 1, paddingTop: 10 }}>
                                    <PlaceholderLine style={{ width: '40%' }} />
                                </View>
                            </View>
                            <View style={styles.line}>
                                <PlaceholderMedia style={styles.contentIcon} />
                                <View style={{ marginLeft: 10, flex: 1, paddingTop: 10 }}>
                                    <PlaceholderLine style={{ width: '40%' }} />
                                </View>
                            </View>
                            <View style={styles.line}>
                                <PlaceholderMedia style={styles.contentIcon} />
                                <View style={{ marginLeft: 10, flex: 1, paddingTop: 10 }}>
                                    <PlaceholderLine style={{ width: '40%' }} />
                                </View>
                            </View>
                            <View style={styles.line}>
                                <PlaceholderMedia style={styles.contentIcon} />
                                <View style={{ marginLeft: 10, flex: 1, paddingTop: 10 }}>
                                    <PlaceholderLine style={{ width: '40%' }} />
                                </View>
                            </View>
                            <View style={styles.line}>
                                <PlaceholderMedia style={styles.contentIcon} />
                                <View style={{ marginLeft: 10, flex: 1, paddingTop: 10 }}>
                                    <PlaceholderLine style={{ width: '40%' }} />
                                </View>
                            </View>
                            <PlaceholderLine
                                style={{ width: '100%', height: 250, marginTop: 20 }}
                            />
                        </View>
                    </Placeholder>
                </ScrollView>
            );
        }
        return (
            <ScrollView
                onScroll={Animated.event(
                    [
                        {
                            nativeEvent: {
                                contentOffset: { y: deltaY },
                            },
                        },
                    ],
                    { useNativeDriver: false },
                )}
                onContentSizeChange={() => {
                    setHeightHeader(Utils.heightHeader());
                }}
                scrollEventThrottle={8}>
                <View style={{ height: 225 - heightHeader }} />
                <View>
                    {renderCategory()}
                </View>
            </ScrollView>
        );
    };






    return (
        <View style={{ flex: 1 }}>
            {renderBanner()}
            <Header
                title=" UNIT AMC"
                renderLeft={() => {
                    return (
                        <Icon name="arrow-left" size={20} color={BaseColor.whiteColor} />
                    );
                }}
                renderRight={() => {
                    return <Icon name="images" size={20} color={BaseColor.whiteColor} />;
                }}
                onPressLeft={() => {
                    router.back();
                }}
                onPressRight={() => {

                }}
            />
            <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'left']}>
                {renderContent()}
            </SafeAreaView>
        </View>
    );
}




const styles = StyleSheet.create({
    categoryContent: {
        width: 60,
        height: 60,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    centerView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imgBanner: {
        width: '100%',
        height: 250,
        position: 'absolute',
    },
    lineSpace: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    rateLine: {
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    line: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    contentIcon: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    userIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'white',
        marginRight: 5,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    contentInforAction: {
        marginLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
    },
    lineWorkHours: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        justifyContent: 'space-between',
        borderBottomWidth: 1,
    },
    wrapContent: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        marginHorizontal: 20,
        borderBottomWidth: 1,
        paddingBottom: 20,
    },
    contentDescription: {
        marginHorizontal: 20,
        paddingBottom: 20,
        borderBottomWidth: 0.5,
    },
});

