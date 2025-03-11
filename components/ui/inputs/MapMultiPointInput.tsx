import { View, Text, TouchableOpacity, Modal, Dimensions, ScrollView } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import MapboxGL from '@rnmapbox/maps';
import { BaseInput } from './BaseInput';
import { MapMultiPointInputProps, Coordinate } from './types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

MapboxGL.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN);

export const MapMultiPointInput: React.FC<MapMultiPointInputProps> = ({
  control,
  name,
  label,
  error,
  icon,
  defaultCenter = { latitude: -0.894386, longitude: 131.287512 }, // Default to Sorong
  defaultZoom = 12,
  placeholder = "Select locations",
  maxPoints = 10,
  basecolor = "#2196F3"
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [points, setPoints] = useState<Coordinate[]>([]);
  const [tempPoints, setTempPoints] = useState<Coordinate[]>([]);
  const mapRef = useRef<MapboxGL.MapView>(null);

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
            setPoints(value);
          }
        }, [value]);

        const handleConfirm = () => {
          setPoints(tempPoints);
          onChange(tempPoints);
          setModalVisible(false);
        };

        const handleMapPress = (event: any) => {
          if (tempPoints.length >= maxPoints) return;
          
          const { coordinates } = event.geometry;
          setTempPoints(prev => [...prev, {
            latitude: coordinates[1],
            longitude: coordinates[0]
          }]);
        };

        const removePoint = (index: number) => {
          setTempPoints(prev => prev.filter((_, i) => i !== index));
        };

        return (
          <>
            <TouchableOpacity
              onPress={() => {
                setTempPoints(points);
                setModalVisible(true);
              }}
              className={`flex-row items-center border border-gray-300 rounded-lg bg-white ${
                error ? 'border-red-500' : ''
              }`}
            >
              {icon && (
                <View className="p-3 border-r border-gray-300">
                  <Ionicons name={icon} size={20} color="#6b7280" />
                </View>
              )}
              <Text
                className={`flex-1 p-3 ${
                  points.length > 0 ? 'text-gray-700' : 'text-gray-400'
                }`}
              >
                {points.length > 0 
                  ? `${points.length} location${points.length > 1 ? 's' : ''} selected`
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
              <View className="flex-1">
                <View className="flex-row justify-between items-center p-4 bg-white border-b border-gray-200">
                  <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    className="p-2"
                  >
                    <Text className="text-gray-600">Cancel</Text>
                  </TouchableOpacity>
                  <Text className="text-lg font-semibold">Select Locations</Text>
                  <TouchableOpacity
                    onPress={handleConfirm}
                    className="p-2"
                  >
                    <Text style={{ color: basecolor }}>Confirm</Text>
                  </TouchableOpacity>
                </View>

                <View className="flex-1">
                  <MapboxGL.MapView
                    ref={mapRef}
                    style={{ flex: 1 }}
                    onPress={handleMapPress}
                  >
                    <MapboxGL.Camera
                      defaultSettings={{
                        centerCoordinate: [defaultCenter.longitude, defaultCenter.latitude],
                        zoomLevel: defaultZoom
                      }}
                    />
                    
                    {tempPoints.map((point, index) => (
                      <MapboxGL.PointAnnotation
                        key={`point-${index}`}
                        id={`point-${index}`}
                        coordinate={[point.longitude, point.latitude]}
                      >
                        <View
                          style={{
                            width: 24,
                            height: 24,
                            backgroundColor: basecolor,
                            borderRadius: 12,
                            borderWidth: 2,
                            borderColor: 'white',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <Text className="text-white text-xs font-bold">
                            {index + 1}
                          </Text>
                        </View>
                      </MapboxGL.PointAnnotation>
                    ))}
                  </MapboxGL.MapView>
                </View>

                <View className="bg-white p-4 border-t border-gray-200">
                  <Text className="text-sm font-medium text-gray-600 mb-2">
                    Selected Points ({tempPoints.length}/{maxPoints})
                  </Text>
                  <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false}
                    className="flex-row"
                  >
                    {tempPoints.map((point, index) => (
                      <View
                        key={index}
                        className="bg-gray-100 rounded-lg p-2 mr-2 flex-row items-center"
                      >
                        <Text className="text-gray-600 mr-2">
                          Point {index + 1}
                        </Text>
                        <TouchableOpacity
                          onPress={() => removePoint(index)}
                          className="p-1"
                        >
                          <Ionicons name="close-circle" size={16} color="#ef4444" />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </ScrollView>
                </View>
              </View>
            </Modal>
          </>
        );
      }}
    />
  );
};