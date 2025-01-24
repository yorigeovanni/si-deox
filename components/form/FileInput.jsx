import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Dimensions
} from 'react-native';
import { Controller } from 'react-hook-form';
import * as DocumentPicker from 'expo-document-picker';
const THREE_GB_IN_BYTES = 3 * 1024 * 1024 * 1024; // 3 GB
const SCREEN_WIDTH = Dimensions.get('window').width;

// ikon
const iconPDF = require('@/assets/icon-pdf.png');
const iconWord = require('@/assets/icon-word.jpg');
const iconExcel = require('@/assets/icon-excel.png');
const iconZip = require('@/assets/icon-zip.webp');
const iconTxt = require('@/assets/icon-txt.png');
const iconFile = require('@/assets/icon-file.jpg');


export default function FileInput({
  control,
  name,
  label,
  rules,
  multiple = false,
}) {
  if (!control) {
    return <Text style={{ color: 'red' }}>control is required</Text>;
  }

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        
        // Buka DocumentPicker, lalu cek ukuran
        const pickFile = async () => {
          try {
            const result = await DocumentPicker.getDocumentAsync({
              type: '*/*',
              multiple,
            });

            if (!result.canceled && result.assets?.length) {
              // Filter file yang melebihi 3GB
              const validFiles = [];
              for (const file of result.assets) {
                if (file.size > THREE_GB_IN_BYTES) {
                  Alert.alert(
                    'Ukuran File Terlalu Besar',
                    `File "${file.name}" berukuran ${formatBytes(file.size)}, melebihi 3GB.`
                  );
                  // Jangan masukkan file ini
                } else {
                  validFiles.push(file);
                }
              }

              // Jika multiple, simpan array
              // Jika single, simpan 1 file
              if (validFiles.length > 0) {
                if (multiple) {
                  onChange(validFiles);
                } else {
                  onChange(validFiles[0]);
                }
              }
            }
          } catch (err) {
            console.warn('File pick error:', err);
          }
        };

        // Hapus file
        const removeFile = (index) => {
          if (multiple && Array.isArray(value)) {
            const newArray = [...value];
            newArray.splice(index, 1);
            onChange(newArray.length ? newArray : null);
          } else {
            onChange(null);
          }
        };

        // Format bytes jadi mis. "1.2 GB" atau "512 MB"
        const formatBytes = (bytes, decimals = 2) => {
          if (bytes === 0) return '0 Bytes';
          const k = 1024;
          const dm = decimals < 0 ? 0 : decimals;
          const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
          const i = Math.floor(Math.log(bytes) / Math.log(k));
          return (
            parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
          );
        };

        // Tampilkan ikon / preview
        const getFileIconOrPreview = (file) => {
          const isImage =
            file.mimeType?.startsWith('image/') ||
            file.uri?.match(/\.(png|jpe?g|gif|bmp|webp)$/i);

          if (isImage) {
            return (
              <Image
                source={{ uri: file.uri }}
                style={styles.fileImage}
                resizeMode="cover"
              />
            );
          } else {
            const { name } = file;
            const ext = (name || '').split('.').pop().toLowerCase();

            if (ext === 'pdf') {
              return <Image source={iconPDF} style={styles.fileIcon} />;
            } else if (['doc', 'docx'].includes(ext)) {
              return <Image source={iconWord} style={styles.fileIcon} />;
            } else if (['xls', 'xlsx'].includes(ext)) {
              return <Image source={iconExcel} style={styles.fileIcon} />;
            } else if (['zip', 'rar', '7z'].includes(ext)) {
              return <Image source={iconZip} style={styles.fileIcon} />;
            } else if (['txt', 'md'].includes(ext)) {
              return <Image source={iconTxt} style={styles.fileIcon} />;
            }
            return <Image source={iconFile} style={styles.fileIcon} />;
          }
        };

        // Render item grid
        const renderFileItem = (file, index) => {
          return (
            <View key={index} style={styles.gridItem}>
              <TouchableOpacity
                style={styles.removeBtn}
                onPress={() => {
                  Alert.alert(
                    'Hapus File',
                    `Hapus file "${file.name}"?`,
                    [
                      { text: 'Batal', style: 'cancel' },
                      {
                        text: 'Hapus',
                        style: 'destructive',
                        onPress: () => removeFile(index),
                      },
                    ],
                    { cancelable: true }
                  );
                }}
              >
                <Text style={styles.removeBtnText}>x</Text>
              </TouchableOpacity>

              {getFileIconOrPreview(file)}

              <Text style={styles.fileLabel} numberOfLines={1}>
                {file.name}
              </Text>
            </View>
          );
        };

        // data array
        let filesArray = [];
        if (value) {
          filesArray = Array.isArray(value) ? value : [value];
        }

        return (
          <View style={styles.container}>
            {/* Label */}
            {label && <Text style={styles.label}>{label}</Text>}

            {/* Tombol Pilih File */}
            <TouchableOpacity style={styles.pickButton} onPress={pickFile}>
              <Text style={styles.pickButtonText}>
                {multiple ? 'Pilih Beberapa File' : 'Pilih File'}
              </Text>
            </TouchableOpacity>

            {/* Grid File */}
            {filesArray.length > 0 ? (
              <View style={styles.gridContainer}>
                {filesArray.map((file, idx) => renderFileItem(file, idx))}
              </View>
            ) : (
              <Text style={styles.placeholder}>Belum ada file</Text>
            )}

            {/* Pesan error validasi */}
            {error && <Text style={styles.errorText}>{error.message}</Text>}
          </View>
        );
      }}
    />
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 6,
    fontSize: 15,
  },
  pickButton: {
    backgroundColor: '#0066cc',
    borderRadius: 6,
    padding: 10,
    alignItems: 'center',
    marginVertical: 6,
  },
  pickButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  gridItem: {
    width: '25%',
    padding: 6,
    position: 'relative',
    alignItems: 'center',
  },
  removeBtn: {
    position: 'absolute',
    top: 4,
    right: 4,
    zIndex: 10,
    backgroundColor: '#ff4d4d',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeBtnText: {
    color: '#fff',
    fontWeight: '600',
  },
  fileImage: {
    width: 60,
    height: 60,
    borderRadius: 4,
    marginBottom: 4,
  },
  fileIcon: {
    width: 50,
    height: 50,
    marginBottom: 4,
  },
  fileLabel: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 2,
  },
  placeholder: {
    marginTop: 8,
    color: '#666',
    fontStyle: 'italic',
  },
  errorText: {
    color: 'red',
    marginTop: 4,
  },
});
