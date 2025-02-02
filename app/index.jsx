import React, {useEffect, Fragment, useCallback} from 'react';
import {ActivityIndicator, View, Alert, StyleSheet, Platform, StatusBar} from 'react-native';
import {Images, useTheme, BaseSetting} from '@/config';
import Image from '@/components/Image';
import {useDispatch, useSelector} from 'react-redux';
import * as Font from 'expo-font';
import { useRouter } from "expo-router";



export default function RootIndex() {
  const design = useSelector((state) => state.config.design);
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const router = useRouter();


  Alert.alert = ({title, message, action, option, type}) => {
    navigation.navigate('Alert', {
      type: type ?? 'warning',
      title: title ?? '',
      message: message ?? '',
      action,
      option: option ?? {cancelable: true},
    });
  };


  const onProcess = useCallback(async () => {
    await Font.loadAsync({
      'Merriweather-Black': require('@/assets/fonts/Merriweather-Black.ttf'),
      'Merriweather-BlackItalic': require('@/assets/fonts/Merriweather-BlackItalic.ttf'),
      'Merriweather-Bold': require('@/assets/fonts/Merriweather-Bold.ttf'),
      'Merriweather-BoldItalic': require('@/assets/fonts/Merriweather-BoldItalic.ttf'),
      'Merriweather-Italic': require('@/assets/fonts/Merriweather-Italic.ttf'),
      'Merriweather-Light': require('@/assets/fonts/Merriweather-Light.ttf'),
      'Merriweather-LightItalic': require('@/assets/fonts/Merriweather-LightItalic.ttf'),
      'Merriweather-Regular': require('@/assets/fonts/Merriweather-Regular.ttf'),
      "Merriweather": require('@/assets/fonts/Merriweather-Regular.ttf'),
      'Raleway-Black': require('@/assets/fonts/Raleway-Black.ttf'),
      'Raleway-BlackItalic': require('@/assets/fonts/Raleway-BlackItalic.ttf'),
      'Raleway-Bold': require('@/assets/fonts/Raleway-Bold.ttf'),
      'Raleway-BoldItalic': require('@/assets/fonts/Raleway-BoldItalic.ttf'),
      'Raleway-ExtraBold': require('@/assets/fonts/Raleway-ExtraBold.ttf'),
      'Raleway-ExtraBoldItalic': require('@/assets/fonts/Raleway-ExtraBoldItalic.ttf'),
      'Raleway-ExtraLight': require('@/assets/fonts/Raleway-ExtraLight.ttf'),
      'Raleway-ExtraLightItalic': require('@/assets/fonts/Raleway-ExtraLightItalic.ttf'),
      'Raleway-Italic': require('@/assets/fonts/Raleway-Italic.ttf'),
      'Raleway-Light': require('@/assets/fonts/Raleway-Light.ttf'),
      'Raleway-LightItalic': require('@/assets/fonts/Raleway-LightItalic.ttf'),
      'Raleway-Medium': require('@/assets/fonts/Raleway-Medium.ttf'),
      'Raleway-MediumItalic': require('@/assets/fonts/Raleway-MediumItalic.ttf'),
      'Raleway-Regular': require('@/assets/fonts/Raleway-Regular.ttf'),
      "Raleway": require('@/assets/fonts/Raleway-Regular.ttf'),
      'Raleway-SemiBold': require('@/assets/fonts/Raleway-SemiBold.ttf'),
      'Raleway-SemiBoldItalic': require('@/assets/fonts/Raleway-SemiBoldItalic.ttf'),
      'Raleway-Thin': require('@/assets/fonts/Raleway-Thin.ttf'),
      'Raleway-ThinItalic': require('@/assets/fonts/Raleway-ThinItalic.ttf'),
      'Roboto-Black': require('@/assets/fonts/Roboto-Black.ttf'),
      'Roboto-BlackItalic': require('@/assets/fonts/Roboto-BlackItalic.ttf'),
      'Roboto-Bold': require('@/assets/fonts/Roboto-Bold.ttf'),
      'Roboto-BoldItalic': require('@/assets/fonts/Roboto-BoldItalic.ttf'),
      'Roboto-Italic': require('@/assets/fonts/Roboto-Italic.ttf'),
      'Roboto-Light': require('@/assets/fonts/Roboto-Light.ttf'),
      'Roboto-LightItalic': require('@/assets/fonts/Roboto-LightItalic.ttf'),
      'Roboto-Medium': require('@/assets/fonts/Roboto-Medium.ttf'),
      'Roboto-MediumItalic': require('@/assets/fonts/Roboto-MediumItalic.ttf'),
      'Roboto-Regular': require('@/assets/fonts/Roboto-Regular.ttf'),
      "Roboto": require('@/assets/fonts/Roboto-Regular.ttf'),
      'Roboto-Thin': require('@/assets/fonts/Roboto-Thin.ttf'),
      'Roboto-ThinItalic': require('@/assets/fonts/Roboto-ThinItalic.ttf'),
    });

    /*dispatch(
      configActions.onSetup(
        design ?? BaseSetting.defaultDesign,
        user,
        response => {
          navigation.replace('Main');
        },
      ),
    );*/
    router.replace('/portal-2');
  },[router, dispatch]);


  useEffect(() => {
    onProcess();
  }, []);




  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Image source={Images.logo} style={styles.logo} resizeMode="contain" />
      </View>
      <ActivityIndicator
        size="large"
        color={colors.text}
        style={styles.loading}
      />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
  },
  loading: {
    position: 'absolute',
    top: 260,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
});
