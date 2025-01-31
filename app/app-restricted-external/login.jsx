import React, { useState, useCallback, Fragment, useEffect } from 'react';
import { View, Text, TouchableOpacity, Platform, TextInput, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { OtpInput } from "react-native-otp-entry";
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import BackgroundImage from '@/assets/002.png';
import { classNames } from '@/utils';
// STATE MANAGEMENT
import externalUserActions from '@/state/externalUser/externalUserSlice';
import SelectCompany from '@/components/external/login/SelectCompany';





export default function LoginExternal() {
    const router = useRouter();
    const { tokenLogin, selectedCompany } = useSelector((state) => state.externalUser);
    const onBackCustom = useCallback(() => {
        router.replace('/');
    }, [router]);



    return (
        <ImageBackground
            source={BackgroundImage}
            resizeMode="cover"
            style={{ flex: 1, width: '100%', height: '100%' }}
        >
            <View className="absolute flex-1 w-full h-full bg-black opacity-50" />
            <View className={classNames(' px-4 pb-4 flex-row justify-between mt-6')}>
                <View className="flex-col items-start space-y-0 ml-2">
                    <Text className="text-white text-xl font-extrabold  ">DEO AIRPORT</Text>
                    <Text className="text-white text-sm leading-4 ">TERDEPAN - BERKUALITAS - BERSINAR</Text>
                </View>


                <View className='flex-row items-center space-x-6 mr-8'>
                    <TouchableOpacity onPress={() => onBackCustom()}>
                        <Ionicons name="close" size={28} color="#ffffff" />
                    </TouchableOpacity>
                </View>
            </View>



            {!selectedCompany ? (<SelectCompany />) : !tokenLogin ? (<LoginComponent />) : (<InputOtpCode />)}
        </ImageBackground>
    );
};












const LoginComponent = ({ errorMessage }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { control, handleSubmit, reset, formState: { errors, isValid } } = useForm({
        mode: 'onChange',
        defaultValues: {
            nik_nip: ''
        }
    });
    const { isLoading, isError, tokenLogin, selectedCompany } = useSelector((state) => state.externalUser);


    // -- [2] onSubmit jika valid (berhasil lolos validasi client)
    const onSubmit = useCallback((data) => {
        dispatch(externalUserActions.requestToken(data));
    }, [dispatch]);


    const resetCompany = useCallback((data) => {
        dispatch(externalUserActions.resetCompany());
    }, [dispatch])



    const onError = useCallback((formErrors) => {
        // reset();
    }, [reset]);



    useEffect(() => {
        if (isError) {
            reset();
        }
    }, [isError, reset]);



    return (
        <Fragment>
            <View className={classNames(
                'flex flex-col justify-center items-center px-4 pb-4',
            )}>

                <View className="flex-col items-center justify-center space-y-0 mb-2 mt-6">
                <Text className="text-white text-lg font-bold">
                        LOGIN MITRA/STACKHOLDER
                    </Text>
                    <Text className="text-white text-4xl font-extrabold items-center text-center ">
                        {selectedCompany.name?.toUpperCase()}
                    </Text>
                   
                </View>
            </View>
            <View className="flex w-full">
                {isLoading && (
                    <Text className="text-center text-white text-lg mb-4">
                        Loading...
                    </Text>
                )}
                {isError && (
                    <Text className="text-center text-white text-lg mb-4">
                        PROSES LOGIN GAGAL
                    </Text>
                )}

                <Controller
                    control={control}
                    name="nik_nip"
                    rules={{
                        required: 'username wajib diisi',
                        /*pattern: {
                            value: /^[0-9]*$/,
                            message: 'NIK / NIP hanya boleh berisi angka',
                        },*/
                        minLength: {
                            value: 10,
                            message: 'username minimal 10 karakter',
                        }
                    }}
                    render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                        <View className="flex flex-col mx-16">
                            <TextInput
                                placeholder="username / email"
                                placeholderTextColor="#fff"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                keyboardType="phone-pad"
                                className="text-white px-4 py-4 rounded-md border border-gray-300 w-full"
                                // Disable input saat loading
                                editable={!isLoading}
                            />
                            {/* Tampilkan pesan error validasi */}
                            {error && (
                                <Text className="text-white text-sm flex justify-start items-start text-start">
                                    {error.message}
                                </Text>
                            )}
                        </View>
                    )}
                />

                <View className=' mx-12 mt-6'>
                <Text className="text-white text-justify leading-6 mb-2 ml-4">
                        1. Pastikan anda telah melakukan pendaftaran akun dan akif sebagai mitra personil pada KANTOR BLU UPBU KELAS I DEO - SORONG
                    </Text>
                    <Text className="text-white text-justify leading-6 mb-2 ml-4">
                        2. Kesalahan memasukan username dalam 3 kali percobaan login, akan menonaktifkan aktitas login selama 1 jam
                    </Text>
                    <Text className="text-white text-justify leading-6 mb-2 ml-4">
                        3. proses login menggunakan metode password OTP (One Time Password) yang dikirimkan melalui WhatsApp No. +62851-9031-1013
                    </Text>
                    
                   
                </View>
            </View>

            <View className="flex flex-row items-center justify-between mt-8 mx-16">

                <TouchableOpacity
                    className={classNames('bg-orange-600 px-2 py-2 rounded-lg mr-2', isLoading ? 'opacity-50' : 'opacity-100')}
                    onPress={resetCompany}
                    disabled={isLoading}
                >
                    <Text className="text-center text-white">
                        RESET STACKHOLDER
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className={classNames('bg-green-700 px-2 py-2 rounded-lg mr-2', isValid ? 'opacity-100' : 'opacity-50')}
                    onPress={handleSubmit(onSubmit, onError)}
                    disabled={isLoading || !isValid}
                >
                    <Text className="text-center text-white">
                        {isLoading ? 'GENERATE OTP...' : 'LOGIN'}
                    </Text>
                </TouchableOpacity>
            </View>
        </Fragment>

    );
};




