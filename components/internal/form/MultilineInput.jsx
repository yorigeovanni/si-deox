import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';

export default function MultilineInput({
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
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <>
            <TextInput
              style={[styles.textArea, !editable && { backgroundColor: '#eee' }]}
              multiline
              numberOfLines={4}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
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
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 4,
    minHeight: 80,
    textAlignVertical: 'top'
  },
  error: { color: 'red' }
});
