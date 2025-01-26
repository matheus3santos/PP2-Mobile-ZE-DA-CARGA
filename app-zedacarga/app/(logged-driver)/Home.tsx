import { H6 } from 'tamagui';
import { View, StyleSheet, Modal, Text, Dimensions, Alert } from 'react-native';
import BottomBar from 'app/components/BottomBar';
import NearbyFrete from 'app/components/NearbyFrete';
import BottomActiveFrete from 'app/components/BottomActiveFrete';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useRef, useState } from 'react';
import { Button, Select, Checkbox, XStack, YStack, Label } from 'tamagui';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_API_KEY } from '../../env';
import axiosInstance from 'app/config/axiosUrlConfig';



export default function Index() {

  const [motoristaId, setMotoristaId] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [origin, setOrigin] = useState<{ latitude: number; longitude: number } | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [destination, setDestination] = useState<{ latitude: number; longitude: number } | null>(null);
  const [price, setPrice] = useState<number | null>(null);

  const calculatePrice = (distance: number) => {
    const pricePerKm = 2.5; // Tarifa por km
    setPrice(distance * pricePerKm);
    console.log(`Calculating price for distance: ${distance} km`);
  };


  const mapRef = useRef<MapView>(null);

  


  useEffect(() => {
    const getMotoristaId = async () => {
      try {
        const id = await SecureStore.getItemAsync('token');
        if (id) {
          // Remove o prefixo "secure_token_" antes de salvar o ID
          const idSemPrefixo = id.replace('secure_token_', '');
          setMotoristaId(idSemPrefixo);
        }
      } catch (error) {
        console.error('Erro ao recuperar o ID do motorista:', error);
      }
    };

    getMotoristaId();
  }, []);

  return (
    <View style={styles.container}>
    <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: userLocation?.latitude || -23.55052,
          longitude: userLocation?.longitude || -46.633308,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        onPress={(e) => {
          // Permite ao usuário escolher a origem no mapa
          if (!origin) {
            setOrigin(e.nativeEvent.coordinate);
          }
        }}
      >
        {origin && <Marker coordinate={origin} title="Origem" />}
        {destination && <Marker coordinate={destination} title="Destino" />}
        {origin && destination && (
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_MAPS_API_KEY}
            strokeWidth={4}
            strokeColor="#007AFF"
            mode="DRIVING"
            onReady={(result) => {
              setDistance(result.distance); // Distância em km
              calculatePrice(result.distance);
              mapRef.current?.fitToCoordinates(result.coordinates, {
                edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
              });
            }}
            onError={(errorMessage) => console.error('Erro ao calcular a rota:', errorMessage)}
          />
        )}
      </MapView>

    <View style={styles.imageContainer}>
      <Text style={styles.title}>Bem-vindo, Motorista!</Text>
      {motoristaId ? <Text>ID do Motorista: {motoristaId}</Text> : <Text>Carregando...</Text>}
    </View>

    <View style={styles.buttonContainer}></View>
    <BottomActiveFrete />

    <BottomBar screen="Home" />
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingBottom: 60, // Adicionado para evitar sobreposição
  },
  map: { ...StyleSheet.absoluteFillObject },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
  },
});