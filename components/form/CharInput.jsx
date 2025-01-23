import React, { Fragment } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';

const CharInput = ({ control, name, label, placeholder, editable = true, rules }) => {

  const defaultRules = rules = {
    required: 'field is required',
  }


  if (!control) {
    return (<Text className=' text-red-700'>
      control is required
    </Text>)
  }

  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <Controller
        control={control}
        name={name}
        rules={rules || defaultRules}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
          return (
            <View style={{ marginVertical: 4 }}>

              <TextInput
                style={[styles.inputContainer, { backgroundColor: editable ? '#fff' : '#eee' }]}
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
          )
        }}
      />
    </View>

  );
};

export default CharInput;


const styles = StyleSheet.create({
  container: {
    marginVertical: 8
  },
  label: {
    marginBottom: 4,
    fontWeight: 'bold'
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 4
  },
  selectedText: {
    color: '#333'
  },
  modalHeader: {
    backgroundColor: 'red',
    paddingHorizontal: 16,
    paddingBottom: 8,
    flexDirection: 'row'
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 8,
    flex: 1,
    marginRight: 8
  },
  closeBtn: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  optionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  }
});

