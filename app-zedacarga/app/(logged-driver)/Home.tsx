import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet, Text, Alert, Modal, Button } from "react-native";
import BottomBar from "components/BottomBar";
import BottomActiveFrete from "components/BottomActiveFrete";
import * as SecureStore from "expo-secure-store";
import { Client } from "@stomp/stompjs";

interface RideRequest {
  idViagem: number;
  origem: string;
  destino: string;
  valor: number;
  clienteId: number;
}

export default function Index() {
  const [motoristaId, setMotoristaId] = useState<string | null>(null);
  const [rideRequest, setRideRequest] = useState<RideRequest | null>(null);
  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    const getMotoristaId = async () => {
      try {
        const id = await SecureStore.getItemAsync("token");
        if (id) {
          const idSemPrefixo = id.replace("secure_token_", "");
          setMotoristaId(idSemPrefixo);
        }
      } catch (error) {
        console.error("Erro ao recuperar o ID do motorista:", error);
      }
    };

    getMotoristaId();
  }, []);

  useEffect(() => {
    if (!motoristaId) return;

    const client = new Client({
      brokerURL: "wss://176b-200-238-97-165.ngrok-free.app/ws",
      onConnect: () => {
        console.log("Conectado ao WebSocket");
        client.subscribe(`/topic/motorista/${motoristaId}`, (message) => {
          const data: RideRequest = JSON.parse(message.body);
          setRideRequest(data);
        });
      },
      onDisconnect: () => console.log("Desconectado do WebSocket"),
      onStompError: (error) => console.error("Erro no STOMP:", error),
    });

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
    };
  }, [motoristaId]);

  const handleAcceptRide = async () => {
    if (!rideRequest || !motoristaId) return;

    try {
      const response = await fetch(
        `https://176b-200-238-97-165.ngrok-free.app/api/viagens/${rideRequest.idViagem}/aceitar`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idMotorista: motoristaId,
            idContaBancariaMotorista: 1, // Ajuste para pegar a conta correta
            statusViagem: "ACEITO",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao aceitar a viagem");
      }

      Alert.alert("Sucesso", "Viagem aceita!");
      setRideRequest(null);
    } catch (error) {
      Alert.alert("Erro", "Falha ao aceitar a viagem.");
      console.error(error);
    }
  };

  const handleRejectRide = () => {
    if (clientRef.current && rideRequest) {
      clientRef.current.publish({
        destination: `/app/recusar-viagem/${rideRequest.clienteId}`,
        body: JSON.stringify({ motoristaId, status: "Recusado" }),
      });

      Alert.alert("Rejeição", "Viagem recusada.");
      setRideRequest(null);
    }
  };

  return (
    <View style={styles.container}>
      <Modal visible={!!rideRequest} transparent={true} animationType="slide">
        {rideRequest && (
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Nova Solicitação de Viagem</Text>
            <Text>Origem: {rideRequest.origem}</Text>
            <Text>Destino: {rideRequest.destino}</Text>
            <Text>Valor: R$ {rideRequest.valor.toFixed(2)}</Text>
            <View style={styles.buttonContainer}>
              <Button title="Aceitar" onPress={handleAcceptRide} />
              <Button title="Recusar" onPress={handleRejectRide} />
            </View>
          </View>
        )}
      </Modal>

      <View style={styles.imageContainer}>
        <Text style={styles.title}>Bem-vindo, Motorista!</Text>
        {motoristaId ? (
          <Text>ID do Motorista: {motoristaId}</Text>
        ) : (
          <Text>Carregando...</Text>
        )}
      </View>

      <BottomActiveFrete />
      <BottomBar screen="Home" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    paddingBottom: 60,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
});
