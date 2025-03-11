import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
  TextInput,
  ActivityIndicator,
  RefreshControl,
  Alert
} from "react-native";
import { Image } from "expo-image";
import { useRouter, useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useRef, useMemo, useEffect, useCallback } from "react";
import createRequest from "@/services/api-secure-portal";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const { width } = Dimensions.get("window");
const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const baseURL =
  process.env.NODE_ENV === "production"
    ? process.env.EXPO_PUBLIC_API_URL
    : process.env.EXPO_PUBLIC_API_DEV;

const StatusBadge = ({ status, statusText }) => {
  const opacityAnim = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    let animationLoop;

    if (status === "LAS" || statusText === "LAST CALL") {
      const blink = Animated.sequence([
        Animated.timing(opacityAnim, {
          toValue: 0.3,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]);

      animationLoop = Animated.loop(blink, {
        iterations: -1,
      });

      animationLoop.start();
    }

    return () => {
      if (animationLoop) {
        animationLoop.stop();
        opacityAnim.setValue(1);
      }
    };
  }, [status, statusText, opacityAnim]);

  const getStatusColor = (status, statusText) => {
    if (status === "LAS" || statusText === "LAST CALL") {
      return "bg-red-500";
    }

    switch (status) {
      case "SCH":
        return "bg-blue-500";
      case "CKO":
        return "bg-green-500";
      case "DEL":
        return "bg-yellow-500";
      case "CNL":
        return "bg-red-500";
      case "BRD":
        return "bg-purple-500";
      case "DEP":
        return "bg-indigo-500";
      case "ARR":
        return "bg-teal-500";
      default:
        // Fallback to text-based status if code not matched
        switch (statusText?.toUpperCase()) {
          case "CHECK-IN OPEN":
            return "bg-green-500";
          case "ON SCHEDULED":
            return "bg-blue-500";
          case "DELAYED":
            return "bg-yellow-500";
          case "CANCELLED":
            return "bg-red-500";
          case "BOARDING":
            return "bg-purple-500";
          case "DEPARTED":
            return "bg-indigo-500";
          case "ARRIVED":
            return "bg-teal-500";
          default:
            return "bg-gray-500";
        }
    }
  };

  const badgeColor = getStatusColor(status, statusText);
  const shouldBlink = status === "LAS" || statusText === "LAST CALL";

  return (
    <Animated.View
      className={`px-3 py-1 rounded-full ${badgeColor}`}
      style={{
        opacity: shouldBlink ? opacityAnim : 1,
      }}
    >
      <Text className="text-white text-sm font-medium">{statusText}</Text>
    </Animated.View>
  );
};

