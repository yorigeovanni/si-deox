import  React from 'react';
import { View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BaseInput } from './BaseInput';
import { EmailInputProps } from './types';

export const EmailInput: React.FC<EmailInputProps> = ({ 
  control, 
  name, 
  label, 
  error, 
  placeholder,
  icon,
  autoCapitalize = 'none'
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
              <Ionicons name={icon} size={20} color="#6b7280" />
            </View>
          )}
          <TextInput
            placeholder={placeholder}
            className="flex-1 p-3 text-gray-700"
            value={value}
            onChangeText={onChange}
            keyboardType="email-address"
            autoCapitalize={autoCapitalize}
          />
        </View>
      )}
    />
  );
};