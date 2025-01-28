import React, { Fragment } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Controller } from 'react-hook-form';
import { classNames } from '@/utils';

const CharInput = ({ control, name, label, placeholder, editable = true, rules }) => {

  const defaultRules = rules = {
    required: 'field is required',
  }


  if (!control) {
    return (<Text className=' text-red-700'>
      control is required
    </Text>)
  }

  return (
    <View className='my-2'>
      {label ? <Text className=' text-gray-700'>{label}</Text> : null}
      <Controller
        control={control}
        name={name}
        rules={rules || defaultRules}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
          return (
            <View className='my-0'>

              <TextInput
                className={classNames( editable ? 'bg-white' : 'bg-gray-200', 'border border-gray-300 rounded p-2')}  
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                placeholder={placeholder}
                editable={editable}
              />
              {error && (
                <Text className=' text-red-700 mt-1'>
                  {error.message}
                </Text>
              )}
            </View>
          )
        }}
      />
    </View>

  );
};

export default CharInput;

