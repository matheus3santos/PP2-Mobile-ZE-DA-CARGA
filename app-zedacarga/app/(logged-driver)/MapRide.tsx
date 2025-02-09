import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const MapRide = () => {
  const { origem, destino } = useLocalSearchParams();
  const [originCoords, setOriginCoords] = useState(null);
  const [destinationCoords, setDestinationCoords] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [region, setRegion] = useState(null);



  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -23.55052,
          longitude: -46.633308,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >


      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  map: {
    flex: 1,
  },
  marker: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  carMarker: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
});

export default MapRide;