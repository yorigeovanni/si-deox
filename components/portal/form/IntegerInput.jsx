import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';

export default function IntegerInput({
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
              keyboardType="number-pad"
              onBlur={onBlur}
              onChangeText={(txt) => onChange(txt.replace(/\D/g, ''))}
              // Menghapus semua non-digit
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

const styles = StyleSheet.create({
  container: { marginVertical: 8 },
  label: { fontWeight: 'bold', marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 4,
  },
  error: { color: 'red' },
});
