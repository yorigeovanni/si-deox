// File: app/_layout.tsx
import "../global.css";
import "react-native-get-random-values";
import { initializeSslPinning, addSslPinningErrorListener } from "react-native-ssl-public-key-pinning";
import { useEffect, useState, Fragment } from "react";
import { View, Text, StatusBar, Platform, useColorScheme } from "react-native";

import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { onlineManager } from "@tanstack/react-query";
import * as Network from "expo-network";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/state";
import { Provider, useDispatch, useSelector } from "react-redux";
import RegistrasiDevice from "@/components/registrasi-device";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import {NavigationContainer} from '@react-navigation/native';
import {useTheme, BaseSetting} from '@/config';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';


const queryClient = new QueryClient();


export default function RootLayout() {
  const [pinningReady, setPinningReady] = useState(false);
  const [pinningError, setPinningError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await initializeSslPinning({
          [process.env.EXPO_PUBLIC_SSL_PINNING_DOMAIN]: {
            includeSubdomains: true,
            publicKeyHashes: [
              process.env.EXPO_PUBLIC_SSL_PINNING_CERT_1,
              process.env.EXPO_PUBLIC_SSL_PINNING_CERT_2,
            ],
          },
        });
        console.log("SSL Pinning initialized");
        setPinningReady(true);
      } catch (error) {
        console.log("SSL Pinning failed:", error);
        setPinningError(true);
      }
    })();
  }, []);

  useEffect(() => {
    const subscription = addSslPinningErrorListener((error) => {
      console.log(error.serverHostname);
      setPinningError(true);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  if (pinningError) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>ERROR PINNING</Text>
      </View>
    );
  }
/*
  // Bungkus aplikasi dengan SafeAreaProvider
  return (
    <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                  <MainContent />
            </PersistGate>
          </Provider>
    </QueryClientProvider>
  );

  */

  // Bungkus aplikasi dengan SafeAreaProvider
  return (
    <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView style={{ flex: 1 }}> 
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <SafeAreaProvider>
                <SafeAreaView style={{ flex: 1 }}>
                  <MainContent />
                </SafeAreaView>
              </SafeAreaProvider>
            </PersistGate>
          </Provider>
        </GestureHandlerRootView> 
    </QueryClientProvider>
  );
}







// Komponen MainContent
const MainContent = () => {
  const [isOnline, setIsOnline] = useState(true);
  const { isRegistered } = useSelector((state) => state.globalOtp);
  const language = useSelector((state) => state.application.language);
  const design = useSelector((state) => state.config.design);
  const {theme, colors} = useTheme();
  const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useDispatch();



  useEffect(() => {
    const unsubscribeNetworkListener = Network.addNetworkStateListener(
      (state) => {
        const isConnected = state.isConnected ?? false;
        setIsOnline(isConnected);
      }
    );
    onlineManager.setEventListener((setOnline) => {
      const unsubscribe = Network.addNetworkStateListener((state) => {
        setOnline(state.isConnected ?? false);
      });
      return () => unsubscribe.remove();
    });
    return () => {
      unsubscribeNetworkListener.remove();
    };
  }, []);


  useEffect(() => {
    i18n.use(initReactI18next).init({
      resources: BaseSetting.resourcesLanguage,
      lng: BaseSetting.defaultLanguage,
      fallbackLng: BaseSetting.defaultLanguage,
      compatibilityJSON: 'v3',
    });
  }, []);


  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);






  if (!isRegistered) {
    return <RegistrasiDevice />;
  }

  return (
    <Fragment>
      {isOnline ? (
        <View className="flex-1 bg-white">
          <Stack theme={theme} screenOptions={{ headerShown: false }}/>
        </View>
      ) : (
        // Halaman offline
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#EEE",
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            Anda sedang offline
          </Text>
          <Text style={{ color: "#888" }}>
            Periksa koneksi jaringan Anda
          </Text>
        </View>
      )}
    </Fragment>
  );
};
