// One2ManyInput => form sub-record
import React from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { Controller } from 'react-hook-form';

export default function One2ManyInput({ control, name, label, rules }) {

           // Pastikan ada control
                      if (!control) {
                        return <Text style={{ color: 'red' }}>Error: control is required</Text>;
                      }
  return (
    <Controller
      control={control}
      name={name} // array of objects
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const data = value || [];

        const addItem = () => {
          // misal tambah item kosong
          const newItem = { id: Date.now(), name: '', qty: 0 };
          onChange([...data, newItem]);
        };
        
        const removeItem = (id) => {
          onChange(data.filter(x => x.id !== id));
        };

        return (
          <View style={{ marginVertical: 8 }}>
            {label && <Text>{label}</Text>}
            <FlatList
              data={data}
              keyExtractor={(item) => String(item.id)}
              renderItem={({ item }) => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text>{item.name} (qty: {item.qty})</Text>
                  <Button title="X" onPress={() => removeItem(item.id)} />
                </View>
              )}
            />
            <Button title="Add" onPress={addItem} />
            {error && <Text style={{ color: 'red' }}>{error.message}</Text>}
          </View>
        );
      }}
    />
  );
}
