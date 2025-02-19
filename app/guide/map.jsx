import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions, Modal, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import MapboxGL from '@rnmapbox/maps';
import { LinearGradient } from 'expo-linear-gradient';

// Initialize Mapbox
MapboxGL.setAccessToken('pk.eyJ1IjoiemxvY2s4OCIsImEiOiJjbTY5anY0eHEwY2t4MnFwaHExcmdiYmNlIn0.CWLKFVSVLUBVF1g8w3dahg');
MapboxGL.setTelemetryEnabled(false);

const { width } = Dimensions.get('window');

// Airport facilities data with 3D buildings
const facilities = {
  terminals: [
    {
      id: 'T1',
      name: 'Terminal 1',
      coordinates: [131.28666552, -0.889829774],
      type: 'terminal',
      height: 30,
      color: '#4A90E2',
      footprint: [
        [131.28646552, -0.889629774],
        [131.28686552, -0.889629774],
        [131.28686552, -0.890029774],
        [131.28646552, -0.890029774],
        [131.28646552, -0.889629774], // Close the polygon
      ]
    },
    {
      id: 'T2',
      name: 'Terminal 2',
      coordinates: [131.28766552, -0.890829774],
      type: 'terminal',
      height: 35,
      color: '#50E3C2',
      footprint: [
        [131.28746552, -0.890629774],
        [131.28786552, -0.890629774],
        [131.28786552, -0.891029774],
        [131.28746552, -0.891029774],
        [131.28746552, -0.890629774], // Close the polygon
      ]
    }
  ],
  services: [
    {
      id: 'CK1',
      name: 'Check-in Counter',
      coordinates: [131.28666552, -0.889929774],
      type: 'service',
      icon: 'desktop-outline',
      height: 15,
      color: '#F5A623',
      footprint: [
        [131.28656552, -0.889829774],
        [131.28676552, -0.889829774],
        [131.28676552, -0.890029774],
        [131.28656552, -0.890029774],
        [131.28656552, -0.889829774], // Close the polygon
      ]
    },
    {
      id: 'SEC1',
      name: 'Security Check',
      coordinates: [131.28686552, -0.889929774],
      type: 'service',
      icon: 'shield-checkmark-outline',
      height: 12,
      color: '#D0021B',
      footprint: [
        [131.28676552, -0.889829774],
        [131.28696552, -0.889829774],
        [131.28696552, -0.890029774],
        [131.28676552, -0.890029774],
        [131.28676552, -0.889829774]
      ]
    },
    {
      id: 'IMM1',
      name: 'Immigration',
      coordinates: [131.28706552, -0.889929774],
      type: 'service',
      icon: 'card-outline',
      height: 18,
      color: '#9013FE',
      footprint: [
        [131.28696552, -0.889829774],
        [131.28716552, -0.889829774],
        [131.28716552, -0.890029774],
        [131.28696552, -0.890029774],
        [131.28696552, -0.889829774]
      ]
    }
  ],
  amenities: [
    {
      id: 'FC1',
      name: 'Food Court',
      coordinates: [131.28666552, -0.890029774],
      type: 'amenity',
      icon: 'restaurant-outline',
      height: 20,
      color: '#7ED321',
      footprint: [
        [131.28656552, -0.889929774],
        [131.28676552, -0.889929774],
        [131.28676552, -0.890129774],
        [131.28656552, -0.890129774],
        [131.28656552, -0.889929774]
      ]
    },
    {
      id: 'PR1',
      name: 'Prayer Room',
      coordinates: [131.28686552, -0.890029774],
      type: 'amenity',
      icon: 'moon-outline',
      height: 16,
      color: '#4A90E2',
      footprint: [
        [131.28676552, -0.889929774],
        [131.28696552, -0.889929774],
        [131.28696552, -0.890129774],
        [131.28676552, -0.890129774],
        [131.28676552, -0.889929774]
      ]
    },
    {
      id: 'RS1',
      name: 'Restroom',
      coordinates: [131.28706552, -0.890029774],
      type: 'amenity',
      icon: 'water-outline',
      height: 14,
      color: '#50E3C2',
      footprint: [
        [131.28696552, -0.889929774],
        [131.28716552, -0.889929774],
        [131.28716552, -0.890129774],
        [131.28696552, -0.890129774],
        [131.28696552, -0.889929774]
      ]
    }
  ]
};

