import React, { useCallback, useState } from 'react';
import { View, Text, Pressable, ScrollView, Modal, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons, Octicons } from '@expo/vector-icons';
import { useFieldArray } from 'react-hook-form';
import { classNames } from '@/utils';
import ChildrenForm from './ChildrenForm';
import { SafeAreaView } from "react-native-safe-area-context";

export default function LinesInput({
  control,
  name,
  label,
  formFiels,
  placeholder,
  editable = true,
  rules
}) {

  const { fields, append, remove, update } = useFieldArray({ control, name });
  const [modalVisible, setModalVisible] = useState(false);
  const [{ tempIndex, tempValue }, setTempValue] = useState({ tempIndex: null, tempValue: null });




  const handleAddLine = useCallback(() => {
    setTempValue((oldState) => {
      return {
        ...oldState,
        tempIndex: null,
        tempValue: null
      }
    });
    setModalVisible(true);
  }, [setTempValue, setModalVisible]);



  const handleEditLine = useCallback((index) => {
    const item = fields[index];
    setTempValue((oldState) => {
      return {
        ...oldState,
        tempIndex: index,
        tempValue: item
      }
    });
    setModalVisible(true);
  }, [fields, setTempValue, setModalVisible]);




  const handleModalSave = useCallback((value) => {
    if (tempIndex === null) {
      // Mode tambah
      append(value);
    } else {
      update(tempIndex, value);
    }
    setModalVisible(false);
    setTempValue((oldState) => {
      return {
        ...oldState,
        tempIndex: null,
        tempValue: null
      }
    });
  }, [tempIndex, append, update, setTempValue, setModalVisible]);




  const handleModalCancel = useCallback(() => {
    setTempValue((oldState) => {
      return {
        ...oldState,
        tempIndex: null,
        tempValue: null
      }
    });
    setModalVisible(false);
  }, [setTempValue, setModalVisible]);




  return (
    <View className=' mt-4'>
      <View className='flex-row items-center justify-between py-2'>
        <Text className=' text-lg font-bold text-gray-600'>{label}</Text>

        {/* Tombol Add */}
        <Pressable
          className=' p-2 rounded-md border border-gray-600'
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 12,
          }}
          onPress={handleAddLine}
        >
          <Octicons name="plus" size={18} color="#4B5563" className='mr-2' />
          <Text className='text-gray-600 font-bold '>NEW</Text>
        </Pressable>
      </View>


      {fields.length === 0 ? (
        <View className='flex items-center justify-center bg-gray-100 p-4 rounded-lg'>
          <Text style={{ fontStyle: 'italic' }}>NO VALUE </Text>
        </View>
      ) : (<ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View>
          <View className="bg-white">
            <View className="flex-row overflow-hidden items-center justify-center">

              {formFiels.flat().map((item, index) => {
                return (
                  <View
                    style={[{ width: item.tableColWidth }]}
                    key={index}
                    className="h-14 bg-gray-100 p-2 border-b border-gray-200"
                  >
                    <Text className="bg-gray-100 py-2 text-left text-sm text-gray-700 font-bold">
                      {item.label}
                    </Text>
                  </View>
                );
              })}
              <View style={[{ width: 80 }]} className="h-14 bg-gray-100 p-2 items-center border-b border-gray-200">
                <Text className="bg-gray-100 py-2 text-left text-sm text-gray-700 font-bold">
                  ACTION
                </Text>
              </View>
            </View>
          </View>
          <View>
            {fields.map((rowData, index) => {
              const rowBgClass = index % 2 === 0 ? "bg-gray-50" : "bg-white";
              //console.log(rowData);
              return (
                <View key={rowData.id}
                  className={classNames(
                    "flex-row h-14 items-center border-b border-gray-200",
                    rowBgClass
                  )}
                >
                  {formFiels.flat().map((item, i) => {
                    console.log(item)
                    return (
                      <Text
                        key={i}
                        style={[{ width: item.tableColWidth }]}
                        className={classNames(
                          item.className ?? "text-left text-sm",
                          "text-gray-700 p-2"
                        )}
                      >
                        {item.render(rowData, rowData[item.name])}
                      </Text>
                    );
                  })}
                  <View style={[{ width: 80 }]} className=' flex-row items-center  justify-between px-3'>
                    <Pressable onPress={() => handleEditLine(index)}>
                      <Ionicons name="create-outline" size={16} color="blue" />
                    </Pressable>
                    <Pressable onPress={() => remove(index)}>
                      <Ionicons name="trash-outline" size={16} color="red" />
                    </Pressable>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>)}







      {/* Modal Add/Edit */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={handleModalCancel}
      >
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
          <View className={classNames('bg-red-700 px-4 flex-row items-center justify-between rounded-bl-lg rounded-br-lg ')}>
            <View></View>
            <View className="flex-col items-end py-2">
              <Text className="text-white text-xl font-extrabold ">{label}</Text>
              <Text className="text-white text-sm font-bold ">CHILDREN TREE DATA</Text>
            </View>
          </View>
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
