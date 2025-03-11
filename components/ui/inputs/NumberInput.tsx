import  React from 'react';
import { View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BaseInput } from './BaseInput';
import { NumberInputProps } from './types';

export const NumberInput: React.FC<NumberInputProps> = ({ 
  control, 
  name, 
  label, 
  error, 
  placeholder,
  icon,
  min,
  max
}) => {
  const validateNumber = (text: string) => {
    const num = Number(text);
    if (isNaN(num)) return;
    if (min !== undefined && num < min) return min.toString();
    if (max !== undefined && num > max) return max.toString();
    return text;
  };

  return (
    <BaseInput
      control={control}
      name={name}
      label={label}
      error={error}
      icon={icon}
      renderInput={({ onChange, value, error, icon }) => (
        <View className={`flex-row items-center border border-gray-300 rounded-lg bg-white ${error ? 'border-red-500' : ''}`}>
          {icon && (
            <View className="p-3 border-r border-gray-300">
              {icon()}
            </View>
          )}
          <TextInput
            placeholder={placeholder}
            className="flex-1 p-3 text-gray-700"
            value={value}
            onChangeText={(text) => onChange(validateNumber(text))}
            keyboardType="numeric"
          />
        </View>
      )}
    />
  );
};