// File: app/_layout.tsx
import { Platform, Image } from 'react-native';
import { View, Text } from "react-native";
import { classNames } from '@/utils';
import DeoLogo from '@/assets/icon-baru.png';
import { useSelector } from "react-redux";


import InputPhoneNumber from './input-phone-number';
import InputOtp from './input-otp-code';




export default function FirstRegisterDeviceUi() {
   const { tokenRegistrasi } = useSelector((state) => state.config);
   return (
    <View className={classNames('bg-white px-4 pb-4 flex-1 flex-col justify-center items-center', Platform.OS === 'android' ? "" : "")}>
        <View className="flex-row items-center space-x-8">
            <Image source={DeoLogo} style={{ width: 150, height: 60 }} />
        </View>
        <View className="flex-col items-center justify-center space-y-0">
            <Text className="text-red-700 text-xl font-extrabold ">DEO AIRPORT</Text>
            <Text className="text-red-700 text-xl font-bold ">WELCOME ABOARD</Text>
        </View>
        {!tokenRegistrasi ? ( <InputPhoneNumber />) : ( <InputOtp/> )}
    </View>
    );
}

