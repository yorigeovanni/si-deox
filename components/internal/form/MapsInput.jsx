import React, { useCallback } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import { Controller } from 'react-hook-form';

MapboxGL.setAccessToken("pk.eyJ1IjoiemxvY2s4OCIsImEiOiJjbTY5anY0eHEwY2t4MnFwaHExcmdiYmNlIn0.CWLKFVSVLUBVF1g8w3dahg");

export default function MapsInput({
  control,
  name,
  label,
  rules,
  defaultCoord = [131.28666552, -0.889829774], // Koordinat awal
  zoom = 12,
  style,
}) {
  if (!control) {
    return (
      <Text style={{ color: 'red' }}>
        Error: "control" is required for MapsInput
      </Text>
    );
  }

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { onChange, value },
        fieldState: { error }
      }) => {
        // Koordinat yang sedang dipakai. Jika user belum pilih, pakai defaultCoord
        const coordinate = value || defaultCoord;

        const handleMapPress = useCallback((e) => {
          const { coordinates } = e.geometry;
          onChange(coordinates);
        }, [onChange]);

        return (
          <View style={[styles.container, style]}>
            {label ? <Text style={styles.label}>{label}</Text> : null}

            <MapboxGL.MapView
              style={styles.map}
              onPress={handleMapPress}
            >
              <MapboxGL.Camera
                zoomLevel={zoom}
                centerCoordinate={coordinate}
              />

              {/* Tampilkan pin/marker jika sudah ada koordinat */}
              {value && (
                <MapboxGL.PointAnnotation
                  id="selectedPoint"
                  coordinate={value}
                >
                  <View style={styles.pin} />
                </MapboxGL.PointAnnotation>
              )}
            </MapboxGL.MapView>

            {/* Error Message */}
            {error && (
              <Text style={styles.errorText}>
                {error.message}
              </Text>
            )}
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 6,
  },
  map: {
    width: '100%',
    height: 300, // sesuaikan tinggi peta
  },
  pin: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'red',
    borderColor: '#fff',
    borderWidth: 2,
  },
  errorText: {
    color: 'red',
    marginTop: 4,
  },
});
