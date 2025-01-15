import { Button } from 'tamagui';
import { View, StyleSheet, Modal, Dimensions } from 'react-native';
import BottomBarUser from 'components/BottomBarUser';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { useEffect, useRef, useState } from 'react';
import * as Location from 'expo-location';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import 'react-native-get-random-values';
import Geolocation from 'react-native-geolocation-service';


const randomArray = new Uint32Array(5);
crypto.getRandomValues(randomArray);

const { height } = Dimensions.get('window');

export default function Home() {
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [destination, setDestination] = useState<{ latitude: number; longitude: number } | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
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
    } else {
      console.error('Detalhes ou localização não disponíveis:', details);
    }
  };



  return (
    <View style={styles.container}>
      {/* Mapa */}
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
      >
        {userLocation && (
          <Marker coordinate={userLocation} title="Minha Localização" />
        )}
        {destination && (
          <>
            <Marker coordinate={destination} title="Destino" />
            {userLocation && destination && (
              <Polyline
                coordinates={[userLocation, destination]}
                strokeColor="#007AFF"
                strokeWidth={4}
              />
            )}

          </>
        )}
      </MapView>

      {/* Botão para centralizar localização */}
      <View style={styles.content}>
        <Button theme="blue" onPress={handleCenterUserLocation} style={styles.button}>
          Centralizar Localização
        </Button>
        <Button theme="blue" onPress={() => setModalVisible(true)} style={styles.button}>
          Definir Destino
        </Button>
      </View>

      {/* BottomBar */}
      <BottomBarUser screen="HomeUser" />

      {/* Modal para selecionar destino */}
      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modal}>
          <GooglePlacesAutocomplete
            placeholder="Digite o destino"
            onPress={handleSelectDestination}
            query={{
              key: 'AIzaSyDwghEhGK_hqRcjs4YNRs7BBsHXTXJPfWw',
              language: 'pt-BR',
            }}
            fetchDetails={true} // Garante que os detalhes completos sejam retornados
            styles={{
              textInput: styles.input,
            }}
          />
          {/* Botão para fechar o modal */}
          <Button theme="red" onPress={() => setModalVisible(false)} style={styles.cancelButton}>
            Cancelar
          </Button>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  cancelButton: {
    marginTop: 16,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'center',
    backgroundColor: '#FF3B30', // Vermelho
  },

  content: {
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center',
  },
  button: {
    marginVertical: 8,
    width: 200,
  },
  modal: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    justifyContent: 'center',
  },
  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 8,
    borderRadius: 8,
    marginVertical: 10,
  },
});