function InputOtpCode() {
    const [otp, setOtp] = useState('');
    const dispatch = useDispatch();
    const { isLoading, registerAtempt, user, lastRegisterAtempt } = useSelector((state) => state.externalUser);
    const [timeLeft, setTimeLeft] = useState(0);


    const formatTime = (totalSeconds) => {
        const m = Math.floor(totalSeconds / 60);
        const s = totalSeconds % 60;
        const mm = String(m).padStart(2, '0');
        const ss = String(s).padStart(2, '0');
        return `${mm}:${ss}`;
    };


    const handleChange = (value) => {
        setOtp(value);
    };


    const reloadOtp = useCallback(() => {
        dispatch(externalUserActions.reloadOtp());
    }, [dispatch]);



    const verifikasiOtp = useCallback((otp) => {
        dispatch(externalUserActions.verifikasiOtp({ otp }));
    }, [dispatch]);




    useEffect(() => {
        if (!lastRegisterAtempt) return;
        const start = new Date(lastRegisterAtempt).getTime();
        const endTime = start + 300_000;
        const now = Date.now();
        let diff = Math.floor((endTime - now) / 1000);
        if (diff < 0) diff = 0;
        setTimeLeft(diff);
        const intervalId = setInterval(() => {
            const now = Date.now();
            const newDiff = Math.floor((endTime - now) / 1000);
            if (newDiff <= 0) {
                setTimeLeft(0);
                dispatch(externalUserActions.otpTimeExpires());
                clearInterval(intervalId);
            } else {
                setTimeLeft(newDiff);
            }
        }, 1000);
        return () => clearInterval(intervalId);
    }, [lastRegisterAtempt, dispatch]);



    if (isLoading) {
        return (
            <View className="flex justify-center items-center mt-8">
                <Text > please wait...</Text>
            </View>
        )
    }



    return (
        <Fragment>
            {timeLeft !== 0 ? (<Fragment>

                <Text className="text-lg font-semibold leading-5 mb-3 mt-8 text-center text-white">masukan kode OTP EXTERNAL</Text>


                <View className="flex-col  space-y-0 mx-16">
                    <OtpInput
                        numberOfDigits={6}
                        focusColor="white"
                        autoFocus={false}
                        hideStick={true}
                        placeholder="******"
                        blurOnFilled={true}
                        disabled={false}
                        type="numeric"
                        secureTextEntry={false}
                        focusStickBlinkingDuration={500}
                        onFocus={() => console.log("Focused")}
                        onBlur={() => console.log("Blurred")}
                        onTextChange={handleChange}
                        onFilled={verifikasiOtp}
                        theme={{
                            pinCodeTextStyle: { color: '#ffffff' },
                            focusStickStyle: { color: '#ffffff' },
                            focusedPinCodeContainerStyle: { color: '#ffffff' },
                            placeholderTextStyle: { color: '#ffffff' },
                            filledPinCodeContainerStyle: { color: '#ffffff' },

                        }}
                    />
                    <Text className="text-sm mt-2 text-white">We've sent an OTP code via WhatsApp from virtual number 0822-4356-5467</Text>
                    <View className="flex flex-row justify-end mt-4 ">
                        <Text className="text-lg text-white font-bold">
                            Time Left {formatTime(timeLeft)}
                        </Text>

                    </View>
                </View>
            </Fragment>) : (<Fragment>
                <View>
                    <Text className="text-white mt-8">
                        Your time has expired. Please request a new OTP token.
                    </Text>
                    <TouchableOpacity onPress={reloadOtp} style={{ marginTop: 8 }}>
                        <Text className="text-red-700 font-semibold">Request OTP token</Text>
                    </TouchableOpacity>
                </View>
            </Fragment>)}




        </Fragment>
    );
}






