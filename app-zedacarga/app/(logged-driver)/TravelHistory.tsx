import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
  Text,
} from "react-native";
import { router } from "expo-router";
import BottomBar from "components/BottomBar";
import * as SecureStore from "expo-secure-store";
import axiosInstance from "app/config/axiosUrlConfig";
import {
  Landmark,
  ArrowLeft,
  Calendar,
  MapPin,
  DollarSign,
} from "@tamagui/lucide-icons";

import { styles } from "../../styles/TravelHistory.style";

interface Viagem {
  id: number;
  origem: string;
  destino: string;
  valor: number;
  statusViagem: string;
  numeroProtocolo: string;
  dataVencimentoCobranca: string;
  pgtoStatus: string;
  viagemComprovante?: string;
}

const TravelHistoryScreen = () => {
  const [viagensConcluidas, setViagensConcluidas] = useState<Viagem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchViagens();
  }, []);

  const fetchViagens = async () => {
    try {
      const token = await SecureStore.getItemAsync("token");
      if (!token) {
        router.push("/");
        return;
      }

      const response = await axiosInstance.get("/api/viagem");

      const concluidas = response.data.filter(
        (viagem: Viagem) => viagem.statusViagem === "CONCLUIDO"
      );

      console.log("Viagens concluídas:", concluidas);

      setViagensConcluidas(concluidas);
    } catch (error) {
      console.error("Erro ao buscar viagens:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatarValor = (valor: number) => {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const formatarData = (data: string) => {
    return data
      ? new Date(data).toLocaleDateString("pt-BR")
      : "Data não disponível";
  };

  const abrirComprovante = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error("Erro ao abrir URL:", err)
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push("/(logged-driver)/Profile")}
        >
          <ArrowLeft size={24} color="#2c3e50" />
        </TouchableOpacity>
        <Text style={styles.title}>Histórico de Viagens</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {viagensConcluidas.length > 0 ? (
          viagensConcluidas.map((viagem, index) => (
            <View key={index} style={styles.tripCard}>
              <View style={styles.tripHeader}>
                <Landmark size={24} color="#3498db" />
                <Text style={styles.protocolText}>
                  Protocolo: {viagem.numeroProtocolo || "N/A"}
                </Text>
              </View>

              <View style={styles.tripDetails}>
                <View style={styles.infoRow}>
                  <MapPin size={20} color="#2ecc71" />
                  <Text style={styles.infoText}>
                    Origem: {viagem.origem || "N/A"}
                  </Text>
                </View>

                <View style={styles.infoRow}>
                  <MapPin size={20} color="#e74c3c" />
                  <Text style={styles.infoText}>
                    Destino: {viagem.destino || "N/A"}
                  </Text>
                </View>

                <View style={styles.infoRow}>
                  <Calendar size={20} color="#7f8c8d" />
                  <Text style={styles.infoText}>
                    {formatarData(viagem.dataVencimentoCobranca)}
                  </Text>
                </View>

                <View style={styles.infoRow}>
                  <DollarSign size={20} color="#f1c40f" />
                  <Text style={styles.infoText}>
                    {formatarValor(viagem.valor)}
                  </Text>
                </View>

                <View style={styles.infoRow}>
                  <Text style={styles.infoText}>
                    Status: {viagem.statusViagem || "N/A"}
                  </Text>
                </View>

                <View style={styles.infoRow}>
                  <Text style={styles.infoText}>
                    Pagamento: {viagem.pgtoStatus || "N/A"}
                  </Text>
                </View>
              </View>

              {viagem.viagemComprovante ? (
                <TouchableOpacity
                  onPress={() => viagem.viagemComprovante && abrirComprovante(viagem.viagemComprovante)}
                  style={styles.comprovanteButton}
                >
                  <Text style={styles.comprovanteText}>Abrir Comprovante</Text>
                </TouchableOpacity>
              ) : (
                <Text style={styles.noImageText}>
                  Comprovante não disponível
                </Text>
              )}
            </View>
          ))
        ) : (
          <Text style={styles.noTripsText}>
            Nenhuma viagem concluída encontrada.
          </Text>
        )}
      </ScrollView>

      <BottomBar screen="Profile" />
    </View>
  );
};

export default TravelHistoryScreen;
