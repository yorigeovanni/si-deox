// File: app/_layout.tsx
import "../global.css";
import { initializeSslPinning, addSslPinningErrorListener } from 'react-native-ssl-public-key-pinning';
import { Platform, Image, TouchableOpacity } from 'react-native';
import { useEffect, useState, useCallback, Fragment } from "react";
import { View, Text } from "react-native";
import { SplashScreen, Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as SecureStore from "expo-secure-store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import { onlineManager } from "@tanstack/react-query";
import * as Network from "expo-network";
import { RSA } from "react-native-rsa-native";
import * as Application from 'expo-application';
import { PersistGate } from "redux-persist/integration/react";
import { classNames } from '@/utils';

import createRequest from "@/core/api";
import { store, persistor } from "@/state";
import { Provider, useDispatch } from "react-redux";
import authAction from '@/state/auth/authSlice';
import DeoLogo from '@/assets/icon-baru.png';



const { post } = createRequest();
const queryClient = new QueryClient();






export default function RootLayout() {
  const [pinningReady, setPinningReady] = useState(false);
  const [pinningError, setPinningError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await initializeSslPinning({
          'deoairport.co.id': {
            includeSubdomains: true,
            publicKeyHashes: [
              'TfZZbHPIjkrEvBhmiaS1P8zgVmi+IQrebzk+PQIfGsM=',
              'bdrBhpj38ffhxpubzkINl0rG+UyossdhcBYj+Zx2fcc=', // dummy hash
            ],
          },
        });
        console.log('SSL Pinning initialized');
        setPinningReady(true);
      } catch (error) {
        console.log('SSL Pinning failed:', error);
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
    return (<View><Text>ERROR PINING</Text></View>)
  }


  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <MainContent />
          </PersistGate>
        </Provider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}







const MainContent = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [{ isLoading, isComplete, isError }, setAllChecked] = useState({ isLoading: true, isComplete: null, isError: false });
  const dispatch = useDispatch();



  const registerDevice = useCallback(async (deviceId, publicKey) => {
    if (!deviceId || !publicKey) {
      console.log('Device ID / Public Key belum siap');
      return;
    }

    try {
      /*const { headers, data } = await post(`/mobile/api/register-device`, {
        deviceId,
        publicKey
      });

      console.log("Response Headers:", headers);
      console.log("Response Data:", data);
      setLoading(false);

      dispatch(authAction.setAuthData({
        accessToken: data.accessToken,
        hashing: data.hashing,
      }));*/


      const response = await fetch('https://deoairport.co.id/mobile/api/register-device', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // tambahkan header lain jika perlu, misalnya Authorization dsb.
        },
        body: JSON.stringify({
          deviceId,
          publicKey,
        }),
      });

      // Periksa apakah response sukses (status 2xx)
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      // Mengambil data JSON
      const data = await response.json();
      console.log(data);

      // Jika butuh mengambil header
      // response.headers adalah objek Headers
      // mis. const customHeader = response.headers.get('X-Custom-Header');
      const headers = response.headers;

    } catch (err) {
      console.error('Error registerDevice:', error);

      setError(true);
    }
  }, [dispatch, post]);





  const checkDeviceRegister = useCallback(async () => {
    try {
      const storedId = await SecureStore.getItemAsync('deviceId');
      const existingPrivKey = await SecureStore.getItemAsync('privateKey');
      const existingpublicKey = await SecureStore.getItemAsync('publicKey');

      if (!storedId || !existingPrivKey || !existingpublicKey) {
        setAllChecked((oldState) => {
          return {
            ...oldState,
            isLoading: false,
            isComplete: false,
            isError: false,
          }
        })

        let osId = null;
        if (Platform.OS === 'android') {
          osId = Application.getAndroidId();
        } else if (Platform.OS === 'ios') {
          osId = await Application.getIosIdForVendorAsync();
        }

        if (Platform.OS === 'android') {
          await SecureStore.setItemAsync('deviceId', `ANDROID-${osId}`);
          finalDeviceId = `ANDROID-${osId}`;
        } else if (Platform.OS === 'ios') {
          await SecureStore.setItemAsync('deviceId', `IOS-${osId}`);
          finalDeviceId = `IOS-${osId}`;
        } else {
          await SecureStore.setItemAsync('deviceId', `UNKNOW-${uuidv4()}`);
          finalDeviceId = `UNKNOW-${uuidv4()}`;
        }
        //const keys = await RSA.generateKeys(4096);
        //console.log(keys);
        //privateKey = keys.private;
        //pubKey = keys.public;
        //await SecureStore.setItemAsync('privateKey', privateKey);
        //await SecureStore.setItemAsync('publicKey', pubKey);
        //registerDevice(finalDeviceId, pubKey);
        
      } else {

        setAllChecked((oldState) => {
          return {
            ...oldState,
            isLoading: false,
            isComplete: true,
            isError: false,
          }
        })
      }

    } catch (error) {
      setAllChecked((oldState) => {
        return {
          ...oldState,
          isLoading: false,
          isComplete: null,
          isError: true,
        }
      })
    }
  }, []);





  useEffect(() => {
    const unsubscribeNetworkListener = Network.addNetworkStateListener((state) => {
      const isConnected = state.isConnected ?? false;
      setIsOnline(isConnected);
    });
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
    checkDeviceRegister();
  }, [checkDeviceRegister]);






  if (isLoading) {
    return (
      <View className={classNames('bg-white px-4 pb-4 flex-1 flex-col justify-center items-center', Platform.OS === 'android' ? "" : "")}>
        <View className="flex-row items-center space-x-8">
          <Image source={DeoLogo} style={{ width: 150, height: 60 }} />
        </View>
        <View className="flex-col items-center justify-center space-y-0">
          <Text className="text-red-700 text-xl font-extrabold ">DEO AIRPORT</Text>
          <Text className="text-red-700 text-sm leading-4 ">TERDEPAN - BERKUALITAS - BERSINAR</Text>
        </View>
      </View>
    );

  }



  if (isError) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#EEE" }}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Terjadi kesalahan</Text>
        <Text style={{ color: "#888" }}>Silakan coba lagi nanti</Text>
      </View>
    );
  }




  if (/*isComplete === false*/true) {
    return (
      <View className={classNames('bg-white px-4 pb-4 flex-1 flex-col justify-center items-center', Platform.OS === 'android' ? "" : "")}>
        <View className="flex-row items-center space-x-8">
          <Image source={DeoLogo} style={{ width: 150, height: 60 }} />
        </View>
        <View className="flex-col items-center justify-center space-y-0">
          <Text className="text-red-700 text-xl font-extrabold ">DEO AIRPORT</Text>
          <Text className="text-red-700 text-sm leading-4 ">FIRST INTIAL USE</Text>
        </View>

        <View>
          <Text>INPUT PHONE NUMBER</Text>
        </View>
      </View>
    );

  }








  return (
    <Fragment>
      {isOnline ? (<Stack screenOptions={{ headerShown: false }} />) : (
        // Halaman offline
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#EEE" }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>Anda sedang offline</Text>
          <Text style={{ color: "#888" }}>Periksa koneksi jaringan Anda</Text>
        </View>
      )}
    </Fragment>
  );
}


