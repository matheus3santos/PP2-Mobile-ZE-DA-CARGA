import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_API_KEY } from '../../env';
import { useRideWebSocket } from '../../websocket/useRideWebSocket';
import axiosInstance from "app/config/axiosUrlConfig";
import * as SecureStore from "expo-secure-store";
import { Button } from "tamagui";
import { useRouter } from "expo-router";
import * as Location from 'expo-location';

interface Motorista {
  id?: number;
  email: string;
  viagens?: ViagemSolicitadas[];
  contas?: ContaBancaria[];
}

interface ViagemSolicitadas {
  id: number;
  origem: string;
  destino: string;
  valor: number;
  status: string;
}

interface ContaBancaria {
  id?: number;
}

const MapRide = () => {
  const [motoristaId, setMotoristaId] = useState<string | null>(null);
  const mapRef = useRef<MapView>(null);

  const [driverLocation, setDriverLocation] = useState<{ latitude: number; longitude: number }>({
    latitude: -8.0476,
    longitude: -34.8770,
  });
  const [drivers, setDrivers] = useState<Motorista[]>([]);
  const { rideRequest, concludeRide } = useRideWebSocket({
    userId: motoristaId,
    userType: 'motorista'
  });

  const [viagens, setViagens] = useState<ViagemSolicitadas>({
    id: 0,
    origem: "",
    destino: "",
    valor: 0,
    status: "",
  });
  const [contaForm, setContaForm] = useState<ContaBancaria>({
    id: 0,
  });

  const [origin, setOrigin] = useState<{ latitude: number; longitude: number }>({
    latitude: -8.0476,
    longitude: -34.8770,
  });
  const [destination, setDestination] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    const getMotoristaId = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === "granted") {
          const location = await Location.getCurrentPositionAsync();
          setDriverLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
          setOrigin({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
        }

        const id = await SecureStore.getItemAsync("token");
        const email = await SecureStore.getItemAsync("email");

        if (id) {
          const idSemPrefixo = id.replace("secure_token_", "");
          setMotoristaId(idSemPrefixo);
        }

        const response = await axiosInstance.get("/api/motorista");
        const motoristaData = response.data.find(
          (m: Motorista) => m.email === email
        );

        if (motoristaData) {
          motoristaData.contas = motoristaData.contas || [];
          if (motoristaData.contas.length > 0) {
            setContaForm({ id: motoristaData.contas[0].id || '' });
          }
        }

        if (motoristaData.viagens.length > 0) {
          setViagens({
            id: motoristaData.viagens[0].id || 115,
            origem: motoristaData.viagens[0].origem || '',
            destino: motoristaData.viagens[0].destino || '',
            valor: motoristaData.viagens[0].valor || 0,
            status: motoristaData.viagens[0].status || ''
          });
        }

        const origemCoords = motoristaData.viagens[0].origem.split(',');
        const destinoCoords = motoristaData.viagens[0].destino.split(',');

        if (origemCoords.length === 2 && destinoCoords.length === 2) {
          setOrigin({
            latitude: parseFloat(origemCoords[0]),
            longitude: parseFloat(origemCoords[1]),
          });
          setDestination({
            latitude: parseFloat(destinoCoords[0]),
            longitude: parseFloat(destinoCoords[1]),
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    getMotoristaId();
  }, []);

  const concluirCorrida = () => {
    if (!viagens.id || !motoristaId || !contaForm.id) return;
    concludeRide(viagens.id, motoristaId, contaForm.id);
    Alert.alert("Rejeição", "Viagem recusada.");
  };

  useEffect(() => {
    const watchPosition = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permissão de localização negada');
        return;
      }

      const subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 10,
        },
        (position) => {
          const { latitude, longitude } = position.coords;
          setDriverLocation({ latitude, longitude });
        }
      );

      return () => {
        subscription.remove();
      };
    };

    watchPosition();
  }, []);

  const handleCenterUserLocation = () => {
    mapRef.current?.animateToRegion({
      latitude: driverLocation?.latitude || -8.0476,
      longitude: driverLocation?.longitude || -34.8770,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={StyleSheet.absoluteFillObject}
        initialRegion={{
          latitude: driverLocation.latitude,
          longitude: driverLocation.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {driverLocation && (
          <Marker coordinate={driverLocation} title="Motorista" pinColor="blue" />
        )}

        {origin && <Marker coordinate={origin} title="Origem" pinColor="green" />}

        {destination && <Marker coordinate={destination} title="Destino" pinColor="red" />}

        {driverLocation && origin && (
          <MapViewDirections
            origin={driverLocation}
            destination={origin}
            apikey={GOOGLE_MAPS_API_KEY}
            strokeWidth={4}
            strokeColor="blue"
          />
        )}

        {origin && destination && (
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_MAPS_API_KEY}
            strokeWidth={4}
            strokeColor="green"
          />
        )}
      </MapView>

      <View style={styles.content}>
        <Button theme="blue" onPress={handleCenterUserLocation} style={styles.button}>
          Centralizar Localização
        </Button>
        <Button theme="blue" onPress={concluirCorrida} style={styles.button}>
          Concluir Corrida
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: { marginVertical: 8, width: 200 },
  content: { position: 'absolute', bottom: 150, alignSelf: 'center' },
});

export default MapRide;
