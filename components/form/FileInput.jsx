// FileInputExpo.js
import React from 'react';
import { View, Text, Button } from 'react-native';
import { Controller } from 'react-hook-form';
import { getDocumentAsync } from 'expo-document-picker';



export default function FileInput({
  control,
  name,
  label,
  rules,
  multiple = false
}) {
    

  console.log(getDocumentAsync)
    
    if (!control) {
        return <Text style={{ color: 'red' }}>control is required</Text>;
    }
      
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View style={{ marginVertical: 8 }}>
          {label && <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>{label}</Text>}

          <Button
            title="Pilih File"
            onPress={async () => {
              console.log(' INI TEST')
              try {
                const result = await getDocumentAsync({
                  type: '*/*',
                  multiple,
                  //copyToCacheDirectory: true,
                });
                if (result.type === 'success') {
                  // di expo-document-picker, "success" => user memilih file
                  // "cancel" => user membatalkan
                  console.log('WOOOOOEeeee')
                  console.log(result);
                  onChange(result); // simpan ke form
                }
              } catch (err) {
                console.log('ERRROR===============')
                console.log(err)
                console.warn('File pick error:', err);
              }
            }}
          />

          {/* Tampilkan nama file */}
          {value && value.type === 'success' ? (
            <Text style={{ marginTop: 8 }}>
              {value.name} ({value.size} bytes)
            </Text>
          ) : (
            <Text style={{ marginTop: 8, color: '#666' }}>Belum ada file</Text>
          )}

          {/* Tampilkan error validasi */}
          {error && (
            <Text style={{ color: 'red' }}>
              {error.message}
            </Text>
          )}
        </View>
      )}
    />
  );
}
