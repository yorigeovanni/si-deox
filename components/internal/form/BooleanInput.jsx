import React from 'react';
import { View, Text, Switch } from 'react-native';
import { Controller } from 'react-hook-form';

export default function BooleanInput({
  control,
  name,
  label,
  rules,
  disabled = false
}) {


           // Pastikan ada control
              if (!control) {
                return <Text style={{ color: 'red' }}>Error: control is required</Text>;
              }
              
  return (
    <View style={{ marginVertical: 8 }}>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Switch
                value={!!value}
                onValueChange={onChange}
                disabled={disabled}
              />
              {label && <Text style={{ marginLeft: 8 }}>{label}</Text>}
            </View>
            {error && <Text style={{ color: 'red' }}>{error.message}</Text>}
          </>
        )}
      />
    </View>
  );
}
