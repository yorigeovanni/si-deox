import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';

const TextInputYori = ({ 
  control, 
  name, 
  label, 
  placeholder, 
  editable = true, 
  rules 
}) => {

  const defaultRules = {
    required: 'field is required',
  };

  if (!control) {
    return <Text style={{ color: 'red' }}>control is required</Text>;
  }

  // State untuk menyimpan tinggi konten
  const [inputHeight, setInputHeight] = useState(0);

  return (
    <View style={{ marginVertical: 8 }}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Controller
        control={control}
        name={name}
        rules={rules || defaultRules}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
          
          // Kita tetapkan perkiraan tinggi per baris (misal 20 px)
          const lineHeightPx = 20;
          // 4 baris minimal
          const minHeightPx = 4 * lineHeightPx;
          // Memastikan tinggi = max(minHeight, inputHeight) agar minimal 4 baris
          const dynamicStyle = {
            height: Math.max(minHeightPx, inputHeight),
            textAlignVertical: 'top',
            lineHeight: lineHeightPx,
          };

          return (
            <View>
              <TextInput
                style={[
                  styles.inputContainer,
                  dynamicStyle,
                  { backgroundColor: editable ? '#fff' : '#eee' },
                ]}
                // Buat multiline
                multiline={true}
                // Mulai dengan 4 baris
                numberOfLines={4}
                // Nonaktifkan scroll internal 
                scrollEnabled={false}
                // Setiap konten berubah, perbarui state inputHeight
                onContentSizeChange={(_, contentHeight) => {
                  setInputHeight(contentHeight);
                }}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                placeholder={placeholder}
                editable={editable}
              />
              {error && (
                <Text style={{ color: 'red', marginTop: 4 }}>
                  {error.message}
                </Text>
              )}
            </View>
          );
        }}
      />
    </View>
  );
};

export default TextInputYori;

const styles = StyleSheet.create({
  label: {
    marginBottom: 4,
    fontWeight: 'bold',
  },
  inputContainer: {
    textAlignVertical:"top",
    padding: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    minHeight: 80,
  },
});
