import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet, Text, Alert, Modal } from "react-native";
import BottomBar from "components/BottomBar";
import BottomActiveFrete from "components/BottomActiveFrete";
import * as SecureStore from "expo-secure-store";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import axiosInstance from 'app/config/axiosUrlConfig';
import { Button } from "tamagui";
import { useRouter } from 'expo-router';

interface ContaBancaria {
  id: string;
}

interface Motorista {
  id?: number;
  email: string;
  contas?: ContaBancaria[];
}

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
  const [contaForm, setContaForm] = useState<ContaBancaria>({
    id: '',
  });
  const router = useRouter();

  useEffect(() => {
    const getMotoristaId = async () => {
      try {
        const id = await SecureStore.getItemAsync("token");
        const email = await SecureStore.getItemAsync('email');

        if (id) {
          const idSemPrefixo = id.replace("secure_token_", "");
          setMotoristaId(idSemPrefixo);
        }

        const response = await axiosInstance.get('/api/motorista');
        const motoristaData = response.data.find((m: Motorista) => m.email === email);

        if (motoristaData) {
          motoristaData.contas = motoristaData.contas || [];
        }
      } catch (error) {
        console.error("Erro ao recuperar o ID do motorista:", error);
      }
    };

    getMotoristaId();
  }, []);

  useEffect(() => {
    if (!motoristaId) return;

    const socket = new SockJS("https://eac7-200-238-97-165.ngrok-free.app/ws");
    const client = new Client({
      webSocketFactory: () => socket,
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
    if (!rideRequest || !motoristaId || !contaForm) return;

    try {
      const response = await axiosInstance.post(
        `/api/viagens/${rideRequest.idViagem}/status`,
        {
          idMotorista: motoristaId,
          idContaBancariaMotorista: contaForm.id,
          statusViagem: "ACEITO",
        },
        {
          headers: {
            "Content-Type": "application/json",
          }
        }
      );

      Alert.alert("Sucesso", "Viagem aceita!");
      setRideRequest(null);

      // Redirecionar para a tela MapRide com as coordenadas de origem e destino
      router.push({
        pathname: '/MapRide',
        params: {
          origem: JSON.stringify(rideRequest.origem),
          destino: JSON.stringify(rideRequest.destino),
        },
      });
      
    } catch (error) {
      Alert.alert("Erro", "Falha ao aceitar a viagem.");
      console.error("Erro ao aceitar viagem:", error);
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
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Nova Solicitação de Viagem</Text>
              </View>

              <View style={styles.tripInfo}>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Origem:</Text>
                  <Text style={styles.infoValue}>{rideRequest.origem}</Text>
                </View>

                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Destino:</Text>
                  <Text style={styles.infoValue}>{rideRequest.destino}</Text>
                </View>

                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Valor:</Text>
                  <Text style={styles.infoValue}>R$ {rideRequest.valor.toFixed(2)}</Text>
                </View>
              </View>

              <View style={styles.buttonContainer}>
                <Button
                  onPress={handleRejectRide}
                  style={styles.rejectButton}
                >
                  Recusar
                </Button>

                <Button
                  onPress={handleAcceptRide}
                  style={styles.acceptButton}
                >
                  Aceitar
                </Button>

              </View>
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
  modalContent: {
    backgroundColor: "white",
    borderRadius: 15,
    width: '90%',
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 15,
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    textAlign: 'center',
  },
  tripInfo: {
    marginVertical: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
    paddingHorizontal: 10,
  },
  infoLabel: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
    marginLeft: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    gap: 10,
  },
  rejectButton: {
    flex: 1,
    backgroundColor: '#ff4444',
    borderRadius: 8,
    paddingVertical: 12,
  },
  acceptButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 12,
  },
});