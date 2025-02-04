import React, { Fragment, useState, useEffect } from 'react';
import { View, TouchableOpacity, ScrollView, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import { StyleSheet } from 'react-native';
import { BaseStyle, useTheme, BaseColor, Images } from '@/config';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Text, Icon, ModalFilter, Image, EventListItem } from '@/components';
import {
  Placeholder,
  PlaceholderLine,
  Progressive,
  PlaceholderMedia,
} from 'rn-placeholder';



export default function RootIndex() {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const categories = [{"color": "#A569BD", "icon": "music", "title": "Music"}, {"color": "#5DADE2", "icon": "star", "title": "Shows"}, {"color": "#58D68D", "icon": "futbol", "title": "Sports"}, {"color": "#5D6D7E", "icon": "bullseye", "title": "Events"}, {"color": "#5DADE2", "icon": "snowboarding", "title": "Out Door"}];
  const features = [{"address": "99 Charing Cross Crossing", "author": {"image": 46, "level": "Agency", "name": "Steve Garrett"}, "date": "Tueday 29 Dec 2020", "description": "Donec sollicitudin molestie malesuada. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vivamus magna justo,lacinia eget consectetur sed, convallis at tellus. Pellentesque in ipsum id orci porta dapibus. Pellentesque in ipsum id orci porta dapibus. Nulla porttitor accumsan tincidunt. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus.", "email": "liststar@passionui.com", "gallerys": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "id": 4, "image": 21, "location": {"latitude": 40.738149, "longitude": -73.98579}, "nearlys": [], "numberRate": 421, "phone": "171-615-0225", "price": "$550.99", "rate": 3.5, "rateStatus": "Good", "subtitle": "Event", "time": "21:00 - 23:00 PM", "title": "International Gala Music Festival", "website": "www.passionui.com"}, {"address": "183 Donald Hill", "author": {"image": 46, "level": "Agency", "name": "Steve Garrett"}, "date": "Priday 25 Dec 2020", "description": "Donec sollicitudin molestie malesuada. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vivamus magna justo,lacinia eget consectetur sed, convallis at tellus. Pellentesque in ipsum id orci porta dapibus. Pellentesque in ipsum id orci porta dapibus. Nulla porttitor accumsan tincidunt. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus.", "email": "liststar@passionui.com", "favorite": true, "gallerys": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "id": 6, "image": 23, "location": {"latitude": 40.738169, "longitude": -73.98559}, "nearlys": [], "numberRate": 512, "phone": "171-615-0225", "price": "$550.99", "rate": 5, "rateStatus": "Very Good", "subtitle": "Event", "time": "18:00 - 20:00 PM", "title": "Slate & Crystal", "website": "www.passionui.com"}, {"address": "99 Charing Cross Crossing", "author": {"image": 45, "level": "Developer", "name": "Wem"}, "date": "Saturday 26 Dec 2020", "description": "Donec sollicitudin molestie malesuada. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vivamus magna justo,lacinia eget consectetur sed, convallis at tellus. Pellentesque in ipsum id orci porta dapibus. Pellentesque in ipsum id orci porta dapibus. Nulla porttitor accumsan tincidunt. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus.", "email": "liststar@passionui.com", "gallerys": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "id": 5, "image": 22, "location": {"latitude": 40.738159, "longitude": -73.98569}, "nearlys": [], "numberRate": 314, "phone": "171-615-0225", "price": "$550.99", "rate": 4.5, "rateStatus": "Very Good", "status": "Coming", "subtitle": "Event", "time": "15:00 - 23:00 PM", "title": "Happy New Year", "website": "www.passionui.com"}, {"address": "99 Charing Cross Crossing", "author": {"image": 45, "level": "Developer", "name": "Wem"}, "date": "Tuesday 29 Dec 2020", "description": "Donec sollicitudin molestie malesuada. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vivamus magna justo,lacinia eget consectetur sed, convallis at tellus. Pellentesque in ipsum id orci porta dapibus. Pellentesque in ipsum id orci porta dapibus. Nulla porttitor accumsan tincidunt. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus.", "email": "liststar@passionui.com", "favorite": true, "gallerys": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "id": 1, "image": 18, "location": {"latitude": 40.738119, "longitude": -73.98569}, "nearlys": [], "numberRate": 340, "phone": "171-615-0225", "price": "$550.99", "rate": 4.5, "rateStatus": "Very Good", "status": "Coming", "subtitle": "Music", "time": "18:00 - 20:00 PM", "title": "International Festival", "website": "www.passionui.com"}];
  const news = [{"address": "93667 Morningstar Place", "author": {"image": 46, "level": "Agency", "name": "Steve Garrett"}, "date": "Monday 28 Dec 2020", "description": "Donec sollicitudin molestie malesuada. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vivamus magna justo,lacinia eget consectetur sed, convallis at tellus. Pellentesque in ipsum id orci porta dapibus. Pellentesque in ipsum id orci porta dapibus. Nulla porttitor accumsan tincidunt. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus.", "email": "liststar@passionui.com", "gallerys": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "id": 2, "image": 19, "location": {"latitude": 40.738129, "longitude": -73.98599}, "nearlys": [], "numberRate": 310, "phone": "171-615-0225", "price": "$550.99", "rate": 4, "rateStatus": "Good", "subtitle": "Show", "time": "18:00 - 21:00 PM", "title": "Kane Brown Drive-In Concert Experience", "website": "www.passionui.com"}, {"address": "46619 Glendale Street", "author": {"image": 45, "level": "Developer", "name": "Wem"}, "date": "Sunday 27 Dec 2020", "description": "Donec sollicitudin molestie malesuada. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vivamus magna justo,lacinia eget consectetur sed, convallis at tellus. Pellentesque in ipsum id orci porta dapibus. Pellentesque in ipsum id orci porta dapibus. Nulla porttitor accumsan tincidunt. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus.", "email": "liststar@passionui.com", "favorite": true, "gallerys": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "id": 3, "image": 20, "location": {"latitude": 40.738139, "longitude": -73.98589}, "nearlys": [], "numberRate": 210, "phone": "171-615-0225", "price": "$550.99", "rate": 5, "rateStatus": "Very Good", "status": "Trending", "subtitle": "Sport", "time": "17:00 - 21:00 PM", "title": "Corb Lund & Lauren Morrow", "website": "www.passionui.com"}, {"address": "99 Charing Cross Crossing", "author": {"image": 45, "level": "Developer", "name": "Wem"}, "date": "Thurday 24 Dec 2020", "description": "Donec sollicitudin molestie malesuada. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vivamus magna justo,lacinia eget consectetur sed, convallis at tellus. Pellentesque in ipsum id orci porta dapibus. Pellentesque in ipsum id orci porta dapibus. Nulla porttitor accumsan tincidunt. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus.", "email": "liststar@passionui.com", "gallerys": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "id": 7, "image": 24, "location": {"latitude": 40.738179, "longitude": -73.98549}, "nearlys": [], "numberRate": 121, "phone": "171-615-0225", "price": "$550.99", "rate": 4.5, "rateStatus": "Very Good", "subtitle": "Sport", "time": "18:00 - 23:30 PM", "title": "International Gala", "website": "www.passionui.com"}, {"address": "9318 West Parkway", "author": {"image": 46, "level": "Agency", "name": "Steve Garrett"}, "date": "Tueday 29 Dec 2020", "description": "Donec sollicitudin molestie malesuada. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vivamus magna justo,lacinia eget consectetur sed, convallis at tellus. Pellentesque in ipsum id orci porta dapibus. Pellentesque in ipsum id orci porta dapibus. Nulla porttitor accumsan tincidunt. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus.", "email": "liststar@passionui.com", "favorite": true, "gallerys": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "id": 8, "image": 25, "location": {"latitude": 40.738189, "longitude": -73.98539}, "nearlys": [], "numberRate": 51, "phone": "171-615-0225", "price": "$550.99", "rate": 3.5, "rateStatus": "Good", "status": "Trending", "subtitle": "Music", "time": "21:00 - 23:10 PM", "title": "Mo Lowda and The Humble & Desert Noises", "website": "www.passionui.com"}];

  const [countrySelected, setCountrySelected] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);


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



  const renderCategory = () => {
    if (categories.length > 0) {
      return (
        <FlatList
          contentContainerStyle={{
            paddingLeft: 20,
            paddingRight: 20,
            marginTop: 20,
          }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={(item, index) => `Category ${index}`}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={{alignItems: 'center', paddingHorizontal: 20}}
                onPress={onListView}>
                <View
                  style={[
                    styles.categoryContent,
                    {backgroundColor: item.color + '4D'},
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
        renderItem={({item, index}) => {
          return (
            <View style={{paddingHorizontal: 20}}>
              <Placeholder Animation={Progressive}>
                <View style={{alignItems: 'center'}}>
                  <PlaceholderMedia style={styles.categoryContent} />
                  <PlaceholderLine
                    style={{width: 50, height: 8, marginTop: 10}}
                  />
                </View>
              </Placeholder>
            </View>
          );
        }}
      />
    );
  };



  const renderFeature = () => {
    let list = (
      <FlatList
        contentContainerStyle={{paddingLeft: 20}}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={[1, 2, 3, 4, 5, 6]}
        keyExtractor={(item, index) => `popular${index}`}
        renderItem={({item, index}) => (
          <EventListItem
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

    if (features.length > 0) {
      list = (
        <FlatList
          contentContainerStyle={{paddingLeft: 5, paddingRight: 20}}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={features}
          keyExtractor={(item, index) => `popular${index}`}
          renderItem={({item, index}) => (
            <EventListItem
              grid
              title={item.title}
              subtitle={item.subtitle}
              status={item.status}
              image={item.image}
              address={item.address}
              favorite={isFavorite(item)}
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
        <View style={{padding: 20}}>
          <Text title3 bold>
            {t('feature_event')}
          </Text>
          <Text body2 grayColor style={{marginTop: 4}}>
            {t('let_find_event')}
          </Text>
        </View>
        {list}
      </View>
    );
  };



  const renderNewEvent = () => {
    let list = (
      <View style={{paddingHorizontal: 20}}>
        {[1, 2, 3, 4, 5].map((item, index) => {
          return (
            <EventListItem
              key={`NewEvent ${index}`}
              loading={true}
              list
              style={{marginBottom: 15}}
            />
          );
        })}
      </View>
    );

    if (news.length > 0) {
      list = (
        <View style={{paddingHorizontal: 20}}>
          {news.map((item, index) => {
            return (
              <EventListItem
                key={`NewEvent ${index}`}
                list
                title={item.title}
                subtitle={item.date}
                status={item.status}
                image={item.image}
                address={item.address}
                location={item.location}
                favorite={isFavorite(item)}
                style={{marginBottom: 15}}
                onPress={() => onProductDetail(item)}
              />
            );
          })}
        </View>
      );
    }

    return (
      <View>
        <View style={{padding: 20}}>
          <Text title3 bold>
            {t('new_event')}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 4,
            }}>
            <Text body2 grayColor>
              {t('let_find_best_price')}
            </Text>
            <TouchableOpacity onPress={onListView}>
              <Text body2 accentColor>
                {t('view_all')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {list}
      </View>
    );
  };



  return (
    <View style={{ flex: 1, backgroundColor : '#ffffff' }}>
      <View style={styles.contentHeader}>
          <View
            style={{
              alignItems: 'flex-start',
              justifyContent: 'center',
            }}>
            <Text subhead grayColor>
              Dec 01 2020
            </Text>
            <Text headline semibold style={{marginTop: 4}}>
              Hello Steve Garrett
            </Text>
          </View>
          <TouchableOpacity
            style={styles.avatarContent}
            //onPress={() => onNotification()}
            >
            <Image style={styles.avatar} source={Images.profile2} />
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
          //onPress={() => navigation.navigate('SearchHistory')}
          style={styles.contentSearch}>
          <View style={[BaseStyle.textInput, {backgroundColor: colors.card}]}>
            <Text body1 grayColor style={{flex: 1}}>
              {t('search_event')}
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

        <ScrollView
          style={{flex: 1}}
          refreshControl={
            <RefreshControl
              colors={[colors.primary]}
              tintColor={colors.primary}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }>
            {renderCategory()}
            {renderFeature()}
            {renderNewEvent()}
          
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
  contentSearch: {
    marginVertical: 8,
    paddingHorizontal: 20,
  },
  lineForm: {
    width: 1,
    height: '100%',
    margin: 10,
  },
  categoryContent: {
    width: 60,
    height: 60,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarContent: {
    width: 36,
    height: 36,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
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
});
