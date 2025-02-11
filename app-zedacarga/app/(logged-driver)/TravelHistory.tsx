import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import BottomBar from 'components/BottomBar';
import * as SecureStore from "expo-secure-store";
import axiosInstance from "app/config/axiosUrlConfig";
import { H4, H5, H6, Text } from "tamagui";
import { Landmark, ArrowLeft, Calendar, MapPin, DollarSign } from '@tamagui/lucide-icons';
import { styles } from '../../styles/TravelHistory.style';


interface Motorista {
  id?: number;
  email: string;
  viagens?: Viagem[];
}

interface Viagem {
  id: number;
  origem: string;
  destino: string;
  valor: number;
  statusViagem: string;
  numeroProtocolo: string;
  dataVencimentoCobranca: string;
  pgtoStatus: string;
}

interface Location {
  originalCoords: string;
  address: string;
  loading: boolean;
}

const TravelHistoryScreen = () => {
  const [motorista, setMotorista] = useState<Motorista | null>(null);
  const [loading, setLoading] = useState(true);
  const [viagensConcluidas, setViagensConcluidas] = useState<Viagem[]>([]);
  const [locations, setLocations] = useState<{ [key: string]: Location }>({});


  useEffect(() => {
    fetchProfileData();
  }, []);

  useEffect(() => {
    if (viagensConcluidas.length > 0) {
      fetchAllAddresses(viagensConcluidas);
    }
  }, [viagensConcluidas]);

  const fetchProfileData = async () => {
    try {
      const token = await SecureStore.getItemAsync("token");
      const email = await SecureStore.getItemAsync("email");

      if (!token || !email) {
        router.push('/');
        return;
      }

      const response = await axiosInstance.get("/api/motorista");
      const motoristaData = response.data.find(
        (m: Motorista) => m.email === email
      );

      if (motoristaData && motoristaData.viagens) {
        setMotorista(motoristaData);
        // Filtra apenas as viagens concluídas
        const concluidas = motoristaData.viagens.filter(
          (viagem: Viagem) => viagem.statusViagem === "CONCLUIDO"
        );
        setViagensConcluidas(concluidas);
      }
    } catch (error) {
      console.error("Erro ao recuperar dados do motorista:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatarValor = (valor: number) => {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString('pt-BR');
  };

  const renderLocation = (coords: string) => {
    const location = locations[coords];
    if (!location) return coords;
    if (location.loading) return 'Carregando endereço...';
    return location.address;
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  // Função para converter coordenadas em endereço usando OpenStreetMap
  const getAddressFromCoordinates = async (coords: string) => {
    try {
      // Verifica se as coordenadas estão no formato correto (latitude,longitude)
      const [lat, lon] = coords.split(',').map(coord => parseFloat(coord.trim()));

      if (isNaN(lat) || isNaN(lon)) {
        throw new Error('Coordenadas inválidas');
      }

      // Adiciona um pequeno delay para evitar muitas requisições simultâneas
      await new Promise(resolve => setTimeout(resolve, 1000));

      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&accept-language=pt-BR`,
        {
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'app-zedacarga' // É importante identificar sua aplicação
          }
        }
      );

      const data = await response.json();

      // Formata o endereço de maneira mais amigável
      const address = data.address;
      let formattedAddress = '';

      if (address.road) formattedAddress += address.road;
      if (address.suburb) formattedAddress += `, ${address.suburb}`;
      if (address.city) formattedAddress += `, ${address.city}`;
      if (address.state) formattedAddress += ` - ${address.state}`;

      return formattedAddress || data.display_name;
    } catch (error) {
      console.error('Erro ao converter coordenadas:', error);
      return 'Endereço não encontrado';
    }
  };

  // Função para buscar todos os endereços
  const fetchAllAddresses = async (viagens: Viagem[]) => {
    const newLocations: { [key: string]: Location } = {};

    for (const viagem of viagens) {
      // Processa origem
      if (!locations[viagem.origem]) {
        newLocations[viagem.origem] = {
          originalCoords: viagem.origem,
          address: '',
          loading: true
        };
        const origemAddress = await getAddressFromCoordinates(viagem.origem);
        newLocations[viagem.origem] = {
          originalCoords: viagem.origem,
          address: origemAddress,
          loading: false
        };
      }

      // Processa destino
      if (!locations[viagem.destino]) {
        newLocations[viagem.destino] = {
          originalCoords: viagem.destino,
          address: '',
          loading: true
        };
        const destinoAddress = await getAddressFromCoordinates(viagem.destino);
        newLocations[viagem.destino] = {
          originalCoords: viagem.destino,
          address: destinoAddress,
          loading: false
        };
      }
    }

    setLocations(prev => ({ ...prev, ...newLocations }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push('/(logged-driver)/Profile')}
        >
          <ArrowLeft size={24} color="#2c3e50" />
        </TouchableOpacity>
        <Text style={styles.title}>Histórico de Viagens</Text>
      </View>

      <ScrollView style={styles.content}>
        {viagensConcluidas.length > 0 ? (
          viagensConcluidas.map((viagem, index) => (
            <View key={index} style={styles.tripCard}>
              <View style={styles.tripHeader}>
                <Landmark size={24} color="#3498db" />
                <Text style={styles.protocolText}>Protocolo: {viagem.numeroProtocolo}</Text>
              </View>

              <View style={styles.tripDetails}>
                <View style={styles.locationContainer}>
                  <MapPin size={20} color="#2ecc71" />
                  <View style={styles.locationText}>
                    <Text style={styles.locationLabel}>Origem:</Text>
                    <Text style={styles.locationValue}>
                      {renderLocation(viagem.origem)}
                    </Text>
                  </View>
                </View>

                <View style={styles.locationContainer}>
                  <MapPin size={20} color="#e74c3c" />
                  <View style={styles.locationText}>
                    <Text style={styles.locationLabel}>Destino:</Text>
                    <Text style={styles.locationValue}>
                      {renderLocation(viagem.destino)}
                    </Text>
                  </View>
                </View>

                <View style={styles.infoRow}>
                  <View style={styles.infoItem}>
                    <Calendar size={20} color="#7f8c8d" />
                    <Text style={styles.infoText}>
                      {formatarData(viagem.dataVencimentoCobranca)}
                    </Text>
                  </View>

                  <View style={styles.infoItem}>
                    <DollarSign size={20} color="#27ae60" />
                    <Text style={styles.valueText}>
                      {formatarValor(viagem.valor)}
                    </Text>
                  </View>
                </View>

                <View style={styles.statusContainer}>
                  <Text style={styles.statusLabel}>Status Pagamento:</Text>
                  <Text style={[
                    styles.statusValue,
                    { color: viagem.pgtoStatus === "PAGO" ? "#27ae60" : "#e74c3c" }
                  ]}>
                    {viagem.pgtoStatus}
                  </Text>
                </View>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Landmark size={48} color="#bdc3c7" />
            <Text style={styles.emptyText}>Nenhuma viagem concluída</Text>
          </View>
        )}
      </ScrollView>

      <BottomBar screen="Home" />
    </View>
  );
};



export default TravelHistoryScreen;