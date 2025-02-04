import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { View, TextInput, Text as RnText, Modal, TouchableOpacity, FlatList, StyleSheet, Platform } from 'react-native';
import { Icon, Text } from '@/components';
import { BaseStyle, useTheme, BaseColor } from '@/config';
import { useFocusEffect } from 'expo-router';
import { Controller } from 'react-hook-form';
import { classNames } from '@/utils';
import { useFindAll } from '@/services/internal/@dropdown';


const Many2OneInput = ({
  control,
  name,
  rules,
  model,
  fields = {},
  optionValue = 'id',
  optionLabel = 'name',
  label,
  placeholder = 'Pilih item...',
  editable = true,
}) => {
  const firstTimeRef = useRef(true);
  const { colors } = useTheme();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(0);

  // Modal & search
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');


  // Buat domain dinamis berdasarkan searchText
  const domain = useMemo(() => {
    // Contoh: cari record yang name ILIKE 'searchText'
    if (!searchText.trim()) {
      return [];
    }
    return [[optionLabel, 'ilike', searchText.trim()]];
  }, [searchText, optionLabel]);



  const { data, isLoading, isError, error, refetch } = useFindAll({
    model: model,
    fields: fields,
    offset,
    limit,
    domain
  });

  // Agar data di-refresh tiap kali user balik ke screen ini
  useFocusEffect(
    useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false;
        return;
      }
      refetch();
    }, [refetch])
  );

  // Jika mau refetch otomatis saat `searchText` berubah
  // (opsional, tergantung preferensi)
  useEffect(() => {
    refetch();
  }, [searchText, refetch]);

  const totalData = data?.result?.length || 0;
  const records = data?.result?.records || [];
  const totalPages = Math.ceil(totalData / limit);



  const handleSelect = (item, onChange) => {
    onChange(item);
    setModalVisible(false);
  };



  const defaultRules = rules || {
    required: 'field is required',
  };



  if (!control) {
    return <Text style={{ color: 'red' }}>control is required</Text>;
  }


  return (



    <Controller
      control={control}
      name={name}
      rules={defaultRules}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
        return (
          <View style={{ marginVertical: 4, marginBottom: 20,  paddingHorizontal: 20 }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                
              }}
              onPress={() => editable && setModalVisible(true)}
            >
              <View>
                <RnText className={classNames(editable ? 'text-lg font-semibold' : 'text-lg font-semibold text-gray-500')}>
                  {label ? <Text style={styles.label}>{label}</Text> : null}
                </RnText>
                <RnText className={classNames(value ? '' : ' text-gray-500')}>
                  {value && value[optionLabel] ? value[optionLabel] : placeholder}
                </RnText>
              </View>
              <Icon name="angle-right" size={18} color={colors.primary}  />
            </TouchableOpacity>

            {/* Pesan error */}
            {error && (
              <RnText className=' text-red-700 mt-1'>
                {error.message}
              </RnText>
            )}

            {/* MODAL */}
            <Modal
              visible={modalVisible}
              animationType="slide"
              onRequestClose={() => setModalVisible(false)}
            >
              {/* BAGIAN HEADER */}
              <View className={classNames('bg-red-800 pb-4 flex-row items-center justify-start', Platform.OS === 'android' ? " pt-10" : " pt-20")}>
                <TextInput
                  className='bg-white rounded-lg p-2 mx-4 w-3/4'
                  placeholder="Ketik untuk mencari..."
                  value={searchText}
                  onChangeText={setSearchText}
                />
                <TouchableOpacity
                  style={styles.closeBtn}
                  onPress={() => setModalVisible(false)}
                >
                  <Text>Tutup</Text>
                </TouchableOpacity>
              </View>

              {/* LIST */}
              <View style={{ flex: 1, padding: 8 }}>
                {isLoading && <Text>Loading...</Text>}
                {isError && (
                  <Text style={{ color: 'red' }}>
                    Error: {error?.message}
                  </Text>
                )}
                <FlatList
                  data={records}
                  keyExtractor={(item) => String(item[optionValue])}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.optionItem}
                      onPress={() => handleSelect(item, onChange)}
                    >
                      <Text>{item[optionLabel]}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </Modal>
          </View>
        );
      }}
    />

  );
};

export default Many2OneInput;



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
