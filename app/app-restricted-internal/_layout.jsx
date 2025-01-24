import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Stack } from 'expo-router';
import { useSelector } from 'react-redux';



export default function AplikasiInternalLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useSelector((state) => state.internalUser);
  const isLoginPage = pathname === '/app-restricted-internal/login';


  useEffect(() => {
    if (!user && !isLoginPage) {
      router.replace('/app-restricted-internal/login');
    }
    if (user && isLoginPage) {
      router.replace('/app-restricted-internal');
    }
  }, [user, isLoginPage, router]);


  if (!user && !isLoginPage) {
    return <View><Text>Loading...</Text></View>;
  }

  return (
    <View className="flex-1 bg-white">
      <Stack screenOptions={{ headerShown: false }} />
    </View>
  );
}
