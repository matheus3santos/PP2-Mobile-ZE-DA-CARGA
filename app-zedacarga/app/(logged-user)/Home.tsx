import React, { useEffect, useRef, useState } from "react";
import { Button, Select, Checkbox, XStack, YStack, Label } from "tamagui";
import { View, StyleSheet, Modal, Text, Dimensions, Alert } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import * as Location from "expo-location";
import BottomBarUser from "components/BottomBarUser";
import { GOOGLE_MAPS_API_KEY } from "../../env";
import "react-native-get-random-values";
import * as SecureStore from "expo-secure-store";
import axiosInstance from "app/config/axiosUrlConfig";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

interface Card {
  id: number;
  tipoCartao: string;
  numeroCartao: string;
}

interface Motorista {
  id: number;
  nome: string;
  email: string;
}

const { height } = Dimensions.get("window");

export default function Home() {
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [destination, setDestination] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [origin, setOrigin] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [distance, setDistance] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isPaymentModalVisible, setPaymentModalVisible] = useState(false);
  const [tempOriginInput, setTempOriginInput] = useState("");
  const [cards, setCards] = useState<Card[]>([]);
  const [drivers, setDrivers] = useState<Motorista[]>([]);
  const [clienteId, setClienteId] = useState<string | null>(null);
  const [driverMethod, setDriverMethod] = useState<string | null>(null);
  const [rideRequest, setRideRequest] = useState<any | null>(null); // Adding rideRequest state for the incoming ride data
  const clientRef = useRef<Client | null>(null); // Ref for STOMP client

  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    const fetchData = async () => {
      // Location permissions
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync();
        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        setOrigin({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      }

      // Fetch client ID and cards
      const email = await SecureStore.getItemAsync("email");
      if (!email) return;

      try {
        const response = await axiosInstance.get("/api/cliente");
        const clienteData = response.data.find(
          (cliente: any) => cliente.email === email
        );
        setClienteId(clienteData?.id || null);

        if (clienteData?.id) {
          const cardsResponse = await axiosInstance.get(
            `/api/cliente/cartoes/${clienteData.id}`
          );
          setCards(
            Array.isArray(cardsResponse.data)
              ? cardsResponse.data
              : [cardsResponse.data]
          );

          // Fetch drivers
          const driversResponse = await axiosInstance.get("/api/motorista");
          setDrivers(driversResponse.data);
        }
      } catch (e) {
        console.error("Erro ao buscar dados:", e);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!clienteId) return;

    const socket = new SockJS("https://eac7-200-238-97-165.ngrok-free.app/ws");
    const client = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        console.log("Conectado ao WebSocket");
        client.subscribe(`/topic/cliente/${clienteId}`, (message) => {
          const data = JSON.parse(message.body);
          setRideRequest(data); // Store incoming ride request
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
  }, [clienteId]);

  const handleAcceptRide = async () => {
    if (!rideRequest || !clienteId || !driverMethod) return;

    try {
      const { idViagem } = rideRequest;
      const response = await axiosInstance.put(
        `/api/viagem/${idViagem}/status`,
        null,
        {
          params: {
            statusViagem: "ACEITO",
            idMotorista: driverMethod, // driverMethod should be the ID of the driver
            idContaBancariaMotorista: driverMethod, // Assuming the same ID for both (Motorista and ContaBancaria)
          },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      Alert.alert("Sucesso", "Viagem aceita!");
      setRideRequest(null); // Clear ride request after accepting
    } catch (error) {
      Alert.alert("Erro", "Falha ao aceitar a viagem.");
      console.error("Erro ao aceitar viagem:", error);
    }
  };

  const handleRejectRide = async () => {
    if (!rideRequest || !clienteId || !driverMethod) return;

    try {
      const { idViagem } = rideRequest;
      const response = await axiosInstance.put(
        `/api/viagem/${idViagem}/status`,
        null,
        {
          params: {
            statusViagem: "RECUSADO",
            idMotorista: driverMethod,
            idContaBancariaMotorista: driverMethod, // Again, assuming this
          },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      Alert.alert("Rejeição", "Viagem recusada.");
      setRideRequest(null); // Clear ride request after rejecting
    } catch (error) {
      Alert.alert("Erro", "Falha ao recusar a viagem.");
      console.error("Erro ao recusar viagem:", error);
    }
  };

  // Renders your layout
  return (
    <View style={styles.container}>
      {/* MapView, Modal, Buttons and other content */}
      {/* Handle the Accept and Reject buttons */}
      {rideRequest && (
        <View style={styles.content}>
          <Button onPress={handleAcceptRide}>Aceitar Viagem</Button>
          <Button onPress={handleRejectRide}>Recusar Viagem</Button>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { position: "absolute", bottom: 150, alignSelf: "center" },
  button: { marginVertical: 8, width: 200 },
  selectedButton: { backgroundColor: "#007AFF" },
  modal: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
    justifyContent: "center",
  },
  paymentModal: {
    position: "absolute",
    bottom: 100,
    left: 20,
    right: 20,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  input: {
    borderColor: "#ddd",
    borderWidth: 1,
    padding: 8,
    borderRadius: 8,
    marginVertical: 10,
  },
  cancelButton: {
    marginTop: 16,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignSelf: "center",
    backgroundColor: "#FF3B30",
  },
});
