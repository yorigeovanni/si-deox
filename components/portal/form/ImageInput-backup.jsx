import React, { Fragment, useState } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  Modal,
  TouchableOpacity,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Controller } from 'react-hook-form';
import * as FileSystem from 'expo-file-system';
import { Ionicons } from '@expo/vector-icons';

const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'heic'];
const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3 MB

function getFileExtension(uri) {
  const match = uri.match(/\.(\w+)$/);
  if (!match) return null;
  return match[1].toLowerCase();
}

export default function ImageInput({
  control,
  name,
  label = 'Pilih Gambar',
  rules,
  withBase64 = true,
  style,
}) {
  if (!control || !name) {
    return (
      <Text style={{ color: 'red', margin: 4 }}>
        props "control" & "name" wajib diisi
      </Text>
    );
  }

  const validateFile = async (uri) => {
    const ext = getFileExtension(uri);
    if (!ext || !ALLOWED_EXTENSIONS.includes(ext)) {
      throw new Error('Hanya file gambar (jpg, jpeg, png, heic) yang diperbolehkan');
    }
    const info = await FileSystem.getInfoAsync(uri);
    if (!info.exists) {
      throw new Error('File tidak ditemukan di path');
    }
    if (info.size > MAX_FILE_SIZE) {
      throw new Error('Ukuran file melebihi 3MB');
    }
  };

  // Komponen utama yang akan dirender oleh React Hook Form (Controller)
  const renderImageInput = ({ field: { onChange, value }, fieldState: { error } }) => {
    // State untuk menampilkan gambar secara fullscreen
    const [isFullScreen, setIsFullScreen] = useState(false);

    const pickImage = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Izin akses galeri diperlukan!');
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        base64: withBase64,
        quality: 0.7,
      });
      if (!result.canceled) {
        const picked = result.assets[0];
        try {
          await validateFile(picked.uri);
          if (withBase64) {
            onChange(picked.base64);
          } else {
            onChange(picked.uri);
          }
        } catch (err) {
          alert(err.message);
        }
      }
    };

    const takePhoto = async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        alert('Izin akses kamera diperlukan!');
        return;
      }
      const result = await ImagePicker.launchCameraAsync({
        base64: withBase64,
        quality: 0.7,
      });
      if (!result.canceled) {
        const picked = result.assets[0];
        try {
          await validateFile(picked.uri);
          if (withBase64) {
            onChange(picked.base64);
          } else {
            onChange(picked.uri);
          }
        } catch (err) {
          alert(err.message);
        }
      }
    };

    const removeImage = () => {
      onChange(null);
    };

    // Siapkan previewUri
    let previewUri = null;
    if (value) {
      if (withBase64) {
        // Hardcode "image/jpeg" atau sesuai ekstensi
        previewUri = `data:image/jpeg;base64,${value}`;
      } else {
        previewUri = value;
      }
    }

    return (
      <Fragment>
        {previewUri ? (
          <View className="relative my-2 h-52 w-full rounded-lg overflow-hidden">
            {/* Tombol hapus di sudut kanan atas */}
            <Pressable
              onPress={removeImage}
              className="absolute top-0 right-0 z-10 bg-black p-2 rounded-full m-2"
            >
              <Ionicons name="trash-outline" size={18} color="#fff" />
            </Pressable>

            {/* 
              Ketika gambar di-tap, munculkan modal full screen
              Kita bungkus <Image> di dalam Pressable 
            */}
            <Pressable onPress={() => setIsFullScreen(true)}>
              <Image
                source={{ uri: previewUri }}
                className="h-full w-full"
                resizeMode="cover"
              />
            </Pressable>

            {/* Modal full screen */}
            <Modal
              visible={isFullScreen}
              transparent={true}
              onRequestClose={() => setIsFullScreen(false)}
            >
              {/* 
                Latar belakang gelap dengan gambar di tengah 
                Gunakan styling manual atau tailwind
              */}
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'rgba(0,0,0,0.9)',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {/* Gambar full (contain / cover) */}
                <Image
                  source={{ uri: previewUri }}
                  style={{ width: '90%', height: '70%', resizeMode: 'contain' }}
                />

                {/* Tombol Close di atas kanan atau di mana pun Anda suka */}
                <TouchableOpacity
                  onPress={() => setIsFullScreen(false)}
                  style={{
                    position: 'absolute',
                    top: 40,
                    right: 20,
                  }}
                >
                  <Ionicons name="close-circle" size={36} color="#fff" />
                </TouchableOpacity>
              </View>
            </Modal>
          </View>
        ) : (
          // Jika belum ada foto terpilih
          <View className="flex-col my-2 bg-gray-100 h-52 items-center justify-center rounded-lg  border-dashed border-gray-300 border-2">
            <View className="flex-col items-center justify-center">
              <Ionicons name="images-outline" size={72} color="#fff" />
              <Text>max. ukuran gambar adalah 3MB</Text>
            </View>

            <View className="flex-row items-center justify-center mt-6">
              <Pressable
                onPress={pickImage}
                className="flex-row items-center justify-center ml-2 bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                <Ionicons
                  name="images-outline"
                  size={18}
                  color="#fff"
                  style={{ marginRight: 6 }}
                />
                <Text className=" text-white">Album</Text>
              </Pressable>

              <Pressable
                onPress={takePhoto}
                className="flex-row items-center justify-center ml-2 bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                <Ionicons
                  name="camera-outline"
                  size={18}
                  color="#fff"
                  style={{ marginRight: 6 }}
                />
                <Text className=" text-white">Kamera</Text>
              </Pressable>
            </View>
          </View>
        )}
      </Fragment>
    );
  };

  return (
    <View className="my-2 flex-col">
      {label ? <Text className=" text-gray-700">{label}</Text> : null}
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={renderImageInput}
      />
    </View>
  );
}
