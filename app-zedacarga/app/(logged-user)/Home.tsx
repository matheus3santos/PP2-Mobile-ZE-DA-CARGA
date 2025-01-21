import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'tamagui';
import { View, StyleSheet, Modal, Text, Dimensions } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location';
import BottomBarUser from 'components/BottomBarUser';
import { GOOGLE_MAPS_API_KEY } from '../../env';
import 'react-native-get-random-values';

const { height } = Dimensions.get('window');

export default function Home() {
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [destination, setDestination] = useState<{ latitude: number; longitude: number } | null>(null);
  const [origin, setOrigin] = useState<{ latitude: number; longitude: number } | null>(null);
  const [distance, setDistance] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isPaymentModalVisible, setPaymentModalVisible] = useState(false);
  const [tempOriginInput, setTempOriginInput] = useState('');

  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
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
    })();
  }, []);

  const handleCenterUserLocation = () => {
    if (userLocation) {
      mapRef.current?.animateToRegion({
        ...userLocation,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  };

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

  const handleRequestRide = () => {
    if (origin && destination && paymentMethod) {
      // Enviar os dados para o back-end ou processar a lógica localmente
      console.log('Solicitação de viagem:', {
        origem: origin,
        destino: destination,
        distância: distance,
        preço: price,
        métodoPagamento: paymentMethod,
      });
      alert('Viagem solicitada com sucesso!');
    } else {
      alert('Preencha todos os campos antes de solicitar a viagem.');
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
        <Button theme="blue" onPress={handleCenterUserLocation} style={styles.button}>
          Centralizar Localização
        </Button>
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
          <Button
            theme="blue"
            onPress={() => setPaymentMethod('Cartão de Crédito')}
            style={[styles.button, paymentMethod === 'Cartão de Crédito' && styles.selectedButton]}
          >
            Pagamento: Cartão de Crédito
          </Button>
          <Button theme="green" onPress={handleRequestRide} style={styles.button}>
            Solicitar Viagem
          </Button>

          <Button
            theme="red"
            onPress={handleCancelRide} // Chama a função de cancelar viagem
            style={styles.button}
          >      Cancelar Viagem
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
