import React, { useState } from 'react';
import { RefreshControl, View, Animated, StyleSheet } from 'react-native';
import { BaseColor, useTheme } from '@/config';
import { ListItem } from '@/components';

export default function LoadingPlaceholder({ modeView, refreshing = false, onRefresh }) {
    const { colors } = useTheme();

    const scrollAnim = new Animated.Value(0);
    const offsetAnim = new Animated.Value(0);
    const clampedScroll = Animated.diffClamp(Animated.add(
        scrollAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolateLeft: 'clamp',
        }),
        offsetAnim,
    ),
        0,
        40,
    );


    const renderLoading = () => {
        const navbarTranslate = clampedScroll.interpolate({
            inputRange: [0, 40],
            outputRange: [0, -40],
            extrapolate: 'clamp',
        });
        switch (modeView) {
            case 'block':
                return (
                    <View style={{ flex: 1 }}>
                        <Animated.FlatList
                            contentContainerStyle={{
                                paddingTop: 50,
                            }}
                            refreshControl={
                                <RefreshControl
                                    colors={[colors.primary]}
                                    tintColor={colors.primary}
                                    refreshing={refreshing}
                                />
                            }
                            scrollEventThrottle={1}
                            onScroll={Animated.event(
                                [
                                    {
                                        nativeEvent: {
                                            contentOffset: {
                                                y: scrollAnim,
                                            },
                                        },
                                    },
                                ],
                                { useNativeDriver: true },
                            )}
                            data={[1, 2, 3, 4, 5, 6, 7, 8]}
                            key={'block'}
                            keyExtractor={(item, index) => `block${index}`}
                            renderItem={({ item, index }) => <ListItem block loading={true} />}
                        />
                        <Animated.View
                            style={[
                                styles.navbar,
                                { transform: [{ translateY: navbarTranslate }] },
                            ]}>
                            {/**<FilterSort
                sortSelected={filter?.sort}
                modeView={modeView}
                sortOption={setting?.sortOption}
                onChangeSort={onChangeSort}
                onChangeView={onChangeView}
                onFilter={onFilter}
              /> */}
                        </Animated.View>
                    </View>
                );
            case 'grid':
                return (
                    <View style={{ flex: 1 }}>
                        <Animated.FlatList
                            contentContainerStyle={{
                                paddingTop: 50,
                            }}
                            columnWrapperStyle={{
                                paddingLeft: 5,
                                paddingRight: 20,
                            }}
                            refreshControl={
                                <RefreshControl
                                    colors={[colors.primary]}
                                    tintColor={colors.primary}
                                    refreshing={refreshing}
                                    onRefresh={onRefresh}
                                />
                            }
                            scrollEventThrottle={1}
                            onScroll={Animated.event(
                                [
                                    {
                                        nativeEvent: {
                                            contentOffset: {
                                                y: scrollAnim,
                                            },
                                        },
                                    },
                                ],
                                { useNativeDriver: true },
                            )}
                            showsVerticalScrollIndicator={false}
                            numColumns={2}
                            data={[1, 2, 3, 4, 5, 6, 7, 8]}
                            key={'gird'}
                            keyExtractor={(item, index) => `gird ${index}`}
                            renderItem={({ item, index }) => (
                                <ListItem
                                    grid
                                    loading={true}
                                    style={{
                                        marginLeft: 15,
                                        marginBottom: 15,
                                    }}
                                />
                            )}
                        />
                        <Animated.View
                            style={[
                                styles.navbar,
                                {
                                    transform: [{ translateY: navbarTranslate }],
                                },
                            ]}>
                            {/**<FilterSort
                sortSelected={filter?.sort}
                modeView={modeView}
                sortOption={setting?.sortOption}
                onChangeSort={onChangeSort}
                onChangeView={onChangeView}
                onFilter={onFilter}
              /> */}
                        </Animated.View>
                    </View>
                );

            case 'list':
                return (
                    <View style={{ flex: 1 }}>
                        <Animated.FlatList
                            contentContainerStyle={{
                                paddingTop: 50,
                                paddingHorizontal: 20,
                            }}
                            refreshControl={
                                <RefreshControl
                                    colors={[colors.primary]}
                                    tintColor={colors.primary}
                                    refreshing={refreshing}
                                    onRefresh={onRefresh}
                                />
                            }
                            scrollEventThrottle={1}
                            onScroll={Animated.event(
                                [
                                    {
                                        nativeEvent: {
                                            contentOffset: {
                                                y: scrollAnim,
                                            },
                                        },
                                    },
                                ],
                                { useNativeDriver: true },
                            )}
                            data={[1, 2, 3, 4, 5, 6, 7, 8]}
                            key={'list'}
                            keyExtractor={(item, index) => `list ${index}`}
                            renderItem={({ item, index }) => (
                                <ListItem
                                    list
                                    loading={true}
                                    style={{
                                        marginBottom: 15,
                                    }}
                                />
                            )}
                        />
                        <Animated.View
                            style={[
                                styles.navbar,
                                {
                                    transform: [{ translateY: navbarTranslate }],
                                },
                            ]}>
                            {/**<FilterSort
                sortSelected={filter?.sort}
                modeView={modeView}
                sortOption={setting?.sortOption}
                onChangeSort={onChangeSort}
                onChangeView={onChangeView}
                onFilter={onFilter}
              /> */}
                        </Animated.View>
                    </View>
                );
            default:
                return (
                    <View style={{ flex: 1 }}>
                        <Animated.FlatList
                            contentContainerStyle={{
                                paddingTop: 50,
                            }}
                            refreshControl={
                                <RefreshControl
                                    colors={[colors.primary]}
                                    tintColor={colors.primary}
                                    refreshing={refreshing}
                                />
                            }
                            scrollEventThrottle={1}
                            onScroll={Animated.event(
                                [
                                    {
                                        nativeEvent: {
                                            contentOffset: {
                                                y: scrollAnim,
                                            },
                                        },
                                    },
                                ],
                                { useNativeDriver: true },
                            )}
                            data={[1, 2, 3, 4, 5, 6, 7, 8]}
                            key={'block'}
                            keyExtractor={(item, index) => `block${index}`}
                            renderItem={({ item, index }) => <ListItem block loading={true} />}
                        />
                        <Animated.View
                            style={[
                                styles.navbar,
                                { transform: [{ translateY: navbarTranslate }] },
                            ]}>
                            {/**<FilterSort
                sortSelected={filter?.sort}
                modeView={modeView}
                sortOption={setting?.sortOption}
                onChangeSort={onChangeSort}
                onChangeView={onChangeView}
                onFilter={onFilter}
              /> */}
                        </Animated.View>
                    </View>
                );
        }
    };
    return renderLoading();
}




const styles = StyleSheet.create({
    centerView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadMoreContent: {
        flexDirection: 'row',
        paddingBottom: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    navbar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: BaseColor.whiteColor,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    iconLocation: {
        width: 28,
        height: 28,
        borderRadius: 14,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    followLocationIcon: {
        width: 28,
        height: 28,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: BaseColor.whiteColor,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});