export default function FlightInformation() {
  const { post } = createRequest();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("departures");
  const [searchQuery, setSearchQuery] = useState("");
  const slideAnim = useRef(new Animated.Value(0)).current;
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const autoRefreshInterval = useRef(null);
  const [flightData, setFlightData] = useState({
    text_tanggal: "",
    total_hari_ini: 0,
    hari_ini: [],
  });

  const loadPenerbangan = async (
    type = "arrivals",
    isRefreshing = false,
    isAutoRefresh = false
  ) => {
    try {
      if (!isRefreshing && !isAutoRefresh) {
        setLoading(true);
      }
      const { data } = await post(`/mobile/api/portal/penerbangan/${type}`);

      if (!data.error) {
        setFlightData(data);
        setError(null);
      }
    } catch (e) {
      if (!isAutoRefresh) {
        setError(
          "Unable to update flight information. Please check your connection."
        );
      }
    } finally {
      if (!isAutoRefresh) {
        setLoading(false);
        setRefreshing(false);
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadPenerbangan(activeTab);
      autoRefreshInterval.current = setInterval(() => {
        loadPenerbangan(activeTab, false, true);
      }, 10000);
      return () => {
        if (autoRefreshInterval.current) {
          clearInterval(autoRefreshInterval.current);
          autoRefreshInterval.current = null;
        }
      };
    }, [activeTab])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadPenerbangan(activeTab, true);
  }, [activeTab]);


  const handleTabChange = (tab) => {
    setActiveTab(tab);
    loadPenerbangan(tab);
    Animated.spring(slideAnim, {
      toValue: tab === "arrivals" ? 0 : 1,
      useNativeDriver: false,
    }).start();
  };



  const handleNotificationPress = (flight) => {
    Alert.alert(
      "Flight Notifications",
      `Would you like to receive notifications for ${flight.airline} ${flight.flight_no}?`,
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            Alert.alert(
              "Notification Set",
              `You will be notified about updates for ${flight.airline} ${flight.flight_no}`
            );
          },
        },
      ]
    );
  };




  const filteredFlights = useMemo(() => {
    if (!flightData.hari_ini) return [];
    return flightData.hari_ini.filter((flight, index) => {
      const searchTerms = searchQuery.toLowerCase();
      const matchesSearch = searchQuery
        ? flight.flight_no.toLowerCase().includes(searchTerms) ||
          flight.operator.toLowerCase().includes(searchTerms) ||
          flight.airline.toLowerCase().includes(searchTerms) ||
          `${flight.airline}${flight.flight_no}`
            .toLowerCase()
            .includes(searchTerms) ||
          `${flight.airline} ${flight.flight_no}`
            .toLowerCase()
            .includes(searchTerms) ||
          flight.dest_from?.toLowerCase().includes(searchTerms) ||
          (activeTab === "arrivals"
            ? "soq"
            : flight.dest_from?.toLowerCase()
          ).includes(searchTerms)
        : true;

      return matchesSearch;
    });
  }, [flightData.hari_ini, searchQuery, activeTab]);

  return (
    <SafeAreaView className="flex-1 bg-[#991B1B]" edges={["top"]}>
      <View className="px-4 pt-4 bg-[#991B1B]">
        <View className="flex-row items-center mb-4 justify-center">
          <View>
            {activeTab === "arrivals" ? (
              <MaterialIcons name="flight-land" size={38} color="white" />
            ) : (
              <MaterialIcons name="flight-takeoff" size={38} color="white" />
            )}
          </View>

          <View className="ml-4 flex-col items-center justify-center">
            <Text className="text-white text-2xl font-bold">
              {activeTab === "departures"
                ? "FLIGHT DEPARTURES"
                : "FLIGHT ARRIVALS"}
            </Text>
            <Text className="text-white/80">{flightData.text_tanggal}</Text>
          </View>
        </View>

        <View className=" flex-row">
          <View className=" mb-4 flex-row items-center w-[10%]">
            <TouchableOpacity
              onPress={() =>
                handleTabChange(
                  activeTab === "arrivals" ? "departures" : "arrivals"
                )
              }
              className={`w-10 h-10 rounded-full items-center justify-center `}
            >
              <Ionicons name="swap-horizontal" size={28} color="white" />
            </TouchableOpacity>
          </View>

          <View className="bg-white/20 rounded-xl p-2 mb-4 flex-row items-center w-[80%]">
            <Ionicons name="search" size={20} color="white" />
            <TextInput
              className="flex-1 ml-3 text-white"
              placeholder="Search flight number or airline..."
              placeholderTextColor="rgba(255, 255, 255, 0.6)"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery !== "" && (
              <TouchableOpacity
                onPress={() => setSearchQuery("")}
                className="p-2"
              >
                <Ionicons name="close-circle" size={20} color="white" />
              </TouchableOpacity>
            )}
          </View>

          <View className="ml-2 mb-4 flex-row items-center w-[10%]">
            <Ionicons name="calendar" size={28} color="white" />
          </View>
        </View>

        {/**<View className="bg-white/20 rounded-xl p-1 flex-row mt-2">
          <Animated.View
            className="absolute bg-white rounded-lg"
            style={{
              width: "50%",
              height: "100%",
              left: slideAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ["0%", "50%"],
              }),
            }}
          />
          <TouchableOpacity
            className="flex-1 py-3 px-4"
            onPress={() => handleTabChange("arrivals")}
          >
            <Text
              className={`text-center font-semibold ${
                activeTab === "arrivals" ? "text-[#991B1B]" : "text-white"
              }`}
            >
              Arrivals
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-1 py-3 px-4"
            onPress={() => handleTabChange("departures")}
          >
            <Text
              className={`text-center font-semibold ${
                activeTab === "departures" ? "text-[#991B1B]" : "text-white"
              }`}
            >
              Departures
            </Text>
          </TouchableOpacity>
        </View> */}
      </View>

      <ScrollView
        className="flex-1 bg-gray-100"
        contentContainerClassName="p-4"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#991B1B"]}
            tintColor="#991B1B"
          />
        }
      >
        {error && (
          <View className="bg-red-50 border border-red-100 rounded-xl p-4 mb-4 flex-row items-center">
            <View className="w-8 h-8 bg-red-100 rounded-full items-center justify-center mr-3">
              <Ionicons name="alert-circle" size={20} color="#991B1B" />
            </View>
            <View className="flex-1">
              <Text className="text-red-800 font-medium">Connection Error</Text>
              <Text className="text-red-600 text-sm">{error}</Text>
            </View>
            <TouchableOpacity
              className="ml-2 p-2"
              onPress={() => loadPenerbangan(activeTab)}
            >
              <Ionicons name="refresh" size={20} color="#991B1B" />
            </TouchableOpacity>
          </View>
        )}

        {loading ? (
          <View className="flex-1 justify-center items-center py-20">
            <ActivityIndicator size="large" color="#991B1B" />
            <Text className="text-gray-600 mt-4">Loading flights...</Text>
          </View>
        ) : filteredFlights.length > 0 ? (
          filteredFlights.map((flight, index) => (
            <View
              key={index}
              className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden"
            >
              <View className="p-4 border-b border-gray-100">
                <View className="flex-row justify-between items-center">
                  <View className="flex-col items-start flex-1">
                    <Image
                      source={{
                        uri: `${baseURL}/fids-assets/img/AL_S_small_${flight.airline}.jpg`,
                      }}
                      style={{ width: 160, height: 40, borderRadius: 8 }}
                      contentFit="contain"
                      transition={500}
                    />
                  </View>

                  <View className="flex-row items-end justify-end">
                    <View className="flex-col items-end justify-end">
                      <Text className="text-gray-600 font-bold text-lg">
                        {flight.airline} {flight.flight_no}
                      </Text>
                    </View>
                    {/**<TouchableOpacity
                      onPress={() => handleNotificationPress(flight)}
                      className="w-8 h-8 bg-gray-100 rounded-full items-center justify-center mr-3"
                    >
                      <Ionicons
                        name="notifications-outline"
                        size={18}
                        color="#991B1B"
                      />
                    </TouchableOpacity>
                    <StatusBadge
                      status={flight.status}
                      statusText={flight.status_text}
                    /> */}
                  </View>
                  <TouchableOpacity
                    onPress={() => handleNotificationPress(flight)}
                    className="ml-4 w-8 h-8 bg-gray-100 rounded-full items-center justify-center mr-3"
                  >
                    <Ionicons
                      name="notifications-outline"
                      size={18}
                      color="#991B1B"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View className="p-4">
                <View className="flex-row items-center justify-between mb-4">
                  <View className="flex-1">
                    <Text className="text-3xl font-bold">
                      {activeTab === "arrivals" ? flight.dest_from : "SOQ"}
                    </Text>
                    {/**<Text className="text-gray-500">
                      {activeTab === "arrivals" ? flight.nama_kota : "Sorong"}
                    </Text> */}
                    <Text className="text-lg font-semibold mt-1">
                      {flight.jadwal_local}
                    </Text>
                  </View>

                  <View className="items-center px-4">
                    <Text className="text-lg font-bold">
                      {flight.airline} {flight.flight_no}
                    </Text>
                    <View className=" flex-row items-center h-10">
                      <View className="w-20 h-[1px] bg-[#991B1B] mr-2" />
                      <Ionicons name="airplane" size={20} color="#991B1B" />
                      <View className="w-20 h-[1px] bg-[#991B1B] ml-2" />
                    </View>
                    <StatusBadge
                      status={flight.status}
                      statusText={flight.status_text}
                    />

                    {/**<View className="my-2 bg-gray-100 px-3 py-1 rounded-full">
                      <Text className="text-xs text-gray-600">
                        {flight.est_local !== flight.jadwal_local
                          ? "EST " + flight.est_local
                          : flight.jadwal_local}
                      </Text>
                    </View> */}
                  </View>

                  <View className="flex-1 items-end">
                    <Text className="text-3xl font-bold">
                      {activeTab === "arrivals" ? "SOQ" : flight.dest_from}
                    </Text>
                    {/**<Text className="text-gray-500">
                      {activeTab === "arrivals" ? "Sorong" : flight.nama_kota}
                    </Text> */}
                    <Text className="text-lg font-semibold mt-1">
                      {flight.actual_local}
                    </Text>
                  </View>
                </View>

                <View className="flex-row justify-between bg-gray-50 rounded-xl p-3">
                  <View className="items-center">
                    <Text className="text-gray-500 text-xs mb-1">Gate</Text>
                    <Text className="font-semibold">{flight.gate || "-"}</Text>
                  </View>
                  <View className="items-center">
                    <Text className="text-gray-500 text-xs mb-1">Counter</Text>
                    <Text className="font-semibold">
                      {flight.counter || "-"}
                    </Text>
                  </View>
                  <View className="items-center">
                    <Text className="text-gray-500 text-xs mb-1">Belt</Text>
                    <Text className="font-semibold">{flight.belt || "-"}</Text>
                  </View>
                </View>
              </View>
            </View>
          ))
        ) : (
          <View className="bg-white rounded-xl p-8 items-center">
            <Ionicons name="search" size={48} color="#9ca3af" />
            <Text className="text-xl font-semibold text-gray-900 mt-4">
              No Flights Found
            </Text>
            <Text className="text-gray-500 text-center mt-2">
              {searchQuery
                ? `No flights match "${searchQuery}"`
                : "No flights available for the selected filter"}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
