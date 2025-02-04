import React, { Fragment } from 'react';
import { View, Text, TextInput, StyleSheet, I18nManager } from 'react-native';
import { Controller } from 'react-hook-form';
import { BaseStyle, BaseColor, useTheme, useFont } from '@/config';

const CharInput = ({ control, name, label, placeholder, editable = true, rules }) => {
  const { colors } = useTheme();
  const font = useFont();
  const cardColor = colors.card;
  const defaultRules = rules = {
    required: 'field is required',
  }

  if (!control) {
    return (<Text className=' text-red-700'>
      control is required
    </Text>)
  }


  return (
    <View style={{ marginBottom: 20,  paddingHorizontal: 20 }}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Controller
        control={control}
        name={name}
        rules={rules || defaultRules}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
          return (
            <View>
              <View style={[BaseStyle.textInput, { backgroundColor: cardColor }]}>
              <TextInput
                style={{
                  fontFamily: font,
                  flex: 1,
                  height: '100%',
                  textAlign: I18nManager.isRTL ? 'right' : 'left',
                  color: colors.text,
                  paddingTop: 5,
                  paddingBottom: 5,
                }}
                // className={classNames( editable ? 'bg-white' : 'bg-gray-200', 'border border-gray-300 rounded p-2')}  
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                placeholder={placeholder}
                editable={editable}
                placeholderTextColor={BaseColor.grayColor}
                selectionColor={colors.primary}
              />
              
            </View>
            {error && (
                <Text className=' text-red-700 mt-1'>
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
  label: {
    marginBottom: 8,
    fontWeight: 'bold',
  },
  inputContainer: {
    padding: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
  },
});


