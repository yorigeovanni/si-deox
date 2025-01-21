import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const CharInput = ({
  label,
  value,
  onChange,
  placeholder,
  editable = true,
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        editable={editable}
      />
    </View>
  );
};

export default CharInput;

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    marginBottom: 4,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
  },
});
