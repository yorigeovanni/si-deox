import React, { useState, useRef, useEffect } from 'react';
import {
    Animated,
    ScrollView,
    Share,
    View,
    Alert,
    Linking,
    TouchableOpacity,
    Platform,
    StyleSheet
} from 'react-native';
import { BaseColor, useTheme, Images, BaseStyle } from '@/config';
import {
    Header,
    Image,
    SafeAreaView,
    Text,
    Icon,
    FoodListItem,
    ProfileCall,
    ListItem,
} from '@/components';
import { useTranslation } from 'react-i18next';
//import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import * as Utils from '@/utils';
import { useDispatch, useSelector } from 'react-redux';
import {
    Placeholder,
    PlaceholderLine,
    Progressive,
    PlaceholderMedia,
} from 'rn-placeholder';
import { useLocalSearchParams } from 'expo-router';




const SearchHistoryView = () => {
    const { t } = useTranslation();
    const scrollY = useRef(new Animated.Value(0)).current;
    //const item = route.params?.item;
    const { id } = useLocalSearchParams();
    // const dispatch = useDispatch();
    //const user = useSelector(userSelect);
    //const wishlist = useSelector(wishlistSelect);
    // const design = useSelector(designSelect);
    const { colors } = useTheme();

    const [heightHeader, setHeightHeader] = useState(Utils.heightHeader());
    const [loading, setLoading] = useState(false);
    const [like, setLike] = useState(false);
    const [product, setProduct] = useState({ "address": "99 Charing Cross Crossing", "author": { "image": 45, "level": "Developer", "name": "Wem" }, "description": "Donec sollicitudin molestie malesuada. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vivamus magna justo,lacinia eget consectetur sed, convallis at tellus. Pellentesque in ipsum id orci porta dapibus. Pellentesque in ipsum id orci porta dapibus. Nulla porttitor accumsan tincidunt. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus.", "distance": "15 Km", "email": "liststar@passionui.com", "favorite": true, "gallerys": [{ "full": 36 }, { "full": 27 }, { "full": 28 }, { "full": 29 }, { "full": 30 }, { "full": 31 }, { "full": 32 }, { "full": 33 }], "id": 1, "image": 36, "location": { "latitude": 40.738119, "longitude": -73.98599 }, "nearlys": [[], { "address": "99 Charing Cross Crossing", "author": [Object], "description": "Donec sollicitudin molestie malesuada. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vivamus magna justo,lacinia eget consectetur sed, convallis at tellus. Pellentesque in ipsum id orci porta dapibus. Pellentesque in ipsum id orci porta dapibus. Nulla porttitor accumsan tincidunt. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus.", "distance": "5 Km", "email": "liststar@passionui.com", "gallerys": [Array], "id": 2, "image": 38, "location": [Object], "nearlys": [Array], "numberRate": 320, "phone": "171-615-0225", "price": "$6.99", "promotion": "Discount 20%", "rate": 5, "rateStatus": "Very Good", "status": "Opening", "subtitle": "Drink", "title": "Starbucks", "website": "www.passionui.com" }, { "address": "99 Charing Cross Crossing", "author": [Object], "description": "Donec sollicitudin molestie malesuada. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vivamus magna justo,lacinia eget consectetur sed, convallis at tellus. Pellentesque in ipsum id orci porta dapibus. Pellentesque in ipsum id orci porta dapibus. Nulla porttitor accumsan tincidunt. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus.", "distance": "900 m", "email": "liststar@passionui.com", "favorite": true, "gallerys": [Array], "id": 3, "image": 37, "location": [Object], "nearlys": [], "numberRate": 573, "phone": "171-615-0225", "price": "$4.99", "promotion": "Discount 15%", "rate": 4.5, "rateStatus": "Very Good", "status": "Closed", "subtitle": "Drink", "title": "Organic Orchard", "website": "www.passionui.com" }, { "address": "99 Charing Cross Crossing", "author": [Object], "description": "Donec sollicitudin molestie malesuada. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vivamus magna justo,lacinia eget consectetur sed, convallis at tellus. Pellentesque in ipsum id orci porta dapibus. Pellentesque in ipsum id orci porta dapibus. Nulla porttitor accumsan tincidunt. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus.", "distance": "500 m", "email": "liststar@passionui.com", "gallerys": [Array], "id": 4, "image": 27, "location": [Object], "nearlys": [Array], "numberRate": 443, "phone": "171-615-0225", "price": "$7.99", "promotion": "Discount 15%", "rate": 4, "rateStatus": "Very Good", "status": "Opening", "subtitle": "Vegetable", "title": "Freshmart Co-op", "website": "www.passionui.com" }, { "address": "99 Charing Cross Crossing", "author": [Object], "description": "Donec sollicitudin molestie malesuada. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vivamus magna justo,lacinia eget consectetur sed, convallis at tellus. Pellentesque in ipsum id orci porta dapibus. Pellentesque in ipsum id orci porta dapibus. Nulla porttitor accumsan tincidunt. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus.", "distance": "200 m", "email": "liststar@passionui.com", "favorite": true, "gallerys": [Array], "id": 5, "image": 28, "location": [Object], "nearlys": [Array], "numberRate": 387, "phone": "171-615-0225", "price": "$5.99", "promotion": "Discount 25%", "rate": 5, "rateStatus": "Very Good", "status": "Opening", "subtitle": "Fastfood", "title": "Freshmart Co-op", "website": "www.passionui.com" }, { "address": "99 Charing Cross Crossing", "author": [Object], "description": "Donec sollicitudin molestie malesuada. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vivamus magna justo,lacinia eget consectetur sed, convallis at tellus. Pellentesque in ipsum id orci porta dapibus. Pellentesque in ipsum id orci porta dapibus. Nulla porttitor accumsan tincidunt. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus.", "distance": "2 Km", "email": "liststar@passionui.com", "gallerys": [Array], "id": 6, "image": 29, "location": [Object], "nearlys": [Array], "numberRate": 430, "phone": "171-615-0225", "price": "$6.99", "promotion": "Discount 45%", "rate": 4.5, "rateStatus": "Very Good", "status": "Opening", "subtitle": "Pizza", "title": "Budget Foods", "website": "www.passionui.com" }, { "address": "99 Charing Cross Crossing", "author": [Object], "description": "Donec sollicitudin molestie malesuada. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vivamus magna justo,lacinia eget consectetur sed, convallis at tellus. Pellentesque in ipsum id orci porta dapibus. Pellentesque in ipsum id orci porta dapibus. Nulla porttitor accumsan tincidunt. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus.", "distance": "700 m", "email": "liststar@passionui.com", "gallerys": [Array], "id": 7, "image": 30, "location": [Object], "nearlys": [Array], "numberRate": 363, "phone": "171-615-0225", "price": "$3.99", "promotion": "Discount 35%", "rate": 5, "rateStatus": "Very Good", "status": "Closed", "subtitle": "Juice", "title": "Fresh Food", "website": "www.passionui.com" }], "numberRate": 340, "phone": "171-615-0225", "price": "$6.99", "promotion": "Free Shipping", "rate": 4.5, "rateStatus": "Very Good", "status": "Opening", "subtitle": "Drink", "title": "Exotic Eats", "website": "www.passionui.com" });

    const headerBackgroundColor = scrollY.interpolate({
        inputRange: [0, 140],
        outputRange: [BaseColor.whiteColor, colors.text],
        extrapolate: 'clamp',
        useNativeDriver: true,
    });

    const headerImageOpacity = scrollY.interpolate({
        inputRange: [0, 250 - heightHeader - 20],
        outputRange: [1, 0],
        extrapolate: 'clamp',
        useNativeDriver: true,
    });

    const heightViewImg = scrollY.interpolate({
        inputRange: [0, 250 - heightHeader],
        outputRange: [250, heightHeader],
        useNativeDriver: true,
    });



    const onReview = () => {
        /*if (user) {
          navigation.navigate({
            name: 'Review',
          });
        } else {
          navigation.navigate({
            name: 'SignIn',
            params: {
              success: () => {
                navigation.navigate({
                  name: 'Review',
                });
              },
            },
          });
        }*/
      };



    const renderBanner = () => {

        if (loading) {
            return (
                <Placeholder Animation={Progressive}>
                    <PlaceholderMedia style={{ width: '100%', height: '100%' }} />
                </Placeholder>
            );
        }

        return (
            <Image style={{ width: '100%', height: '100%' }} source={product.image} />
        );
    };


    const renderLike = () => {
        return (
          <TouchableOpacity 
         // onPress={() => onLike(!like)}
          >
            {like ? (
              <Icon name="heart" color={colors.primaryLight} solid size={18} />
            ) : (
              <Icon name="heart" color={colors.primaryLight} size={18} />
            )}
          </TouchableOpacity>
        );
      };

    const renderContent = () => {
        if (loading) {
          return (
            <View style={styles.content}>
              <Placeholder Animation={Progressive}>
                <PlaceholderLine
                  style={{width: '90%', height: 20, marginTop: 70}}
                />
                <PlaceholderLine style={{width: '90%', height: 20}} />
                <PlaceholderLine style={{width: '90%', height: 20}} />
                <PlaceholderLine style={{width: '90%', height: 20}} />
                <PlaceholderLine style={{width: '90%', height: 20}} />
                <PlaceholderLine style={{width: '90%', height: 20}} />
                <PlaceholderLine style={{width: '90%', height: 20}} />
                <PlaceholderLine style={{width: '90%', height: 20}} />
                <PlaceholderLine style={{width: '90%', height: 20}} />
                <PlaceholderLine style={{width: '90%', height: 20}} />
                <PlaceholderLine style={{width: '90%', height: 20}} />
                <PlaceholderLine style={{width: '90%', height: 20}} />
              </Placeholder>
            </View>
          );
        }
    
        return (
          <View style={styles.content}>
            <View
              style={[
                styles.boxInfo,
                {
                  backgroundColor: colors.card,
                  shadowColor: colors.border,
                  borderColor: colors.border,
                },
              ]}>
              <View style={{flext: 1}}>
                <Text title1 semibold numberOfLines={1}>
                  {product.title}
                </Text>
                <View style={styles.contentStatus}>
                  <Text caption2 accentColor medium>
                    {product.status}
                  </Text>
                  <View style={styles.dot} />
                  <Text caption2 grayColor style={{flex: 1}} numberOfLines={1}>
                    {product.subtitle}
                  </Text>
                </View>
                <View style={styles.contentStatus}>
                  <TouchableOpacity
                    //onPress={onReview}
                    style={[
                      styles.tagRate,
                      {backgroundColor: colors.primaryLight},
                    ]}>
                    <Icon
                      name="star"
                      size={10}
                      color={BaseColor.whiteColor}
                      solid
                    />
                    <Text caption2 whiteColor semibold style={{marginLeft: 4}}>
                      {product.rate}
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.dot} />
                  <Text caption2 numberOfLines={1}>
                    {product.distance}
                  </Text>
                  <View style={styles.dot} />
                  <Text caption2 numberOfLines={1}>
                    {product.promotion}
                  </Text>
                </View>
              </View>
              <View style={styles.boxContentLeft}>
                <View
                  style={[
                    styles.promotionTag,
                    {backgroundColor: colors.primary + '4D'},
                  ]}>
                  <Text overline medium primaryColor>
                    {t('discount')}
                  </Text>
                </View>
                {renderLike()}
              </View>
            </View>
            <ProfileCall
              image={product.author?.image}
              title={product.author?.name}
              subtitle={product.author?.level}
             //Messenger={() => onPressMessenger()}
              onPressPhone={() => onOpen('phone', t('tel'), product.phone)}
            />
            <TouchableOpacity
              style={styles.aboutRow}
              onPress={() => {
                const location = `${product.location?.latitude},${product.location?.longitude}`;
                const url = Platform.select({
                  ios: `maps:${location}`,
                  android: `geo:${location}?center=${location}&q=${location}&z=16`,
                });
                onOpen('address', t('address'), url);
              }}>
              <View style={[styles.contentIcon, {backgroundColor: colors.border}]}>
                <Icon
                  name="map-marker-alt"
                  size={16}
                  color={BaseColor.whiteColor}
                />
              </View>
              <View style={{marginLeft: 10}}>
                <Text caption2 grayColor>
                  {t('address')}
                </Text>
                <Text footnote semibold style={{marginTop: 5}}>
                  {product.address}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.aboutRow}
              onPress={() => {
                onOpen('phone', t('tel'), product.phone);
              }}>
              <View style={[styles.contentIcon, {backgroundColor: colors.border}]}>
                <Icon name="mobile-alt" size={16} color={BaseColor.whiteColor} />
              </View>
              <View style={{marginLeft: 10}}>
                <Text caption2 grayColor>
                  {t('tel')}
                </Text>
                <Text footnote semibold style={{marginTop: 5}}>
                  {product.phone}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.aboutRow}
              onPress={() => {
                onOpen('envelope', t('envelope'), product.email);
              }}>
              <View style={[styles.contentIcon, {backgroundColor: colors.border}]}>
                <Icon name="envelope" size={16} color={BaseColor.whiteColor} />
              </View>
              <View style={{marginLeft: 10}}>
                <Text caption2 grayColor>
                  {t('email')}
                </Text>
                <Text footnote semibold style={{marginTop: 5}}>
                  {product.email}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.aboutRow}
              onPress={() => {
                onOpen('web', t('website'), product.website);
              }}>
              <View style={[styles.contentIcon, {backgroundColor: colors.border}]}>
                <Icon name="globe" size={16} color={BaseColor.whiteColor} />
              </View>
              <View style={{marginLeft: 10}}>
                <Text caption2 grayColor>
                  {t('website')}
                </Text>
                <Text footnote semibold style={{marginTop: 5}}>
                  {product.website}
                </Text>
              </View>
            </TouchableOpacity>
            <Text
              title3
              bold
              style={{
                marginTop: 20,
              }}>
              {t('products')}
            </Text>
            <Text
              body2
              grayColor
              style={{
                marginTop: 4,
                marginBottom: 15,
              }}>
              {t('best_price_tasty')}
            </Text>
            {product.nearlys.map((item, index) => {
              return (
                <FoodListItem
                  key={`Products ${index}`}
                  list
                  title={item.title}
                  subtitle={item.subtitle}
                  status={item.status}
                  image={item.image}
                  address={item.address}
                  favorite={isFavorite(item)}
                  style={{marginBottom: 15}}
                  onPress={() => onProductDetail(item)}
                />
              );
            })}
          </View>
        );
      };


    return (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <Header title={product?.title ?? ''} />
            <Animated.View
                style={[
                    styles.headerImageStyle,
                    {
                        opacity: headerImageOpacity,
                        height: heightViewImg,
                    },
                ]}>
                {renderBanner()}
            </Animated.View>
            <Animated.View style={[styles.headerStyle, { position: 'absolute' }]}>
                <Header
                    title=""
                    renderLeft={() => {
                        return (
                            <Animated.Image
                                resizeMode="contain"
                                style={[
                                    styles.icon,
                                    {
                                        tintColor: headerBackgroundColor,
                                    },
                                ]}
                                source={Images.back}
                            />
                        );
                    }}
                    renderRightSecond={() => {
                        return (
                            <View style={styles.iconContent}>
                                <Animated.Image
                                    resizeMode="contain"
                                    style={[
                                        styles.icon,
                                        {
                                            tintColor: headerBackgroundColor,
                                        },
                                    ]}
                                    source={Images.gallery}
                                />
                            </View>
                        );
                    }}
                    renderRight={() => {
                        return (
                            <View style={styles.iconContent}>
                                <Animated.Image
                                    resizeMode="contain"
                                    style={[
                                        styles.icon,
                                        {
                                            tintColor: headerBackgroundColor,
                                        },
                                    ]}
                                    source={Images.share}
                                />
                            </View>
                        );
                    }}
                    onPressLeft={() => {
                        navigation.goBack();
                    }}
                    // onPressRight={onShare}
                    onPressRightSecond={() => {
                        navigation.navigate('PreviewImage', {
                            gallery: product.gallerys,
                        });
                    }}
                />
            </Animated.View>
            <SafeAreaView style={BaseStyle.safeAreaView} edges={['left', 'right']}>
            <ScrollView
          onContentSizeChange={() => {
            setHeightHeader(Utils.heightHeader());
          }}
          overScrollMode={'never'}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {y: scrollY},
                },
              },
            ],
            {
              useNativeDriver: false,
            },
          )}>
          <View style={{height: 170 - heightHeader}} />
          {renderContent()}
        </ScrollView>
            </SafeAreaView>
        </View>
    );
};


export default SearchHistoryView;
const styles = StyleSheet.create({
    headerStyle: {
        height: 'auto',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerImageStyle: {
        height: 250,
        width: '100%',
        top: 0,
        alignSelf: 'center',
        position: 'absolute',
        paddingBottom: 20,
    },
    iconContent: {
        width: 28,
        height: 28,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: BaseColor.dividerColor,
    },
    content: {
        paddingHorizontal: 20,
    },
    icon: {
        width: 18,
        height: 18,
    },
    contentStatus: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    dot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: BaseColor.grayColor,
        marginHorizontal: 10,
    },
    tagRate: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
    },
    aboutRow: {
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
    lineSpace: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    boxInfo: {
        padding: 10,
        height: 120,
        width: '100%',
        borderRadius: 8,
        marginBottom: 20,
        borderWidth: 0.5,
        shadowOffset: { width: 1.5, height: 1.5 },
        shadowOpacity: 1.0,
        elevation: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    boxContentLeft: {
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    promotionTag: {
        borderRadius: 7,
        height: 14,
        paddingHorizontal: 7,
    },
});
