import React from "react";
import { View, Text, Modal, FlatList, TouchableOpacity, ScrollView, TextInput, ActivityIndicator,  } from "react-native";
import { useState, useCallback, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useFieldArray } from "react-hook-form";
import createRequest from "@/services/api-secure-internal";
import { debounce } from "lodash";

export const TagsInput = ({
  basecolor,
  control,
  name,
  label,
  error,
  placeholder,
  icon,
  targetModel,
  optionLabel = "name",
  optionValue = "id",
  selectedFields = {},
  domain = [],
  defaultValue = [],
}) => {
  const { post } = createRequest();
  const [loading, setLoading] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [options, setOptions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { fields, append, remove, update } = useFieldArray({ control, name });
  const [modalVisible, setModalVisible] = useState(false);



  const searchRecords = useCallback(async () => {
    try {
      setLoading(true);
      const searchDomain = searchQuery
        ? [[optionLabel, "ilike", searchQuery]]
        : [];
      
      const notInFields = fields.map((field) => field.odoo_id);
      const notInDomain = notInFields.length > 0 ? [[optionValue, "not in", notInFields]] : [];
      //console.log(notInDomain)
      const finalDomain = [
        ...domain, 
        ...searchDomain,
        ...notInDomain
      ];

      const { data } = await post("/mobile/api/internal/mobile-data", {
        params: {
          model: targetModel,
          method: "web_search_read",
          args: [],
          kwargs: {
            specification: selectedFields,
            domain: finalDomain,
            limit: 20,
            count_limit: 100,
          },
        },
      });

      //console.log(data);
      setOptions(() => {
        return data.records;
      });
      setLoading(false);
    } catch (error) {
      setOptions(() => {
        return [];
      });
      //console.error("Error fetching records:", error);
      setLoading(false);
    } 
  }, [fields, domain, selectedFields, optionValue, targetModel, searchQuery]);





  const handleSearch = (query) => {
    // setSearchQuery(query);
    // debouncedSearch(query);
   };
 
 
   // Setelah modal "Save"
   const handleModalSave = useCallback(() => {
      selectedTags.forEach((tag) => {
        append({ ...tag, odoo_id: tag[optionValue] });  
      });
      setSelectedTags([]);
      setModalVisible(()=>false);
   }, [selectedTags, append]);
     
 
 
 
   const handleModalCancel = useCallback(() => {
    setSelectedTags(()=>[]);
    setModalVisible(()=>false);
   }, []);
 
 
 
   const handleRemove = useCallback((index) => {
     remove(index);
   },[fields, remove]);
 
 
   const toggleTag = useCallback((tag) => {
     let newSelectedTags;
     if (selectedTags.some(t => t[optionValue] === tag[optionValue])) {
       newSelectedTags = selectedTags.filter(t => t[optionValue] !== tag[optionValue]);
     } else {
       newSelectedTags = [...selectedTags, tag];
     }
     setSelectedTags(()=>newSelectedTags);
   }, [selectedTags, optionValue]);
 
 

  
  return (
    <View className="mb-4">
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-sm font-medium text-gray-700">{label}</Text>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
            searchRecords();
          }}
          className="flex-row items-center bg-blue-50 px-3 py-1 rounded-full"
        >
          <Ionicons name="add-circle" size={16} color="#3b82f6" />
          <Text
            className="text-sm font-medium ml-1"
            style={{ color: basecolor || "#3b82f6" }}
          >
            Add Tags
          </Text>
        </TouchableOpacity>
      </View>

      <View
        className={`min-h-[52px] border border-gray-300 rounded-lg bg-white p-2 ${
          error ? "border-red-500" : ""
        }`}
      >
        {fields.length > 0 ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="flex-row"
          >
            {fields.map((tag, index) => {
              //console.log(tag);
              return (
                <View
                  key={index}
                  className="bg-gray-100 rounded-full px-3 py-1.5 mr-2 flex-row items-center"
                >
                  <Text className="text-gray-700 text-sm font-medium">
                    {tag[optionLabel]}
                  </Text>
                  <TouchableOpacity
                    onPress={() => handleRemove(index)}
                    className="ml-1.5"
                  >
                    <Ionicons name="close-circle" size={18} color="#4b5563" />
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>
        ) : (
          <Text className="text-gray-400 p-2">{placeholder}</Text>
        )}
      </View>

      {error && (
              <Text className="text-red-500 text-sm mt-1">{error}</Text>
            )}

            {/* Tags Selection Modal */}
            <Modal
              visible={modalVisible}
              animationType="slide"
              transparent={true}
            >
              <View className="flex-1 bg-black/50">
                <View className="mt-20 bg-white rounded-t-xl flex-1">
                  {/* Modal Header */}
                  <View className="p-4 border-b border-gray-200">
                    <View className="flex-row items-center justify-between mb-4">
                      <Text className="text-xl font-bold text-gray-900">Select {label}</Text>
                      <TouchableOpacity
                        onPress={() => setModalVisible(false)}
                        className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center"
                      >
                        <Ionicons name="close" size={20} color="#374151" />
                      </TouchableOpacity>
                    </View>
                    
                    {/* Search Bar */}
                    <View className="flex-row items-center bg-gray-50 rounded-lg px-3 border border-gray-200">
                      <Ionicons name="search" size={20} color="#6b7280" />
                      <TextInput
                        className="flex-1 p-2.5 text-base"
                        placeholder="Search tags..."
                        value={searchQuery}
                        onChangeText={handleSearch}
                      />
                      {searchQuery !== '' && (
                        <TouchableOpacity onPress={() => setSearchQuery('')}>
                          <Ionicons name="close-circle" size={20} color="#6b7280" />
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>

                  {/* Tags List */}
                  {loading ? (
                    <View className="flex-1 justify-center items-center">
                      <ActivityIndicator size="large" color="#3b82f6" />
                    </View>
                  ) : (
                    <FlatList
                      data={options}
                      keyExtractor={(item) => item[optionValue].toString()}
                      renderItem={({ item }) => {
                        const isSelected = selectedTags.some(tag => tag[optionValue] === item[optionValue]);
                        return (
                          <TouchableOpacity
                            className={`p-4 border-b border-gray-100 flex-row justify-between items-center ${
                              isSelected ? 'bg-blue-50' : ''
                            }`}
                            onPress={() => toggleTag(item)}
                          >
                            <View className="flex-row items-center flex-1">
                              <View className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
                                isSelected ? 'border-blue-600 bg-blue-600' : 'border-gray-300'
                              }`}>
                                {isSelected && <Ionicons name="checkmark" size={16} color="#ffffff" />}
                              </View>
                              <Text className={`ml-3 text-base ${isSelected ? 'text-blue-600 font-medium' : 'text-gray-700'}`}>
                                {item[optionLabel]}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        );
                      }}
                      ListEmptyComponent={() => (
                        <View className="p-8 items-center">
                          <Ionicons name="search" size={48} color="#9ca3af" />
                          <Text className="text-gray-500 text-center mt-4 text-base">
                            No tags found
                          </Text>
                          <Text className="text-gray-400 text-center mt-1 text-sm">
                            Try different keywords or clear your search
                          </Text>
                        </View>
                      )}
                    />
                  )}

                  {/* Action Buttons */}
                  <View className="p-4 border-t border-gray-200">
                    <View className="flex-row space-x-3">
                      <TouchableOpacity
                        className="flex-1 p-3.5 rounded-xl bg-gray-100"
                        onPress={handleModalCancel}
                      >
                        <Text className="text-center font-medium text-gray-700">Cancel</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        className="flex-1 p-3.5 rounded-xl bg-blue-600"
                        onPress={handleModalSave}
                      >
                        <Text className="text-center font-medium text-white">
                          Done ({selectedTags.length})
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </Modal>
    </View>
  );

  /*
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
         
          <View className="p-4 border-b border-gray-200">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-xl font-bold text-gray-900">
              {label}
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
  );*/
};
