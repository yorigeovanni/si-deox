import React, { Fragment } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';


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
      {label && <Text style={styles.label}>{label}</Text>}
      <Controller
        control={control}
        name={name}
        rules={rules || defaultRules}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
          return (
            <View className='my-0'>

              <TextInput
                style={[
                  styles.inputContainer,
                  { backgroundColor: editable ? '#fff' : '#eee' },
                ]}
               // className={classNames( editable ? 'bg-white' : 'bg-gray-200', 'border border-gray-300 rounded p-2')}  
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



const styles = StyleSheet.create({
  label: {
    marginBottom: 8,
    fontWeight: 'bold',
  },
  inputContainer: {
    padding: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
  },
});


