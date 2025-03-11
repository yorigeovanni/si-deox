import React from "react";
import { View, Text, TextInput, Modal, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { useState, useCallback, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { BaseInput } from "./BaseInput";
import createRequest from "@/services/api-secure-internal";
import { debounce } from "lodash";
import { ManyToOneInputProps } from "./types";



interface OdooRecord {
  id: number;
  [key: string]: any;
}


export const ManyToOneInput: React.FC<ManyToOneInputProps> = ({
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
  initialLabel = "",
  domain = [],
  defaultValue = null,
}) => {



  const { post } = createRequest();
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [options, setOptions] = useState<OdooRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState<OdooRecord | null>(null);
  const [displayLabel, setDisplayLabel] = useState(initialLabel);



  
  useEffect(() => {
    if (initialLabel) {
      setDisplayLabel(initialLabel);
    }
  }, [initialLabel]);




  
  const searchRecords = async (query: string) => {
    try {
      setLoading(true);
      const searchDomain = query ? [[optionLabel, "ilike", query]] : [];

      // Combine search domain with provided domain
      const finalDomain = [...domain, ...searchDomain];

      // Build fields specification for web_search_read
      const fieldsSpec = {
        [optionValue]: {},
        [optionLabel]: {},
        ...selectedFields,
      };

      const { data } = await post("/mobile/api/internal/mobile-data", {
        params: {
          model: targetModel,
          method: "web_search_read",
          args: [],
          kwargs: {
            specification: fieldsSpec,
            offset: 0,
            // order: "x_studio_sequence ASC, id ASC",
            limit: 20,
            count_limit: 10001,
            domain: finalDomain,
          },
        },
      });
      if (data.records) {
        setOptions(
          data.records.map((record: any) => ({
            ...record,
            [optionValue]: record[optionValue],
            [optionLabel]: record[optionLabel],
          }))
        );
      }
    } catch (error) {
      //console.error("Error fetching records:", error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = useCallback(
    debounce((query: string) => searchRecords(query), 300),
    [domain]
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const handleSelect = (
    option: any,
    onChange: (value: number) => void
  ) => {
    //setSelectedOption(option);
    //setDisplayLabel(option[optionLabel]);
    onChange(option);
    setModalVisible(false);
  };

  return (
    <BaseInput
      control={control}
      name={name}
      label={label}
      error={error}
      icon={icon}
      renderInput={({ onChange, value, error, icon }) => {
       
        return (
          <>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
                searchRecords("");
              }}
            >
              <View
                className={`flex-row items-center border border-gray-300 rounded-lg bg-white ${
                  error ? "border-red-500" : ""
                }`}
              >
                {icon && (
                  <View className="p-3 border-r border-gray-300">
                    <Ionicons name={icon} size={20} color="#6b7280" />
                  </View>
                )}
                <Text
                  className={`flex-1 p-3 ${
                    value ? "text-gray-700" : "text-gray-400"
                  }`}
                >
                  {value && value[optionLabel] ? value[optionLabel] : placeholder}
                </Text>
                <View className="p-3">
                  <Ionicons name="chevron-down" size={20} color="#6b7280" />
                </View>
              </View>
            </TouchableOpacity>
  
            <Modal
              visible={modalVisible}
              animationType="slide"
              transparent={true}
            >
              <View className="flex-1 bg-black/50">
                <View className="mt-20 bg-white rounded-t-xl flex-1">
                  <View className="p-4 border-b border-gray-200">
                    <View className="flex-row items-center justify-between mb-4">
                      <Text className="text-xl font-bold">Select {label}</Text>
                      <TouchableOpacity
                        onPress={() => setModalVisible(false)}
                        className="p-2"
                      >
                        <Ionicons name="close" size={24} color="#374151" />
                      </TouchableOpacity>
                    </View>
  
                    <View className="flex-row items-center bg-gray-100 rounded-lg px-3">
                      <Ionicons name="search" size={20} color="#6b7280" />
                      <TextInput
                        className="flex-1 p-2"
                        placeholder="Search..."
                        value={searchQuery}
                        onChangeText={handleSearch}
                      />
                    </View>
                  </View>
  
                  {loading ? (
                    <View className="flex-1 justify-center items-center">
                      <ActivityIndicator size="large" color="#3b82f6" />
                    </View>
                  ) : (
                    <FlatList
                      data={options}
                      keyExtractor={(item) => item[optionValue].toString()}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          className={`p-4 border-b border-gray-100 ${
                            selectedOption?.[optionValue] === item[optionValue]
                              ? "bg-blue-50"
                              : ""
                          }`}
                          onPress={() => handleSelect(item, onChange)}
                        >
                          <Text className="text-gray-700">
                            {item[optionLabel]}
                          </Text>
                        </TouchableOpacity>
                      )}
                      ListEmptyComponent={() => (
                        <View className="p-4">
                          <Text className="text-gray-500 text-center">
                            No records found
                          </Text>
                        </View>
                      )}
                    />
                  )}
                </View>
              </View>
            </Modal>
          </>
        )
      }}
    />
  );
};
