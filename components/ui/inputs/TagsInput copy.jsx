import  React from 'react';
import { View, Text, Modal, FlatList, TouchableOpacity, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import { useState, useCallback, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Controller } from 'react-hook-form';
import createRequest from "@/services/api-secure-internal";
import { debounce } from 'lodash';
import { TagsInputProps } from './types';


export const TagsInput = ({ 
  control, 
  name, 
  label, 
  error, 
  placeholder,
  icon,
  targetModel,
  optionLabel = 'name',
  optionValue = 'id',
  selectedFields = {},
  domain = [],
  defaultValue = []
}) => {
  const { post } = createRequest();
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [currentValue, setCurrentValue] = useState([]);

  const searchRecords = async (query) => {
    try {
      setLoading(true);
      const searchDomain = query 
        ? [[optionLabel, 'ilike', query]]
        : [];
      
      const finalDomain = [...domain, ...searchDomain];

      // Build fields specification for web_search_read
      const fieldsSpec = {
        [optionValue]: {},
        [optionLabel]: {},
        ...selectedFields
      };
      
      const { data } = await post('/mobile/api/internal/mobile-data', {
        params : {
          model: targetModel,
          method: 'web_search_read',
          args: [],
          kwargs: {
            specification: fieldsSpec,
            domain: finalDomain,
            limit: 10,
            count_limit: 10
          }
        }
      });
      
      if (data.records) {
        setOptions(data.records.map(record => ({
          ...record,
          // Ensure the record has the expected format for display
          [optionValue]: record[optionValue],
          [optionLabel]: record[optionLabel]
        })));
      }
    } catch (error) {
      //console.error('Error fetching records:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSelectedTags = async (tagIds) => {
    if (!tagIds || tagIds.length === 0) return;
    
    try {
      // Build fields specification for web_search_read
      const fieldsSpec = {
        [optionValue]: {},
        [optionLabel]: {},
        ...selectedFields
      };

      const {data } = await post('/mobile/api/internal/mobile-data',{
        params : {
          model: targetModel,
          method: 'web_search_read',
          args: [],
          kwargs: {
            specification: fieldsSpec,
            domain: [['id', 'in', tagIds]],
            count_limit: tagIds.length
          }
        }
      });
      
      if (data.records) {
        setSelectedTags(data.records);
      }
    } catch (error) {
      //console.error('Error fetching selected tags:', error);
    }
  };

  const debouncedSearch = useCallback(
    debounce((query) => searchRecords(query), 300),
    [domain]
  );

  const handleSearch = (query) => {
    setSearchQuery(query);
    debouncedSearch(query);
  };

  // Initial load of options
  useEffect(() => {
    searchRecords('');
  }, []);

  // Fetch selected tags when value changes
  useEffect(() => {
    if (Array.isArray(currentValue) && currentValue.length > 0) {
      fetchSelectedTags(currentValue);
    }
  }, [currentValue]);

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field: { onChange, value } }) => {
        // Update currentValue when the field value changes
        useEffect(() => {
          if (Array.isArray(value)) {
            setCurrentValue(value);
          }
        }, [value]);

        const toggleTag = (tag) => {
          let newSelectedTags;
          if (selectedTags.some(t => t[optionValue] === tag[optionValue])) {
            newSelectedTags = selectedTags.filter(t => t[optionValue] !== tag[optionValue]);
          } else {
            newSelectedTags = [...selectedTags, tag];
          }
          setSelectedTags(newSelectedTags);
          onChange(newSelectedTags.map(t => t[optionValue]));
        };

        const removeTag = (tagToRemove) => {
          const newSelectedTags = selectedTags.filter(tag => tag[optionValue] !== tagToRemove[optionValue]);
          setSelectedTags(newSelectedTags);
          onChange(newSelectedTags.map(t => t[optionValue]));
        };

        return (
          <View className="mb-4">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-sm font-medium text-gray-700">{label}</Text>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(true);
                  searchRecords('');
                }}
                className="flex-row items-center bg-blue-50 px-3 py-1 rounded-full"
              >
                <Ionicons name="add-circle" size={16} color="#3b82f6" />
                <Text className="text-blue-600 text-sm font-medium ml-1">Add Tags</Text>
              </TouchableOpacity>
            </View>

            {/* Selected Tags Container */}
            <View className={`min-h-[52px] border border-gray-300 rounded-lg bg-white p-2 ${error ? 'border-red-500' : ''}`}>
              {selectedTags.length > 0 ? (
                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false}
                  className="flex-row"
                >
                  {selectedTags.map((tag) => (
                    <View 
                      key={tag[optionValue]} 
                      className="bg-gray-100 rounded-full px-3 py-1.5 mr-2 flex-row items-center"
                    >
                      <Text className="text-gray-700 text-sm font-medium">{tag[optionLabel]}</Text>
                      <TouchableOpacity
                        onPress={() => removeTag(tag)}
                        className="ml-1.5"
                      >
                        <Ionicons name="close-circle" size={18} color="#4b5563" />
                      </TouchableOpacity>
                    </View>
                  ))}
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
                        onPress={() => {
                          setSelectedTags([]);
                          onChange([]);
                          setModalVisible(false);
                        }}
                      >
                        <Text className="text-center font-medium text-gray-700">Clear All</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        className="flex-1 p-3.5 rounded-xl bg-blue-600"
                        onPress={() => setModalVisible(false)}
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
      }}
    />
  );
};