import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';

export default function FloatInput({
  control,
  name,
  label,
  rules,
  editable = true,
  placeholder,
}) {

      // Pastikan ada control
      if (!control) {
        return <Text style={{ color: 'red' }}>Error: control is required</Text>;
      }
      
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <>
            <TextInput
              style={[
                styles.input,
                !editable && { backgroundColor: '#eee' }
              ]}
              keyboardType="decimal-pad"
              onBlur={onBlur}
              onChangeText={(txt) => {
                // Boleh menambahkan logika validasi decimal 
                onChange(txt.replace(/[^0-9.]/g, ''));
              }}
              value={value ? String(value) : ''}
              editable={editable}
              placeholder={placeholder}
            />
            {error && <Text style={styles.error}>{error.message}</Text>}
          </>
        )}
      />
    </View>
  );
}
