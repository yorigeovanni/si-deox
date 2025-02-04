import React, { useCallback, useState, useEffect } from 'react';
import { View, Text, Pressable, ScrollView, Modal, TouchableOpacity } from 'react-native';
import { Ionicons, Octicons } from '@expo/vector-icons';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { classNames } from '@/utils';
import ChildrenForm from './ChildrenForm';
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from '@/components';
import { BaseStyle, useTheme, BaseColor, useFont } from '@/config';



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
  const { colors } = useTheme();
  const font = useFont();
  const cardColor = colors.card;

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
    <View style={{ marginBottom: 20, backgroundColor: cardColor, paddingHorizontal: 20, paddingVertical: 10 }}>
      {/* Header */}

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        activeOpacity={0.8}
      >
        <View>
          {label ? <Text className={classNames(editable ? 'text-lg font-semibold' : 'text-lg font-semibold text-gray-500')}>{label}</Text> : null}
          <Text className={classNames(' text-gray-500')}>
            {`${fields.length} items`}
          </Text>
        </View>

        <View className=' flex-row'>
          <TouchableOpacity  >
            <Icon name="plus" size={18} color={colors.primary} onPress={handleAddLine} />
          </TouchableOpacity>

        </View>


      </View>




      {/* TABEL LINES */}
      {fields.length > 0 && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className='mt-4'>
            {/* Header */}

            <View className="flex-row overflow-hidden items-center justify-center">
              {formFiels.flat().map((item, index) => {
                return (
                  <View
                    style={[{ width: item.tableColWidth }]}
                    key={index}
                    className={classNames(index == 0 ? 'rounded-tl-lg' : '', 'h-10 bg-orange-400 border-hairline  border-gray-900 items-center justify-center')}
                  >
                    <Text className="  text-sm text-gray-800 font-bold">
                      {item.label}
                    </Text>
                  </View>
                )
              })}
              <View style={[{ width: 80 }]} className="h-10 bg-orange-400 border-hairline  border-gray-900 items-center justify-center rounded-tr-lg">
                <Text className=" text-left text-sm text-gray-700 font-bold">
                  ACTION
                </Text>
              </View>
            </View>


            {/* Body */}
            <View>
              {fields.map((rowData, index) => {
                const rowBgClass = index % 2 === 0 ? "bg-orange-50" : "bg-orange-100";
                const roundedBotomLeft = index + 1 == fields.length;
                return (
                  <View
                    key={rowData.id}
                    className={classNames(
                      roundedBotomLeft ? 'rounded-bl-lg rounded-br-lg' : '',
                      "flex-row h-12 border-hairline  border-gray-900 ",
                      rowBgClass
                    )}
                  >
                    {formFiels.flat().map((colItem, i) => {
                      return (
                        <View key={i}
                          className={classNames('items-center justify-center border-r-hairline  border-gray-900 ')}>
                          <Text
                            style={[{ width: colItem.tableColWidth }]}
                            className="text-center text-sm text-gray-700 p-2"
                          >
                            {colItem.render(rowData, rowData[colItem.name])}
                          </Text>
                        </View>
                      )
                    })}
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
