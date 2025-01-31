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
  type = 'date',
  rules,
  editable = true,
  placeholder = 'Select...',
}) {


  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Untuk iOS atau mode selain 'datetime', kita tetap pakai satu picker
  const [showSinglePicker, setShowSinglePicker] = useState(false);

  // Menyimpan sementara tanggal yang dipilih di Android (saat mode 'datetime')
  const [tempDate, setTempDate] = useState(new Date());

  // Pastikan ada control
  if (!control) {
    return <Text style={{ color: 'red' }}>Error: control is required</Text>;
  }

  // Fungsi pembantu untuk gabung date & time
  const combineDateAndTime = (dateObj, timeObj) => {
    // Buat salinan, lalu set jam/menit/detik
    const combined = new Date(dateObj);
    combined.setHours(timeObj.getHours());
    combined.setMinutes(timeObj.getMinutes());
    combined.setSeconds(timeObj.getSeconds());
    combined.setMilliseconds(timeObj.getMilliseconds());
    return combined;
  };

  return (
    <View style={{ marginVertical: 8 }}>
      {/* Label */}
      {label && <Text style={styles.label}>{label}</Text>}

      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, value }, fieldState: { error } }) => {
          // Jika value ada, konversi ke Date. Jika belum ada (null/undefined), pakai null
          const dateValue = value ? new Date(value) : null;

          // Format tampilan text di input
          let displayText = placeholder;
          if (dateValue) {
            switch (type) {
              case 'time':
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

            if (type === 'datetime') {
              // Jika Android, kita pisah date & time
              if (Platform.OS === 'android') {
                setShowDatePicker(true);
              } else {
                // di iOS, mode="datetime" masih bisa
                setShowSinglePicker(true);
              }
            } else {
              // date atau time biasa => langsung satu picker
              setShowSinglePicker(true);
            }
          };

          // handleChange untuk mode "single" (date atau time) atau iOS "datetime"
          const handleSingleChange = (event, selectedDate) => {
            setShowSinglePicker(false);
            if (selectedDate) {
              onChange(selectedDate.toISOString());
            }
          };

          // handleChange untuk Android => DATE
          const handleDateChange = (event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              // Simpan tanggal sementara, lalu buka timepicker
              setTempDate(selectedDate);
              setShowTimePicker(true);
            }
          };

          // handleChange untuk Android => TIME
          const handleTimeChange = (event, selectedTime) => {
            setShowTimePicker(false);
            if (selectedTime) {
              const combined = combineDateAndTime(tempDate, selectedTime);
              onChange(combined.toISOString());
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
                <Text className=' text-red-700 mt-1'>
                  {error.message}
                </Text>
              )}

              {/* --- 1) SINGLE PICKER (iOS: datetime, atau Android/iOS: date/time biasa) --- */}
              {showSinglePicker && (
                <DateTimePicker
                  value={dateValue || new Date()}
                  mode={type === 'datetime' ? 'datetime' : type}
                  display="default"
                  onChange={handleSingleChange}
                />
              )}

              {/* --- 2) ANDROID: DatePicker -> setelah OK -> TimePicker (khusus type='datetime') --- */}
              {showDatePicker && (
                <DateTimePicker
                  value={dateValue || new Date()}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                />
              )}
              {showTimePicker && (
                <DateTimePicker
                  value={tempDate || new Date()}
                  mode="time"
                  display="default"
                  onChange={handleTimeChange}
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