const floors = [
  { id: 1, name: 'Ground Floor' },
  { id: 2, name: 'First Floor' }
];

const categories = [
  { id: 'all', name: 'All', icon: 'apps-outline' },
  { id: 'terminal', name: 'Terminals', icon: 'business-outline' },
  { id: 'service', name: 'Services', icon: 'briefcase-outline' },
  { id: 'amenity', name: 'Amenities', icon: 'restaurant-outline' }
];

export default function AirportMapScreen() {
  const router = useRouter();
  const [selectedFloor, setSelectedFloor] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [showLegend, setShowLegend] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentZoom, setCurrentZoom] = useState(16);
  const [highlightedBuilding, setHighlightedBuilding] = useState(null);
  const mapRef = useRef(null);
  const cameraRef = useRef(null);

  // Create a GeoJSON feature collection for buildings
  const buildingsCollection = {
    type: 'FeatureCollection',
    features: Object.values(facilities).flat().map(facility => ({
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [facility.footprint]
      },
      properties: {
        height: facility.height,
        color: facility.color,
        name: facility.name,
        type: facility.type,
        base_height: 0
      }
    }))
  };

  // Filter facilities based on selected category
  const filteredBuildings = buildingsCollection.features.filter(feature => 
    selectedCategory === 'all' || feature.properties.type === selectedCategory
  );

  const handleBuildingPress = (feature) => {
    const facility = Object.values(facilities)
      .flat()
      .find(f => f.name === feature.properties.name);
      
    if (facility) {
      setSelectedFacility(facility);
      setHighlightedBuilding(facility); // Set the highlighted building
      
      // Animate camera to facility location
      cameraRef.current?.setCamera({
        centerCoordinate: facility.coordinates,
        zoomLevel: 18,
        animationDuration: 1000,
        pitch: 45
      });
    }
  };

  const resetView = () => {
    cameraRef.current?.setCamera({
      centerCoordinate: [131.28666552, -0.889829774],
      zoomLevel: 16,
      animationDuration: 1000,
      pitch: 60,
      heading: 90
    });
    setSelectedFacility(null);
    setHighlightedBuilding(null); // Clear highlighted building
  };

  const handleZoomIn = () => {
    const newZoom = Math.min(currentZoom + 1, 20);
    setCurrentZoom(newZoom);
    cameraRef.current?.setCamera({
      zoomLevel: newZoom,
      animationDuration: 300
    });
  };

  const handleZoomOut = () => {
    const newZoom = Math.max(currentZoom - 1, 10);
    setCurrentZoom(newZoom);
    cameraRef.current?.setCamera({
      zoomLevel: newZoom,
      animationDuration: 300
    });
  };

  // Create highlight feature collection
  const highlightCollection = highlightedBuilding ? {
    type: 'FeatureCollection',
    features: [{
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [highlightedBuilding.footprint]
      },
      properties: {
        height: highlightedBuilding.height,
        base_height: 0
      }
    }]
  } : { type: 'FeatureCollection', features: [] };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      {/* Header */}
      <View className="bg-white border-b border-gray-200">
        <View className="p-4 flex-row items-center justify-between">
          <View className="flex-row items-center">
            <TouchableOpacity
              onPress={() => router.back()}
              className="w-10 h-10 items-center justify-center rounded-full bg-gray-100"
            >
              <Ionicons name="arrow-back" size={24} color="#374151" />
            </TouchableOpacity>
            <Text className="ml-4 text-xl font-bold">DEO AIRPORT - MAPS</Text>
          </View>
          
          <View className="flex-row items-center space-x-2">
            <TouchableOpacity
              onPress={() => setShowLegend(true)}
              className="w-10 h-10 items-center justify-center rounded-full bg-gray-100"
            >
              <Ionicons name="information-circle" size={24} color="#374151" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={resetView}
              className="w-10 h-10 items-center justify-center rounded-full bg-gray-100"
            >
              <Ionicons name="locate" size={24} color="#374151" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Floor Selector */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          className="px-4 pb-4"
        >
          {floors.map((floor) => (
            <TouchableOpacity
              key={floor.id}
              onPress={() => setSelectedFloor(floor.id)}
              className={`mr-2 px-4 py-2 rounded-full ${
                selectedFloor === floor.id ? 'bg-[#991B1B]' : 'bg-gray-100'
              }`}
            >
              <Text className={`${
                selectedFloor === floor.id ? 'text-white' : 'text-gray-600'
              } font-medium`}>
                {floor.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Map View */}
      <View className="flex-1">
        <MapboxGL.MapView
          ref={mapRef}
          style={{ flex: 1 }}
          styleURL={MapboxGL.StyleURL.Street}
          onDidFinishLoadingMap={() => setLoading(false)}
          pitchEnabled={true}
          rotateEnabled={true}
        >
          <MapboxGL.Camera
            ref={cameraRef}
            zoomLevel={16}
            centerCoordinate={[131.28666552, -0.889829774]}
            pitch={60}
            heading={90}
            animationMode="flyTo"
            animationDuration={1000}
          />

          {/* Buildings Layer */}
          <MapboxGL.ShapeSource
            id="buildings"
            shape={{
              type: 'FeatureCollection',
              features: filteredBuildings
            }}
            onPress={(e) => handleBuildingPress(e.features[0])}
          >
            {/* Ground level footprints */}
            <MapboxGL.FillLayer
              id="building-footprints"
              style={{
                fillColor: ['get', 'color'],
                fillOpacity: 0.2
              }}
            />

            {/* 3D Extrusions */}
            <MapboxGL.FillExtrusionLayer
              id="building-extrusions"
              style={{
                fillExtrusionColor: ['get', 'color'],
                fillExtrusionHeight: ['get', 'height'],
                fillExtrusionBase: ['get', 'base_height'],
                fillExtrusionOpacity: 0.8
              }}
            />
          </MapboxGL.ShapeSource>

          {/* Highlight Layer */}
          <MapboxGL.ShapeSource
            id="highlight"
            shape={highlightCollection}
          >
            {/* Highlight outline */}
            <MapboxGL.LineLayer
              id="highlight-outline"
              style={{
                lineColor: '#FFFFFF',
                lineWidth: 3,
                lineGapWidth: 1
              }}
            />
            
            {/* Highlight glow effect */}
            <MapboxGL.LineLayer
              id="highlight-glow"
              style={{
                lineColor: '#991B1B',
                lineWidth: 4,
                lineBlur: 3,
                lineOpacity: 0.8
              }}
            />

            {/* Highlight extrusion */}
            <MapboxGL.FillExtrusionLayer
              id="highlight-extrusion"
              style={{
                fillExtrusionColor: '#991B1B',
                fillExtrusionHeight: ['get', 'height'],
                fillExtrusionBase: ['get', 'base_height'],
                fillExtrusionOpacity: 0.3
              }}
            />
          </MapboxGL.ShapeSource>
        </MapboxGL.MapView>

        {loading && (
          <View className="absolute inset-0 bg-white/80 items-center justify-center">
            <ActivityIndicator size="large" color="#991B1B" />
            <Text className="mt-4 text-gray-600 font-medium">Loading map...</Text>
          </View>
        )}

        {/* Zoom Controls */}
        <View className="absolute top-4 right-4 bg-white rounded-lg shadow-lg overflow-hidden">
          <TouchableOpacity
            onPress={handleZoomIn}
            className="p-3 border-b border-gray-200"
          >
            <Ionicons name="add" size={24} color="#374151" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleZoomOut}
            className="p-3"
          >
            <Ionicons name="remove" size={24} color="#374151" />
          </TouchableOpacity>
        </View>

        {/* Category Filter */}
        <View className="absolute top-4 left-4 right-20">
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            className="py-2"
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                onPress={() => setSelectedCategory(category.id)}
                className={`mr-2 px-4 py-2 rounded-full flex-row items-center ${
                  selectedCategory === category.id 
                    ? 'bg-[#991B1B]' 
                    : 'bg-white border border-gray-200'
                }`}
              >
                <Ionicons 
                  name={category.icon} 
                  size={16} 
                  color={selectedCategory === category.id ? '#FFFFFF' : '#4B5563'} 
                />
                <Text className={`ml-2 font-medium ${
                  selectedCategory === category.id ? 'text-white' : 'text-gray-600'
                }`}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Selected Facility Info */}
        {selectedFacility && (
          <View className="absolute bottom-8 left-4 right-4">
            <View className="bg-white rounded-xl shadow-lg overflow-hidden">
              <LinearGradient
                colors={['#991B1B', '#500724']}
                className="px-4 py-3"
              >
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center">
                    <View className="w-10 h-10 bg-white/20 rounded-full items-center justify-center">
                      <Ionicons 
                        name="business" 
                        size={20} 
                        color="#FFFFFF" 
                      />
                    </View>
                    <View className="ml-3">
                      <Text className="text-white font-bold text-lg">
                        {selectedFacility.name}
                      </Text>
                      <Text className="text-white/80">
                        {selectedFacility.type.charAt(0).toUpperCase() + selectedFacility.type.slice(1)}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => setSelectedFacility(null)}
                    className="w-8 h-8 bg-white/20 rounded-full items-center justify-center"
                  >
                    <Ionicons name="close" size={20} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              </LinearGradient>
              
              <View className="p-4">
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center">
                    <Ionicons name="time-outline" size={20} color="#4B5563" />
                    <Text className="ml-2 text-gray-600">Open 24/7</Text>
                  </View>
                  <View className="flex-row items-center">
                    <Ionicons name="walk-outline" size={20} color="#4B5563" />
                    <Text className="ml-2 text-gray-600">2 min walk</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}
      </View>

      {/* Legend Modal */}
      <Modal
        visible={showLegend}
        transparent={true}
        animationType="slide"
      >
        <View className="flex-1 bg-black/50">
          <View className="mt-20 bg-white rounded-t-3xl flex-1">
            <View className="p-4 border-b border-gray-200">
              <View className="flex-row justify-between items-center">
                <Text className="text-xl font-bold">Map Legend</Text>
                <TouchableOpacity
                  onPress={() => setShowLegend(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center"
                >
                  <Ionicons name="close" size={20} color="#374151" />
                </TouchableOpacity>
              </View>
            </View>

            <ScrollView className="p-4">
              {categories.slice(1).map((category) => (
                <View key={category.id} className="mb-6">
                  <Text className="text-lg font-bold mb-3">{category.name}</Text>
                  {Object.values(facilities)
                    .flat()
                    .filter(f => f.type === category.id)
                    .map((facility) => (
                      <View 
                        key={facility.id}
                        className="flex-row items-center py-2"
                      >
                        <View 
                          style={{ backgroundColor: facility.color + '20' }}
                          className="w-10 h-10 rounded-full items-center justify-center"
                        >
                          <View className="w-6 h-6 rounded" style={{ backgroundColor: facility.color }} />
                        </View>
                        <Text className="ml-3 text-gray-700">{facility.name}</Text>
                      </View>
                    ))
                  }
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}