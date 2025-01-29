import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Controller } from 'react-hook-form';

export default function SelectionInput({
  control,
  name,
  label,
  rules,
  options = [], // mis: [{label:'Draft', value:'draft'}, {label:'Done', value:'done'}]
  enabled = true
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
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={value}
                onValueChange={onChange}
                enabled={enabled}
              >
                <Picker.Item label="-- Select --" value="" />
                {options.map(opt => (
                  <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
                ))}
              </Picker>
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
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  error: {
    color: 'red',
    marginTop: 4
  }
});
