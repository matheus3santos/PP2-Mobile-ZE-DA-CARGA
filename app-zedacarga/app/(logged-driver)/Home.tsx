import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import BottomBar from 'components/BottomBar';
import BottomActiveFrete from 'components/BottomActiveFrete';
import * as SecureStore from 'expo-secure-store';
import { Modal, Button } from 'react-native';
import { Client } from '@stomp/stompjs';


interface RideRequest {
  clienteId: number;
  origem: { lat: number; lng: number };
  destino: { lat: number; lng: number };
  valor: number;
}


export default function Index() {
  const [motoristaId, setMotoristaId] = useState<string | null>(null);
  const [rideRequest, setRideRequest] = useState<RideRequest | null>(null);
  const clientRef = useRef<Client | null>(null);



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

  useEffect(() => {
    const client = new Client({
      brokerURL: 'https://176b-200-238-97-165.ngrok-free.app/ws',
      onConnect: () => {
        console.log('Conectado ao WebSocket');
        client.subscribe(`/topic/solicitar-viagem/${motoristaId}`, (message) => {
          const data = JSON.parse(message.body);
          setRideRequest(data);
        });
      },
      onDisconnect: () => console.log('Desconectado do WebSocket'),
      onStompError: (error) => console.error('Erro no STOMP:', error),
    });

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
    };
  }, [motoristaId]);


  //validação para evitar conexões desnecessárias 
  // enquanto o motoristaId ainda é null
  useEffect(() => {
    if (!motoristaId) return;

    const client = new Client({
      brokerURL: 'https://176b-200-238-97-165.ngrok-free.app/ws',
      onConnect: () => {
        console.log('Conectado ao WebSocket');
        client.subscribe(`/topic/solicitar-viagem/${motoristaId}`, (message) => {
          const data: RideRequest = JSON.parse(message.body);
          setRideRequest(data);
        });
      },
      onDisconnect: () => console.log('Desconectado do WebSocket'),
      onStompError: (error) => console.error('Erro no STOMP:', error),
    });

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
    };
  }, [motoristaId]);


  const handleAcceptRide = () => {
    if (clientRef.current && rideRequest) {
      clientRef.current.publish({
        destination: `/app/aceitar-viagem/${rideRequest.clienteId}`,
        body: JSON.stringify({ motoristaId, status: 'Aceito' }),
      });

      Alert.alert('Sucesso', 'Viagem aceita!');
      setRideRequest(null);
    }
  };

  const handleRejectRide = () => {
    if (clientRef.current && rideRequest) {
      clientRef.current.publish({
        destination: `/app/recusar-viagem/${rideRequest.clienteId}`,
        body: JSON.stringify({ motoristaId, status: 'Recusado' }),
      });

      Alert.alert('Rejeição', 'Viagem recusada.');
      setRideRequest(null);
    }
  };


  return (
    <View style={styles.container}>

    //Pop-up de solicitação de viagem

      <Modal visible={!!rideRequest} transparent={true} animationType="slide">
        {rideRequest && (
          <View style={styles.modalContainer}>
            <Text>Solicitação de viagem recebida!</Text>
            <Text>Origem: {rideRequest.origem.lat}, {rideRequest.origem.lng}</Text>
            <Text>Destino: {rideRequest.destino.lat}, {rideRequest.destino.lng}</Text>
            <Text>Valor: R$ {rideRequest.valor.toFixed(2)}</Text>
            <View style={styles.buttonContainer2}>
              <Button title="Aceitar" onPress={handleAcceptRide} />
              <Button title="Recusar" onPress={handleRejectRide} />
            </View>
          </View>
        )}
      </Modal>


      <View style={styles.imageContainer}>
        <Text style={styles.title}>Bem-vindo, Motorista!</Text>
        {motoristaId ? <Text>ID do Motorista: {motoristaId}</Text> : <Text>Carregando...</Text>}
      </View>

      <View style={styles.buttonContainer2}></View>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 16,
  },
  buttonContainer2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
});
