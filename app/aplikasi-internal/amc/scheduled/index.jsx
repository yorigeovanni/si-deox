import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Modal,
} from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useCallback, Fragment, useMemo } from "react";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useModelQuery } from '@/services/queryClient'
import createRequest from "@/services/api-secure-internal";

dayjs.extend(utc);
dayjs.extend(customParseFormat);



const model_name = "x_data_amc";
const selectedFields = {
  x_studio_sequence: {},
  x_studio_reg_number: {},
  x_studio_operator: {
    fields: {
      x_name: {},
    },
  },
  x_studio_type_pesawat: {
    fields: {
      x_name: {},
    },
  },
  x_studio_is_validated_from_upbu: {},
  x_studio_verifikator_upbu: {
    fields: {
      display_name: {},
    },
  },
  x_studio_is_validated_from_operator: {},
  x_studio_status: {},
  x_studio_ata: {},
  x_studio_atd: {},
  x_studio_type_penerbangan: {},

  x_studio_parking_stand_1: {
    fields: {
      x_studio_parking_stand_1: {
        fields: {
          x_name: {},
        },
      },
      x_studio_block_on_1: {},
      x_studio_block_off_1: {},
    },
  },

  x_studio_extra_arrivals_flight_number: {
    fields: {
      x_studio_from: {
        fields: {
          x_name: {},
        },
      },
      x_studio_destination: {
        fields: {
          x_name: {},
        },
      },
      x_studio_flight_number: {},
      x_studio_personil_operator_1: {
        fields: {
          name: {},
        },
      },
    },
  },
  x_studio_extra_departures_flight_number: {
    fields: {
      x_studio_from: {
        fields: {
          x_name: {},
        },
      },
      x_studio_destination: {
        fields: {
          x_name: {},
        },
      },
      x_studio_flight_number: {},
    },
  },

  write_date: {},
  write_uid: {
    fields: {
      display_name: {},
    },
  },
  create_uid: {
    fields: {
      display_name: {},
    },
  },
  create_date: {},
};


const quickStats = [
  { title: "Today Flight", value: 0, icon: "checkbox", color: "#009688" },
  { title: "Today Landing", value: 0, icon: "time", color: "#FFC107" },
  {
    title: "Today Takeoff",
    value: 0,
    icon: "checkmark-circle",
    color: "#4CAF50",
  },
  { title: "Today Cancel", value: 0, icon: "alert-circle", color: "#F44336" },
  { title: "RON", value: 0, icon: "alert-circle", color: "#F44336" },
  { title: "X-RON", value: 0, icon: "alert-circle", color: "#F44336" },
];


const sortOptions = [
  { label: "Registration Number (A-Z)", value: "x_studio_reg_number ASC" },
  { label: "Registration Number (Z-A)", value: "x_studio_reg_number DESC" },
  { label: "Latest Update", value: "write_date DESC" },
  { label: "Oldest Update", value: "write_date ASC" },
  { label: "Status (A-Z)", value: "x_studio_status ASC" },
  { label: "Status (Z-A)", value: "x_studio_status DESC" },
];

const filterOptions = {
  status: [
    { label: "All", value: "all" },
    { label: "Schedule", value: "SCHEDULE" },
    { label: "Landing", value: "LANDING" },
    { label: "Takeoff", value: "TAKEOFF" },
    { label: "Cancel", value: "CANCEL" },
  ],
  type: [
    { label: "All Types", value: "all" },
    { label: "RON", value: "RON" },
    { label: "X-RON", value: "XRON" },
  ],
};

