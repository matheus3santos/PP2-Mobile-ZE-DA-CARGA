//Motorista
import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet, Text, Alert, Modal } from "react-native";
import BottomBar from "components/BottomBar";
import BottomActiveFrete from "components/BottomActiveFrete";
import * as SecureStore from "expo-secure-store";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import axiosInstance from "app/config/axiosUrlConfig";
import { Button, H3 } from "tamagui";
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
  viagens?: ViagemSolicitadas[];
}
interface ViagemSolicitadas {
  id: number;
  origem: string;
  destino: string;
  valor: number;
  status: string;
}




export default function Index() {
  const [motoristaId, setMotoristaId] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false); // Novo estado para controlar a visibilidade do modal
  const { rideRequest, acceptRide, rejectRide } = useRideWebSocket({
    userId: motoristaId,
    userType: 'motorista'
  });

  const clientRef = useRef<Client | null>(null);
  const [contaForm, setContaForm] = useState<ContaBancaria>({
    id: 0,
  });

  const [viagens, setViagens] = useState<ViagemSolicitadas>({
    id: 0,
    origem: "",
    destino: "",
    valor: 0,
    status: "",
  }

  );

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
          // Se houver uma conta bancária associada, atualiza o estado

          if (motoristaData.contas.length > 0) {
            setContaForm({ id: motoristaData.contas[0].id || '' });
          }

          if (motoristaData.viagens.length > 0) {
            setViagens({
              id: motoristaData.viagens[0].id || 0,
              origem: motoristaData.viagens[0].origem || '',
              destino: motoristaData.viagens[0].destino || '',
              valor: motoristaData.viagens[0].valor || 0,
              status: motoristaData.viagens[0].status || ''
            });
          }




        }
      } catch (error) {
        console.error("Erro ao recuperar o ID do motorista:", error);
      }
    };
    getMotoristaId();
  }, []);

  const handleAcceptRide = () => {
    console.log("🟢 Botão 'Aceitar' pressionado!");

    if (!viagens.id || !motoristaId || !contaForm.id) {
      console.warn("⚠️ Falha ao aceitar viagem: dados ausentes", {
        viagemId: viagens.id,
        motoristaId,
        contaBancariaId: contaForm.id,
      });
      return;
    }

    console.log("🚀 Aceitando viagem com ID:", viagens.id);

    acceptRide(viagens.id, motoristaId, Number(contaForm.id));

  };



  const handleRejectRide = () => {
    if (!viagens.id || !motoristaId || !contaForm.id) return;
    rejectRide(viagens.id, motoristaId, contaForm.id);
    Alert.alert("Rejeição", "Viagem recusada.");

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
                  <Text style={styles.infoValue}>{viagens.id}</Text>
                </View>

                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Origem:</Text>
                  <H3 style={styles.infoValue}>{rideRequest.origem}</H3>
                </View>

                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Destino:</Text>
                  <H3 style={styles.infoValue}>{rideRequest.destino}</H3>
                </View>

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
        <H3>Conta Bancária: {contaForm.id}</H3>

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
