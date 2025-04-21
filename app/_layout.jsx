import "../global.css";
import "react-native-get-random-values";
import { initializeSslPinning, addSslPinningErrorListener } from "react-native-ssl-public-key-pinning";
import { Stack } from "expo-router";
import { View, Text, Platform } from "react-native";
import { useEffect, useState } from "react";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/store";
import { StatusBar } from "expo-status-bar";
import * as Updates from "expo-updates";
import { QueryClient, QueryClientProvider, focusManager } from "@tanstack/react-query";

import DeviceRegistration from "@/components/DeviceRegistration";
import UpdateAppModal from "@/components/ui/UpdateAppModal";
import NotificationManager from "@/components/NotificationManager";
import { useOnlineManager } from '@/hooks/useOnlineManager';
import { useAppState } from '@/hooks/useAppState';



function onAppStateChange(status) {
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 } },
});


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
        setPinningReady(true);
      } catch (error) {
        console.log("SSL Pinning failed:", error);
        setPinningError(true);
      }
    })();
  }, []);

  useEffect(() => {
    const subscription = addSslPinningErrorListener((error) => {
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
          <QueryClientProvider client={queryClient}>
            <NotificationManager>
              <RootLayoutNav />
            </NotificationManager>
          </QueryClientProvider>
        </PersistGate>
      </Provider>
  );
}

function RootLayoutNav() {
  const { isRegistered } = useSelector((state) => state.device);
  const { currentlyRunning, isUpdateAvailable, isUpdatePending } =
    Updates.useUpdates();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  useOnlineManager();
  useAppState(onAppStateChange)

  useEffect(() => {
    async function checkForUpdates() {
      try {
        if (isUpdatePending) {
          setShowUpdateModal(true);
          return;
        }
        if (!isUpdateAvailable) {
          const update = await Updates.checkForUpdateAsync();
          if (update.isAvailable) {
            await Updates.fetchUpdateAsync();
            setShowUpdateModal(true);
          }
        }
      } catch (error) {
        //console.log("Error checking for updates:", error);
      }
    }
    checkForUpdates();
  }, [isUpdatePending, isUpdateAvailable]);

  const handleUpdate = async () => {
    try {
      setIsUpdating(true);
      await Updates.reloadAsync();
    } catch (error) {
      //console.log("Error reloading app:", error);
      setIsUpdating(false);
      // Show error state in modal instead of Alert
    }
  };

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
      <UpdateAppModal
        visible={showUpdateModal}
        onDismiss={() => setShowUpdateModal(false)}
        onUpdate={handleUpdate}
        isUpdating={isUpdating}
      />
    </View>
  );
}