export default () => {
 
  const { post } = createRequest();
  const router = useRouter();
  const [
    { domain, limit, offset, order, searchQuery, filterStatus },
    setParams,
  ] = useState({
    domain: [],
    searchQuery: "",
    filterStatus: null,
    limit: 20,
    offset: 0,
    order: "create_date DESC",
  });

  const queryOptions = useMemo(() => ({
    model: model_name,
    selectedFields: selectedFields,
    offset: offset,
    order: order,
    limit: limit,
    count_limit: 100001,
    domain: domain
  }), [domain, limit, offset, order]);
  

  

  const { data, isLoading, isError, error, refetch } = useModelQuery(queryOptions);

    


  

  const [showSortModal, setShowSortModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    status: "all",
    type: "all",
  });

  const [selectedItem, setSelectedItem] = useState(null);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [quickFilter, setQuickFilter] = useState([]);
  const [loadingTags, setLoadingTags] = useState(true);


  const setFilterStatus = (filterStatus) => {
    setParams((prevState) => ({
      ...prevState,
      filterStatus: filterStatus,
    }));
  };


  const setOffset = (offset) => {
    setParams((prevState) => ({
      ...prevState,
      offset: offset,
    }));
  };


  const setSearchQuery = (searchQuery) => {
    setParams((prevState) => ({
      ...prevState,
      searchQuery: searchQuery,
    }));
  };


  const setOrder = (newOrder) => {
    setParams((prevState) => ({
      ...prevState,
      order: newOrder,
    }));
    setShowSortModal(false);
  };



  const constructDomain = useCallback(() => {
    let newDomain = [];

    if (searchQuery) {
      newDomain.push(["x_studio_reg_number", "ilike", searchQuery]);
    }

    /*
    if (activeFilters.status !== 'all') {
      newDomain.push(['x_studio_status', '=', activeFilters.status]);
    }
    
    if (activeFilters.type !== 'all') {
      newDomain.push(['x_studio_type_penerbangan', '=', activeFilters.type]);
    }*/
    return newDomain;
  }, [searchQuery, activeFilters]);

  const loadTags = async () => {
    try {
      setLoadingTags(true);
      const { data } = await post('/mobile/api/internal/mobile-data', {
        params: {
          model: "x_amc_tags",
          method: "web_search_read",
          args: [],
          kwargs: {
            specification: {
              x_name: {},
            },
            offset: 0,
            order: "x_studio_sequence ASC, id ASC",
            limit: 10,
            count_limit: 10001,
            domain: [],
          },
        },
      });
      //console.log(data);
      if (data.records) {
        const tags = data?.records.map((tag) => ({
          title: tag.x_name,
          id: tag.id,
          icon: "pricetag",
          color: "#009688",
        }));
        setQuickFilter(tags);
      }
    } catch (error) {
      //console.error("Error loading tags:", error);
    } finally {
      setLoadingTags(false);
    }
  };

  /*
  const loadData = useCallback(async () => {
    try {
      setState((prevState) => ({
        ...prevState,
        loading: true,
      }));
      const finalDomain = constructDomain();
      const { data } = await post('/mobile/api/internal/mobile-data', {
        params: {
          model: model_name,
          method: "web_search_read",
          args: [],
          kwargs: {
            specification: selectedFields,
            offset: offset,
            order: order,
            limit: limit,
            count_limit: 100001,
            domain: finalDomain,
          },
        },
      });

      setState((prevState) => ({
        ...prevState,
        totalCount: data.length,
        data: data.records,
        error: null,
      }));
    } catch (e) {
      //console.log(e);
      setState((prevState) => ({
        ...prevState,
        error: e.message,
      }));
    } finally {
      setState((prevState) => ({
        ...prevState,
        loading: false,
      }));
    }
  }, [offset, limit, order, constructDomain]);
*/




  const handleComplete = async () => {
    if (!selectedItem) return;
    try {
      setSubmitting(true);

      await post(`/mobile/api/internal/mobile-data`, {
        params: {
          model: model_name,
          method: "save",
          args: [selectedItem.id],
          kwargs: {
            x_studio_status: "COMPLETED",
          },
        },
      });

      setShowCompleteModal(false);
      setSelectedItem(null);
      //loadData();
    } catch (error) {
      //console.error("Error completing record:", error);
    } finally {
      setSubmitting(false);
    }
  };


  useFocusEffect(
    useCallback(() => {
      if (!isLoading) {
        refetch();
      }
    }, [])
  );




  const totalPages = Math.ceil(data?.length / 20);

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <LinearGradient colors={["#009688", "#00796B"]} className="pt-12 pb-6">
        <View className="px-6 flex-row items-center justify-between py-4">
          <TouchableOpacity
            className="w-10 h-10 bg-white/20 rounded-full items-center justify-center mb-4"
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <View className=" flex-col items-end justify-end">
            <Text className="text-white text-2xl font-bold">
              SCHEDULED FLIGHT
            </Text>
            <Text className="text-white/80">No Descriptions</Text>
          </View>
        </View>
      </LinearGradient>
      <ScrollView>
        <View className="p-6 -mt-6">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="my-4"
          >
            {quickStats.map((stat, index) => (
              <View
                key={index}
                className="bg-white rounded-xl p-4 border border-gray-500/25 mr-4"
                style={{ width: 140 }}
              >
                <View className="flex-row items-center mb-2">
                  <View
                    className="w-10 h-10 rounded-lg items-center justify-center"
                    style={{ backgroundColor: `${stat.color}20` }}
                  >
                    <Ionicons name={stat.icon} size={20} color={stat.color} />
                  </View>
                </View>
                <Text className="text-2xl font-bold">{stat.value}</Text>
                <Text className="text-gray-600 text-sm">{stat.title}</Text>
              </View>
            ))}
          </ScrollView>

          <View className="bg-white rounded-xl px-4 py-3 mb-4 border border-gray-200">
            <View className="flex-row items-center">
              <Ionicons name="search" size={20} color="#666" />
              <TextInput
                className="flex-1 ml-2 text-base"
                placeholder="Search flights..."
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              <TouchableOpacity
                onPress={() => setShowFilterModal(true)}
                className="p-2"
              >
                <Ionicons
                  name="filter"
                  size={20}
                  color={
                    Object.values(activeFilters).some((v) => v !== "all")
                      ? "#009688"
                      : "#666"
                  }
                />
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-4"
          >
            {quickFilter.map((item, index) => {
              //console.log(item);
              return (
                <TouchableOpacity
                  onPress={() => setFilterStatus(item.id)}
                  key={index}
                  className={`mr-3 px-4 py-2 rounded-full ${
                    filterStatus === item.id
                      ? "bg-teal-600"
                      : "bg-white border border-teal-600"
                  }`}
                >
                  <Text
                    className={`${
                      filterStatus === item.id ? "text-white" : "text-teal-600"
                    } lowercase`}
                  >
                    {item.title}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <View className="flex-row justify-between mb-6">
            <TouchableOpacity
              className="bg-white p-4 rounded-xl border border-gray-500/25 flex-1 mr-2"
              onPress={() =>
                router.push("./create", { relativeToDirectory: true })
              }
            >
              <View className="flex-row items-center justify-center">
                <Ionicons name="add-circle" size={20} color="#009688" />
                <Text className="text-teal-600 font-semibold ml-2">
                  New Sceduled
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-white p-4 rounded-xl border border-gray-500/25 flex-1 ml-2"
              onPress={() => setShowSortModal(true)}
            >
              <View className="flex-row items-center justify-center">
                <Ionicons name="funnel" size={20} color="#009688" />
                <Text className="text-teal-600 font-semibold ml-2">Sort</Text>
              </View>
            </TouchableOpacity>
          </View>

          {isLoading ? (
            <View className="flex-1 justify-center items-center">
              <ActivityIndicator size="large" color="#009688" />
              <Text className="text-gray-600 mt-4">Loading flights...</Text>
            </View>
          ) : isError ? (
            <View className="flex-1 justify-center items-center p-6">
              <Ionicons name="alert-circle" size={48} color="#ef4444" />
              <Text className="text-red-600 text-center mt-4">{'terjadi kesalahan'}</Text>
              <TouchableOpacity
               // onPress={() => loadData()}
                className="mt-4 bg-teal-600 px-6 py-3 rounded-lg"
              >
                <Text className="text-white font-medium">Retry</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Fragment>
              {data.records?.map((item) => (
                <View
                  key={item.id}
                  className="bg-white rounded-xl p-4 mb-4 border border-gray-300/50"
                >
                  <View className="flex-row justify-between items-start mb-3">
                    <View className="flex-1 mr-4">
                      <Text className="text-xl font-bold">
                        {item.x_studio_operator?.x_name}
                      </Text>
                      <Text className="text-gray-600 mt-1">
                        {item.x_studio_reg_number}
                      </Text>
                    </View>
                    <View
                      className={`px-3 py-1 rounded-full ${
                        true === "High"
                          ? "bg-red-100"
                          : false === "Medium"
                          ? "bg-yellow-100"
                          : "bg-green-100"
                      }`}
                    >
                      <Text
                        className={`text-xs ${
                          true === "High"
                            ? "text-red-600"
                            : false === "Medium"
                            ? "text-yellow-600"
                            : "text-green-600"
                        }`}
                      >
                        {item.x_studio_status}
                      </Text>
                    </View>
                  </View>

                  <View className="bg-gray-50 p-3 rounded-lg mb-4">
                    <View className="flex-row justify-between items-center">
                      <View>
                        <Text className="text-gray-600">FN. ARR</Text>
                        <Text className="font-bold text-lg">
                          {item.x_studio_extra_arrivals_flight_number?.length ||
                            "-"}
                        </Text>
                      </View>
                      <View className="h-12 w-[1px] bg-gray-200" />
                      <View>
                        <Text className="text-gray-600">FN. DEP</Text>
                        <Text className="font-bold text-lg">
                          {item.x_studio_extra_departures_flight_number
                            ?.length || "-"}
                        </Text>
                      </View>
                      <View className="h-12 w-[1px] bg-gray-200" />
                      <View>
                        <Text className="text-gray-600">PARKING</Text>
                        <Text className="font-bold text-lg">
                          {item.x_studio_parking_stand_1?.length || "-"}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View className="bg-gray-50 p-3 rounded-lg mb-4">
                    <View className="flex-row justify-between mb-1">
                      <Text className="text-gray-600">Progress</Text>
                      <Text className="font-medium">24%</Text>
                    </View>
                    <View className="bg-gray-200 h-2 rounded-full overflow-hidden">
                      <View
                        className={`h-full rounded-full ${
                          true === "Completed"
                            ? "bg-green-500"
                            : false === "In Progress"
                            ? "bg-yellow-500"
                            : "bg-gray-400"
                        }`}
                        style={{ width: `$25%` }}
                      />
                    </View>
                  </View>

                  <View className="flex-col">
                    <View className="flex-row items-center justify-between mb-2">
                      <Text>Last Update </Text>
                    </View>
                    <View className="flex-row items-center justify-between mb-4">
                      <View className="flex-row items-center">
                        <Ionicons name="person" size={16} color="#666" />
                        <Text className="text-gray-600 ml-1">
                          {(item.write_uid?.display_name).length > 15
                            ? (item.write_uid?.display_name).substring(
                                0,
                                15 - 3
                              ) + "..."
                            : item.write_uid?.display_name}
                        </Text>
                      </View>
                      <View className="flex-row items-center">
                        <Ionicons name="calendar" size={16} color="#666" />
                        <Text className="text-gray-600 ml-1">
                          {" "}
                          {dayjs
                            .utc(item?.create_date, "YYYY-MM-DD HH:mm:ss")
                            .local()
                            .format("DD-MM-YY HH:mm")}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View className="flex-row mt-4 pt-4 border-t border-gray-100">
                    <TouchableOpacity
                      className="flex-1 flex-row items-center justify-center"
                      onPress={() =>
                        router.push(`./${item.id}/update`, {
                          relativeToDirectory: true,
                        })
                      }
                    >
                      <Ionicons name="create" size={20} color="#009688" />
                      <Text className="text-teal-600 ml-2">Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-1 flex-row items-center justify-center">
                      <Ionicons
                        name="caret-forward-circle"
                        size={20}
                        color="#009688"
                      />
                      <Text className="text-teal-600 ml-2">Details</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="flex-1 flex-row items-center justify-center"
                      onPress={() => {
                        setSelectedItem(item);
                        setShowCompleteModal(true);
                      }}
                    >
                      <Ionicons
                        name="checkmark-circle"
                        size={20}
                        color="#009688"
                      />
                      <Text className="text-teal-600 ml-2">Assign</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </Fragment>
          )}
        </View>
      </ScrollView>

      <View className="bg-white border-t border-gray-200 px-4 py-3">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center space-x-2">
            <TouchableOpacity
              className={`p-2 rounded-lg mr-4 ${
                offset === 0 ? "bg-gray-100 opacity-50" : "bg-gray-100"
              }`}
              onPress={() => {
                if (offset !== 0) {
                 setOffset(0);
                 // loadData();
                }
              }}
              disabled={offset === 0}
            >
              <Ionicons name="play-skip-back" size={18} color="#009688" />
            </TouchableOpacity>

            <TouchableOpacity
              className={`p-2 rounded-lg ${
                offset === 0 ? "bg-gray-100 opacity-50" : "bg-gray-100"
              }`}
              onPress={() => {
                if (offset >= 20) {
                 setOffset(offset - 20);
                 // loadData();
                }
              }}
              disabled={offset === 0}
            >
              <Ionicons name="chevron-back" size={18} color="#009688" />
            </TouchableOpacity>
          </View>

          <View className="flex-row items-center space-x-1">
            <View className="w-8 h-8 rounded-lg bg-teal-600 items-center justify-center">
              <Text className="text-white font-medium">
                {Math.floor(offset / 20) + 1}
              </Text>
            </View>
            <Text className="text-gray-600">/</Text>
            <Text className="text-gray-800 font-medium">{totalPages}</Text>
          </View>

          <View className="flex-row items-center space-x-2">
            <TouchableOpacity
              className={`p-2 rounded-lg ${
                offset >= (totalPages - 1) * 20
                  ? "bg-gray-100 opacity-50"
                  : "bg-gray-100"
              }`}
              onPress={() => {
                if (offset < (totalPages - 1) * 20) {
                 setOffset(offset + 20);
                 // loadData();
                }
              }}
              disabled={offset >= (totalPages - 1) * 20}
            >
              <Ionicons name="chevron-forward" size={18} color="#009688" />
            </TouchableOpacity>

            <TouchableOpacity
              className={`p-2 rounded-lg ml-4 ${
                offset >= (totalPages - 1) * 20
                  ? "bg-gray-100 opacity-50"
                  : "bg-gray-100"
              }`}
              onPress={() => {
                if (offset < (totalPages - 1) * 20) {
                 setOffset((totalPages - 1) * 20);
                 // loadData();
                }
              }}
              disabled={offset >= (totalPages - 1) * 20}
            >
              <Ionicons name="play-skip-forward" size={18} color="#009688" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="mt-3 flex-row items-center justify-between border-t border-gray-100 pt-3">
          <View className="flex-row items-center">
            <Text className="text-gray-600 text-sm">
              Showing{" "}
              <Text className="font-medium text-gray-800">
                {offset + 1} - {Math.min(offset + 20, data?.length)}
              </Text>{" "}
              of <Text className="font-medium text-gray-800">{data?.length}</Text>{" "}
              entries
            </Text>
          </View>

          <View className="flex-row items-center space-x-2">
            <Text className="text-gray-600 text-sm">Go to:</Text>
            <TextInput
              className="w-16 px-3 py-1.5 bg-gray-100 rounded-lg text-center text-teal-600 text-sm"
              keyboardType="number-pad"
              returnKeyType="go"
              placeholder={`${Math.floor(offset / 20) + 1}`}
              onSubmitEditing={(e) => {
                const page = parseInt(e.nativeEvent.text);
                if (!isNaN(page) && page > 0 && page <= totalPages) {
                  setOffset((page - 1) * 20);
                  //loadData();
                }
              }}
            />
          </View>
        </View>
      </View>

      <Modal
        visible={showSortModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowSortModal(false)}
      >
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-white rounded-t-3xl">
            <View className="p-4 border-b border-gray-200">
              <View className="flex-row justify-between items-center">
                <Text className="text-xl font-bold text-gray-800">Sort By</Text>
                <TouchableOpacity
                  onPress={() => setShowSortModal(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center"
                >
                  <Ionicons name="close" size={20} color="#374151" />
                </TouchableOpacity>
              </View>
            </View>

            <ScrollView className="max-h-96">
              {sortOptions.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  className={`p-4 flex-row items-center justify-between border-b border-gray-100 ${
                    order === option.value ? "bg-teal-50" : ""
                  }`}
                  onPress={() => setOrder(option.value)}
                >
                  <View className="flex-row items-center">
                    <Text
                      className={`text-base ${
                        order === option.value
                          ? "text-teal-600 font-medium"
                          : "text-gray-700"
                      }`}
                    >
                      {option.label}
                    </Text>
                  </View>
                  {order === option.value && (
                    <Ionicons
                      name="checkmark-circle"
                      size={20}
                      color="#009688"
                    />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showFilterModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowFilterModal(false)}
      >
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-white rounded-t-3xl">
            <View className="p-4 border-b border-gray-200">
              <View className="flex-row justify-between items-center">
                <Text className="text-xl font-bold text-gray-800">
                  Filter Flights
                </Text>
                <TouchableOpacity
                  onPress={() => setShowFilterModal(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center"
                >
                  <Ionicons name="close" size={20} color="#374151" />
                </TouchableOpacity>
              </View>
            </View>

            <ScrollView className="max-h-96 px-4 py-2">
              <View className="mb-6">
                <Text className="text-lg font-semibold text-gray-800 mb-3">
                  Status
                </Text>
                <View className="flex-row flex-wrap -m-1">
                  {filterOptions.status.map((option) => (
                    <TouchableOpacity
                      key={option.value}
                      onPress={() =>
                        setActiveFilters((prev) => ({
                          ...prev,
                          status: option.value,
                        }))
                      }
                      className={`m-1 px-4 py-2 rounded-full border ${
                        activeFilters.status === option.value
                          ? "bg-teal-600 border-teal-600"
                          : "border-gray-300"
                      }`}
                    >
                      <Text
                        className={`${
                          activeFilters.status === option.value
                            ? "text-white"
                            : "text-gray-700"
                        }`}
                      >
                        {option.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View className="mb-6">
                <Text className="text-lg font-semibold text-gray-800 mb-3">
                  Flight Type
                </Text>
                <View className="flex-row flex-wrap -m-1">
                  {filterOptions.type.map((option) => (
                    <TouchableOpacity
                      key={option.value}
                      onPress={() =>
                        setActiveFilters((prev) => ({
                          ...prev,
                          type: option.value,
                        }))
                      }
                      className={`m-1 px-4 py-2 rounded-full border ${
                        activeFilters.type === option.value
                          ? "bg-teal-600 border-teal-600"
                          : "border-gray-300"
                      }`}
                    >
                      <Text
                        className={`${
                          activeFilters.type === option.value
                            ? "text-white"
                            : "text-gray-700"
                        }`}
                      >
                        {option.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </ScrollView>

            <View className="p-4 border-t border-gray-200">
              <View className="flex-row space-x-3">
                <TouchableOpacity
                  className="flex-1 p-3.5 rounded-xl bg-gray-100"
                  onPress={() => {
                    setActiveFilters({
                      status: "all",
                      type: "all",
                    });
                    setShowFilterModal(false);
                  }}
                >
                  <Text className="text-center font-medium text-gray-700">
                    Reset Filters
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="flex-1 p-3.5 rounded-xl bg-teal-600"
                  onPress={() => {
                    //setShowFilterModal(false);
                    //loadData();
                  }}
                >
                  <Text className="text-center font-medium text-white">
                    Apply Filters
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showCompleteModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => {
          if (!submitting) {
            setShowCompleteModal(false);
            setSelectedItem(null);
          }
        }}
      >
        <View className="flex-1 bg-black/50 justify-center items-center px-4">
          <View className="bg-white w-full max-w-md rounded-2xl overflow-hidden">
            <LinearGradient
              colors={["#009688", "#00796B"]}
              className="px-6 py-4"
            >
              <View className="flex-row items-center justify-between py-4 px-2">
                <Text className="text-xl font-bold text-white px-2">
                  LANJUTKAN DATA KE OPERATOR
                </Text>
                {!submitting && (
                  <TouchableOpacity
                    onPress={() => {
                      setShowCompleteModal(false);
                      setSelectedItem(null);
                    }}
                    className="w-8 h-8 rounded-full bg-white/20 items-center justify-center"
                  >
                    <Ionicons name="close" size={20} color="white" />
                  </TouchableOpacity>
                )}
              </View>
            </LinearGradient>

            <View className="p-4">
              <View className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-2">
                <View className="flex-row items-center">
                  <Ionicons name="warning" size={24} color="#F59E0B" />
                  <Text className="ml-2 text-yellow-800 font-medium">
                    Data tidak dapat diubah setelah dikirm.
                  </Text>
                </View>
              </View>

              <View className="mb-4">
                <Text className="text-lg font-semibold text-gray-800 mb-2">
                  INFORMASI MOVEMENT
                </Text>

                <View className="space-y-4">
                  <View className="flex-row items-center bg-gray-50 p-3 rounded-lg">
                    <View className="w-10 h-10 bg-teal-100 rounded-full items-center justify-center">
                      <Ionicons name="airplane" size={20} color="#009688" />
                    </View>
                    <View className="ml-3">
                      <Text className="text-sm text-gray-500">
                        REG. NUMBER / OPERATOR
                      </Text>
                      <Text className="text-base font-medium text-gray-800">
                        {selectedItem?.x_studio_reg_number}
                        {" / "}
                        {selectedItem?.x_studio_operator?.x_name}
                      </Text>
                    </View>
                  </View>

                  <View className="flex-row items-center bg-gray-50 p-3 rounded-lg">
                    <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center">
                      <Ionicons name="business" size={20} color="#2196F3" />
                    </View>
                    <View className="flex-col w-[85%]">
                      <View className="ml-3">
                        <Text className="font-medium text-sm text-gray-500">
                          FLIGHT NUMBER ARRIVALS
                        </Text>
                      </View>

                      <View className="ml-3 flex-row items-center justify-between">
                        <Text className="text-base font-medium text-gray-800">
                          SK-345
                        </Text>
                        <Text className="text-base font-medium text-gray-800">
                          SOQ - MDC
                        </Text>
                      </View>

                      <View className="ml-3 flex-row items-center justify-between">
                        <Text className="text-base font-medium text-gray-800">
                          SK-345
                        </Text>
                        <Text className="text-base font-medium text-gray-800">
                          SOQ - MDC
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View className="flex-row items-start bg-gray-50 p-3 rounded-lg">
                    <View className="w-10 h-10 mt-2 bg-purple-100 rounded-full items-center justify-center">
                      <Ionicons name="stats-chart" size={20} color="#9C27B0" />
                    </View>
                    <View className="flex-col w-[85%]">
                      <View className="ml-3">
                        <Text className="font-medium text-sm text-gray-500">
                          FLIGHT NUMBER DEPARTURE
                        </Text>
                      </View>

                      

                      <View className="ml-3 flex-row items-center justify-between">
                        <Text className="text-base font-medium text-gray-800">
                          SK-345
                        </Text>
                        <Text className="text-base font-medium text-gray-800">
                          SOQ - MDC
                        </Text>
                      </View>

                      <View className="ml-3 flex-row items-center justify-between">
                        <Text className="text-base font-medium text-gray-800">
                          SK-345
                        </Text>
                        <Text className="text-base font-medium text-gray-800">
                          SOQ - MDC
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View className="flex-row items-center bg-gray-50 p-3 rounded-lg">
                    <View className="w-10 h-10 bg-orange-100 rounded-full items-center justify-center">
                      <Ionicons name="location" size={20} color="#FF9800" />
                    </View>
                    <View className="flex-col w-[85%]">
                      <View className="ml-3">
                        <Text className="font-medium text-sm text-gray-500">
                          PARKING STAND
                        </Text>
                      </View>

                      <View className="ml-3 flex-row items-center justify-between">
                        <Text className="text-base font-medium text-gray-800">
                          SOQ-MDC
                        </Text>
                        <Text className="text-base font-medium text-gray-800">
                          SOQ-MDC
                        </Text>
                        <Text className="text-base font-medium text-gray-800">
                          GA-234
                        </Text>
                      </View>

                      <View className="ml-3 flex-row items-center justify-between">
                        <Text className="text-base font-medium text-gray-800">
                          SOQ-MDC
                        </Text>
                        <Text className="text-base font-medium text-gray-800">
                          SOQ-MDC
                        </Text>
                        <Text className="text-base font-medium text-gray-800">
                          GA-234
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>

              <View className="flex-row items-center justify-between">
                <TouchableOpacity
                  className="flex-1 p-3.5 rounded-xl bg-gray-100 mx-6"
                  onPress={() => {
                    setShowCompleteModal(false);
                    setSelectedItem(null);
                  }}
                  disabled={submitting}
                >
                  <Text className="text-center font-medium text-gray-700">
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className={`flex-1 p-3.5 rounded-xl mx-6  ${
                    submitting ? "bg-teal-400" : "bg-teal-600"
                  }`}
                  onPress={handleComplete}
                  disabled={submitting}
                >
                  {submitting ? (
                    <View className="flex-row items-center justify-center space-x-2">
                      <ActivityIndicator color="white" size="small" />
                      <Text className="text-white font-medium">
                        Processing...
                      </Text>
                    </View>
                  ) : (
                    <Text className="text-center font-medium text-white">
                      Complete Flight
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
