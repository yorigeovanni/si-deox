import React, { Fragment, useState, useEffect, useCallback } from 'react';
import { View, TouchableOpacity, ScrollView, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import { StyleSheet } from 'react-native';
import { BaseStyle, useTheme, BaseColor, Images } from '@/config';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Text, Icon, ModalFilter, Image, EventListItem, SafeAreaView } from '@/components';
import { Placeholder, PlaceholderLine, Progressive, PlaceholderMedia } from 'rn-placeholder';
import { useRouter } from 'expo-router';
const baseURL = process.env.NODE_ENV === 'production' ? process.env.EXPO_PUBLIC_API_URL : 'http://10.8.0.2:4002';


export default function RootIndex() {
  const { user } = useSelector((state) => state.internalUser);
  console.log(user)
  const router = useRouter();
  const { colors } = useTheme();
  const { t } = useTranslation();
  const categories = [
    {
      "color": "#5DADE2",
      "icon": "snowboarding",
      "title": "AMC",
      "path": "/app-restricted-internal/tekops/amc"
    },
    {
      "color": "#A569BD",
      "icon": "music",
      "title": "ELBAN",
      "path": "/app-restricted-internal/tekops/elban"
    },
    {
      "color": "#5DADE2",
      "icon": "star",
      "title": "BANGLAND",
      "path": "/app-restricted-internal/tekops/bangland"
    },
    {
      "color": "#58D68D",
      "icon": "futbol",
      "title": "PKP-PK",
      "path": "/app-restricted-internal/tekops/pkp-pk"
    },
    {
      "color": "#5D6D7E",
      "icon": "bullseye",
      "title": "AVSEC",
      "path": "/app-restricted-internal/tekops/avsec"
    },

  ];


  const features = [
    {
      "address": `dilaporakan oleh : ${new Date().toLocaleDateString()}`,
      "id": 6, "image": 23,
      "phone": "171-615-0225",
      "price": "$550.99",
      "subtitle": `Last Update: ${new Date().toLocaleDateString()}`,
      "time": "18:00 - 20:00 PM",
      "title": "UNIT AMC"
    },
    {
      "address": `dilaporakan oleh : ${new Date().toLocaleDateString()}`,
      "id": 6, "image": 23,
      "phone": "171-615-0225",
      "price": "$550.99",
      "subtitle": `Last Update: ${new Date().toLocaleDateString()}`,
      "time": "18:00 - 20:00 PM",
      "title": "UNIT ELBAN"
    }
  ];
  const news = [{ "address": "93667 Morningstar Place", "author": { "image": 46, "level": "Agency", "name": "Steve Garrett" }, "date": "Monday 28 Dec 2020", "description": "Donec sollicitudin molestie malesuada. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vivamus magna justo,lacinia eget consectetur sed, convallis at tellus. Pellentesque in ipsum id orci porta dapibus. Pellentesque in ipsum id orci porta dapibus. Nulla porttitor accumsan tincidunt. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus.", "email": "liststar@passionui.com", "gallerys": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "id": 2, "image": 19, "location": { "latitude": 40.738129, "longitude": -73.98599 }, "nearlys": [], "numberRate": 310, "phone": "171-615-0225", "price": "$550.99", "rate": 4, "rateStatus": "Good", "subtitle": "Show", "time": "18:00 - 21:00 PM", "title": "Kane Brown Drive-In Concert Experience", "website": "www.passionui.com" }, { "address": "46619 Glendale Street", "author": { "image": 45, "level": "Developer", "name": "Wem" }, "date": "Sunday 27 Dec 2020", "description": "Donec sollicitudin molestie malesuada. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vivamus magna justo,lacinia eget consectetur sed, convallis at tellus. Pellentesque in ipsum id orci porta dapibus. Pellentesque in ipsum id orci porta dapibus. Nulla porttitor accumsan tincidunt. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus.", "email": "liststar@passionui.com", "favorite": true, "gallerys": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "id": 3, "image": 20, "location": { "latitude": 40.738139, "longitude": -73.98589 }, "nearlys": [], "numberRate": 210, "phone": "171-615-0225", "price": "$550.99", "rate": 5, "rateStatus": "Very Good", "status": "Trending", "subtitle": "Sport", "time": "17:00 - 21:00 PM", "title": "Corb Lund & Lauren Morrow", "website": "www.passionui.com" }, { "address": "99 Charing Cross Crossing", "author": { "image": 45, "level": "Developer", "name": "Wem" }, "date": "Thurday 24 Dec 2020", "description": "Donec sollicitudin molestie malesuada. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vivamus magna justo,lacinia eget consectetur sed, convallis at tellus. Pellentesque in ipsum id orci porta dapibus. Pellentesque in ipsum id orci porta dapibus. Nulla porttitor accumsan tincidunt. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus.", "email": "liststar@passionui.com", "gallerys": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "id": 7, "image": 24, "location": { "latitude": 40.738179, "longitude": -73.98549 }, "nearlys": [], "numberRate": 121, "phone": "171-615-0225", "price": "$550.99", "rate": 4.5, "rateStatus": "Very Good", "subtitle": "Sport", "time": "18:00 - 23:30 PM", "title": "International Gala", "website": "www.passionui.com" }, { "address": "9318 West Parkway", "author": { "image": 46, "level": "Agency", "name": "Steve Garrett" }, "date": "Tueday 29 Dec 2020", "description": "Donec sollicitudin molestie malesuada. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vivamus magna justo,lacinia eget consectetur sed, convallis at tellus. Pellentesque in ipsum id orci porta dapibus. Pellentesque in ipsum id orci porta dapibus. Nulla porttitor accumsan tincidunt. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus.", "email": "liststar@passionui.com", "favorite": true, "gallerys": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "id": 8, "image": 25, "location": { "latitude": 40.738189, "longitude": -73.98539 }, "nearlys": [], "numberRate": 51, "phone": "171-615-0225", "price": "$550.99", "rate": 3.5, "rateStatus": "Good", "status": "Trending", "subtitle": "Music", "time": "21:00 - 23:10 PM", "title": "Mo Lowda and The Humble & Desert Noises", "website": "www.passionui.com" }];



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




  const goToApp = useCallback(path => {
    router.push(path);
  }, [router]);


  const goToMyAccount = useCallback(path => {
    // router.push(path);
  }, [router]);



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



  const renderFeature = () => {
    let list = (
      <FlatList
        contentContainerStyle={{ paddingLeft: 20 }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={[1, 2, 3, 4, 5, 6]}
        keyExtractor={(item, index) => `popular${index}`}
        renderItem={({ item, index }) => (
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
          contentContainerStyle={{ paddingLeft: 5, paddingRight: 20 }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={features}
          keyExtractor={(item, index) => `popular${index}`}
          renderItem={({ item, index }) => (
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
        <View style={{ padding: 20 }}>
          <Text title3 bold>
            LAPORAN HARIAN /  UNIT KERJA
          </Text>
          <Text body2 grayColor style={{ marginTop: 4 }}>
            Laporan Harian / Log book per Unit Kerja
          </Text>
        </View>
        {list}
      </View>
    );
  };



  const renderNewEvent = () => {
    let list = (
      <View style={{ paddingHorizontal: 20 }}>
        {[1, 2, 3, 4, 5].map((item, index) => {
          return (
            <EventListItem
              key={`NewEvent ${index}`}
              loading={true}
              list
              style={{ marginBottom: 15 }}
            />
          );
        })}
      </View>
    );

    if (news.length > 0) {
      list = (
        <View style={{ paddingHorizontal: 20 }}>
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
            5 DOKUMENT TERBARU
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 4,
            }}>
            <Text body2 grayColor>
              aplikasi penyimpanan Dokument
            </Text>
            <TouchableOpacity onPress={onListView}>
              <Text body2 accentColor>
                selengkapnya
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {list}
      </View>
    );
  };



  return (
    <SafeAreaView style={{ flex: 1 }} forceInset={{ top: 'always' }}>
      <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <View style={styles.contentHeader}>
          <View className=' flex-row items-center '>
            <TouchableOpacity
              onPress={() => {
                router.replace('/home');
              }}>
              <Icon
                name="arrow-left"
                size={20}
                color={colors.primary}
                solid
              />
            </TouchableOpacity>
            <View
              style={{
                alignItems: 'flex-start',
                justifyContent: 'center',
                marginLeft: 20,
              }}>
              <Text subhead grayColor>
                Dec 01 2020
              </Text>
              <Text headline semibold style={{ marginTop: 4 }}>
                {user.name}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.avatarContent}
            onPress={() => goToMyAccount()}
          >
            <Image style={styles.avatar} source={{ uri: `${baseURL}/web/image?model=hr.employee&id=${user?.id}&field=avatar_128` }} />
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
          {renderCategory()}
          {renderFeature()}
          {renderNewEvent()}

        </ScrollView>


      </View>
    </SafeAreaView>

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
