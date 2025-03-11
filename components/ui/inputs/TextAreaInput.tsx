import  React from 'react';
import { View, TextInput } from 'react-native';
import { BaseInput } from './BaseInput';
import { TextAreaInputProps } from './types';

export const TextAreaInput: React.FC<TextAreaInputProps> = ({ 
  control, 
  name, 
  label, 
  error, 
  placeholder,
  numberOfLines = 4
}) => {
  return (
    <BaseInput
      control={control}
      name={name}
      label={label}
      error={error}
      renderInput={({ onChange, value, error }) => (
        <View className={`border border-gray-300 rounded-lg bg-white ${error ? 'border-red-500' : ''}`}>
          <TextInput
            placeholder={placeholder}
            className="p-3 text-gray-700 h-32"
            value={value}
            onChangeText={onChange}
            multiline
            numberOfLines={numberOfLines}
            textAlignVertical="top"
          />
        </View>
      )}
    />
  );
};