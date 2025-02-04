import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { FlatList, RefreshControl, View, Animated, StyleSheet } from 'react-native';
import { BaseStyle, BaseColor, useTheme } from '@/config';
import { Header, SafeAreaView, Icon, ListItem, FilterSort, Text } from '@/components';
import * as Utils from '@/utils';
import { useTranslation } from 'react-i18next';
import { useRouter, useFocusEffect } from 'expo-router';
import RenderLoading from './loading-placeholder';
import { useFindMany } from '@/services/internal/@default-query';


export default function List({
  title = 'DATA GRID',
  viewMode = 'grid',
  model = 'x_mobile_dummy',
  fields = {},
  limit = 20,
  offset = 0,
  sort = [],
  domain = [],
  setLimit = () => { },
  onBack = () => { },
  onSearch = () => { },
  onAddClick = () => { },
  onFilter = () => { },
  setSort = () => { },
  setViewMode = () => { },
  canAdd = true,

  GridRender = ({ item, index }) => <></>,
  ListRender = ({ item, index }) => <></>,
  BlockRender = ({ item, index }) => <></>,
}) {

  const firstTimeRef = useRef(true);
  const router = useRouter();
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [refreshing, setRefreshing] = useState(false);
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


  const { data, isLoading, isError, error, refetch } = useFindMany({
    model,
    fields,
    sort: sort,
    domain: [...domain],
    offset,
    limit
  });




  const onRefresh = () => {
    //setRefreshing(true);
    refetch();
  };


  useFocusEffect(
    useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false;
        return;
      }
      refetch();
    }, [])
  );


  const onChangeView = useCallback(() => {
    Utils.enableExperimental();
    switch (viewMode) {
      case 'block':
        setViewMode('grid');
        break;
      case 'grid':
        setViewMode('list');
        break;
      case 'list':
        setViewMode('block');
        break;
      default:
        setViewMode('block');
        break;
    }
  }, [viewMode, setViewMode]);








  const renderContent = useCallback(() => {
    if (isLoading) {
      return <RenderLoading
        refreshing={refreshing}
        modeView={viewMode}
        onRefresh={onRefresh}
      />;
    }
    if (isError) {
      return (
        <View style={styles.centerView}>
          <View style={{ alignItems: 'center' }}>
            <Icon
              name="frown-open"
              size={18}
              color={colors.text}
              style={{ marginBottom: 4 }}
            />
            <Text>{error.message}</Text>
          </View>
        </View>
      );
    }

    if (data?.records?.length == 0) {
      return (
        <View style={styles.centerView}>
          <View style={{ alignItems: 'center' }}>
            <Icon
              name="frown-open"
              size={18}
              color={colors.text}
              style={{ marginBottom: 4 }}
            />
            <Text>{t('data_not_found')}</Text>
          </View>
        </View>
      );
    }

    const navbarTranslate = clampedScroll.interpolate({ inputRange: [0, 40], outputRange: [0, -40], extrapolate: 'clamp' });
    switch (viewMode) {
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
              data={data?.records}
              key={'block'}
              keyExtractor={(item, index) => `block ${index}`}
              renderItem={({ item, index }) => (
                <BlockRender item={item} index={index} />
              )}
            />
            <Animated.View
              style={[
                styles.navbar,
                { transform: [{ translateY: navbarTranslate }] },
              ]}>
              <FilterSort
                sortSelected={null}
                modeView={viewMode}
                sortOption={sort}
                onChangeSort={setSort}
                onChangeView={onChangeView}
                onFilter={onFilter}
              />
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
              data={data?.records}
              key={'gird'}
              keyExtractor={(item, index) => `gird ${index}`}
              renderItem={({ item, index }) => (
                <GridRender item={item} index={index} />
              )}
            />
            <Animated.View
              style={[
                styles.navbar,
                {
                  transform: [{ translateY: navbarTranslate }],
                },
              ]}>
              <FilterSort
                sortSelected={null}
                modeView={viewMode}
                sortOption={sort}
                onChangeSort={setSort}
                onChangeView={onChangeView}
                onFilter={onFilter}
              />
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
              data={data?.records}
              key={'list'}
              keyExtractor={(item, index) => `list ${index}`}
              renderItem={({ item, index }) => (
                <ListRender item={item} index={index} />
              )}
            />
            <Animated.View
              style={[
                styles.navbar,
                {
                  transform: [{ translateY: navbarTranslate }],
                },
              ]}>
              <FilterSort
                sortSelected={null}
                modeView={viewMode}
                sortOption={sort}
                onChangeSort={setSort}
                onChangeView={onChangeView}
                onFilter={onFilter}
              />
            </Animated.View>
          </View>
        );
      default: {

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
              data={data?.records}
              key={'block'}
              keyExtractor={(item, index) => `block ${index}`}
              renderItem={({ item, index }) => (
                <BlockRender item={item} index={index} />
              )}
            />
            <Animated.View
              style={[
                styles.navbar,
                { transform: [{ translateY: navbarTranslate }] },
              ]}>
              <FilterSort
                sortSelected={null}
                modeView={viewMode}
                sortOption={sort}
                onChangeSort={setSort}
                onChangeView={onChangeView}
                onFilter={onFilter}
              />
            </Animated.View>
          </View>
        )
      };
    }
  }, [ 
    isLoading, 
    isError, 
    error, 
    data, 
    viewMode, 
    sort, 
    refreshing, 
    domain,
    onRefresh
  ]);





  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <Header
        title={title}
        renderLeft={() => (<Icon name="arrow-left" size={20} color={colors.primary} enableRTL={true} />)}
        onPressLeft={onBack}
        renderRight={() => (<Icon name={canAdd ? 'plus' : 'align-right'} size={20} color={colors.primary} />)}
        renderRightSecond={() => (<Icon name="search" size={20} color={colors.primary} />)}
        onPressRightSecond={onSearch}
        onPressRight={onAddClick}
      />
      <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'left']}>
        {renderContent()}
      </SafeAreaView>
    </View>
  );
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
