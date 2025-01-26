// ImageInput.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Controller } from 'react-hook-form';
import * as FileSystem from 'expo-file-system';
import { Ionicons } from '@expo/vector-icons';

/**
 * Ekstensi gambar yang kita ijinkan.
 * Anda bisa menambahkan 'gif', 'webp', dsb. jika perlu.
 */
const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'heic'];

function getFileExtension(uri) {
  const match = uri.match(/\.(\w+)$/);
  if (!match) return null;
  return match[1].toLowerCase();
}

const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3 MB

/**
 * Komponen ImageInput dengan:
 * - Validasi max 3MB
 * - Validasi hanya file gambar
 * - Menyimpan *raw base64* (tanpa prefix) jika `withBase64 = true`.
 * - Menambahkan prefix "data:image/xxx;base64," saat preview.
 * - UI/UX ditingkatkan dengan card, ikon, dsb.
 */
export default function ImageInput({
  control,
  name,
  label = 'Pilih Gambar',
  rules,
  withBase64 = true,  // Apakah simpan base64 (tanpa prefix) atau URI
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
   * Fungsi helper untuk memvalidasi file:
   * - Ekstensi => pastikan gambar
   * - Ukuran => max 3MB
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
   * Komponen utama yang dirender oleh Controller
   */
  const renderImageInput = ({ field: { onChange, value }, fieldState: { error } }) => {
    /**
     * Buka galeri
     */
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
            onChange(picked.base64); // raw base64 saja
          } else {
            onChange(picked.uri);
          }
        } catch (err) {
          alert(err.message);
        }
      }
    };

    /**
     * Ambil foto kamera
     */
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

    /**
     * Hapus gambar
     */
    const removeImage = () => {
      onChange(null);
    };

    /**
     * Buat URI untuk preview
     */
    let previewUri = null;
    if (value) {
      if (withBase64) {
        // Hardcode "image/jpeg" (atau bisa menebak dari ekstensi)
        previewUri = `data:image/jpeg;base64,${value}`;
      } else {
        previewUri = value;
      }
    }

    /**
     * Bagian UI:
     * - Jika belum ada gambar => tampilkan kotak kosong dengan ikon
     * - Jika ada gambar => tampilkan card preview
     * - Tombol aksi di bawah
     */
    return (
      <View style={[styles.container, style]}>
        {label ? (
          <Text style={styles.label}>{label}</Text>
        ) : null}

        {/* Area preview */}
        {previewUri ? (
          <View style={styles.previewContainer}>
            <Image
              source={{ uri: previewUri }}
              style={styles.imagePreview}
              resizeMode="cover"
            />
          </View>
        ) : (
          <TouchableOpacity
            style={styles.emptyPreview}
            onPress={pickImage}
            activeOpacity={0.8}
          >
            <Ionicons name="image-outline" size={48} color="#bbb" />
            <Text style={styles.emptyText}>Ketuk untuk pilih gambar</Text>
          </TouchableOpacity>
        )}

        {/* Tombol aksi */}
        <View style={styles.buttonsRow}>
          <TouchableOpacity style={styles.buttonAction} onPress={pickImage}>
            <Ionicons name="images-outline" size={18} color="#fff" style={{ marginRight: 6 }} />
            <Text style={styles.buttonActionText}>Galeri</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonAction} onPress={takePhoto}>
            <Ionicons name="camera-outline" size={18} color="#fff" style={{ marginRight: 6 }} />
            <Text style={styles.buttonActionText}>Kamera</Text>
          </TouchableOpacity>

          {value && (
            <TouchableOpacity style={[styles.buttonAction, { backgroundColor: '#FF3B30' }]} onPress={removeImage}>
              <Ionicons name="trash-outline" size={18} color="#fff" style={{ marginRight: 6 }} />
              <Text style={styles.buttonActionText}>Hapus</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Error display */}
        {error && (
          <Text style={styles.errorText}>
            {error.message || 'Gambar tidak valid'}
          </Text>
        )}
      </View>
    );
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={renderImageInput}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  // Jika belum ada gambar, kotak kosong
  emptyPreview: {
    height: 200,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  emptyText: {
    marginTop: 8,
    color: '#999',
  },
  // Jika sudah ada gambar, tampilkan "card" container
  previewContainer: {
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 12,
    backgroundColor: '#eee',
    // Shadow (iOS)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    // Elevation (Android)
    elevation: 4,
  },
  imagePreview: {
    flex: 1,
    width: '100%',
  },
  buttonsRow: {
    flexDirection: 'row',
    marginTop: 4,
  },
  buttonAction: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
    marginRight: 8,
  },
  buttonActionText: {
    color: '#fff',
    fontWeight: '500',
  },
  errorText: {
    color: 'red',
    marginTop: 8,
  },
});
