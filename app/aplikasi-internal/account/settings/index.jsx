import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutInternal } from "@/store/slices/authSlice";
import {
  setNetworkOnline,
  setNetworkOffline,
  setNetworkModeAuto,
  setNetworkModeManual,
} from "@/store/slices/deviceSlice";

//import { useAuth } from '@/contexts/AuthContext';
//import { signOut } from '@/lib/auth';



export default function SettingsScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { internalUser } = useSelector((state) => state.auth);
  const { networkMode, networkStatus } = useSelector((state) => state.device);
  const [currentLanguage, setCurrentLanguage] = useState("English (US)");
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    try {
      setLoading(true);
      dispatch(logoutInternal());
      //router.replace('/sign-in');
    } catch (error) {
      //console.error("Error signing out:", error);
    } finally {
      setLoading(false);
    }
  };



  const setNetworkMode = useCallback(()=>{
    if(networkMode === 'auto'){
      dispatch(setNetworkModeManual())
    }else{
      dispatch(setNetworkModeAuto())
    }
  },[ dispatch, networkMode])


  const setNetworkStatus = useCallback(()=>{
    if(networkStatus === 'online'){
      dispatch(setNetworkOffline())
    }else{
      dispatch(setNetworkOnline())
    }
  },[ dispatch, networkStatus])







  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-6">
        <Text className="text-2xl font-bold mb-6">Settings</Text>

        <View className="bg-white rounded-xl p-4 mb-6">
          <SettingItem
            icon="person"
            title="Account"
            subtitle={"sdasdasdasdasdasdas"}
            //onPress={() => router.push("/user/settings/account")}
          />
          <SettingItem
            icon="notifications"
            title="Notifications"
            subtitle="Customize notifications"
          />
          <SettingItem
            icon="lock-closed"
            title="Privacy"
            subtitle="Manage your privacy settings"
          />
          <SettingItem
            icon="shield"
            title="Security"
            subtitle="Password and authentication"
            showBorder={false}
            //onPress={() => router.push("/settings/security")}
          />
        </View>

        <View className="bg-white rounded-xl p-4 mb-6">
          <TouchableOpacity
            className={`flex-row items-center py-4 border-b border-gray-200`}
            onPress={setNetworkMode}
          >
            <View className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center">
              <Ionicons name={"moon"} size={20} color={"red"} />
            </View>
            <View className="flex-1 ml-4">
              <Text className="font-semibold">Network Mode</Text>
              <Text className="text-gray-600 text-sm">Set Network Mode</Text>
            </View>
            <View className=" flex-row">
              {networkMode == 'auto' ? ( <Text className=" font-bold text-sm text-green-600">AUTO</Text>) : 
              ( <Text className=" font-bold text-sm text-red-600">MANUAL</Text>) }
             
            </View>
          </TouchableOpacity>


          <TouchableOpacity
            className={`flex-row items-center py-4 border-b border-gray-200`}
            onPress={setNetworkStatus}
          >
            <View className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center">
              <Ionicons name={"moon"} size={20} color={"red"} />
            </View>
            <View className="flex-1 ml-4">
              <Text className="font-semibold">Network Mode</Text>
              <Text className="text-gray-600 text-sm">Set Network Mode</Text>
            </View>
            <View className=" flex-row">
              {networkStatus == 'online' ? ( <Text className=" font-bold text-sm text-green-600">ONLINE</Text>) : 
              ( <Text className=" font-bold text-sm text-red-600">OFFLINE</Text>) }
             
            </View>
          </TouchableOpacity>





          <SettingItem
            icon="moon"
            title="Network Status"
            subtitle="Set Network Status"
          />

          <SettingItem
            icon="moon"
            title="Appearance"
            subtitle="Dark mode and theme"
          />
          <SettingItem
            icon="globe"
            title="Language"
            subtitle={currentLanguage}
            showBorder={false}
            onPress={() => router.push("/settings/language")}
          />
        </View>

        <View className="bg-white rounded-xl p-4 mb-6">
          <SettingItem
            icon="help-circle"
            title="Help & Support"
            subtitle="FAQs and contact"
            onPress={() => router.push("/settings/help-support")}
          />
          <SettingItem
            icon="information-circle"
            title="About"
            subtitle="Version 1.0.0"
            showBorder={false}
          />
        </View>

        <TouchableOpacity
          className={`bg-red-500 rounded-xl p-4 items-center ${
            loading ? "opacity-70" : ""
          }`}
          onPress={handleSignOut}
          disabled={loading}
        >
          <Text className="text-white font-semibold">
            {loading ? "Signing Out..." : "Sign Out"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}


function SettingItem ({
  color = "#007AFF",
  icon,
  title,
  subtitle,
  showBorder = true,
  onPress,
}){
  return (
    <TouchableOpacity
      className={`flex-row items-center py-4 ${
        showBorder ? "border-b border-gray-200" : ""
      }`}
      onPress={onPress}
    >
      <View className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center">
        <Ionicons name={icon} size={20} color={color} />
      </View>
      <View className="flex-1 ml-4">
        <Text className="font-semibold">{title}</Text>
        {subtitle && <Text className="text-gray-600 text-sm">{subtitle}</Text>}
      </View>
      <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
    </TouchableOpacity>
  )
};
