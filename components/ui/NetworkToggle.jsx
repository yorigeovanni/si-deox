import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { useState, useCallback, useRef, useEffect } from "react";
import {
  setNetworkOnline,
  setNetworkOffline,
  setNetworkModeAuto,
  setNetworkModeManual,
} from "@/store/slices/deviceSlice";

export const NetworkToggle = () => {
  const { networkMode, networkStatus } = useSelector((state) => state.device);
  const dispatch = useDispatch();

  const setNetworkStatus = useCallback(() => {
    if (networkStatus === "online") {
      dispatch(setNetworkOffline());
    } else {
      dispatch(setNetworkOnline());
    }
  }, [dispatch, networkStatus]);

  return (
    <View
      className={`p-2 flex-row items-center justify-between ${
        networkStatus === "offline" ? "bg-red-100" : "bg-green-100"
      }`}
    >
      <View>
        {networkStatus === "offline" ? (
          <Text
            className={`${
              networkStatus === "offline" ? "text-red-700" : "text-green-700"
            } `}
          >
            OFFLINE MODE
          </Text>
        ) : (
          <Text
            className={`${
              networkStatus === "offline" ? "text-red-700" : "text-green-700"
            } `}
          >
            ONLINE MODE
          </Text>
        )}
      </View>

      {networkMode === "manual" && (
        <TouchableOpacity
          style={[
            styles.container,
            networkStatus === "offline"
              ? styles.offlineContainer
              : styles.onlineContainer,
          ]}
          onPress={setNetworkStatus}
        >
          <Ionicons
            name={networkStatus === "offline" ? "cloud-offline" : "cloud-done"}
            size={16}
            color={networkStatus === "offline" ? "#ef4444" : "#22c55e"}
          />
          <Text
            style={[
              styles.text,
              networkStatus === "offline"
                ? styles.offlineText
                : styles.onlineText,
            ]}
          >
            {networkStatus === "offline" ? "OFFLINE" : "ONLINE"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  offlineContainer: {
    backgroundColor: "#fee2e2",
  },
  onlineContainer: {
    backgroundColor: "#dcfce7",
  },
  text: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: "500",
  },
  offlineText: {
    color: "#ef4444",
  },
  onlineText: {
    color: "#22c55e",
  },
});
