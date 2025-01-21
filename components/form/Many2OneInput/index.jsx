// components/Many2OneInput.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Modal, TouchableOpacity, FlatList, StyleSheet, Platform } from 'react-native';
import { classNames } from '@/utils';
/**
 * props:
 * - label: Label yang ditampilkan
 * - model: Nama model Odoo (mis. 'res.partner') => Digunakan untuk fetch data
 * - value: Object {id, name} yang sekarang dipilih
 * - onChange: function untuk mengembalikan object {id, name} yang dipilih
 * - fetchRecords: function async untuk memanggil Odoo (bisa disesuaikan)
 */
const Many2OneInput = ({
  label,
  model,
  value,
  onChange,
  fetchRecords,
  placeholder = 'Pilih item...',
  editable = true,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [options, setOptions] = useState([]);

  // Contoh: fetch data dari Odoo saat searchText berubah
  useEffect(() => {
    let isMounted = true;
    const loadOptions = async () => {
      try {
        if (searchText.length < 1) {
          setOptions([]);
          return;
        }
        const res = await fetchRecords(model, searchText); // custom function
        if (isMounted) {
          setOptions(res);
        }
      } catch (err) {
        console.error(err);
      }
    };
    loadOptions();
    return () => { isMounted = false };
  }, [searchText]);



  const handleSelect = (item) => {
    console.log(item)
    //onChange(item);
    setModalVisible(false);
  };




  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TouchableOpacity
        style={[styles.inputContainer, { backgroundColor: editable ? '#fff' : '#eee' }]}
        onPress={() => editable && setModalVisible(true)}
      >
        <Text style={styles.selectedText}>
          {value && value.name ? value.name : placeholder}
        </Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" onRequestClose={() => setModalVisible(false)}>
        <View className={classNames('bg-red-800 pb-4 flex-row items-center justify-start', Platform.OS === 'android' ? " pt-10" : " pt-20")}>
          <TextInput
            className='bg-white rounded-lg p-2 mx-4 w-3/4'
            placeholder="Ketik untuk mencari..."
            value={searchText}
            onChangeText={setSearchText}
          />

          <TouchableOpacity className='bg-white p-2 w-20 rounded-lg' onPress={() => setModalVisible(false)}>
            <Text className='text-center'>Tutup</Text>
          </TouchableOpacity>

        </View>
        <View className='flex-1 p-2'>
       
          <FlatList
            data={[
              {id: 1, name : "dfsfsdfsdfsdfsdfsd"},
              {id: 2, name : "dfsfsdfsdfsdfsdfsd"},
              {id: 3, name : "dfsfsdfsdfsdfsdfsd"},
              {id: 4, name : "dfsfsdfsdfsdfsdfsd"},
              {id: 5, name : "dfsfsdfsdfsdfsdfsd"},
              {id: 6, name : "dfsfsdfsdfsdfsdfsd"},
              {id: 7, name : "dfsfsdfsdfsdfsdfsd"},
              {id: 8, name : "dfsfsdfsdfsdfsdfsd"},
              {id: 9, name : "dfsfsdfsdfsdfsdfsd"},
              {id: 10, name : "dfsfsdfsdfsdfsdfsd"},
              {id: 11, name : "dfsfsdfsdfsdfsdfsd"},
              {id: 12, name : "dfsfsdfsdfsdfsdfsd"},
              {id: 13, name : "dfsfsdfsdfsdfsdfsd"},
              {id: 14, name : "dfsfsdfsdfsdfsdfsd"},
              {id: 15, name : "dfsfsdfsdfsdfsdfsd"},
              {id: 16, name : "dfsfsdfsdfsdfsdfsd"},
              {id: 17, name : "dfsfsdfsdfsdfsdfsd"},
              {id: 18, name : "dfsfsdfsdfsdfsdfsd"},
              {id: 19, name : "dfsfsdfsdfsdfsdfsd"},
            ]}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.optionItem} onPress={() => handleSelect(item)}>
                <Text>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </View>
  );
};

export default Many2OneInput;

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    marginBottom: 4,
    fontWeight: 'bold',
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 4,
  },
  selectedText: {
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 12,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  optionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  closeButton: {
    backgroundColor: 'red',
    alignItems: 'center',
    padding: 12,
    borderRadius: 4,
    marginTop: 16,
  },
});
