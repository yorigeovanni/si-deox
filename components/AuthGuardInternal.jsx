import { useState,useCallback } from 'react';
import { useSelector } from 'react-redux';
import { View, ActivityIndicator, Text } from 'react-native';
import { useRouter, useSegments, usePathname, Redirect, useFocusEffect } from 'expo-router';
import { set } from 'react-hook-form';



export default function AuthGuardInternal({ children }) {
  const [allow, setAllow] = useState(null);
  const segments = useSegments();
  const pathname = usePathname();
  const router = useRouter();
  const { internalUser } = useSelector(state => state.auth);
  const { user, loading } = internalUser;
  
  
  useFocusEffect(useCallback(() => {
    if (loading) return;
    const checkUserAccess = async () => {
      if (!user) {
        setAllow(false);
      } else {
        setAllow(true);
      }
    };
    checkUserAccess();
  }, [internalUser, loading, setAllow, segments, pathname ]));



  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#007AFF" />
        <Text className="mt-4 text-gray-600">Loading...</Text>
      </View>
    );
  }

  if(allow === false){
    return ( <Redirect href="/auth/login-internal" /> )
  }

  if(allow === true){
    return <>{children}</>;
  }
  
  

  return null;
}