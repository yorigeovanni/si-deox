import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Stack } from 'expo-router';
import { useSelector } from 'react-redux';

export default function AplikasiInternalLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useSelector((state) => state.externalUser);
  const isLoginPage = pathname === '/app-restricted-external/login';


  useEffect(() => {
    if (!user && !isLoginPage) {
      router.replace('/app-restricted-external/login');
    }
    else if (user && isLoginPage) {
      router.replace('/app-restricted-external');
    }
    else if (pathname === '/app-restricted-external') {
      switch (user.company?.type?.id) {
        case 1: {
          router.replace('/app-restricted-external/operator-airlines')
          break;
        }
        default: {
          router.replace('/app-restricted-external/unknown-type')
          break;
        }
      }
    } else {

    }
  }, [user, isLoginPage, router, pathname]);


  if (!user && !isLoginPage) {
    return (<View>
      <Text>Loading...</Text>
    </View>);
  }

  return (
    <View className="flex-1 bg-white">
      <Stack screenOptions={{ headerShown: false }} />
    </View>
  );
}


