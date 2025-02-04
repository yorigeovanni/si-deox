import React, { useState, useEffect } from 'react';
import {View, ScrollView, FlatList, Animated, TouchableOpacity, Linking,
    Alert,
    Platform,
    Dimensions,
    StyleSheet
} from 'react-native';
import { BaseColor, useTheme, BaseStyle } from '@/config';
import {
    Header,
    SafeAreaView,
    Icon,
    Text,
    Image,
    Tag,
} from '@/components';
import { useTranslation } from 'react-i18next';
import * as Utils from '@/utils';
import {
    Placeholder,
    PlaceholderLine,
    Progressive,
    PlaceholderMedia,
} from 'rn-placeholder';
import FlightCardBlue from '@/assets/elban.png';
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
            "title": "PERALATAN",
            "path": "/app-restricted-internal/tekops/amc"
        },
        {
            "color": "#A569BD",
            "icon": "music",
            "title": "PEMELIHARAAN",
            "path": "/app-restricted-internal/tekops/elban"
        },
        {
            "color": "#5DADE2",
            "icon": "star",
            "title": "KERUSAKAN",
            "path": "/app-restricted-internal/tekops/bangland"
        },
        {
            "color": "#58D68D",
            "icon": "futbol",
            "title": "PERBAIKAN",
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
    const [product, setProduct] = useState({ "address": "02 West Street", "author": { "description": "Better and better", "email": "passionui@gmail.com", "id": undefined, "image": 43, "level": "Developer", "link": "passionui.com", "name": "Paul", "nickname": "paul", "rate": 5, "tag": "passionui", "token": undefined, "value": [[Object], [Object], [Object]] }, "category": { "color": "#a569bd", "count": undefined, "icon": "fas fa-calendar-alt", "id": 5, "image": { "full": 125, "thump": undefined }, "title": "Events", "type": "category" }, "createDate": "01-11-2020", "dateEstablish": "01-01-2020", "description": "Donec sollicitudin molestie malesuada. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Pellentesque in ipsum id orci porta dapibus.Pellentesque in ipsum id orci porta dapibus. Nulla porttitor accumsan tincidunt. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus.", "email": "nmulhollandq0@berkeley.edu", "favorite": true, "fax": "830-839-7510", "features": [{ "color": "#a569bd", "count": 65, "icon": "far fa-credit-card", "id": 12, "image": null, "title": "Credit Cards", "type": "feature" }, { "color": "#e5634d", "count": 148, "icon": "fas fa-bicycle", "id": 13, "image": null, "title": "Delivery", "type": "feature" }, { "color": "#e5634d", "count": 218, "icon": "fas fa-paw", "id": 15, "image": null, "title": "Dogs Allowed", "type": "feature" }, { "color": "#e5634d", "count": 301, "icon": "fas fa-parking", "id": 16, "image": null, "title": "Free Parking", "type": "feature" }, { "color": "#e5634d", "count": 375, "icon": "fas fa-wifi", "id": 17, "image": null, "title": "Free Wifi", "type": "feature" }, { "color": "#e5634d", "count": 441, "icon": "fas fa-users", "id": 14, "image": null, "title": "Good for Kids", "type": "feature" }], "gallery": [{ "full": 81, "thump": undefined }, { "full": 27, "thump": undefined }, { "full": 82, "thump": undefined }, { "full": 14, "thump": undefined }, { "full": 108, "thump": undefined }, { "full": 78, "thump": undefined }, { "full": 85, "thump": undefined }, { "full": 86, "thump": undefined }], "id": "1265", "image": { "full": 81, "thump": undefined }, "lastest": [{ "address": "02 West Street", "author": [], "category": [], "createDate": "01-11-2020", "dateEstablish": "01-01-2020", "description": undefined, "email": undefined, "favorite": true, "fax": undefined, "features": undefined, "gallery": undefined, "id": "1265", "image": [], "lastest": undefined, "link": "http://listar.passionui.com/listar/flatley-torp-and-gleichner/", "location": [], "numRate": 100, "openTime": undefined, "phone": "171-615-0225", "priceMax": undefined, "priceMin": undefined, "rate": 3.1, "rateText": "publish", "related": undefined, "status": "Open", "title": "Flatley, Torp and Gleichner", "website": undefined }, { "address": "5 Gina Pass", "author": [], "category": [], "createDate": "01-11-2020", "dateEstablish": "01-01-2020", "description": undefined, "email": undefined, "favorite": true, "fax": undefined, "features": undefined, "gallery": undefined, "id": "1230", "image": [], "lastest": undefined, "link": "http://listar.passionui.com/listar/dibbert-ebert-and-dare/", "location": [], "numRate": 100, "openTime": undefined, "phone": "812-281-5665", "priceMax": undefined, "priceMin": undefined, "rate": 3, "rateText": "publish", "related": undefined, "status": "Open", "title": "Dibbert, Ebert and Dare", "website": undefined }, { "address": "60 Summit Place", "author": [], "category": [], "createDate": "01-11-2020", "dateEstablish": "01-01-2020", "description": undefined, "email": undefined, "favorite": true, "fax": undefined, "features": undefined, "gallery": undefined, "id": "1269", "image": [], "lastest": undefined, "link": "http://listar.passionui.com/listar/stroman-lemke-and-rohan/", "location": [], "numRate": 100, "openTime": undefined, "phone": "444-683-9944", "priceMax": undefined, "priceMin": undefined, "rate": 1, "rateText": "publish", "related": undefined, "status": "Open", "title": "Lounge Coffee Bar", "website": undefined }, { "address": "22 Bunker Hill Road", "author": [], "category": [], "createDate": "01-11-2020", "dateEstablish": "01-01-2020", "description": undefined, "email": undefined, "favorite": true, "fax": undefined, "features": undefined, "gallery": undefined, "id": "1224", "image": [], "lastest": undefined, "link": "http://listar.passionui.com/listar/thiel-inc/", "location": [], "numRate": 100, "openTime": undefined, "phone": "381-638-6868", "priceMax": undefined, "priceMin": undefined, "rate": 2.8, "rateText": "publish", "related": undefined, "status": "Open", "title": "Thiel Inc", "website": undefined }, { "address": "6 Lakeland Park", "author": [], "category": [], "createDate": "01-11-2020", "dateEstablish": "01-01-2020", "description": undefined, "email": undefined, "favorite": true, "fax": undefined, "features": undefined, "gallery": undefined, "id": "1238", "image": [], "lastest": undefined, "link": "http://listar.passionui.com/listar/hills-inc/", "location": [], "numRate": 100, "openTime": undefined, "phone": "392-992-0394", "priceMax": undefined, "priceMin": undefined, "rate": 2.3, "rateText": "publish", "related": undefined, "status": "Open", "title": "Hills Inc", "website": undefined }, { "address": "16 Sachs Drive", "author": [], "category": [], "createDate": "01-11-2020", "dateEstablish": "01-01-2020", "description": undefined, "email": undefined, "favorite": true, "fax": undefined, "features": undefined, "gallery": undefined, "id": "1256", "image": [], "lastest": undefined, "link": "http://listar.passionui.com/listar/crona-ankunding-and-powlowski/", "location": [], "numRate": 100, "openTime": undefined, "phone": "380-946-1437", "priceMax": undefined, "priceMin": undefined, "rate": 2.3, "rateText": "publish", "related": undefined, "status": "Open", "title": "Crona, Ankunding and Powlowski", "website": undefined }, { "address": "9 Tomscot Street", "author": [], "category": [], "createDate": "01-11-2020", "dateEstablish": "01-01-2020", "description": undefined, "email": undefined, "favorite": true, "fax": undefined, "features": undefined, "gallery": undefined, "id": "1263", "image": [], "lastest": undefined, "link": "http://listar.passionui.com/listar/weissnat-cole/", "location": [], "numRate": 100, "openTime": undefined, "phone": "117-940-2423", "priceMax": undefined, "priceMin": undefined, "rate": 3.6, "rateText": "publish", "related": undefined, "status": "Open", "title": "Weissnat-Cole", "website": undefined }], "link": "http://listar.passionui.com/listar/flatley-torp-and-gleichner/", "location": { "latitude": 40.75108335239215, "longitude": -73.97202981215835, "name": "Flatley, Torp and Gleichner" }, "numRate": 100, "openTime": [{ "end": "21:00", "label": "mon", "start": "13:00" }, { "end": "22:00", "label": "tue", "start": "12:00" }, { "end": "22:00", "label": "wed", "start": "11:00" }, { "end": "23:00", "label": "thu", "start": "13:00" }, { "end": "21:00", "label": "fri", "start": "12:00" }, { "end": "20:00", "label": "sat", "start": "12:00" }, { "end": "21:00", "label": "sun", "start": "11:00" }], "phone": "171-615-0225", "priceMax": 79, "priceMin": 39, "rate": 3.1, "rateText": "publish", "related": [{ "address": "02 West Street", "author": [], "category": [], "createDate": "01-11-2020", "dateEstablish": "01-01-2020", "description": undefined, "email": undefined, "favorite": true, "fax": undefined, "features": undefined, "gallery": undefined, "id": "1265", "image": [], "lastest": undefined, "link": "http://listar.passionui.com/listar/flatley-torp-and-gleichner/", "location": [], "numRate": 100, "openTime": undefined, "phone": "171-615-0225", "priceMax": undefined, "priceMin": undefined, "rate": 3.1, "rateText": "publish", "related": undefined, "status": "Open", "title": "Flatley, Torp and Gleichner", "website": undefined }, { "address": "5 Gina Pass", "author": [], "category": [], "createDate": "01-11-2020", "dateEstablish": "01-01-2020", "description": undefined, "email": undefined, "favorite": true, "fax": undefined, "features": undefined, "gallery": undefined, "id": "1230", "image": [], "lastest": undefined, "link": "http://listar.passionui.com/listar/dibbert-ebert-and-dare/", "location": [], "numRate": 100, "openTime": undefined, "phone": "812-281-5665", "priceMax": undefined, "priceMin": undefined, "rate": 3, "rateText": "publish", "related": undefined, "status": "Open", "title": "Dibbert, Ebert and Dare", "website": undefined }, { "address": "60 Summit Place", "author": [], "category": [], "createDate": "01-11-2020", "dateEstablish": "01-01-2020", "description": undefined, "email": undefined, "favorite": true, "fax": undefined, "features": undefined, "gallery": undefined, "id": "1269", "image": [], "lastest": undefined, "link": "http://listar.passionui.com/listar/stroman-lemke-and-rohan/", "location": [], "numRate": 100, "openTime": undefined, "phone": "444-683-9944", "priceMax": undefined, "priceMin": undefined, "rate": 1, "rateText": "publish", "related": undefined, "status": "Open", "title": "Lounge Coffee Bar", "website": undefined }, { "address": "22 Bunker Hill Road", "author": [], "category": [], "createDate": "01-11-2020", "dateEstablish": "01-01-2020", "description": undefined, "email": undefined, "favorite": true, "fax": undefined, "features": undefined, "gallery": undefined, "id": "1224", "image": [], "lastest": undefined, "link": "http://listar.passionui.com/listar/thiel-inc/", "location": [], "numRate": 100, "openTime": undefined, "phone": "381-638-6868", "priceMax": undefined, "priceMin": undefined, "rate": 2.8, "rateText": "publish", "related": undefined, "status": "Open", "title": "Thiel Inc", "website": undefined }, { "address": "6 Lakeland Park", "author": [], "category": [], "createDate": "01-11-2020", "dateEstablish": "01-01-2020", "description": undefined, "email": undefined, "favorite": true, "fax": undefined, "features": undefined, "gallery": undefined, "id": "1238", "image": [], "lastest": undefined, "link": "http://listar.passionui.com/listar/hills-inc/", "location": [], "numRate": 100, "openTime": undefined, "phone": "392-992-0394", "priceMax": undefined, "priceMin": undefined, "rate": 2.3, "rateText": "publish", "related": undefined, "status": "Open", "title": "Hills Inc", "website": undefined }, { "address": "16 Sachs Drive", "author": [], "category": [], "createDate": "01-11-2020", "dateEstablish": "01-01-2020", "description": undefined, "email": undefined, "favorite": true, "fax": undefined, "features": undefined, "gallery": undefined, "id": "1256", "image": [], "lastest": undefined, "link": "http://listar.passionui.com/listar/crona-ankunding-and-powlowski/", "location": [], "numRate": 100, "openTime": undefined, "phone": "380-946-1437", "priceMax": undefined, "priceMin": undefined, "rate": 2.3, "rateText": "publish", "related": undefined, "status": "Open", "title": "Crona, Ankunding and Powlowski", "website": undefined }, { "address": "9 Tomscot Street", "author": [], "category": [], "createDate": "01-11-2020", "dateEstablish": "01-01-2020", "description": undefined, "email": undefined, "favorite": true, "fax": undefined, "features": undefined, "gallery": undefined, "id": "1263", "image": [], "lastest": undefined, "link": "http://listar.passionui.com/listar/weissnat-cole/", "location": [], "numRate": 100, "openTime": undefined, "phone": "117-940-2423", "priceMax": undefined, "priceMin": undefined, "rate": 3.6, "rateText": "publish", "related": undefined, "status": "Open", "title": "Weissnat-Cole", "website": undefined }], "status": "Open", "title": "Flatley, Torp and Gleichner", "website": "https://yellowpages.com" });
    const [collapseHour, setCollapseHour] = useState(false);
    const [heightHeader, setHeightHeader] = useState(Utils.heightHeader());
    const heightImageBanner = Utils.scaleWithPixel(250, 1);




    const renderBanner = () => {
        console.log(product)
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
                    <Image source={product?.author?.image} style={styles.userIcon} />
                    <View>
                        <Text headline semibold whiteColor>
                            {product?.author?.name}
                        </Text>
                        <Text footnote whiteColor>
                            {product?.author?.email}
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
                <View style={{ height: 255 - heightHeader }} />
                <View
                >

                    <View
                        style={{

                            marginTop: 5,
                            height: collapseHour ? 0 : null,
                            overflow: 'hidden',
                        }}>

                        {renderCategory()}

                    </View>
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
                    navigation.navigate('PreviewImage', {
                        gallery: product?.gallery,
                    });
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

