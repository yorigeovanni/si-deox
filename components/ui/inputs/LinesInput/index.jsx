import React from "react";
import { View, Text, Modal, TouchableOpacity, ScrollView } from "react-native";
import { useState, useCallback, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useFieldArray } from "react-hook-form";
import { DynamicForm } from "@/components/ui/DynamicForm";

export const LinesInput = ({
  canCreate = false,
  canEdit = false,
  canDelete = false,
  basecolor,
  control,
  name,
  label,
  setValue,
  error,
  placeholder,
  formFields,
  defaultValue = [],
  renderItem,
  id,
  model,
}) => {

  const { fields, append, remove, update } = useFieldArray({ control, name });
  const [removedLines, setRemovedLines] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [{ tempIndex, tempValue, tempOdooId }, setTempValue] = useState({
    tempOdooId : null,
    tempIndex: null,
    tempValue: null,
  });



  // Saat menambah baris
  const handleAddLine = useCallback(() => {
    setTempValue((prev)=>{
      return { 
        ...prev,
        tempOdooId : null,
        tempIndex: null, 
        tempValue: null 
      }
    });
    setModalVisible(true);
  }, []);



  // Saat edit baris
  const handleEditLine = useCallback(
    (index) => {
      const item = fields[index];
      setTempValue((prev)=>{
        return {
          ...prev,
          tempIndex: index,
          tempOdooId : item?.odoo_id || null,
          tempValue: item 
        }
      });
      setModalVisible(true);
    },
    [fields]
  );

  // Setelah modal "Save"
  const handleModalSave = useCallback((value) => {
    ////console.log(value);
    ////console.log(tempIndex)
    if (tempIndex === null) {
        append(value);
      } else {
        // flag utama => penting odoo_id
        //supaya flag pembeda update dan add tidak hilang
        update(tempIndex, {...value, odoo_id : tempOdooId});
      }
      setTimeout(()=>{
        setModalVisible(false);
        setTempValue((prev)=>{
          return {
            ...prev,
            tempIndex: null, 
            tempOdooId : null,
            tempValue: null 
          }
        });
      }, 100)
    },
    [append, update, tempIndex, tempOdooId]
  );




  // Setelah modal "Cancel"
  const handleModalCancel = useCallback(() => {
    setTempValue((prev)=>{
      return { 
        ...prev,
        tempOdooId  : null,
        tempIndex: null, 
        tempValue: null 
      }
    });
    setModalVisible(false);
  }, []);

  // Saat user klik hapus baris
  const handleRemove = useCallback(
    (index) => {
      const item = fields[index];
      // Jika baris sudah punya odoo_id, masukkan ke removedLines
      if (item.odoo_id) {
        setRemovedLines((prev) => [...prev, item.odoo_id]);
      }
      // Lalu benar-benar remove dari form
      remove(index);
    },
    [fields, remove]
  );

  // Setiap kali removedLines berubah, simpan ke form
  useEffect(() => {
    setValue(`${name}___removedLines`, removedLines);
  }, [removedLines, name, setValue]);



  ////console.log(JSON.stringify(fields, null, 2));

  return (
    <View className="mb-4">
      <View className="flex-row justify-between items-center mb-2">
        <View>
          <Text className="text-lg font-bold text-gray-800">{label}</Text>
          <Text className="text-sm text-gray-500">{`${fields.length} items`}</Text>
        </View>
        {canCreate && (<TouchableOpacity
          onPress={() => canCreate ? handleAddLine() : void 0}
          className="px-3 py-2 rounded-lg flex-row items-center"
          style={{ backgroundColor: basecolor }}
          disabled={!canCreate}
        >
          <Ionicons name="add" size={20} color="#ffffff" />
          <Text className="ml-1 text-white font-medium">NEW</Text>
        </TouchableOpacity>)}
        
      </View>

      {fields.length > 0 ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="mt-4">
            <View className="flex-row border-b-2 border-gray-200/50 bg-gray-200">
              {formFields[0].map((field, index) => (
                <View
                  key={index}
                  style={{ width: field.tableColWidth || 150 }}
                  className="py-2.5 px-3"
                >
                  <Text className="font-bold text-sm text-gray-700">
                    {field.title || field.label}
                  </Text>
                </View>
              ))}
              <View style={{ width: 80 }} className="py-2.5 px-3">
                <Text className="font-bold text-sm text-gray-700">ACTIONS</Text>
              </View>
            </View>

            {fields.map((item, index) => (
              <View
                key={index}
                className={`flex-row border-b border-gray-100 hover:bg-gray-50 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                {formFields[0].map((field, colIndex) => {
                  ////console.log(item)
                  return (
                    <View
                      key={colIndex}
                      style={{ width: field.tableColWidth || 150 }}
                      className="py-2.5 px-3"
                    >
                      <Text className="text-sm text-gray-700">
                        {field.type === "manyToOne"
                          ? item[field.name][field.optionLabel]
                          : item[field.name]}
                      </Text>
                    </View>
                  )
                })}
                <View
                  style={{ width: 80 }}
                  className="py-2.5 px-3 flex-row space-x-2"
                >
                  {canEdit && (<TouchableOpacity
                    onPress={() => canEdit ? handleEditLine(index) : void 0}
                    disabled={!canEdit}
                    className="p-1.5 rounded-full bg-gray-100"
                  >
                    <Ionicons name="create-outline" size={14} color="#3b82f6" />
                  </TouchableOpacity>)}

                  {canDelete && (<TouchableOpacity
                      onPress={() => canDelete ?  handleRemove(index) : void 0}
                      disabled={!canDelete}
                      className="p-1.5 rounded-full bg-gray-100"
                  >
                    <Ionicons name="trash-outline" size={14} color="#ef4444" />
                  </TouchableOpacity>)}
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      ) : (
        <View className="py-6 bg-gray-50 rounded-lg items-center">
          <Ionicons name="list" size={32} color="#9ca3af" />
          <Text className="mt-2 text-gray-500">No items yet</Text>
        </View>
      )}

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View className="flex-1 bg-white mt-36">
          {/* Modal Header */}
          <View className="p-4 border-b border-gray-200">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-xl font-bold text-gray-900">
                {/*editingIndex !== null ? "Edit" : "Add"*/} {label}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  //setTempValue(null);
                  //setEditingIndex(null);
                }}
                className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center"
              >
                <Ionicons name="close" size={20} color="#374151" />
              </TouchableOpacity>
            </View>
          </View>

          <DynamicForm
            basecolor={basecolor}
            fields={formFields}
            onSubmit={handleModalSave}
            onBack={handleModalCancel}
            initialValues={tempValue || undefined}
            // TIDAK PAKAI ID ATAU MODEL KARENA INI BUKAN SUBMIT KE MODEL
            //id={id}
            //model={model}
          />
        </View>
      </Modal>
    </View>
  );
};













