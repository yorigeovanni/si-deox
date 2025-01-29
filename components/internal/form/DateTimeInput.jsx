import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Controller } from 'react-hook-form';
import dayjs from 'dayjs';

/**
 * @param {object} props
 * @param {any} props.control - dari react-hook-form
 * @param {string} props.name - nama field
 * @param {string} [props.label] - label di atas input
 * @param {'date'|'time'|'datetime'} [props.type='date'] - tipe picker
 * @param {object} [props.rules] - validation rules react-hook-form
 * @param {boolean} [props.editable=true] - apakah input bisa diubah
 * @param {string} [props.placeholder] - placeholder jika belum ada nilai
 */
export default function DateTimeInput({
  control,
  name,
  label,
  type = 'datetime',
  rules,
  editable = true,
  placeholder = 'Select...',
}) {
  // State untuk menampilkan/hide picker
  const [showPicker, setShowPicker] = useState(false);

  // Pastikan ada control
  if (!control) {
    return <Text style={{ color: 'red' }}>Error: control is required</Text>;
  }

  return (
    <View style={{ marginVertical: 8 }}>
      {/* Label */}
      {label && <Text style={styles.label}>{label}</Text>}

      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, value }, fieldState: { error } }) => {
          const dateValue = value ? new Date(value) : null;

          // Format tampilan text di input
          let displayText = placeholder;
          if (dateValue) {
            switch (type) {
              case 'time':
                // misal: jam:menit
                displayText = dayjs(dateValue).format('HH:mm');
                break;
              case 'datetime':
                displayText = dayjs(dateValue).format('YYYY-MM-DD HH:mm');
                break;
              default: // 'date'
                displayText = dayjs(dateValue).format('YYYY-MM-DD');
                break;
            }
          }

          const openPicker = () => {
            if (!editable) return;
            setShowPicker(true);
          };

          const handleChange = (event, selectedDate) => {
            // Di Android, user bisa cancel => selectedDate = undefined
            setShowPicker(false);
            if (selectedDate) {
              // Simpan string-nya (misal format ISO) atau langsung simpan date object
              // Tergantung Odoo format yang Anda perlukan
              onChange(selectedDate.toISOString());
            }
          };

          return (
            <View>
              {/* Tombol "input" */}
              <TouchableOpacity
                style={[
                  styles.inputContainer,
                  { backgroundColor: editable ? '#fff' : '#eee' },
                ]}
                onPress={openPicker}
                activeOpacity={0.8}
              >
                <Text style={{ color: '#333' }}>{displayText}</Text>
              </TouchableOpacity>

              {/* Jika error */}
              {error && (
                <Text style={{ color: 'red', marginTop: 4 }}>
                  {error.message}
                </Text>
              )}

              {/* Komponen DateTimePicker */}
              {showPicker && (
                <DateTimePicker
                  value={dateValue || new Date()}
                  mode={type === 'datetime' ? 'datetime' : type} 
                  // "datetime" sebenarnya tidak semua platform mendukung.
                  // kadang di Android terpisah (date lalu time). 
                  // Anda bisa pisahkan manual jika mau
                  display="default"
                  onChange={handleChange}
                />
              )}
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 4,
    fontWeight: 'bold',
  },
  inputContainer: {
    padding: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
  },
});
