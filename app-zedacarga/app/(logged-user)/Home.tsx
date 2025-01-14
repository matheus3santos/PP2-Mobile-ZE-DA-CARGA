import { Button, Input } from 'tamagui';
import { View, StyleSheet, Modal, Text, TouchableOpacity, Dimensions } from 'react-native';
import BottomBarUser from 'app/components/BottomBarUser';
import MapView, { Marker, PROVIDER_GOOGLE  } from 'react-native-maps';
import { useState } from 'react';

const { height } = Dimensions.get('window');

export default function Home() {
  const [isLocationModalVisible, setLocationModalVisible] = useState(false);
  const [isRideModalVisible, setRideModalVisible] = useState(false);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');

  const handleConfirmLocation = () => {
    setLocationModalVisible(false);
    setRideModalVisible(true); // Abre o modal de modalidade da corrida
  };

  return (
    <View style={styles.container}>
      {/* Mapa ao fundo */}

      <MapView
        provider={PROVIDER_GOOGLE} // Use o Google Maps

        style={styles.map}
        initialRegion={{
          latitude: -23.55052,
          longitude: -46.633308,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker
          coordinate={{
            latitude: -23.55052,
            longitude: -46.633308,
          }}
          title="Meu Local"
        />
      </MapView>


      {/* Botão para definir destino */}
      <View style={styles.content}>
        <Button
          theme="blue"
          style={styles.button}
          onPress={() => setLocationModalVisible(true)}
        >
          Definir destino
        </Button>
      </View>

      {/* BottomBar para navegação */}
      <BottomBarUser screen="HomeUser" />

      {/* Modal para escolher local de origem e destino */}
      <Modal visible={isLocationModalVisible} transparent={true} animationType="slide">
        <View style={styles.halfModal}>
          <Text style={styles.modalTitle}>Escolha sua rota</Text>
          <Input
            placeholder="Local de origem"
            style={styles.input}
            value={origin}
            onChangeText={setOrigin}
          />
          <Input
            placeholder="Local de destino"
            style={styles.input}
            value={destination}
            onChangeText={setDestination}
          />
          <Button theme="green" onPress={handleConfirmLocation} style={styles.button}>
            Confirmar
          </Button>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setLocationModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Modal para escolher a modalidade da corrida */}
      <Modal visible={isRideModalVisible} transparent={true} animationType="slide">
        <View style={styles.halfModal}>
          <Text style={styles.modalTitle}>Escolha a modalidade</Text>
          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>Econômica</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>Conforto</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>Premium</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setRideModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
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
  content: {
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center',
  },
  button: {
    width: '90%',
    marginVertical: 8,
  },
  halfModal: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: height * 0.5, // Metade da tela
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    width: '90%',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    borderRadius: 8,
  },
  option: {
    width: '90%',
    padding: 16,
    backgroundColor: '#f5f5f5',
    marginVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  optionText: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 16,
    padding: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'red',
  },
});
