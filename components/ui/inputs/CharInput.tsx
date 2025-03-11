import  React from 'react';
import { View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BaseInput } from './BaseInput';
import { TextInputProps } from './types';

export const CharInput: React.FC<TextInputProps> = ({ 
  control, 
  name, 
  label, 
  error, 
  placeholder,
  icon 
}) => {
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
            onChangeText={onChange}
          />
        </View>
      )}
    />
  );
};