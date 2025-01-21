import React, { useEffect, useState, useCallback, Fragment } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { OtpInput } from "react-native-otp-entry";
import configAction from '@/state/config/configSlice';



export default function InputOtpCode() {
    const [otp, setOtp] = useState('');
    const dispatch = useDispatch();
    const {
        isLoading,
        registerAtempt,
        lastRegisterAtempt
    } = useSelector((state) => state.config);
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
        dispatch(configAction.reloadOtp());
    }, [dispatch]);



    const verifikasiOtp = useCallback((otp) => {
        dispatch(configAction.verifikasiOtp({ otp }));
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
                clearInterval(intervalId);
            } else {
                setTimeLeft(newDiff);
            }
        }, 1000);
        return () => clearInterval(intervalId);
    }, [lastRegisterAtempt]);



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

                <Text className="text-lg font-semibold leading-5 mb-3 mt-8">Enter Your OTP Code</Text>


                <View className="flex-col  space-y-0 mx-16">
                    <OtpInput
                        numberOfDigits={6}
                        focusColor="green"
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
                    />
                    <Text className="text-sm mt-2 text-gray-600">We've sent an OTP code via WhatsApp from virtual number 0822-4356-5467</Text>
                    <View className="flex flex-row justify-end mt-4 ">
                        <Text className="text-lg text-gray-600 font-bold">
                            Time Left {formatTime(timeLeft)}
                        </Text>

                    </View>
                </View>
            </Fragment>) : (<Fragment>
                <View>
                    <Text className="text-gray-600 mt-8">
                        Your time has expired. Please request a new token.
                    </Text>
                    <TouchableOpacity onPress={reloadOtp} style={{ marginTop: 8 }}>
                        <Text className="text-red-700 font-semibold">Request OTP token</Text>
                    </TouchableOpacity>
                </View>
            </Fragment>)}




        </Fragment>
    );
}
