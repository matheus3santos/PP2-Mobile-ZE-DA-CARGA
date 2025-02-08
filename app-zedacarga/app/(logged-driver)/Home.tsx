//Motorista
import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet, Text, Alert, Modal } from "react-native";
import BottomBar from "components/BottomBar";
import BottomActiveFrete from "components/BottomActiveFrete";
import * as SecureStore from "expo-secure-store";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import axiosInstance from "app/config/axiosUrlConfig";
import { Button } from "tamagui";
import { useRouter } from "expo-router";
import { useRideWebSocket } from '../../websocket/useRideWebSocket';
import { RideRequest } from '../../websocket/types';
import { styles } from '../../styles/HomeDriver.style';




interface ContaBancaria {
  id?: number;
}

interface Motorista {
  id?: number;
  email: string;
  contas?: ContaBancaria[];
}

// interface RideRequest {
//   viagemId: number;
//   origem: string;
//   destino: string;
//   valor: number;
//   mensagem: string;
//   clienteId: number;
// }

export default function Index() {
  const [motoristaId, setMotoristaId] = useState<string | null>(null);
  const { rideRequest, acceptRide, rejectRide } = useRideWebSocket({
    userId: motoristaId,
    userType: 'motorista'
  });

  const clientRef = useRef<Client | null>(null);
  const [contaForm, setContaForm] = useState<ContaBancaria>({
    id: 1,
  });

  const [rideForm, setRideForm] = useState<RideRequest | null>({
    viagemId: 0,
    origem: "",
    destino: "",
    valor: 0,
    mensagem: "",
    clienteId: 0,
  });




  const router = useRouter();

  useEffect(() => {
    const getMotoristaId = async () => {
      try {
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
        }
      } catch (error) {
        console.error("Erro ao recuperar o ID do motorista:", error);
      }
    };

    getMotoristaId();
  }, []);

  const handleAcceptRide = () => {
    console.log("🟢 Botão 'Aceitar' pressionado!");

    if (!rideRequest?.viagemId || !motoristaId || !contaForm.id) {
      console.warn("⚠️ Falha ao aceitar viagem: dados ausentes", {
        viagemId: rideRequest?.viagemId,
        motoristaId,
        contaBancariaId: contaForm.id,
      });
      return;
    }

    console.log("🚀 Chamando acceptRide com os dados:", {
      viagemId: rideRequest.viagemId,
      motoristaId,
      contaBancariaId: contaForm.id,
    });

    acceptRide(rideRequest.viagemId, motoristaId, contaForm.id);
  };


  const handleRejectRide = () => {
    if (!rideRequest?.clienteId || !motoristaId) return;
    rejectRide(rideRequest.clienteId, motoristaId);
  };

  return (
    <View style={styles.container}>
      <Modal visible={!!rideRequest} transparent={true} animationType="slide">
        {rideRequest && (
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>
                  Nova Solicitação de Viagem
                </Text>
              </View>

              <View style={styles.tripInfo}>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>ID:</Text>
                  <Text style={styles.infoValue}>{rideRequest.viagemId}</Text>
                </View>
                {/* <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Origem:</Text>
                  <Text style={styles.infoValue}>{rideRequest.origem}</Text>
                </View>

                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Destino:</Text>
                  <Text style={styles.infoValue}>{rideRequest.destino}</Text>
                </View> */}

                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Valor:</Text>
                  <Text style={styles.infoValue}>
                    R$ {rideRequest.valor.toFixed(2)}
                  </Text>
                </View>
              </View>

              <View style={styles.buttonContainer}>
                <Button onPress={handleRejectRide} style={styles.rejectButton}>
                  Recusar
                </Button>

                <Button onPress={handleAcceptRide} style={styles.acceptButton}>
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
