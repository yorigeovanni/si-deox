import { View, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
const baseURL = process.env.NODE_ENV === 'production' ? process.env.EXPO_PUBLIC_API_URL : process.env.EXPO_PUBLIC_API_DEV;


export const HistorySection = () => {
  return (
    <View className="flex-1 h-screen bg-white">
      <WebView
        source={{ uri:`${baseURL}/mobile/api/portal/website/pages/sejarah` }}
        renderLoading={() => (
          <View className="absolute inset-0 bg-white items-center justify-center">
            <ActivityIndicator size="large" color="#00796B" />
          </View>
        )}
        startInLoadingState={true}
        scalesPageToFit={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        originWhitelist={['*']}
        className="flex-1"
      />
    </View>
  );
};