import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Dimensions,
  SafeAreaView,
  TextInput,
} from "react-native";
import { useState, useRef, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import MapboxGL from "@rnmapbox/maps";
import { BaseInput } from "./BaseInput";
import { MapSinglePointInputProps, Coordinate } from "./types";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

MapboxGL.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN);

export const MapSinglePointInput: React.FC<MapSinglePointInputProps> = ({
  control,
  name,
  label,
  error,
  icon,
  defaultCenter = { latitude: -0.894386, longitude: 131.287512 }, // Default to Sorong
  defaultZoom = 12,
  placeholder = "Select location",
  basecolor = "#2196F3",
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState<Coordinate | null>(null);
  const [tempPoint, setTempPoint] = useState<Coordinate | null>(null);
  const [currentZoom, setCurrentZoom] = useState(defaultZoom);
  const [isManualEntry, setIsManualEntry] = useState(false);
  const [manualLat, setManualLat] = useState("");
  const [manualLng, setManualLng] = useState("");
  const mapRef = useRef<MapboxGL.MapView>(null);
  const cameraRef = useRef<MapboxGL.Camera>(null);

  const handleZoomIn = () => {
    if (cameraRef.current) {
      setCurrentZoom((prev) => Math.min(prev + 1, 20));
      cameraRef.current.setCamera({
        zoomLevel: currentZoom + 1,
        animationDuration: 300,
      });
    }
  };

  const handleZoomOut = () => {
    if (cameraRef.current) {
      setCurrentZoom((prev) => Math.max(prev - 1, 1));
      cameraRef.current.setCamera({
        zoomLevel: currentZoom - 1,
        animationDuration: 300,
      });
    }
  };

  return (
    <BaseInput
      control={control}
      name={name}
      label={label}
      error={error}
      icon={icon}
      renderInput={({ onChange, value, error, icon }) => {
        // Update local state when form value changes
        useEffect(() => {
          if (value) {
            setSelectedPoint(value);
            setManualLat(value.latitude.toString());
            setManualLng(value.longitude.toString());
          }
        }, [value]);

        const handleConfirm = () => {
          let finalPoint: Coordinate | null = null;

          if (isManualEntry) {
            const lat = parseFloat(manualLat);
            const lng = parseFloat(manualLng);
            if (!isNaN(lat) && !isNaN(lng)) {
              finalPoint = { latitude: lat, longitude: lng };
            }
          } else {
            finalPoint = tempPoint;
          }

          if (finalPoint) {
            setSelectedPoint(finalPoint);
            onChange(finalPoint);
          }
          setModalVisible(false);
        };

        const handleMapPress = (event: any) => {
          const { coordinates } = event.geometry;
          const newPoint = {
            latitude: coordinates[1],
            longitude: coordinates[0],
          };
          setTempPoint(newPoint);
          setManualLat(newPoint.latitude.toString());
          setManualLng(newPoint.longitude.toString());
        };

        const toggleEntryMode = () => {
          setIsManualEntry(!isManualEntry);
          if (!isManualEntry && tempPoint) {
            setManualLat(tempPoint.latitude.toString());
            setManualLng(tempPoint.longitude.toString());
          }
        };

        const handleManualCoordinateChange = () => {
          const lat = parseFloat(manualLat);
          const lng = parseFloat(manualLng);
          if (!isNaN(lat) && !isNaN(lng)) {
            setTempPoint({ latitude: lat, longitude: lng });
            if (cameraRef.current) {
              cameraRef.current.setCamera({
                centerCoordinate: [lng, lat],
                animationDuration: 500,
              });
            }
          }
        };

        return (
          <>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
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
                  selectedPoint ? "text-gray-700" : "text-gray-400"
                }`}
              >
                {selectedPoint
                  ? `${selectedPoint.latitude.toFixed(
                      6
                    )}, ${selectedPoint.longitude.toFixed(6)}`
                  : placeholder}
              </Text>
              <View className="p-3">
                <Ionicons name="map" size={20} color="#6b7280" />
              </View>
            </TouchableOpacity>

            <Modal
              visible={modalVisible}
              animationType="slide"
              onRequestClose={() => setModalVisible(false)}
            >
              <SafeAreaView className="flex-1 bg-white">
                {/* Header */}
                <View className="px-4 py-3 flex-row justify-between items-center border-b border-gray-200">
                  <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    className="py-2 px-4 rounded-lg bg-gray-100"
                  >
                    <Text className="text-gray-600 font-medium">Cancel</Text>
                  </TouchableOpacity>

                  <Text className="text-lg font-semibold">Select Location</Text>

                  <TouchableOpacity
                    onPress={handleConfirm}
                    className="py-2 px-4 rounded-lg"
                    style={{ backgroundColor: basecolor }}
                  >
                    <Text className="text-white font-medium">Confirm</Text>
                  </TouchableOpacity>
                </View>

                {/* Map Container */}
                <View className="flex-1 relative">
                  {/* Map Title */}
                  {!isManualEntry && (
                    <View className="absolute top-4 left-4 z-10 bg-white/90 px-4 py-2 rounded-lg shadow-sm">
                      <Text className="font-semibold text-gray-800">
                        LOCATION TO SET
                      </Text>
                    </View>
                  )}

                  {/* Toggle Button */}
                  <TouchableOpacity
                    onPress={toggleEntryMode}
                    className="absolute top-6 right-6 z-10 bg-white rounded-lg shadow-sm px-3 py-2 flex-row items-center"
                  >
                    <Ionicons
                      name={isManualEntry ? "map" : "create"}
                      size={18}
                      color="#374151"
                    />
                    <Text className="ml-2 text-gray-700 font-medium">
                      {isManualEntry ? "Use Map" : "Manual"}
                    </Text>
                  </TouchableOpacity>

                  {/* Zoom Controls */}
                  {!isManualEntry && (
                    <View className="absolute top-20 right-4 z-10">
                      <View className="bg-white rounded-lg shadow-sm">
                        <TouchableOpacity
                          onPress={handleZoomIn}
                          className="p-2 border-b border-gray-200"
                        >
                          <Ionicons name="add" size={24} color="#374151" />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={handleZoomOut}
                          className="p-2"
                        >
                          <Ionicons name="remove" size={24} color="#374151" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}

                  {isManualEntry ? (
                    <View className="flex-1 p-4">
                      <View className="bg-white rounded-lg shadow-sm p-4">
                        <Text className="text-lg font-semibold mb-4">
                          Enter Coordinates
                        </Text>

                        <View className="mb-4">
                          <Text className="text-gray-600 mb-2">Latitude</Text>
                          <TextInput
                            value={manualLat}
                            onChangeText={setManualLat}
                            onBlur={handleManualCoordinateChange}
                            keyboardType="numeric"
                            className="border border-gray-300 rounded-lg p-3"
                            placeholder="Enter latitude"
                          />
                        </View>

                        <View className="mb-4">
                          <Text className="text-gray-600 mb-2">Longitude</Text>
                          <TextInput
                            value={manualLng}
                            onChangeText={setManualLng}
                            onBlur={handleManualCoordinateChange}
                            keyboardType="numeric"
                            className="border border-gray-300 rounded-lg p-3"
                            placeholder="Enter longitude"
                          />
                        </View>
                      </View>
                    </View>
                  ) : (
                    <MapboxGL.MapView
                      ref={mapRef}
                      style={{ flex: 1 }}
                      onPress={handleMapPress}
                    >
                      <MapboxGL.Camera
                        ref={cameraRef}
                        defaultSettings={{
                          centerCoordinate: [
                            defaultCenter.longitude,
                            defaultCenter.latitude,
                          ],
                          zoomLevel: defaultZoom,
                        }}
                      />

                      {tempPoint && (
                        <MapboxGL.PointAnnotation
                          id="selectedPoint"
                          coordinate={[tempPoint.longitude, tempPoint.latitude]}
                        >
                          <View
                            style={{
                              width: 20,
                              height: 20,
                              backgroundColor: basecolor,
                              borderRadius: 10,
                              borderWidth: 2,
                              borderColor: "white",
                            }}
                          />
                        </MapboxGL.PointAnnotation>
                      )}
                    </MapboxGL.MapView>
                  )}
                </View>

                {/* Footer Info */}
                {tempPoint && (
                  <View className="bg-white p-4 border-t border-gray-200">
                    <Text className="text-center text-gray-600">
                      Selected coordinates: {tempPoint.latitude.toFixed(6)},{" "}
                      {tempPoint.longitude.toFixed(6)}
                    </Text>
                  </View>
                )}
              </SafeAreaView>
            </Modal>
          </>
        );
      }}
    />
  );
};
