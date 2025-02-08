//Cliente
import React, { useEffect, useRef, useState } from 'react';
import { Button, Select, Checkbox, XStack, YStack, Label } from 'tamagui';
import { View, StyleSheet, Modal, Text, Dimensions, Alert } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location';
import BottomBarUser from 'components/BottomBarUser';
import { GOOGLE_MAPS_API_KEY } from '../../env';
import 'react-native-get-random-values';
import * as SecureStore from 'expo-secure-store';
import axiosInstance from 'app/config/axiosUrlConfig';
import { Client } from "@stomp/stompjs";
import { useRoute } from '@react-navigation/native';
import { router } from 'expo-router'
import { useRideWebSocket } from '../../websocket/useRideWebSocket';



interface Card {
  id: number;
  tipoCartao: string;
  numeroCartao: string;
}

interface Motorista {
  id: number;
  nome: string;
  email: string;
}

const { height } = Dimensions.get('window');

export default function Home() {
  const [clienteId, setClienteId] = useState<string | null>(null);
  const { rideRequest } = useRideWebSocket({
    userId: clienteId,
    userType: 'cliente'
  });
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [destination, setDestination] = useState<{ latitude: number; longitude: number } | null>(null);
  const [origin, setOrigin] = useState<{ latitude: number; longitude: number } | null>(null);
  const [distance, setDistance] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isPaymentModalVisible, setPaymentModalVisible] = useState(false);
  const [tempOriginInput, setTempOriginInput] = useState('');
  const [cards, setCards] = useState<Card[]>([]);
  const [drivers, setDrivers] = useState<Motorista[]>([]);
  const [driverMethod, setDriverMethod] = useState<string | null>(null);
  const clientRef = useRef<Client | null>(null); // Ref for STOMP client
  const mapRef = useRef<MapView>(null);




  useEffect(() => {
    const fetchData = async () => {
      // Location permissions
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync();
        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        setOrigin({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      }

      // Fetch client ID and cards
      const email = await SecureStore.getItemAsync("email");
      if (!email) return;

      try {
        const response = await axiosInstance.get("/api/cliente");
        const clienteData = response.data.find(
          (cliente: any) => cliente.email === email
        );
        setClienteId(clienteData?.id || null);

        if (clienteData?.id) {
          const cardsResponse = await axiosInstance.get(
            `/api/cliente/cartoes/${clienteData.id}`
          );
          setCards(
            Array.isArray(cardsResponse.data)
              ? cardsResponse.data
              : [cardsResponse.data]
          );

          // Fetch drivers
          const driversResponse = await axiosInstance.get("/api/motorista");
          setDrivers(driversResponse.data);
        }
      } catch (e) {
        console.error("Erro ao buscar dados:", e);
      }
    };

    fetchData();
  }, []);

  const handleSelectDestination = (data, details) => {
    if (details?.geometry?.location) {
      setDestination({
        latitude: details.geometry.location.lat,
        longitude: details.geometry.location.lng,
      });
      setModalVisible(false);
      setPaymentModalVisible(true);
    }
  };

  const calculatePrice = (distance: number) => {
    const pricePerKm = 2.5; // Tarifa por km
    setPrice(distance * pricePerKm);
  };

  const handleRequestRide = async () => {
    if (
      !origin ||
      !destination ||
      !paymentMethod ||
      !driverMethod ||
      !clienteId
    ) {
      Alert.alert(
        "Erro",
        "Preencha todos os campos antes de solicitar a viagem."
      );
      return;
    }

    const origem = `${origin.latitude},${origin.longitude}`;
    const destino = `${destination.latitude},${destination.longitude}`;

    try {
      const url = `/api/viagem/cliente/${clienteId}/cartao/${paymentMethod}/motorista/${driverMethod}?clienteId=${clienteId}&cartaoClienteId=${paymentMethod}&motoristaId=${driverMethod}`;

      const response = await axiosInstance.post(url, {
        origem,
        destino,
        valor: 30,
      });

      Alert.alert("Sucesso", "Viagem solicitada com sucesso!");
      console.log("Resposta da API:", response.data);

      // Reset states
      setPaymentModalVisible(false);
    } catch (error) {
      console.error(
        "Erro ao solicitar viagem:",
        error.response?.data || error.message
      );
      Alert.alert("Erro", "Não foi possível solicitar a viagem.");
    }
  };

  const handleCancelRide = () => {
    // Reseta os estados relacionados à viagem
    setOrigin(null);
    setDestination(null);
    setDistance(0);
    setPrice(0);
    setPaymentMethod(null);
    setPaymentModalVisible(false); // Fecha o modal
  };

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

      <View style={styles.content}>
        {/* <Button theme="blue" onPress={handleCenterUserLocation} style={styles.button}>
          Centralizar Localização
        </Button> */}
        <Button theme="blue" onPress={() => setModalVisible(true)} style={styles.button}>
          Definir Destino
        </Button>
      </View>

      <BottomBarUser screen="HomeUser" />

      {/* Modal de preço e pagamento */}
      <Modal visible={isPaymentModalVisible} transparent={true} animationType="slide">
        <View style={styles.paymentModal}>
          <Text>Origem: {origin ? `Lat: ${origin.latitude}, Lng: ${origin.longitude}` : 'Não definido'}</Text>
          <Text>Destino: {destination ? `Lat: ${destination.latitude}, Lng: ${destination.longitude}` : 'Não definido'}</Text>
          <Text>Distância: {distance.toFixed(2)} km</Text>
          <Text>Preço: R$ {price.toFixed(2)}</Text>

          <YStack space="$4" mt="$4">
            <Text>Selecione um Cartão:</Text>
            {cards.map((card) => (
              <XStack key={card.id} alignItems="center" space="$4">
                <Checkbox
                  id={`card-${card.id}`}
                  checked={paymentMethod === card.id.toString()}
                  onCheckedChange={() => setPaymentMethod(card.id.toString())}
                  backgroundColor={paymentMethod === card.id.toString() ? '$green6' : '$gray6'} // Add this line

                >
                  <Checkbox.Indicator backgroundColor={paymentMethod === card.id.toString() ? '$green10' : '$gray10'} // Optional: also change indicator color
                  />
                </Checkbox>
                <Label htmlFor={`card-${card.id}`}>
                  {card.tipoCartao} - Final {card.numeroCartao.slice(-4)}
                </Label>
              </XStack>
            ))}

            <Text>Selecione um Motorista:</Text>
            {drivers.map((driver) => (
              <XStack key={driver.id} alignItems="center" space="$4">
                <Checkbox
                  id={`driver-${driver.id}`}
                  checked={driverMethod === driver.id.toString()}
                  onCheckedChange={() => setDriverMethod(driver.id.toString())}
                  backgroundColor={driverMethod === driver.id.toString() ? '$green6' : '$gray6'} // Add this line
                >
                  <Checkbox.Indicator
                    backgroundColor={driverMethod === driver.id.toString() ? '$green10' : '$gray10'} // Optional: also change indicator color
                  />
                </Checkbox>
                <Label htmlFor={`driver-${driver.id}`}>
                  {driver.nome}
                </Label>
              </XStack>
            ))}
          </YStack>

          <Button theme="green" onPress={handleRequestRide} style={styles.button} mt="$4">
            Solicitar Viagem
          </Button>

          <Button
            theme="red"
            onPress={() => setPaymentModalVisible(false)}
            style={styles.button}
            mt="$4"
          >
            Cancelar Viagem
          </Button>
        </View>
      </Modal>

      {/* Modal para selecionar o destino */}
      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modal}>
          {/* Input para a localização atual do usuário */}
          <GooglePlacesAutocomplete
            placeholder="Digite sua localização"
            onPress={(data, details) => {
              if (details?.geometry?.location) {
                const newOrigin = {
                  latitude: details.geometry.location.lat,
                  longitude: details.geometry.location.lng,
                };
                setOrigin(newOrigin);
                setTempOriginInput(`${newOrigin.latitude.toFixed(6)}, ${newOrigin.longitude.toFixed(6)}`);
              }
            }}
            query={{
              key: GOOGLE_MAPS_API_KEY,
              language: 'pt-BR',
            }}
            fetchDetails={true}
            styles={{ textInput: styles.input }}
            textInputProps={{
              value: tempOriginInput,
              onChangeText: (text) => {
                setTempOriginInput(text);
              },
              onBlur: () => {
                const [lat, lng] = tempOriginInput.split(',').map((coord) => parseFloat(coord.trim()));
                if (!isNaN(lat) && !isNaN(lng)) {
                  setOrigin({ latitude: lat, longitude: lng });
                }
              },
            }}
          />


          {/* Input para o destino */}
          <GooglePlacesAutocomplete
            placeholder="Digite o destino"
            onPress={handleSelectDestination}
            query={{ key: GOOGLE_MAPS_API_KEY, language: 'pt-BR' }}
            fetchDetails={true}
            styles={{ textInput: styles.input }}
          />

          {/* Botão para cancelar a seleção do destino */}
          <Button
            theme="red"
            onPress={() => setModalVisible(false)}
            style={styles.cancelButton}
          >
            Cancelar
          </Button>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { ...StyleSheet.absoluteFillObject },
  content: { position: 'absolute', bottom: 150, alignSelf: 'center' },
  button: { marginVertical: 8, width: 200 },
  selectedButton: { backgroundColor: '#007AFF' },
  modal: { flex: 1, backgroundColor: 'white', padding: 16, justifyContent: 'center' },
  paymentModal: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  input: { borderColor: '#ddd', borderWidth: 1, padding: 8, borderRadius: 8, marginVertical: 10 },
  cancelButton: { marginTop: 16, paddingVertical: 12, paddingHorizontal: 24, alignSelf: 'center', backgroundColor: '#FF3B30' },
});
