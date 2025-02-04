import React, { Fragment, useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { BaseStyle, useTheme, BaseColor } from '@/config';
import { Header, SafeAreaView, Icon, Text, Button, Tag } from '@/components';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import { useStore } from '@tanstack/react-store';
import crudState from '@/crud-state/internal/x_data_amc';




export default function Filters({ navigation }) {
    const filterOptions = useStore(crudState, (state) => state.filterOptions);
    const router = useRouter();
    const { colors } = useTheme();
    const { t } = useTranslation();
    const offsetKeyboard = Platform.select({ ios: 0, android: 20 });


    const onUpdate = () => {
        // setLoading(true);
        // setLoading(true);
    };

    const onNavigateLocation = () => {
        /* navigation.navigate('PickerScreen', {
           onApply: async location => {
             setLocation(location);
           },
           selected: location,
           data: setting?.locations,
         });*/
    };


    return (
        <View style={{ flex: 1 }}>
            <Header
                title={t('Filtering')}
                renderLeft={() => {
                    return (
                        <Icon
                            name="arrow-left"
                            size={20}
                            color={colors.primary}
                            enableRTL={true}
                        />
                    );
                }}
                renderRight={() => (<Text headline primaryColor numberOfLines={1}>{t('apply')}</Text>)}
                onPressLeft={() => router.back()}
                onPressRight={() => onUpdate()}
            />
            <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'left']}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'android' ? 'height' : 'padding'}
                    keyboardVerticalOffset={offsetKeyboard}
                    style={{ flex: 1 }}
                >
                    <ScrollView>
                        <View style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
                            <TouchableOpacity
                                style={styles.locationContent}
                                onPress={() => onNavigateLocation()}
                            >
                                <View>
                                    <Text headline semibold>
                                        {t('BY OPERATOR').toUpperCase()}
                                    </Text>
                                    <Text footnote grayColor style={{ marginTop: 5 }}>
                                        {t('SELECT OPERATOR')}
                                    </Text>
                                </View>
                                <Icon name="angle-right" size={18} color={BaseColor.grayColor} />
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </View>
    );
}




const styles = StyleSheet.create({
    wrapContent: {
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    contentRange: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
        marginTop: 10,
    },
    contentResultRange: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    contentList: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10,
    },
    circleIcon: {
        width: 32,
        height: 32,
        borderRadius: 16,
        marginLeft: 20,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOpacity: 0.35,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowRadius: 3,
        elevation: 0.4,
    },
    btnClearSearch: {
        position: 'absolute',
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        width: 30,
        height: '100%',
    },
    locationContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
    },
    contentTitle: {
        alignItems: 'flex-start',
        width: '100%',
        height: 32,
        justifyContent: 'center',
    },
    contain: {
        alignItems: 'center',
        padding: 20,
    },
    textInput: {
        height: 46,
        backgroundColor: BaseColor.fieldColor,
        borderRadius: 5,
        padding: 10,
        width: '100%',
        color: BaseColor.grayColor,
    },
    thumb: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
});





  {/*filterOptions.map((item, index) => {
                                return (<Fragment key={index}>
                                    <Text headline semibold>
                                        {t(item.title).toUpperCase()}
                                    </Text>

                                    <View style={styles.wrapContent}>
                                        {item?.options.map?.((item_, index_) => {
                                            //const selected = selectedCategory.some(i => i.id === item.id);
                                            return (
                                                <Tag
                                                    primary={false}
                                                    outline={true}
                                                    key={index_}
                                                    style={{
                                                        marginTop: 8,
                                                        marginRight: 8,
                                                    }}
                                                //onPress={() => onSelectCategory(item)}
                                                >
                                                    {item_.title}
                                                </Tag>
                                            );
                                        })}
                                    </View>


                                </Fragment>)
                            })*/}