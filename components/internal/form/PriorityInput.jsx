import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Controller } from 'react-hook-form';

export default function PriorityInput({ control, name, label, rules }) {
  const stars = [1, 2, 3, 4, 5];
       // Pastikan ada control
                      if (!control) {
                        return <Text style={{ color: 'red' }}>Error: control is required</Text>;
                      }

  return (
    <Controller
      control={control}
      name={name} // store integer 1..5
      rules={rules}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <View style={{ marginVertical: 8 }}>
          {label && <Text>{label}</Text>}
          <View style={{ flexDirection: 'row', marginTop: 4 }}>
            {stars.map(star => (
              <TouchableOpacity
                key={star}
                onPress={() => onChange(star)}
                style={{ marginRight: 8 }}
              >
                <Text style={{ fontSize: 24, color: star <= (value || 0) ? 'gold' : '#ccc' }}>
                  ★
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {error && <Text style={{ color: 'red' }}>{error.message}</Text>}
        </View>
      )}
    />
  );
}
