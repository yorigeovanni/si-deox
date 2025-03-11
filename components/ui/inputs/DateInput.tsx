import { View, Text, TouchableOpacity, Modal, Platform } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { BaseInput } from './BaseInput';
import dayjs from 'dayjs';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DateInputProps } from './types';

// Import dayjs plugins
import 'dayjs/locale/id'; // Import Indonesian locale
dayjs.locale('id'); // Set default locale to Indonesian

const MONTHS_SHORT = {
  '01': 'Jan',
  '02': 'Feb',
  '03': 'Mar',
  '04': 'Apr',
  '05': 'Mei',
  '06': 'Jun',
  '07': 'Jul',
  '08': 'Ags',
  '09': 'Sep',
  '10': 'Okt',
  '11': 'Nov',
  '12': 'Des'
};

export const DateInput: React.FC<DateInputProps> = ({ 
  control, 
  name, 
  label, 
  error, 
  icon,
  placeholder = "Select date",
  mode = "date",
  format,
  minDate,
  maxDate,
  basecolor = "#2196F3"
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [tempDate, setTempDate] = useState<Date | null>(null);
  const [tempValue, setTempValue] = useState<string | null>(null);

  const getDefaultFormat = () => {
    switch (mode) {
      case 'time':
        return 'HH:mm';
      case 'datetime':
        return 'DD MMM YYYY, HH:mm';
      case 'date':
      default:
        return 'DD MMM YYYY';
    }
  };

  const actualFormat = format || getDefaultFormat();

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    
    const d = dayjs(date);
    
    // Format the date parts
    const day = d.format('DD');
    const month = MONTHS_SHORT[d.format('MM')];
    const year = d.format('YYYY');
    
    if (mode === 'time') {
      return `${d.format('HH:mm')} WIT`;
    }
    
    if (mode === 'datetime') {
      return `${day} ${month} ${year}, ${d.format('HH:mm')} WIT`;
    }
    
    return `${day} ${month} ${year}`;
  };

  const handleAndroidDateTimeSelect = (onChange: (value: string) => void, currentValue: Date | null) => {
    if (mode === 'datetime' && Platform.OS === 'android') {
      return (
        <DateTimePicker
          value={currentValue || new Date()}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowPicker(false);
            if (event.type === 'set' && date) {
              setTempDate(date);
              setTimeout(() => setShowTimePicker(true), 100);
            } else {
              onChange(tempValue || '');
              setTempDate(null);
            }
          }}
          minimumDate={minDate}
          maximumDate={maxDate}
        />
      );
    }

    if (showTimePicker && tempDate) {
      return (
        <DateTimePicker
          value={tempDate}
          mode="time"
          display="default"
          onChange={(event, time) => {
            setShowTimePicker(false);
            if (event.type === 'set' && time) {
              const finalDate = new Date(
                tempDate.getFullYear(),
                tempDate.getMonth(),
                tempDate.getDate(),
                time.getHours(),
                time.getMinutes()
              );
              onChange(finalDate.toISOString());
            } else {
              onChange(tempValue || '');
            }
            setTempDate(null);
            setTempValue(null);
          }}
        />
      );
    }

    return (
      <DateTimePicker
        value={currentValue || new Date()}
        mode={mode === 'datetime' ? 'date' : mode}
        display="default"
        onChange={(event, date) => {
          setShowPicker(false);
          if (event.type === 'set' && date) {
            onChange(date.toISOString());
          } else {
            onChange(tempValue || '');
          }
          setTempValue(null);
        }}
        minimumDate={minDate}
        maximumDate={maxDate}
      />
    );
  };

  return (
    <BaseInput
      control={control}
      name={name}
      label={label}
      error={error}
      icon={icon}
      renderInput={({ onChange, value, error }) => {
        const currentValue = value ? new Date(value) : null;

        return (
          <>
            <TouchableOpacity
              onPress={() => {
                setTempValue(value);
                setShowPicker(true);
              }}
              className={`flex-row items-center border border-gray-300 rounded-lg bg-white ${
                error ? 'border-red-500' : ''
              }`}
            >
              {icon && (
                <View className="p-3 border-r border-gray-300">
                  <Ionicons name={icon} size={20} color="#6b7280" />
                </View>
              )}
              <Text
                className={`flex-1 p-3 ${
                  currentValue ? 'text-gray-700' : 'text-gray-400'
                }`}
              >
                {currentValue ? formatDate(currentValue) : placeholder}
              </Text>
              <View className="p-3">
                <Ionicons 
                  name={mode === 'time' ? 'time' : 'calendar'} 
                  size={20} 
                  color="#6b7280" 
                />
              </View>
            </TouchableOpacity>

            {Platform.OS === 'ios' ? (
              <Modal
                visible={showPicker}
                transparent={true}
                animationType="slide"
              >
                <View className="flex-1 bg-black/50 justify-end">
                  <View className="bg-white">
                    <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
                      <TouchableOpacity 
                        onPress={() => {
                          onChange(tempValue || '');
                          setTempValue(null);
                          setShowPicker(false);
                        }}
                      >
                        <Text className="text-gray-500 font-medium">Cancel</Text>
                      </TouchableOpacity>
                      <Text className="text-lg font-semibold">Select {mode}</Text>
                      <TouchableOpacity 
                        onPress={() => {
                          if (!currentValue) {
                            onChange(new Date().toISOString());
                          }
                          setTempValue(null);
                          setShowPicker(false);
                        }}
                      >
                        <Text style={{ color: basecolor }} className="font-medium">Done</Text>
                      </TouchableOpacity>
                    </View>
                    <DateTimePicker
                      value={currentValue || new Date()}
                      mode={mode}
                      display="spinner"
                      onChange={(event, date) => {
                        if (date) {
                          onChange(date.toISOString());
                        }
                      }}
                      minimumDate={minDate}
                      maximumDate={maxDate}
                    />
                  </View>
                </View>
              </Modal>
            ) : (
              <>
                {showPicker && handleAndroidDateTimeSelect(onChange, currentValue)}
                {showTimePicker && handleAndroidDateTimeSelect(onChange, currentValue)}
              </>
            )}
          </>
        );
      }}
    />
  );
};