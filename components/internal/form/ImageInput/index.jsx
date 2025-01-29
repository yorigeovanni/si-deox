import React, { Fragment } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Controller } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import PreviewImage from './PreviewImage'; 

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
    withBase64 = true, // Apakah menyimpan base64 atau URI
    style,
}) {
    if (!control || !name) {
        return (
            <Text style={{ color: 'red', margin: 4 }}>
                props "control" & "name" wajib diisi
            </Text>
        );
    }

    /**
     * Validasi file secara asinkron (cek ekstensi dan ukuran max).
     */
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

    /**
     * Fungsi ini yang dipanggil oleh Controller:
     * - TIDAK memanggil useState di dalamnya
     * - Hanya menampilkan PreviewImage jika ada `value`
     * - Menyediakan tombol pilih/kamera jika belum ada gambar
     */
    const renderImageInput = ({ field: { onChange, value }, fieldState: { error } }) => {
        // Fungsi memilih gambar dari galeri
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

        // Fungsi mengambil gambar via kamera
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

        // Menghapus nilai
        const removeImage = () => {
            onChange(null);
        };

        // Siapkan URI pratinjau
        let previewUri = null;
        if (value) {
            if (withBase64) {
                previewUri = `data:image/jpeg;base64,${value}`;
            } else {
                previewUri = value;
            }
        }

        // Jika ada gambar => tampilkan PreviewImage
        // Jika belum ada => tampilkan placeholder & tombol pilih/kamera
        if (previewUri) {
            return (
                <PreviewImage
                    previewUri={previewUri}
                    onRemove={removeImage}
                />
            );
        }

        // Tampilkan "kotak kosong" kalau belum ada gambar
        return (
            <Fragment>
                <View className="flex-col my-2 bg-gray-100 h-52 items-center justify-center rounded-lg border-dashed border-gray-300 border-2">
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
                {error && (
                    <Text className=' text-red-700 mt-1'>
                        {error.message || 'Gambar tidak valid'}
                    </Text>
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
