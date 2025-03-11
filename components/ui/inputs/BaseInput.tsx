import  React from 'react';
import { View, Text } from 'react-native';
import { Controller } from 'react-hook-form';
import { BaseInputProps, InputRenderProps } from './types';

interface Props extends BaseInputProps {
  renderInput: (props: InputRenderProps) => React.ReactNode;
}

export const BaseInput: React.FC<Props> = ({ 
  control, 
  name, 
  label, 
  error,
  renderInput,
  icon 
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-700 mb-1">
            {label}
          </Text>
          {renderInput({ onChange, value, error, icon })}
          {error && (
            <Text className="text-red-500 text-sm mt-1">{error}</Text>
          )}
        </View>
      )}
    />
  );
};