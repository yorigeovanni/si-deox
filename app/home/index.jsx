import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView, RefreshControl, Animated } from 'react-native';
import { StyleSheet } from 'react-native';
import { BaseStyle, useTheme } from '@/config';
import * as Utils from '@/utils';
import { useTranslation } from 'react-i18next';
import { Text, Icon, SafeAreaView, ListItem } from '@/components';
const deltaY = new Animated.Value(0);


import PromoAtas from '@/components/portal/promo-atas';
import Menu from '@/components/portal/menu';
import HeadlineNews from '@/components/portal/headline-news';


export default function AirportIndex() {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const [refreshing, setRefreshing] = useState(false);
  const [heightHeader, setHeightHeader] = useState(Utils.heightHeader());
  const heightImageBanner = Utils.scaleWithPixel(180);
  const marginTopBanner = heightImageBanner - heightHeader + 10;
  const recent = [];



  const onRefresh = () => {
    setRefreshing(true);
   // dispatch(
   //   homeActions.onLoad(design, response => {
        setRefreshing(false);
   //   }),
   // );
  };


  const renderRecent = () => {
    if (recent?.length > 0) {
      return recent.map((item, index) => {
        return (
          <ListItem
            small
            key={`recent${item.id}`}
            image={item.image?.full}
            title={item.title}
            subtitle={item.category?.title}
            rate={item.rate}
            style={{marginBottom: 15}}
            onPress={() => {
             // navigation.navigate('ProductDetail', {
             //   item: item,
             // });
            }}
          />
        );
      });
    }

    return [1, 2, 3].map((item, index) => {
      return (
        <ListItem
          small
          loading={true}
          key={`recent${item}`}
          style={{marginBottom: 15}}
        />
      );
    });
  };


  return (
    <View style={{ flex: 1, backgroundColor : '#ffffff' }}>
      <Animated.View
        style={[
          styles.imageBackground,
          {
            height: deltaY.interpolate({
              inputRange: [
                0,
                Utils.scaleWithPixel(110),
                Utils.scaleWithPixel(110),
              ],
              outputRange: [heightImageBanner, heightHeader, 0],
            }),
          },
        ]}>
        <PromoAtas/>
      </Animated.View>
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'top', 'left']}>
          <ScrollView
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {y: deltaY},
                },
              },
            ],
            {useNativeDriver: false},
          )}
          onContentSizeChange={() => {
            setHeightHeader(Utils.heightHeader());
          }}
          scrollEventThrottle={8}>
            <View
            style={[
              styles.searchForm,
              {
                backgroundColor: colors.background,
                borderColor: colors.border,
                shadowColor: colors.border,
              },
              {marginTop: marginTopBanner},
            ]}>
              <TouchableOpacity
              //onPress={() => navigation.navigate('SearchHistory')}
              >
              <View
                style={[BaseStyle.textInput, {backgroundColor: colors.card}]}>
                <Text body1 grayColor style={{flex: 1}}>
                  {t('search_location')}
                </Text>
                <View style={{paddingVertical: 8}}>
                  <View
                    style={[styles.lineForm, {backgroundColor: colors.border}]}
                  />
                </View>
                <Icon
                  name="location-arrow"
                  size={18}
                  color={colors.primaryLight}
                  solid
                />
              </View>
            </TouchableOpacity>

            </View>
            <Menu/>

            <View style={styles.contentPopular}>
            <Text title3 semibold>
              {t('popular_location')}
            </Text>
            <Text body2 grayColor>
              {t('popular_lologan')}
            </Text>
          </View>
          <HeadlineNews/>

          <View
            style={{
              paddingHorizontal: 20,
              paddingTop: 15,
            }}>
            <Text title3 semibold>
              {t('recent_location')}
            </Text>
            <Text body2 grayColor style={{marginBottom: 15}}>
              {t('recent_sologan')}
            </Text>
            {renderRecent()}
          </View>

          </ScrollView>
        </SafeAreaView>
    </View>
  );
}









const styles = StyleSheet.create({
  imageBackground: {
    height: 140,
    width: '100%',
    position: 'absolute',
  },
  contentPage: {
    bottom: 50,
  },
  searchForm: {
    marginHorizontal: 15,
    padding: 10,
    borderRadius: 10,
    borderWidth: 0.5,
    shadowOffset: {width: 1.5, height: 1.5},
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 1,
  },
  lineForm: {
    width: 1,
    height: '100%',
    margin: 10,
  },
  serviceContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginVertical: 10,
  },
  serviceItem: {
    alignItems: 'center',
    marginBottom: 15,
  },
  serviceCircleIcon: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    marginBottom: 5,
  },
  contentPopular: {
    marginHorizontal: 20,
    marginBottom: 15,
  },
  promotionBanner: {
    height: Utils.scaleWithPixel(100),
    width: '100%',
    marginTop: 10,
  },
  popularItem: {
    width: Utils.scaleWithPixel(255),
    height: Utils.scaleWithPixel(140),
    borderRadius: 8,
  },
  menuIcon: {
    width: 40,
    height: 40,
    position: 'absolute',
    bottom: 15,
    right: 15,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
