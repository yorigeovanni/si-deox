import React, { useState, useCallback, Fragment } from 'react';
import { View, Text, ScrollView, Dimensions, TouchableOpacity, Modal, TextInput, Button, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';

// STATE MANAGEMENT
import authActions from '@/state/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function AplikasiInternal() {
  const { tokenInternal, errorFetchInternalMessage } = useSelector((state) => state.auth);

  return (
    <Fragment>
      {tokenInternal ? (
        <AuthorityUser />
      ) : (
        <UnknowUser errorMessage={errorFetchInternalMessage} />
      )}
    </Fragment>
  );
}

const UnknowUser = ({ errorMessage }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { control, handleSubmit } = useForm();


  const onSubmit = useCallback(
    (data) => {
      dispatch(authActions.loginInternal(data));
    },
    [dispatch]
  );



  return (
    <ImageBackground
      source={require('@/assets/ddd.png')} // Ganti dengan path/gambar latar Anda
      resizeMode="cover"
      style={{ flex: 1, width: '100%', height: '100%' }}
    >
      {/* Overlay putih setengah transparan */}
      <View className="absolute flex-1 w-full h-full bg-white opacity-75" />

      <View className="flex-1 items-center justify-center">
        {errorMessage && (<View className="bg-red-500 p-2 rounded-md mb-2">
          <Text className="text-white text-sm">{errorMessage}</Text>
        </View>)}

        {/* Input No. Handphone */}
        <Controller
          control={control}
          name="handphone"
          rules={{
            required: 'Nomor handphone wajib diisi',
            pattern: {
              value: /^[0-9]*$/,
              message: 'Nomor handphone hanya boleh berisi angka',
            },
            minLength: {
              value: 10,
              message: 'Nomor handphone minimal 10 digit',
            }
          }}
          defaultValue=""
          render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
            <>
              <TextInput
                placeholder="No. Handphone"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="phone-pad"
                className='bg-white p-2 rounded-md w-80 border border-gray-300 '
               
              />
              {/* Tampilkan pesan error validasi */}
              {error && <Text style={{ color: 'red' }}>{error.message}</Text>}
            </>
          )}
        />

        <View className='flex flex-row items-center justify-center mt-2'>
          <View className='bg-red-600 rounded-lg ' onPress={handleSubmit(onSubmit)}>
            <Text className='text-white p-2'>LOGIN</Text>
          </View>
        </View>

        <Button title="Login" className="bg-red-700" onPress={handleSubmit(onSubmit)} />
      </View>
    </ImageBackground>
  );
};

const AuthorityUser = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <ScrollView className="flex-1 bg-white">

       {/** STATISTIK */}
            <Text className={`font-bold  mx-4 mt-6`}>EXPRESS INDIKATOR INTERNAL - SELF ASSESMENT</Text>
            <View className={`flex-row justify-around mt-2 mb-6`}>
              <View className={`items-center`}>
                <Text className={`text-2xl font-bold text-gray-800`}>12 TIKET</Text>
                <Text className={`text-sm text-gray-500`}>TEMUAN OPEN</Text>
              </View>
              <View className={`items-center`}>
                <Text className={`text-2xl font-bold text-gray-800`}>0 TIKET</Text>
                <Text className={`text-sm text-gray-500`}>TEMUAN EXPIRES</Text>
              </View>
              <View className={`items-center`}>
                <Text className={`text-2xl font-bold text-gray-800`}>23 TIKET</Text>
                <Text className={`text-sm text-gray-500`}>PENGADUAN BELUM TERPROSES</Text>
              </View>
            </View>
      <Button title="AMC" onPress={() => router.push('/app-restricted/internal/amc')} />
    </ScrollView>
  );
};
