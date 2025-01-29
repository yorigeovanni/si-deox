import React, { useCallback, useState } from 'react';
import {View, Text, Pressable, ScrollView,  Modal, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFieldArray } from 'react-hook-form';
import { classNames } from '@/utils';
import ChildrenForm  from './ChildrenForm';


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
  const [{tempIndex, tempValue}, setTempValue] = useState({ tempIndex: null, tempValue: null });



  const handleAddLine = useCallback(() => {
    setTempValue((oldState)=>{
      return {
        ...oldState,
        tempIndex: null,
        tempValue: null
      }
    });
    setModalVisible(true);
  },[ setTempValue, setModalVisible]);



  const handleEditLine = useCallback((index) => {
    const item = fields[index];
    setTempValue((oldState)=>{
      return {
        ...oldState,
        tempIndex: index,
        tempValue: item
      }
    });
    setModalVisible(true);
  },[fields, setTempValue, setModalVisible]);




  const handleModalSave = useCallback((value) => {
    if (tempIndex === null) {
      // Mode tambah
      append(value);
    } else {
      update(tempIndex, value);
    }
    setModalVisible(false);
    setTempValue((oldState)=>{
      return {
        ...oldState,
        tempIndex: null,
        tempValue: null
      }
    });
  },[tempIndex, append, update, setTempValue, setModalVisible]);




  const handleModalCancel = useCallback(() => {
    setTempValue((oldState)=>{
      return {
        ...oldState,
        tempIndex: null,
        tempValue: null
      }
    });
    setModalVisible(false);
  },[setTempValue, setModalVisible]);




  return (
    <View className=' mt-4'>
      <View className='flex-row items-center justify-between'>
        <Text style={{ fontWeight: 'bold', marginBottom: 6 }}>{label}</Text>

        {/* Tombol Add */}
        <Pressable
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 12,
          }}
          onPress={handleAddLine}
        >
          <Ionicons name="add-circle-outline" size={20} color="blue" />
          <Text style={{ color: 'blue', marginLeft: 4 }}>Add a line</Text>
        </Pressable>
      </View>


      {fields.length === 0 ? (
        <Text style={{ fontStyle: 'italic' }}>No lines yet</Text>
      ) : (<ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View>
          <View className="bg-white">
            <View className="flex-row overflow-hidden items-center justify-center">

              {formFiels.map((item, index) => {
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
              <View style={[{ width: 80 }]} className=" bg-gray-100 p-2 items-center">
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
                  {formFiels.map((item, i) => (
                    <Text
                      key={i}
                      style={[{ width: item.tableColWidth }]}
                      className={classNames(
                        item.className ?? "text-left text-sm",
                        "text-gray-700"
                      )}
                    >
                      {item.render(rowData, rowData[item.name])}
                    </Text>
                  ))}
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
        <View style={{ flex: 1, backgroundColor: '#fff', padding: 16 }}>
          <ChildrenForm 
              onCancel={handleModalCancel}
              onSubmit={handleModalSave}
              fields={formFiels} 
          />
          {/**
           
           <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>
            {editIndex === null ? 'Add Line' : `Edit Line #${editIndex + 1}`}
          </Text>

       
          <Text style={{ marginBottom: 4 }}>Description:</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              marginBottom: 12,
              paddingHorizontal: 8,
              height: 40,
            }}
            value={lineDesc}
            onChangeText={setLineDesc}
          />

        
          <Text style={{ marginBottom: 4 }}>Quantity:</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              marginBottom: 12,
              paddingHorizontal: 8,
              height: 40,
            }}
            value={lineQty}
            onChangeText={setLineQty}
            keyboardType="numeric"
          />

       
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity
              style={{
                backgroundColor: 'red',
                padding: 12,
                borderRadius: 6,
                marginRight: 8,
              }}
              onPress={handleModalCancel}
            >
              <Text style={{ color: '#fff' }}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ backgroundColor: 'green', padding: 12, borderRadius: 6 }}
              onPress={handleModalSave}
            >
              <Text style={{ color: '#fff' }}>Save</Text>
            </TouchableOpacity>
          </View>
           */}
        </View>
      </Modal>
    </View>
  );
}
