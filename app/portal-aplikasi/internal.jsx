import React, { useState, useCallback, Fragment, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
  TextInput,
  Button,
  ImageBackground
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { OtpInput } from "react-native-otp-entry";
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import DeoLogo from '@/assets/icon-baru.png';
import { classNames } from '@/utils';
// STATE MANAGEMENT
import internalUserActions from '@/state/internalUser/internalUserSlice';
import createRequest from '@/core/api-secure';
const { post } = createRequest();

export default function AplikasiInternal() {
  const { errorFetchInternalMessage } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.internalUser);

  return (
    <Fragment>
      {user ? (
        <AuthorityUser />
      ) : (
        <UnknowUser errorMessage={errorFetchInternalMessage} />
      )}
    </Fragment>
  );
}




const UnknowUser = ({ errorMessage }) => {
  const router = useRouter();
  const { tokenLogin } = useSelector((state) => state.internalUser);


  return (
    <ImageBackground
      source={require('@/assets/ddd.png')}
      resizeMode="cover"
      style={{ flex: 1, width: '100%', height: '100%' }}
    >
      {/* Overlay putih setengah transparan */}
      <View className="absolute flex-1 w-full h-full bg-white opacity-75" />

      <View className={classNames(
        'flex flex-col justify-center items-center px-4 pb-4',
        Platform.OS === 'android' ? 'pt-10' : 'pt-28'
      )}>
        <View className="flex-row items-center space-x-8">
          <Image source={DeoLogo} style={{ width: 150, height: 60 }} />
        </View>
        <View className="flex-col items-center justify-center space-y-0 mb-8">
          <Text className="text-red-700 text-xl font-extrabold">DEO AIRPORT - INTERNAL ACCESS</Text>
        </View>
      </View>

      {tokenLogin ? (
        <InputOtpCode />
      ) : (<LoginComponent />)}
    </ImageBackground>
  );
};




function InputOtpCode() {
  const [otp, setOtp] = useState('');
  const dispatch = useDispatch();
  const { isLoading, registerAtempt, lastRegisterAtempt } = useSelector((state) => state.internalUser);
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
    dispatch(internalUserActions.reloadOtp());
  }, [dispatch]);



  const verifikasiOtp = useCallback((otp) => {
    dispatch(internalUserActions.verifikasiOtp({ otp }));
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

        <Text className="text-lg font-semibold leading-5 mb-3 mt-8 text-center">masukan kode OTP INTERNAL</Text>


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




const LoginComponent = ({ errorMessage }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  // -- [1] Gunakan formState.isValid dan reset dari useForm
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onChange',  // Pastikan pakai 'onChange' atau 'onBlur'
    defaultValues: {
      nik_nip: '',
      alamat:"",
    }
  });

  const { isLoading, isError, tokenLogin } = useSelector((state) => state.internalUser);

  // -- [2] onSubmit jika valid (berhasil lolos validasi client)
  const onSubmit = useCallback((data) => {
    // Panggil aksi Redux untuk request token
    dispatch(internalUserActions.requestToken(data));
  }, [dispatch]);

  // -- [3] onError jika gagal validasi di sisi client
  const onError = useCallback((formErrors) => {
    // formErrors berisi detail error validasi, misalnya { nik_nip: {...} }
    // Reset form jika diperlukan
    reset();
  }, [reset]);

  useEffect(() => {
    if (isError) {
      reset();
    }
  }, [isError, reset]);

  return (

    <Fragment>
      <View className="flex w-full">
        {isLoading && (
          <Text className="text-center text-gray-500 text-lg mb-4">
            Loading...
          </Text>
        )}
        {isError && (
          <Text className="text-center text-gray-500 text-lg mb-4">
            DATA PERSONIL TIDAK DITEMUKAN
          </Text>
        )}

        <Controller
          control={control}
          name="nik_nip"
          rules={{
            required: 'NIK / NIP wajib diisi',
            pattern: {
              value: /^[0-9]*$/,
              message: 'NIK / NIP hanya boleh berisi angka',
            },
            minLength: {
              value: 10,
              message: 'NIK / NIP minimal 10 digit',
            }
          }}
          render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
            <View className="flex flex-col mx-16">
              <TextInput
                placeholder="NIP / NIK PERSONIL"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="phone-pad"
                className="bg-white p-4 rounded-md border border-gray-300 w-full"
                // Disable input saat loading
                editable={!isLoading}
              />
              {/* Tampilkan pesan error validasi */}
              {error && (
                <Text className="text-gray-500 text-sm flex justify-start items-start text-start">
                  {error.message}
                </Text>
              )}
            </View>
          )}
        />
      </View>

      <View className="flex flex-row items-end justify-end mt-8 mx-16">
        <TouchableOpacity
          className={classNames('bg-red-700 px-2 py-2 rounded-lg mr-2', isValid ? 'opacity-100' : 'opacity-50')}
          onPress={handleSubmit(onSubmit, onError)}
          // Disable tombol saat loading atau form belum valid
          disabled={isLoading || !isValid}
        >
          <Text className="text-center text-white">
            {isLoading ? 'GENERATE OTP...' : 'REQUEST OTP'}
          </Text>
        </TouchableOpacity>
      </View>
    </Fragment>

  );
};






const AuthorityUser = () => {
  const router = useRouter();
  return (
    <ScrollView className="flex-1 bg-white">
      {/* STATISTIK */}
      <Text className="font-bold mx-4 mt-6">
        EXPRESS INDIKATOR INTERNAL - SELF ASSESMENT
      </Text>
      <View className="flex-row justify-around mt-2 mb-6">
        <View className="items-center">
          <Text className="text-2xl font-bold text-gray-800">12 TIKET</Text>
          <Text className="text-sm text-gray-500">TEMUAN OPEN</Text>
        </View>
        <View className="items-center">
          <Text className="text-2xl font-bold text-gray-800">0 TIKET</Text>
          <Text className="text-sm text-gray-500">TEMUAN EXPIRES</Text>
        </View>
        <View className="items-center">
          <Text className="text-2xl font-bold text-gray-800">23 TIKET</Text>
          <Text className="text-sm text-gray-500">PENGADUAN BELUM TERPROSES</Text>
        </View>
      </View>
      <Button title="AMC" onPress={() => router.push('/app-restricted-internal')} />
    </ScrollView>
  );
};

