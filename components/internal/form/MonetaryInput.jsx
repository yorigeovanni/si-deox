// MonetaryInput.jsx
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';

export default function MonetaryInput({
  control,
  name,
  label,
  currency = 'Rp',
  rules,
}) {

       // Pastikan ada control
          if (!control) {
            return <Text style={{ color: 'red' }}>Error: control is required</Text>;
          }
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label} ({currency})</Text>}
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <>
            <View style={styles.inputRow}>
              <Text style={styles.prefix}>{currency}</Text>
              <TextInput
                style={styles.input}
                keyboardType="decimal-pad"
                onBlur={onBlur}
                onChangeText={(txt) => onChange(txt.replace(/[^0-9.]/g, ''))}
                value={value ? String(value) : ''}
              />
            </View>
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
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  prefix: {
    backgroundColor: '#eee',
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    padding: 8
  },
  error: { color: 'red' },
});
