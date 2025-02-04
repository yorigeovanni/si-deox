import React, { Fragment, useState, useEffect, useCallback } from 'react';
import { View, TouchableOpacity, ScrollView, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import { StyleSheet } from 'react-native';
import { BaseStyle, useTheme, BaseColor, Images } from '@/config';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Text, Icon, ModalFilter, Image, FoodListItem, Tag } from '@/components';
import * as Utils from '@/utils';
import Swiper from 'react-native-swiper';
import {
  Placeholder,
  PlaceholderLine,
  Progressive,
  PlaceholderMedia,
} from 'rn-placeholder';
import { useRouter } from "expo-router";



export default function RootIndex() {
  const router = useRouter();
  const { colors } = useTheme();
  const { t } = useTranslation();


  const [countrySelected, setCountrySelected] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [countries, setCountries] = useState([]);

  const sliders = [{
    "address": "99 Charing Cross Crossing", "author": { "image": 45, "level": "Developer", "name": "Wem" }, "description": "Donec sollicitudin molestie malesuada. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vivamus magna justo,lacinia eget consectetur sed, convallis at tellus. Pellentesque in ipsum id orci porta dapibus. Pellentesque in ipsum id orci porta dapibus. Nulla porttitor accumsan tincidunt. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus.", "distance": "15 Km", "email": "liststar@passionui.com", "favorite": true,


    "id": 1, "image": 36, "location": { "latitude": 40.738119, "longitude": -73.98599 }, "nearlys": [], "numberRate": 340, "phone": "171-615-0225", "price": "$6.99", "promotion": "Free Shipping", "rate": 4.5, "rateStatus": "Very Good", "status": "Opening", "subtitle": "Drink", "title": "Exotic Eats", "website": "www.passionui.com"
  }, { "address": "99 Charing Cross Crossing", "author": { "image": 46, "level": "Agency", "name": "Steve Garrett" }, "description": "Donec sollicitudin molestie malesuada. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vivamus magna justo,lacinia eget consectetur sed, convallis at tellus. Pellentesque in ipsum id orci porta dapibus. Pellentesque in ipsum id orci porta dapibus. Nulla porttitor accumsan tincidunt. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus.", "distance": "5 Km", "email": "liststar@passionui.com", "gallerys": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "id": 2, "image": 38, "location": { "latitude": 40.738129, "longitude": -73.98589 }, "nearlys": [], "numberRate": 320, "phone": "171-615-0225", "price": "$6.99", "promotion": "Discount 20%", "rate": 5, "rateStatus": "Very Good", "status": "Opening", "subtitle": "Drink", "title": "Starbucks", "website": "www.passionui.com" }, { "address": "99 Charing Cross Crossing", "author": { "image": 45, "level": "Developer", "name": "Wem" }, "description": "Donec sollicitudin molestie malesuada. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vivamus magna justo,lacinia eget consectetur sed, convallis at tellus. Pellentesque in ipsum id orci porta dapibus. Pellentesque in ipsum id orci porta dapibus. Nulla porttitor accumsan tincidunt. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus.", "distance": "900 m", "email": "liststar@passionui.com", "favorite": true, "gallerys": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "id": 3, "image": 37, "location": { "latitude": 40.738139, "longitude": -73.98579 }, "nearlys": [], "numberRate": 573, "phone": "171-615-0225", "price": "$4.99", "promotion": "Discount 15%", "rate": 4.5, "rateStatus": "Very Good", "status": "Closed", "subtitle": "Drink", "title": "Organic Orchard", "website": "www.passionui.com" }];
  const categories = [{ "image": 32, "title": "Pizza" }, { "image": 34, "title": "Fastfood" }, { "image": 33, "title": "Drink" }, { "image": 30, "title": "Fruits" }, { "image": 27, "title": "Vegetable" }, { "image": 31, "title": "Restaurants" }];

  const recommends = [{ "address": "99 Charing Cross Crossing", "author": { "image": 45, "level": "Developer", "name": "Wem" }, "description": "Donec sollicitudin molestie malesuada. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vivamus magna justo,lacinia eget consectetur sed, convallis at tellus. Pellentesque in ipsum id orci porta dapibus. Pellentesque in ipsum id orci porta dapibus. Nulla porttitor accumsan tincidunt. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus.", "distance": "900 m", "email": "liststar@passionui.com", "favorite": true, "gallerys": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "id": 3, "image": 37, "location": { "latitude": 40.738139, "longitude": -73.98579 }, "nearlys": [], "numberRate": 573, "phone": "171-615-0225", "price": "$4.99", "promotion": "Discount 15%", "rate": 4.5, "rateStatus": "Very Good", "status": "Closed", "subtitle": "Drink", "title": "Organic Orchard", "website": "www.passionui.com" }, { "address": "99 Charing Cross Crossing", "author": { "image": 46, "level": "Agency", "name": "Steve Garrett" }, "description": "Donec sollicitudin molestie malesuada. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vivamus magna justo,lacinia eget consectetur sed, convallis at tellus. Pellentesque in ipsum id orci porta dapibus. Pellentesque in ipsum id orci porta dapibus. Nulla porttitor accumsan tincidunt. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus.", "distance": "5 Km", "email": "liststar@passionui.com", "gallerys": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "id": 2, "image": 38, "location": { "latitude": 40.738129, "longitude": -73.98589 }, "nearlys": [], "numberRate": 320, "phone": "171-615-0225", "price": "$6.99", "promotion": "Discount 20%", "rate": 5, "rateStatus": "Very Good", "status": "Opening", "subtitle": "Drink", "title": "Starbucks", "website": "www.passionui.com" }, { "address": "99 Charing Cross Crossing", "author": { "image": 45, "level": "Developer", "name": "Wem" }, "description": "Donec sollicitudin molestie malesuada. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vivamus magna justo,lacinia eget consectetur sed, convallis at tellus. Pellentesque in ipsum id orci porta dapibus. Pellentesque in ipsum id orci porta dapibus. Nulla porttitor accumsan tincidunt. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus.", "distance": "15 Km", "email": "liststar@passionui.com", "favorite": true, "gallerys": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "id": 1, "image": 36, "location": { "latitude": 40.738119, "longitude": -73.98599 }, "nearlys": [], "numberRate": 340, "phone": "171-615-0225", "price": "$6.99", "promotion": "Free Shipping", "rate": 4.5, "rateStatus": "Very Good", "status": "Opening", "subtitle": "Drink", "title": "Exotic Eats", "website": "www.passionui.com" }]


  const locations = [{ "title": "New York", "image": 103 }, { "title": "Michigan", "image": 104 }, { "title": "Nevada", "image": 105 }, { "title": "New York", "image": 106 }, { "title": "California", "image": 107 }]

  const isFavorite = item => {
    //return wishlist.list?.some(i => i.id == item.id);
    return false;
  };


  const onRefresh = () => {
    setRefreshing(true);
    // dispatch(
    //   homeActions.onLoad(design, response => {
    setRefreshing(false);
    //   }),
    // );
  };



  const onListView = item => {
    //navigation.navigate('List');
  };

  const onProductDetail = item => {
    //navigation.navigate('ProductDetail', {
    //  item: item,
    //});
  };

  const onChangeCountry = () => {
    setCountrySelected(countries?.find(item => item.checked));
    setModalVisible(false);
  };


  const onSelectCountry = selected => {
    setCountries(
      countries?.map(item => {
        return {
          ...item,
          checked: item.value == selected.value,
        };
      }),
    );
  };

  const onNotification = useCallback(() => {
    router.push('/portal/notification');
  }, []);



  const renderSlider = () => {
    if (sliders.length > 0) {
      return (
        <View style={styles.sliderContent}>
          <View style={styles.slider}>
            <Swiper
              dotStyle={{
                backgroundColor: colors.border,
                marginBottom: 8,
              }}
              activeDotStyle={{
                marginBottom: 8,
              }}
              paginationStyle={{ bottom: 0 }}
              loop={false}
              activeDotColor={colors.primary}
              removeClippedSubviews={false}>
              {sliders.map((item, index) => {
                return (
                  <TouchableOpacity
                    style={{ flex: 1 }}
                    key={`banner${index}`}
                    activeOpacity={1}
                    onPress={() => onProductDetail(item)}>
                    <Image
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 10,
                      }}
                      source={item.image}
                    />
                    <View style={styles.sliderTopLeft}>
                      <Text headline semibold whiteColor>
                        {item.title}
                      </Text>
                      <View style={styles.contentSliderRate}>
                        <View
                          style={[
                            styles.tagRate,
                            { backgroundColor: colors.primaryLight },
                          ]}>
                          <Icon
                            name="star"
                            size={10}
                            color={BaseColor.whiteColor}
                            solid
                          />
                          <Text
                            caption2
                            whiteColor
                            semibold
                            style={{ marginLeft: 4 }}>
                            {item.rate}
                          </Text>
                        </View>
                        <Text caption2 whiteColor semibold>
                          {item.numberRate} {t('reviews')}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </Swiper>
          </View>
        </View>
      );
    }
    return (
      <View style={styles.sliderContent}>
        <Placeholder Animation={Progressive}>
          <PlaceholderMedia style={styles.slider} />
        </Placeholder>
      </View>
    );
  };



  const renderCategory = () => {
    let list = (
      <FlatList
        contentContainerStyle={{
          paddingLeft: 10,
          paddingRight: 20,
        }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={[1, 2, 3, 4, 5, 6]}
        keyExtractor={(item, index) => `Category ${index}`}
        renderItem={({ item, index }) => {
          return (
            <View style={{ paddingHorizontal: 10 }}>
              <Placeholder Animation={Progressive}>
                <View
                  style={[
                    styles.categoryContent,
                    { backgroundColor: colors.card },
                  ]}>
                  <PlaceholderMedia style={styles.imageContent} />
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
    if (categories?.length > 0) {
      list = (
        <FlatList
          contentContainerStyle={{
            paddingLeft: 10,
            paddingRight: 20,
          }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={(item, index) => `Category ${index}`}
          renderItem={({ item, index }) => {
            return (
              <View style={{ paddingHorizontal: 10 }}>
                <TouchableOpacity
                  style={[
                    styles.categoryContent,
                    { backgroundColor: colors.card },
                  ]}
                  onPress={onListView}>
                  <Image style={styles.imageContent} source={item.image} />
                  <Text
                    footnote
                    style={{
                      marginTop: 10,
                    }}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      );
    }

    return (
      <View>
        <Text
          title3
          bold
          style={{ marginTop: 20, paddingHorizontal: 20, marginBottom: 15 }}>
          {t('explore_category')}
        </Text>
        {list}
      </View>
    );
  };





  const renderCounrty = () => {
    let countryView = <ActivityIndicator size="small" color={colors.primary} />;
    if (countries?.length > 0) {
      countryView = (
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <ModalFilter
            options={countries}
            isVisible={modalVisible}
            onSwipeComplete={() => {
              setModalVisible(false);
            }}
            onApply={onChangeCountry}
            onSelectFilter={onSelectCountry}
          />
          <Icon name="map-marker-alt" size={18} color={colors.text} solid />
          <Text headline semibold style={{ paddingHorizontal: 4 }}>
            {countrySelected?.text}
          </Text>
          <Icon
            name="chevron-down"
            size={12}
            color={colors.primaryLight}
            solid
          />
        </TouchableOpacity>
      );
    }
    return countryView;
  }



  const renderRecommend = () => {

    let list = (
      <FlatList
        contentContainerStyle={{ paddingLeft: 20 }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={[1, 2, 3, 4, 5, 6]}
        keyExtractor={(item, index) => `popular${index}`}
        renderItem={({ item, index }) => (
          <FoodListItem
            loading={true}
            grid
            style={{
              marginRight: 15,
              width: 200,
            }}
          />
        )}
      />
    );

    if (recommends.length > 0) {
      list = (
        <FlatList
          contentContainerStyle={{ paddingLeft: 5, paddingRight: 20 }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={recommends}
          keyExtractor={(item, index) => `popular${index}`}
          renderItem={({ item, index }) => (
            <FoodListItem
              grid
              title={item.title}
              subtitle={item.subtitle}
              status={item.status}
              image={item.image}
              address={item.address}
              favorite={isFavorite(item)}
              distance={item.distance}
              promotion={item.promotion}
              style={{
                marginLeft: 15,
                width: 200,
              }}
              onPress={() => onProductDetail(item)}
            />
          )}
        />
      );
    }

    return (
      <View>
        <View style={{ padding: 20 }}>
          <Text title3 bold>
            {t('recommend_for_buy')}
          </Text>
          <Text body2 grayColor style={{ marginTop: 4 }}>
            {t('let_find_best_choose')}
          </Text>
        </View>
        {list}
      </View>
    );
  };




  const renderBanner = () => {
    const home_baner = { "image": 35, "title": "Promotions Today" };
    let banner = (
      <Placeholder Animation={Progressive}>
        <PlaceholderMedia style={styles.banner} />
      </Placeholder>
    );
    if (home_baner) {
      banner = (
        <View style={styles.banner}>
          <Image
            style={{ width: '100%', height: '100%', borderRadius: 10 }}
            source={home_baner.image}
          />
          <View style={styles.contentBannerTopLeft}>
            <Text headline semibold whiteColor>
              {home_baner.title}
            </Text>
            <Text footnote medium whiteColor style={{ marginTop: 5 }}>
              {t('let_find_best_promotion')}
            </Text>
          </View>
          <TouchableOpacity style={styles.bannerButton}>
            <Tag primary onPress={onListView}>
              {t('see_more')}
            </Tag>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>{banner}</View>
    );
  };





  const renderRecentLocation = () => {
    let list = (
      <View style={{ paddingHorizontal: 20 }}>
        {[1, 2, 3, 4, 5].map((item, index) => {
          return (
            <FoodListItem
              key={`RecentLocation ${index}`}
              loading={true}
              list
              style={{ marginBottom: 15 }}
            />
          );
        })}
      </View>
    );

    if (locations?.length > 0) {
      list = (
        <View style={{ paddingHorizontal: 20 }}>
          {locations.map((item, index) => {
            return (
              <FoodListItem
                key={`RecentLocation ${index}`}
                list
                title={item.title}
                subtitle={item.subtitle}
                status={item.status}
                image={item.image}
                address={item.address}
                favorite={isFavorite(item)}
                style={{ marginBottom: 15 }}
                onPress={() => onProductDetail(item)}
              />
            );
          })}
        </View>
      );
    }

    return (
      <View>
        <View style={{ padding: 20 }}>
          <Text title3 bold>
            {t('recent_location')}
          </Text>
          <Text
            body2
            grayColor
            style={{
              marginTop: 4,
            }}>
            {t('best_place_tasty')}
          </Text>
        </View>
        {list}
      </View>
    );
  };



  useEffect(() => {
    const sdasdas = [
      { "checked": true, "icon": "sort-amount-up", "image": 3, "text": "United States", "value": "america" },
      { "icon": "sort-amount-down", "image": 2, "text": "VietNam", "value": "vietname" }, { "icon": "sort-amount-up", "image": 1, "text": "Singapore", "value": "singapore" }, { "icon": "sort-amount-up", "image": 4, "text": "Indonesia", "value": "indonesia" }, { "icon": "sort-amount-up", "image": 5, "text": "Malaysia", "value": "malaysia" }, { "icon": "sort-amount-up", "image": 6, "text": "Philippines", "value": "philippines" }];
    if (sdasdas?.length > 0) {
      sdasdas[0].checked = true;
      setCountrySelected(sdasdas[0]);
      setCountries(sdasdas);
      //(home.countrys);
    }
  }, []);



  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <View style={styles.contentHeader}>
        {renderCounrty()}
        <TouchableOpacity
          style={styles.notificationContent}
          onPress={() => onNotification()}
        >
          <Icon name="bell" size={18} color={BaseColor.grayColor} solid />
          <View
            style={[
              styles.doc,
              {
                backgroundColor: colors.primaryLight,
                borderColor: colors.card,
              },
            ]}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => router.push('/portal/search-history')}
        style={styles.contentSearch}>
        <View style={[BaseStyle.textInput, { backgroundColor: colors.card }]}>
          <Text body1 grayColor style={{ flex: 1 }}>
            {t('search_food')}
          </Text>
          <View style={{ paddingVertical: 8 }}>
            <View
              style={[styles.lineForm, { backgroundColor: colors.border }]}
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

      <ScrollView
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl
            colors={[colors.primary]}
            tintColor={colors.primary}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
        {renderSlider()}
        {renderCategory()}
        {renderRecommend()}
        {renderBanner()}
        {renderRecentLocation()}

      </ScrollView>

    </View>
  );
}









const styles = StyleSheet.create({
  contentHeader: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sliderContent: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  slider: {
    height: Utils.scaleWithPixel(135),
    width: '100%',
    borderRadius: 10,
  },
  sliderTopLeft: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  contentSliderRate: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  tagRate: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  contentSearch: {
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  lineForm: {
    width: 1,
    height: '100%',
    margin: 10,
  },
  imageContent: {
    width: 60,
    height: 60,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryContent: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
  },
  notificationContent: {
    width: 20,
    height: 20,
  },
  doc: {
    width: 10,
    height: 10,
    borderRadius: 8,
    borderWidth: 1,
    position: 'absolute',
    top: 0,
    right: 0,
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
  banner: {
    height: Utils.scaleWithPixel(120),
    width: '100%',
    borderRadius: 10,
  },
  contentBannerTopLeft: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  bannerButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});
