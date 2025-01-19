// File: app/_layout.tsx
import { Platform, TouchableOpacity } from 'react-native';
import { useState, useCallback } from "react";
import { View, Text } from "react-native";
import { v4 as uuidv4 } from "uuid";
import { RSA } from "react-native-rsa-native";
import * as Application from 'expo-application';

import { useDispatch, useSelector } from "react-redux";
import configAction from '@/state/config/configSlice';
import PhoneInput from 'react-native-international-phone-number';



export default function FirstRegisterDeviceUi() {
    const [inputValue, setInputValue] = useState('');
    const [selectedCountry, setSelectedCountry] = useState({ "callingCode": "+62", "cca2": "ID", "flag": "🇮🇩", "name": { "ar": "إندونيسيا", "bg": "Индонезия", "by": "Інданезія", "cn": "印度尼西亚", "cz": "Indonésie", "da": "Indonesien", "de": "Indonesien", "ee": "Indoneesia", "el": "Ινδονησία", "en": "Indonesia", "es": "Indonesia", "fr": "Indonésie", "he": "אינדונזיה", "it": "Indonesia", "jp": "インドネシア", "nl": "Indonesië", "pl": "Indonezja", "pt": "Indonésia", "ro": "Indonezia", "ru": "Индонезия", "tr": "Endonezya", "ua": "Індонезія", "zh": "印度尼西亞" } });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useDispatch();
    const { tokenRegistrasi } = useSelector((state) => state.config);



    const handleSelectedCountry = (country) => {
        setInputValue('');
        setSelectedCountry((oldState) => {
            return {
                ...oldState,
                ...country
            }
        });
    };


    const handleInputChange = (phoneNumber) => {
        const cleaned = phoneNumber.replace(/\D+/g, '');
        setInputValue(cleaned);
    };




    const handleSubmit = useCallback(async () => {
        try {
            setIsSubmitting(true);
            if (!inputValue) {
                console.log('hp kosong')
                return;
            }
            if (!selectedCountry.callingCode) {
                console.log('country kosong')
                return;
            }
            const codeNoPlus = selectedCountry.callingCode.replace(/^\+/, '');
            const fullPhoneNumber = codeNoPlus + inputValue;

            // 1. Dapatkan OS ID
            let osId = null;
            if (Platform.OS === 'android') {
                osId = Application.getAndroidId();
            } else if (Platform.OS === 'ios') {
                osId = await Application.getIosIdForVendorAsync();
            }
            if (!osId) {
                throw new Error('Cannot get OS device ID');
            }

            // 2. Buat deviceId
            let finalDeviceId = '';
            if (Platform.OS === 'android') {
                finalDeviceId = `ANDROID-${osId}`;
            } else if (Platform.OS === 'ios') {
                finalDeviceId = `IOS-${osId}`;
            } else {
                finalDeviceId = `UNKNOW-${uuidv4()}`;
            }

            // 3. Generate key pair
            const keys = await RSA.generateKeys(4096);
            const privateKey = keys.private;
            const pubKey = keys.public;


            dispatch(configAction.startRegisterDevice({
                deviceId: finalDeviceId,
                phoneNumber: fullPhoneNumber,
                privateKey: privateKey,
                publicKey: pubKey
            }));

        } catch (err) {
            console.error('Submit phone number error:', err);
        }
    }, [inputValue, selectedCountry, dispatch]);






    return (
        <View className="flex-col items-center justify-center space-y-4 mx-14 mt-12">
            <Text style={{ marginBottom: 8 }} className='text-center text-red-700'>
                Masukan no telepon anda
            </Text>
            <PhoneInput
                defaultCountry="ID"
                value={inputValue}
                onChangePhoneNumber={handleInputChange}
                selectedCountry={selectedCountry}
                onChangeSelectedCountry={handleSelectedCountry}
                phoneInputStyles={{
                    container: {
                        backgroundColor: '#ffffff',
                        borderWidth: 1,
                        borderStyle: 'solid',
                        // gunakan rgba(156, 163, 175, 0.25) agar mirip gray-400/25
                        borderColor: 'rgba(156, 163, 175, 0.25)',
                        borderRadius: 8,
                    },
                    flagContainer: {
                        borderTopLeftRadius: 7,
                        borderBottomLeftRadius: 7,
                        backgroundColor: '#ffffff',
                        justifyContent: 'center',
                        paddingHorizontal: 8,
                    },
                    caret: {
                        color: 'rgba(156, 163, 175, 0.25)',
                        fontSize: 16,
                    },
                    divider: {
                        backgroundColor: 'rgba(156, 163, 175, 0.25)',
                    },
                    callingCode: {
                        fontSize: 12,
                        color: '#000000',
                    },
                    input: {
                        color: '#000000',
                    },
                }}
                modalStyles={{
                    modal: {
                        backgroundColor: '#ffffff',
                        borderWidth: 1,
                        borderColor: 'rgba(156, 163, 175, 0.25)',
                    },
                    divider: {
                        backgroundColor: 'rgba(156, 163, 175, 0.25)',
                    },
                    searchInput: {
                        borderRadius: 8,
                        borderWidth: 1,
                        borderColor: 'rgba(156, 163, 175, 0.25)',
                        color: '#000000',
                        backgroundColor: '#ffffff',
                        paddingHorizontal: 12,
                        height: 46,
                        fontSize: 12,
                    },
                    countryButton: {
                        borderWidth: 1,
                        borderColor: 'rgba(156, 163, 175, 0.25)',
                        backgroundColor: '#ffffff',
                        marginVertical: 4,
                        paddingVertical: 4,
                    },
                    callingCode: {
                        color: '#000000',
                    },
                    countryName: {
                        color: '#000000',
                    },
                }}
            />

            <View className=' flex w-full items-end justify-end'>
                <TouchableOpacity
                    className='bg-red-700 mt-6 py-2 px-4 rounded-md mx-14'
                    onPress={handleSubmit}
                    disabled={isSubmitting}
                >
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                        {isSubmitting ? 'Mengirim...' : 'Lanjutkan'}
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}

