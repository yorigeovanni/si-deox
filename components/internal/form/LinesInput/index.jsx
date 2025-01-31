import React, { useCallback, useState, useEffect } from 'react';
import { View, Text, Pressable, ScrollView, Modal } from 'react-native';
import { Ionicons, Octicons } from '@expo/vector-icons';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { classNames } from '@/utils';
import ChildrenForm from './ChildrenForm';
import { SafeAreaView } from "react-native-safe-area-context";

export default function LinesInput({
  control,        // dari parent
  setValue,       // dari parent
  name,
  label,
  formFiels,
  placeholder,
  editable = true,
  rules
}) {
  const { fields, append, remove, update } = useFieldArray({ control, name });
  // Simpan ID baris Odoo yang dihapus
  const [removedLines, setRemovedLines] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [{ tempIndex, tempValue }, setTempValue] = useState({
    tempIndex: null,
    tempValue: null
  });



  // Saat menambah baris
  const handleAddLine = useCallback(() => {
    setTempValue({ tempIndex: null, tempValue: null });
    setModalVisible(true);
  }, []);

  // Saat edit baris
  const handleEditLine = useCallback((index) => {
    const item = fields[index];
    setTempValue({ tempIndex: index, tempValue: item });
    setModalVisible(true);
  }, [fields]);

  // Setelah modal "Save"
  const handleModalSave = useCallback((value) => {
    if (tempIndex === null) {
      // Mode tambah
      append(value);
    } else {
      update(tempIndex, value);
    }
    setModalVisible(false);
    setTempValue({ tempIndex: null, tempValue: null });
  }, [append, update, tempIndex]);

  // Setelah modal "Cancel"
  const handleModalCancel = useCallback(() => {
    setTempValue({ tempIndex: null, tempValue: null });
    setModalVisible(false);
  }, []);

  // Saat user klik hapus baris
  const handleRemove = useCallback((index) => {
    const item = fields[index];
    // Jika baris sudah punya odoo_id, masukkan ke removedLines
    if (item.odoo_id) {
      setRemovedLines((prev) => [...prev, item.odoo_id]);
    }
    // Lalu benar-benar remove dari form
    remove(index);
  }, [fields, remove]);

  // Setiap kali removedLines berubah, simpan ke form
  useEffect(() => {
    setValue(`${name}___removedLines`, removedLines);
  }, [removedLines, setValue, name]);

  return (
    <View className=' mt-4'>
      <View className='flex-row items-center justify-between py-2'>
        <Text className=' text-lg font-bold text-gray-600'>{label}</Text>

        {/* Tombol Add */}
        <Pressable
          className=' p-2 rounded-md border border-gray-600'
          style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}
          onPress={handleAddLine}
        >
          <Octicons name="plus" size={18} color="#4B5563" />
          <Text className='text-gray-600 font-bold ml-2'>NEW</Text>
        </Pressable>
      </View>

      {/* TABEL LINES */}
      {fields.length === 0 ? (
        <View className='flex items-center justify-center bg-gray-100 p-4 rounded-lg'>
          <Text style={{ fontStyle: 'italic' }}>NO VALUE</Text>
        </View>
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View>
            {/* Header */}
            <View className="bg-white">
              <View className="flex-row overflow-hidden items-center justify-center">
                {formFiels.flat().map((item, index) => (
                  <View
                    style={[{ width: item.tableColWidth }]}
                    key={index}
                    className="h-14 bg-gray-100 p-2 border-b border-gray-200"
                  >
                    <Text className="bg-gray-100 py-2 text-left text-sm text-gray-700 font-bold">
                      {item.label}
                    </Text>
                  </View>
                ))}
                <View
                  style={[{ width: 80 }]}
                  className="h-14 bg-gray-100 p-2 items-center border-b border-gray-200"
                >
                  <Text className="bg-gray-100 py-2 text-left text-sm text-gray-700 font-bold">
                    ACTION
                  </Text>
                </View>
              </View>
            </View>

            {/* Body */}
            <View>
              {fields.map((rowData, index) => {
                const rowBgClass = index % 2 === 0 ? "bg-gray-50" : "bg-white";
                return (
                  <View
                    key={rowData.id}
                    className={classNames(
                      "flex-row h-14 items-center border-b border-gray-200",
                      rowBgClass
                    )}
                  >
                    {formFiels.flat().map((colItem, i) => (
                      <Text
                        key={i}
                        style={[{ width: colItem.tableColWidth }]}
                        className="text-left text-sm text-gray-700 p-2"
                      >
                        {colItem.render(rowData, rowData[colItem.name])}
                      </Text>
                    ))}
                    <View style={[{ width: 80 }]} className='flex-row items-center justify-between px-3'>
                      <Pressable onPress={() => handleEditLine(index)}>
                        <Ionicons name="create-outline" size={16} color="blue" />
                      </Pressable>
                      <Pressable onPress={() => handleRemove(index)}>
                        <Ionicons name="trash-outline" size={16} color="red" />
                      </Pressable>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        </ScrollView>
      )}

      {/* Modal Add/Edit */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={handleModalCancel}
      >
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
          {/* Header modal */}
          <View className='bg-red-700 px-4 flex-row items-center justify-between rounded-bl-lg rounded-br-lg'>
            <View />
            <View className="flex-col items-end py-2">
              <Text className="text-white text-xl font-extrabold ">{label}</Text>
              <Text className="text-white text-sm font-bold ">CHILDREN TREE DATA</Text>
            </View>
          </View>

          {/* Form di modal */}
          <ChildrenForm
            onCancel={handleModalCancel}
            onSubmit={handleModalSave}
            fields={formFiels}
            value={tempValue}
          />
        </SafeAreaView>
      </Modal>
    </View>
  );
}
