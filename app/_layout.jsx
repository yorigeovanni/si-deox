import "../global.css";
import "react-native-get-random-values";
import {
  initializeSslPinning,
  addSslPinningErrorListener,
} from "react-native-ssl-public-key-pinning";
import { Stack } from "expo-router";
import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/store";
import { StatusBar } from "expo-status-bar";
import DeviceRegistration from "@/components/DeviceRegistration";

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

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootLayoutNav />
      </PersistGate>
    </Provider>
  );
}

function RootLayoutNav() {
  const { isRegistered } = useSelector((state) => state.device);

  if (!isRegistered) {
    return (
      <View style={{ flex: 1 }}>
        <DeviceRegistration />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar style="auto" />
    </View>
  );
}
