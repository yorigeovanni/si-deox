import React, { Fragment, useState, useEffect } from 'react';
import { View, TouchableOpacity, ScrollView, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import { StyleSheet } from 'react-native';
import { BaseStyle, useTheme, BaseColor } from '@/config';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Text, Icon, ModalFilter, Image, RealEstateListItem } from '@/components';
import {
  Placeholder,
  PlaceholderLine,
  Progressive,
  PlaceholderMedia,
} from 'rn-placeholder';



export default function AirportFacility() {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const countrys = [
    {"value":"america","icon":"sort-amount-up","text":"United States","image":3,"checked":true},
    {"value":"vietname","icon":"sort-amount-down","text":"VietNam","image":2},
    {"value":"singapore","icon":"sort-amount-up","text":"Singapore","image":1},{"value":"indonesia","icon":"sort-amount-up","text":"Indonesia","image":4},{"value":"malaysia","icon":"sort-amount-up","text":"Malaysia","image":5},{"value":"philippines","icon":"sort-amount-up","text":"Philippines","image":6}];
  
  
  const locations = [
    {"title":"Garuda Indonesia","image":103},
    {"title":"Lion Air","image":104},
    {"title":"Wings Air","image":105},
    {"title":"Trigana Air","image":106},
    {"title":"California","image":107}]
  
  
  const populars = [{"id":1,"image":114,"gallerys":[{"full":114},{"full":115},{"full":116},{"full":117},{"full":118},{"full":119},{"full":120},{"full":121}],"facilities":[{"title":"Free Wifi","icon":"wifi"},{"title":"Showers","icon":"shower"},{"title":"Pet Allow","icon":"paw"},{"title":"Subway","icon":"subway"},{"title":"Parking","icon":"car"},{"title":"2 Beds","icon":"bed"},{"title":"Secure","icon":"user-secret"},{"title":"1600 sqft","icon":"crop"}],"title":"Peace Apartments","subtitle":"New York","rate":4.6,"numberRate":360,"price":"$550.99","status":"Open","address":"408 Lighthouse Bay Parkway","phone":"171-615-0225","description":"Donec sollicitudin molestie malesuada. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vivamus magna justo,lacinia eget consectetur sed, convallis at tellus. Pellentesque in ipsum id orci porta dapibus. Pellentesque in ipsum id orci porta dapibus. Nulla porttitor accumsan tincidunt. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus.","location":{"latitude":40.75108335239215,"longitude":-73.97202981215835},"author":{"name":"Wem","level":"Developer","image":45},"favorite":true,"nearlys":[]},{"id":2,"image":115,"gallerys":[{"full":115},{"full":114},{"full":116},{"full":117},{"full":118},{"full":119},{"full":120},{"full":121}],"facilities":[{"title":"Free Wifi","icon":"wifi"},{"title":"Showers","icon":"shower"},{"title":"Pet Allow","icon":"paw"},{"title":"Subway","icon":"subway"},{"title":"Parking","icon":"car"},{"title":"2 Beds","icon":"bed"},{"title":"Secure","icon":"user-secret"},{"title":"1600 sqft","icon":"crop"}],"title":"EcoStay","subtitle":"Nevada","rate":5,"numberRate":240,"price":"$490.99","status":"Best Sale","address":"42544 Larry Center","phone":"171-615-0225","description":"Donec sollicitudin molestie malesuada. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vivamus magna justo,lacinia eget consectetur sed, convallis at tellus. Pellentesque in ipsum id orci porta dapibus. Pellentesque in ipsum id orci porta dapibus. Nulla porttitor accumsan tincidunt. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus.","location":{"latitude":40.75108335239215,"longitude":-73.97202981215835},"author":{"name":"Steve Garrett","level":"Agency","image":46},"nearlys":[]},{"id":3,"image":116,"gallerys":[{"full":116},{"full":115},{"full":114},{"full":117},{"full":118},{"full":119},{"full":120},{"full":121}],"facilities":[{"title":"Free Wifi","icon":"wifi"},{"title":"Showers","icon":"shower"},{"title":"Pet Allow","icon":"paw"},{"title":"Subway","icon":"subway"},{"title":"Parking","icon":"car"},{"title":"2 Beds","icon":"bed"},{"title":"Secure","icon":"user-secret"},{"title":"1600 sqft","icon":"crop"}],"title":"Bean Apartments","subtitle":"New York","rate":4,"numberRate":233,"price":"$550.99","address":"90656 Glacier Hill Plaza","phone":"171-615-0225","status":"On Sale","description":"Donec sollicitudin molestie malesuada. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vivamus magna justo,lacinia eget consectetur sed, convallis at tellus. Pellentesque in ipsum id orci porta dapibus. Pellentesque in ipsum id orci porta dapibus. Nulla porttitor accumsan tincidunt. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus.","location":{"latitude":40.748272999999976,"longitude":-73.988127},"author":{"name":"Wem","level":"Developer","image":45},"nearlys":[]},{"id":4,"image":117,"gallerys":[{"full":117},{"full":115},{"full":116},{"full":114},{"full":118},{"full":119},{"full":120},{"full":121}],"facilities":[{"title":"Free Wifi","icon":"wifi"},{"title":"Showers","icon":"shower"},{"title":"Pet Allow","icon":"paw"},{"title":"Subway","icon":"subway"},{"title":"Parking","icon":"car"},{"title":"2 Beds","icon":"bed"},{"title":"Secure","icon":"user-secret"},{"title":"1600 sqft","icon":"crop"}],"title":"Victoria Apartments","subtitle":"New York","rate":4.5,"numberRate":500,"price":"$550.99","address":"003 Pond Circle","phone":"171-615-0225","description":"Donec sollicitudin molestie malesuada. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vivamus magna justo,lacinia eget consectetur sed, convallis at tellus. Pellentesque in ipsum id orci porta dapibus. Pellentesque in ipsum id orci porta dapibus. Nulla porttitor accumsan tincidunt. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus.","location":{"latitude":40.76475099,"longitude":-73.98137599},"author":{"name":"Steve Garrett","level":"Agency","image":46},"favorite":true,"nearlys":[]}];
  const recommend = [{"id":5,"image":118,"gallerys":[{"full":118},{"full":115},{"full":116},{"full":117},{"full":114},{"full":119},{"full":120},{"full":121}],"facilities":[{"title":"Free Wifi","icon":"wifi"},{"title":"Showers","icon":"shower"},{"title":"Pet Allow","icon":"paw"},{"title":"Subway","icon":"subway"},{"title":"Parking","icon":"car"},{"title":"2 Beds","icon":"bed"},{"title":"Secure","icon":"user-secret"},{"title":"1600 sqft","icon":"crop"}],"title":"The Dorm Room","subtitle":"Michigan","rate":3,"numberRate":15,"price":"$1200,99","status":"On Sale","favorite":true,"address":"408 Lighthouse Bay Parkway","phone":"171-615-0225","description":"Donec sollicitudin molestie malesuada. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vivamus magna justo,lacinia eget consectetur sed, convallis at tellus. Pellentesque in ipsum id orci porta dapibus. Pellentesque in ipsum id orci porta dapibus. Nulla porttitor accumsan tincidunt. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus.","location":{"latitude":40.750369,"longitude":-73.9688219},"author":{"name":"Wem","level":"Developer","image":45},"nearlys":[]},{"id":6,"image":119,"gallerys":[{"full":119},{"full":115},{"full":116},{"full":117},{"full":118},{"full":114},{"full":120},{"full":121}],"facilities":[{"title":"Free Wifi","icon":"wifi"},{"title":"Showers","icon":"shower"},{"title":"Pet Allow","icon":"paw"},{"title":"Subway","icon":"subway"},{"title":"Parking","icon":"car"},{"title":"2 Beds","icon":"bed"},{"title":"Secure","icon":"user-secret"},{"title":"1600 sqft","icon":"crop"}],"title":"Wild Estates","subtitle":"Missouri","rate":5,"numberRate":100,"price":"$700.99","address":"42544 Larry Center","phone":"171-615-0225","description":"Donec sollicitudin molestie malesuada. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vivamus magna justo,lacinia eget consectetur sed, convallis at tellus. Pellentesque in ipsum id orci porta dapibus. Pellentesque in ipsum id orci porta dapibus. Nulla porttitor accumsan tincidunt. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus.","location":{"latitude":40.7583599,"longitude":-73.985739},"author":{"name":"Steve Garrett","level":"Agency","image":46},"nearlys":[]},{"id":7,"image":120,"gallerys":[{"full":120},{"full":115},{"full":116},{"full":117},{"full":118},{"full":119},{"full":114},{"full":121}],"facilities":[{"title":"Free Wifi","icon":"wifi"},{"title":"Showers","icon":"shower"},{"title":"Pet Allow","icon":"paw"},{"title":"Subway","icon":"subway"},{"title":"Parking","icon":"car"},{"title":"2 Beds","icon":"bed"},{"title":"Secure","icon":"user-secret"},{"title":"1600 sqft","icon":"crop"}],"title":"Sunny Place","subtitle":"California","rate":5,"numberRate":635,"price":"$2900.99","status":"Best Sale","address":"90656 Glacier Hill Plaza","phone":"171-615-0225","description":"Donec sollicitudin molestie malesuada. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vivamus magna justo,lacinia eget consectetur sed, convallis at tellus. Pellentesque in ipsum id orci porta dapibus. Pellentesque in ipsum id orci porta dapibus. Nulla porttitor accumsan tincidunt. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus.","location":{"latitude":40.738469,"longitude":-73.98569},"author":{"name":"Wem","level":"Developer","image":45},"nearlys":[]},{"id":8,"image":121,"gallerys":[{"full":121},{"full":115},{"full":116},{"full":117},{"full":118},{"full":119},{"full":120},{"full":114}],"facilities":[{"title":"Free Wifi","icon":"wifi"},{"title":"Showers","icon":"shower"},{"title":"Pet Allow","icon":"paw"},{"title":"Subway","icon":"subway"},{"title":"Parking","icon":"car"},{"title":"2 Beds","icon":"bed"},{"title":"Secure","icon":"user-secret"},{"title":"1600 sqft","icon":"crop"}],"title":"City Dwellers","subtitle":"New York","rate":4.5,"numberRate":300,"price":"$850.99","address":"003 Pond Circle","phone":"171-615-0225","description":"Donec sollicitudin molestie malesuada. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vivamus magna justo,lacinia eget consectetur sed, convallis at tellus. Pellentesque in ipsum id orci porta dapibus. Pellentesque in ipsum id orci porta dapibus. Nulla porttitor accumsan tincidunt. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus.","location":{"latitude":40.738169,"longitude":-73.98569},"author":{"name":"Steve Garrett","level":"Agency","image":46},"favorite":true,"nearlys":[]}];
  
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




  const renderCountry = () => {
    if (countrys?.length > 0) {
      return (
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}>
          <Text body2>{countrySelected?.text || 'TERMINAL UTAMA'}</Text>
          <View style={styles.selectLocation}>
            <Text overline grayColor style={{ paddingRight: 4 }}>
              PILIH TERMINAL 
            </Text>
            <Icon
              name="angle-down"
              size={10}
              color={BaseColor.grayColor}
              solid
            />
          </View>
          <ModalFilter
            options={countrys}
            isVisible={modalVisible}
            onSwipeComplete={() => {
              setModalVisible(false);
            }}
            //onApply={onChangeCountry}
            ///ronSelectFilter={onSelectCountry}
          />
        </TouchableOpacity>
      );
    }

    return <ActivityIndicator size="small" color={colors.primary} />;
  };




  const renderLocation = () => {
    if (locations?.length > 0) {
      return (
        <FlatList
          contentContainerStyle={{
            paddingLeft: 20,
            paddingRight: 20,
            marginTop: 20,
          }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={locations}
          keyExtractor={(item, index) => `Location ${index}`}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={{alignItems: 'center'}}
                onPress={onListView}>
                <View
                  style={{
                    paddingHorizontal: 12,
                    marginBottom: 10,
                  }}>
                  <Image source={item.image} style={styles.locationImage} />
                </View>
                <Text footnote>{item.title}</Text>
              </TouchableOpacity>
            );
          }}
        />
      );
    }

    return (
      <FlatList
        contentContainerStyle={{
          paddingLeft: 20,
          paddingRight: 20,
          marginTop: 20,
        }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={[1, 2, 3, 4, 5, 6]}
        keyExtractor={(item, index) => `Location ${index}`}
        renderItem={({item, index}) => {
          return (
            <View style={{paddingHorizontal: 12}}>
              <Placeholder Animation={Progressive} key={`category${item}`}>
                <View style={{alignItems: 'center'}}>
                  <PlaceholderMedia style={styles.locationImage} />
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


  const renderPopular = () => {
    let list = (
      <FlatList
        contentContainerStyle={{paddingLeft: 20}}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={[1, 2, 3, 4, 5, 6]}
        keyExtractor={(item, index) => `popular${index}`}
        renderItem={({item, index}) => (
          <RealEstateListItem
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

    if (populars.length > 0) {
      list = (
        <FlatList
          contentContainerStyle={{paddingLeft: 5, paddingRight: 20}}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={populars}
          keyExtractor={(item, index) => `popular${index}`}
          renderItem={({item, index}) => (
            <RealEstateListItem
              grid
              title='SJ435'
              subtitle='GARUDA INDONESIA'
              status={item.status}
              image={item.image}
              price={item.price}
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
            {t('Keberangkatan')}
          </Text>
          <Text title3  style={{marginTop: 2}}>
            {t('03 Feburari 2025')}
          </Text>
        </View>
        {list}
      </View>
    );
  };

  

  const renderRecommend = () => {
    let list = (
      <View style={{paddingHorizontal: 20}}>
        {[1, 2, 3, 4, 5].map((item, index) => {
          return (
            <RealEstateListItem
              key={`recommend ${index}`}
              loading={true}
              list
              style={{marginBottom: 15}}
            />
          );
        })}
      </View>
    );

    if (recommend.length > 0) {
      list = (
        <View style={{paddingHorizontal: 20}}>
          {recommend.map((item, index) => {
            return (
              <RealEstateListItem
                key={`recommend ${index}`}
                list
                title={item.title}
                subtitle={item.subtitle}
                status={item.status}
                image={item.image}
                price={item.price}
                address={item.address}
                location={item.location}
                favorite={isFavorite(item)}
                style={{marginBottom: 15}}
               // onPress={() => onProductDetail(item)}
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
            {t('Penerbangan Hari Esok')}
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
        <Text header bold>
          DEO AIRPORT
        </Text>
        {renderCountry()}
      </View>
      <TouchableOpacity
         // onPress={() => navigation.navigate('SearchHistory')}
          style={styles.contentSearch}>
          <View style={[BaseStyle.textInput, {backgroundColor: colors.card}]}>
            <Text body1 grayColor style={{flex: 1}}>
              Temukan penerbangan anda
            </Text>
            <View style={{paddingVertical: 8}}>
              <View
                style={[styles.lineForm, {backgroundColor: colors.border}]}
              />
            </View>
            <Icon
              name="plane"
              size={18}
              color={colors.primary}
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

            {renderLocation()}
            {renderPopular()}
            {renderRecommend()}
         
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
  selectLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  lineForm: {
    width: 1,
    height: '100%',
    margin: 10,
  },
  locationImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
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
