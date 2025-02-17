import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet, Text, Alert, Modal } from "react-native";
import BottomBar from "components/BottomBar";
import BottomActiveFrete from "components/BottomActiveFrete";
import * as SecureStore from "expo-secure-store";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import axiosInstance from "app/config/axiosUrlConfig";
import { H3, Button } from "tamagui";
import { useRouter } from "expo-router";
import { useRideWebSocket } from '../../websocket/useRideWebSocket';
import { RideRequest } from '../../websocket/types';
import { styles } from '../../styles/HomeDriver.style';
import Toast from 'react-native-toast-message';


interface ContaBancaria {
  id?: number;
}

interface Motorista {
  id?: number;
  email: string;
  contas?: ContaBancaria[];
  viagens?: ViagemSolicitadas[];
  nome?: string;
}

interface ViagemSolicitadas {
  id: number;
  origem: string;
  destino: string;
  valor: number;
  statusViagem: string;
}

export default function Index() {

  const [motoristaId, setMotoristaId] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false); // Novo estado para controlar a visibilidade do modal
  const [isPendingModalVisible, setIsPendingModalVisible] = useState<boolean>(false); // Modal para viagem PENDENTE
  const [showRideModal, setShowRideModal] = useState(false);
  const [contaForm, setContaForm] = useState<ContaBancaria>({
    id: 0,
  });
  const [viagens, setViagens] = useState<ViagemSolicitadas>({
    id: 0,
    origem: "",
    destino: "",
    valor: 0,
    statusViagem: "",
  });

  const [motoristaForm, setMotoristaForm] = useState<Motorista>({
    id: 0,
    email: "",
    nome: "",
    contas: [],
    viagens: [],
  });


  const [hasPendingRide, setHasPendingRide] = useState<boolean>(false); // Estado para verificar se há viagens pendentes
  const { rideRequest, acceptRide, rejectRide, closeRide } = useRideWebSocket({
    userId: motoristaId,
    userType: 'motorista',
  });


  const clientRef = useRef<Client | null>(null);
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
          motoristaData.viagens = motoristaData.viagens || [];
          // Se houver uma conta bancária associada, atualiza o estado

          if (motoristaData.contas.length > 0) {
            setContaForm({ id: motoristaData.contas[0].id || '' });
          }

          setMotoristaForm({
            id: motoristaData.id || 0,
            email: motoristaData.email,
            nome: motoristaData.nome || '',
            contas: motoristaData.contas,
            viagens: motoristaData.viagens,
          });

          const viagemPendente = motoristaData.viagens.find(
            (viagem: ViagemSolicitadas) => viagem.statusViagem === "PENDENTE"
          );
          // Verifica se há uma viagem "PENDENTE" associada ao motorista
          if (viagemPendente) {
            setHasPendingRide(true); // Define que existe uma viagem pendente
            setViagens({
              id: viagemPendente.id,
              origem: viagemPendente.origem,
              destino: viagemPendente.destino,
              valor: viagemPendente.valor,
              statusViagem: viagemPendente.statusViagem,
            });
          } else {
            setHasPendingRide(false); // Se não houver, define que não há viagens pendentes
          }
        }
      } catch (error) {
        console.error("Erro ao recuperar o ID do motorista:", error);
      }
    };
    getMotoristaId();
  }, []);

  useEffect(() => {
    if (rideRequest) {
      // Exibe o toast assim que a requisição de viagem chega
      Toast.show({
        type: 'success', // Define o tipo do toast, você pode customizar conforme necessário
        text1: 'Nova solicitação de viagem recebida!',
        text2: `Origem: ${rideRequest.origem} | Destino: ${rideRequest.destino}`, // Personaliza a mensagem
        visibilityTime: 10000, // Define o tempo de visibilidade do Toast
        onPress: () => setShowRideModal(true), // Aciona o modal para mostrar mais detalhes da viagem quando o Toast for pressionado
      });
    }
  }, [rideRequest]); // O efeito será disparado toda vez que `rideRequest` for alterado


  const checkPendingRide = () => {
    if (hasPendingRide) {
      setIsPendingModalVisible(true); // Abre o modal de viagem PENDENTE
    } else {
      Alert.alert("Sem Viagens Pendentes", "Não há viagens pendentes no momento.");
    }
  };

  const handleAcceptRide = () => {
    console.log("🟢 Botão 'Aceitar' pressionado!");
    if (!rideRequest || !motoristaId || !contaForm.id) {
      console.warn("⚠️ Falha ao aceitar viagem: dados ausentes", {
        viagemId: rideRequest?.viagemId,
        motoristaId,
        contaBancariaId: contaForm.id,
      });
      return;
    }
    console.log("🚀 Aceitando viagem com ID:", rideRequest?.viagemId);
    acceptRide(rideRequest?.viagemId, motoristaId, Number(contaForm.id));
  };

  const handleRejectRide = () => {
    if (!rideRequest?.viagemId || !motoristaId || !contaForm.id) return;
    rejectRide(rideRequest?.viagemId, motoristaId, contaForm.id);
    Alert.alert("Rejeição", "Viagem recusada.");
  };

  const handleAcceptPendingRide = () => {
    if (!viagens.id || !motoristaId || !contaForm.id) return;

    console.log("🟢 Aceitar viagem pendente!");

    acceptRide(viagens.id, motoristaId, contaForm.id);
    setIsPendingModalVisible(false); // Fecha o modal de viagem pendente
  };

  const handleRejectPendingRide = () => {
    console.log("🔴 Rejeitar viagem pendente!");
    if (!viagens.id || !motoristaId || !contaForm.id) return;

    rejectRide(viagens.id, motoristaId, contaForm.id);
    setIsPendingModalVisible(false); // Fecha o modal de viagem pendente
  };

  const handleCloseModal = () => {
    closeRide(); // ou qualquer outra lógica para fechar o modal
  };



  return (
    <View style={styles.container}>
      <Toast />
      {/* Modal para nova solicitação de viagem */}
      {/* <Modal visible={!!rideRequest} transparent={true} animationType="slide">
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
                  <Text style={styles.infoValue}>{rideRequest?.viagemId || "N/A"}</Text>
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

                <Button
                  onPress={handleCloseModal}
                  style={styles.closeButton}
                >
                  <Text style={styles.closeButtonText}>Fechar</Text>
                </Button>
              </View>
            </View>
          </View>
        )}
      </Modal> */}

      {/* Modal para viagem PENDENTE */}
      <Modal visible={!!hasPendingRide} transparent={true} animationType="slide">
        {hasPendingRide && (
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Viagem Pendente</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>ID:</Text>
                <Text style={styles.infoValue}>{viagens.id || "N/A"}</Text>
              </View>

              <View style={styles.tripInfo}>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Origem:</Text>
                  <H3 style={styles.infoValue}>{viagens.origem}</H3>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Destino:</Text>
                  <H3 style={styles.infoValue}>{viagens.destino}</H3>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Valor:</Text>
                  <Text style={styles.infoValue}>R$ {viagens.valor.toFixed(2)}</Text>
                </View>
              </View>

              <View style={styles.buttonContainer}>
                <Button onPress={handleRejectPendingRide} style={styles.rejectButton}>
                  Recusar
                </Button>
                <Button onPress={handleAcceptPendingRide} style={styles.acceptButton}>
                  Aceitar
                </Button>
              </View>
            </View>
          </View>
        )}
      </Modal>

      <View style={styles.imageContainer}>
        <Text style={styles.title}>Bem-vindo, {motoristaForm.nome}!</Text>
        <H3>Conta Bancária: {contaForm.id}</H3>


        {motoristaId ? (
          <Text>ID do Motorista: {motoristaId}</Text>
        ) : (
          <Text>Carregando...</Text>
        )}

        <Button onPress={checkPendingRide} style={styles.checkButton}>
          Verificar Viagens Pendentes
        </Button>
      </View>

      <BottomBar screen="Home" />
    </View>
  );
}
