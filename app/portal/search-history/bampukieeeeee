import React, { useState } from 'react';
import {
    View,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    StyleSheet
} from 'react-native';
import { BaseStyle, BaseColor, useTheme } from '@/config';
import {
    Header,
    SafeAreaView,
    TextInput,
    Icon,
    Text,
    EventListItem,
} from '@/components';

import { useTranslation } from 'react-i18next';
import { useRouter } from "expo-router";
let timeout;

export default function SearchHistoryFood() {
    const router = useRouter();
    const { colors } = useTheme();
    const { t } = useTranslation();
    const search = [{ "address": "99 Charing Cross Crossing", "author": { "image": 45, "level": "Developer", "name": "Wem" }, "description": "Donec sollicitudin molestie malesuada. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vivamus magna justo,lacinia eget consectetur sed, convallis at tellus. Pellentesque in ipsum id orci porta dapibus. Pellentesque in ipsum id orci porta dapibus. Nulla porttitor accumsan tincidunt. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus.", "distance": "15 Km", "email": "liststar@passionui.com", "favorite": true, "gallerys": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "id": 1, "image": 36, "location": { "latitude": 40.738119, "longitude": -73.98599 }, "nearlys": [], "numberRate": 340, "phone": "171-615-0225", "price": "$6.99", "promotion": "Free Shipping", "rate": 4.5, "rateStatus": "Very Good", "status": "Opening", "subtitle": "Drink", "title": "Exotic Eats", "website": "www.passionui.com" }, { "address": "99 Charing Cross Crossing", "author": { "image": 46, "level": "Agency", "name": "Steve Garrett" }, "description": "Donec sollicitudin molestie malesuada. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vivamus magna justo,lacinia eget consectetur sed, convallis at tellus. Pellentesque in ipsum id orci porta dapibus. Pellentesque in ipsum id orci porta dapibus. Nulla porttitor accumsan tincidunt. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus.", "distance": "5 Km", "email": "liststar@passionui.com", "gallerys": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "id": 2, "image": 38, "location": { "latitude": 40.738129, "longitude": -73.98589 }, "nearlys": [], "numberRate": 320, "phone": "171-615-0225", "price": "$6.99", "promotion": "Discount 20%", "rate": 5, "rateStatus": "Very Good", "status": "Opening", "subtitle": "Drink", "title": "Starbucks", "website": "www.passionui.com" }, { "address": "99 Charing Cross Crossing", "author": { "image": 45, "level": "Developer", "name": "Wem" }, "description": "Donec sollicitudin molestie malesuada. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vivamus magna justo,lacinia eget consectetur sed, convallis at tellus. Pellentesque in ipsum id orci porta dapibus. Pellentesque in ipsum id orci porta dapibus. Nulla porttitor accumsan tincidunt. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus.", "distance": "900 m", "email": "liststar@passionui.com", "favorite": true, "gallerys": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "id": 3, "image": 37, "location": { "latitude": 40.738139, "longitude": -73.98579 }, "nearlys": [], "numberRate": 573, "phone": "171-615-0225", "price": "$4.99", "promotion": "Discount 15%", "rate": 4.5, "rateStatus": "Very Good", "status": "Closed", "subtitle": "Drink", "title": "Organic Orchard", "website": "www.passionui.com" }, { "address": "99 Charing Cross Crossing", "author": { "image": 46, "level": "Agency", "name": "Steve Garrett" }, "description": "Donec sollicitudin molestie malesuada. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vivamus magna justo,lacinia eget consectetur sed, convallis at tellus. Pellentesque in ipsum id orci porta dapibus. Pellentesque in ipsum id orci porta dapibus. Nulla porttitor accumsan tincidunt. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus.", "distance": "500 m", "email": "liststar@passionui.com", "gallerys": [[Object], [Object], [Object], [Object], [Object], [Object], [Object]], "id": 4, "image": 27, "location": { "latitude": 40.738149, "longitude": -73.98569 }, "nearlys": [], "numberRate": 443, "phone": "171-615-0225", "price": "$7.99", "promotion": "Discount 15%", "rate": 4, "rateStatus": "Very Good", "status": "Opening", "subtitle": "Vegetable", "title": "Freshmart Co-op", "website": "www.passionui.com" }, { "address": "99 Charing Cross Crossing", "author": { "image": 45, "level": "Developer", "name": "Wem" }, "description": "Donec sollicitudin molestie malesuada. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vivamus magna justo,lacinia eget consectetur sed, convallis at tellus. Pellentesque in ipsum id orci porta dapibus. Pellentesque in ipsum id orci porta dapibus. Nulla porttitor accumsan tincidunt. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus.", "distance": "200 m", "email": "liststar@passionui.com", "favorite": true, "gallerys": [[Object], [Object], [Object], [Object], [Object], [Object], [Object]], "id": 5, "image": 28, "location": { "latitude": 40.738159, "longitude": -73.98549 }, "nearlys": [], "numberRate": 387, "phone": "171-615-0225", "price": "$5.99", "promotion": "Discount 25%", "rate": 5, "rateStatus": "Very Good", "status": "Opening", "subtitle": "Fastfood", "title": "Freshmart Co-op", "website": "www.passionui.com" }, { "address": "99 Charing Cross Crossing", "author": { "image": 46, "level": "Agency", "name": "Steve Garrett" }, "description": "Donec sollicitudin molestie malesuada. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vivamus magna justo,lacinia eget consectetur sed, convallis at tellus. Pellentesque in ipsum id orci porta dapibus. Pellentesque in ipsum id orci porta dapibus. Nulla porttitor accumsan tincidunt. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus.", "distance": "2 Km", "email": "liststar@passionui.com", "gallerys": [[Object], [Object], [Object], [Object], [Object], [Object], [Object]], "id": 6, "image": 29, "location": { "latitude": 40.738149, "longitude": -73.98569 }, "nearlys": [], "numberRate": 430, "phone": "171-615-0225", "price": "$6.99", "promotion": "Discount 45%", "rate": 4.5, "rateStatus": "Very Good", "status": "Opening", "subtitle": "Pizza", "title": "Budget Foods", "website": "www.passionui.com" }, { "address": "99 Charing Cross Crossing", "author": { "image": 46, "level": "Agency", "name": "Steve Garrett" }, "description": "Donec sollicitudin molestie malesuada. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vivamus magna justo,lacinia eget consectetur sed, convallis at tellus. Pellentesque in ipsum id orci porta dapibus. Pellentesque in ipsum id orci porta dapibus. Nulla porttitor accumsan tincidunt. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus.", "distance": "700 m", "email": "liststar@passionui.com", "gallerys": [[Object], [Object], [Object], [Object], [Object], [Object], [Object]], "id": 7, "image": 30, "location": { "latitude": 40.738139, "longitude": -73.98589 }, "nearlys": [], "numberRate": 363, "phone": "171-615-0225", "price": "$3.99", "promotion": "Discount 35%", "rate": 5, "rateStatus": "Very Good", "status": "Closed", "subtitle": "Juice", "title": "Fresh Food", "website": "www.passionui.com" }];



    const [history, setHistory] = useState(search);
    const [result, setResult] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [loading, setLoading] = useState(false);

    /**
     * check wishlist state
     * only UI kit
     */
    const isFavorite = item => {
        //return wishlist.list?.some(i => i.id == item.id);
        return false;
    };

    /**
     * call when search data
     * @param {*} keyword
     */
    const onSearch = keyword => {
        setKeyword(keyword);
        if (keyword != '') {
            setLoading(true);
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                setResult(
                    search.filter(item => {
                        return item.title.toUpperCase().includes(keyword.toUpperCase());
                    }),
                );
                setLoading(false);
                setShowResult(true);
            }, 1000);
        } else {
            setShowResult(false);
        }
    };

    /**
     * on load detail and save history
     * @param {*} item
     */
    const onDetail = item => {
        router.push('/portal/search-historyd', {
            item: item,
        });
    };

    /**
     * on clear
     */
    const onClear = () => {
        setHistory([]);
    };

    /**
     * render content
     *
     */
    const renderContent = () => {
        if (showResult) {
            return (
                <FlatList
                    contentContainerStyle={{ paddingHorizontal: 20 }}
                    data={result}
                    keyExtractor={(item, index) => `history ${index}`}
                    renderItem={({ item, index }) => (
                        <EventListItem
                            list
                            title={item.title}
                            subtitle={item.subtitle}
                            status={item.status}
                            image={item.image}
                            address={item.address}
                            favorite={isFavorite(item)}
                            style={{ marginBottom: 15 }}
                            onPress={() => onDetail(item)}
                        />
                    )}
                />
            );
        }

        return (
            <View style={{ paddingVertical: 15, paddingHorizontal: 20 }}>
                <View style={styles.rowTitle}>
                    <Text headline>{t('search_history').toUpperCase()}</Text>
                    <TouchableOpacity onPress={onClear}>
                        <Text caption1 accentColor>
                            {t('clear')}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                    }}>
                    {history?.map?.((item, index) => (
                        <TouchableOpacity
                            style={[styles.itemHistory, { backgroundColor: colors.card }]}
                            onPress={() => onDetail(item)}
                            key={`search ${item.id}`}>
                            <Text caption2>{item.title}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
            <Header
                title={t('search')}
                renderLeft={() => {
                    return <Icon name="arrow-left" size={20} color={colors.primary} />;
                }}
                renderRight={() => {
                    if (loading) {
                        return <ActivityIndicator size="small" color={colors.primary} />;
                    }
                }}
                onPressLeft={() => {
                    router.back();
                }}
            />
            <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'left']}>
                <View style={{ flex: 1 }}>
                    <View style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
                        <TextInput
                            placeholder={t('search')}
                            value={keyword}
                            onSubmitEditing={() => {
                                onSearch(keyword);
                            }}
                            onChangeText={onSearch}
                            icon={
                                <TouchableOpacity
                                    onPress={() => {
                                        onSearch('');
                                    }}
                                    style={styles.btnClearSearch}>
                                    <Icon name="times" size={18} color={BaseColor.grayColor} />
                                </TouchableOpacity>
                            }
                        />
                    </View>
                    {renderContent()}
                </View>
            </SafeAreaView>
        </View>
    );
}




const styles = StyleSheet.create({
    btnClearSearch: {
        position: 'absolute',
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        width: 30,
        height: '100%',
    },
    loadMoreContent: {
        flexDirection: 'row',
        paddingBottom: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rowTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemHistory: {
        marginTop: 5,
        padding: 5,
        marginRight: 10,
    },
    loadingContent: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
