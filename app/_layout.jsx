// File: app/_layout.tsx
import "../global.css";
import { initializeSslPinning, addSslPinningErrorListener } from 'react-native-ssl-public-key-pinning';
import { useEffect, useState, Fragment } from "react";
import { View, Text } from "react-native";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { onlineManager } from "@tanstack/react-query";
import * as Network from "expo-network";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/state";
import { Provider, useDispatch , useSelector} from "react-redux";
import RegistrasiDevice from '@/components/ui/registrasi-device';



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
              'bdrBhpj38ffhxpubzkINl0rG+UyossdhcBYj+Zx2fcc=', // backup cert
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
  const { isRegistered,  } = useSelector((state) => state.config);
  const dispatch = useDispatch();





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



  if(!isRegistered){
    return (<RegistrasiDevice />);
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



