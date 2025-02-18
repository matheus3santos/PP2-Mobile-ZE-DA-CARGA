// src/services/websocket/useRideWebSocket.ts
import { useEffect, useRef, useState } from "react";
import { Alert } from "react-native";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { router } from "expo-router";
import { RideRequest, RideStatus } from "./types";
import axiosInstance from "app/config/axiosUrlConfig";

export const useRideWebSocket = ({
  userId,
  userType,
}: {
  userId: string | null;
  userType: "motorista" | "cliente";
}) => {
  const [rideRequest, setRideRequest] = useState<RideRequest | null>(null);
  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    if (!userId) return;

    const socket = new SockJS(
      "https://6935-2804-14d-5483-45d0-54b6-f52e-4499-d22c.ngrok-free.app/ws"
    );
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log(`${userType} conectado ao WebSocket`);
        client.subscribe(`/topic/${userType}/${userId}`, (message) => {
          const data = JSON.parse(message.body);
          console.log("WebSocket message received:", data); // Debug

          if (data.origem) {
            setRideRequest((prevState) => {
              // Verifica se o viagemId não é null antes de atualizar
              if (data.viagemId && data.viagemId !== null) {
                return { ...prevState, ...data };
              } else {
                return prevState; // Não altera se viagemId for null
              }
            });
          }
          handleRideStatusChange(data);
        });
      },
      onDisconnect: () => console.log(`${userType} desconectado`),
      onStompError: (error) => console.error("Erro no STOMP:", error),
    });

    client.activate();
    clientRef.current = client;

    return () => {
      if (clientRef.current) {
        console.log("Desativando WebSocket...");
        clientRef.current.deactivate();
      }
    };
  }, [userId, userType]);

  // Lida com mudanças de status
  const handleRideStatusChange = (data: RideRequest) => {
    if (!data.status) return;

    switch (data.status) {
      case "ACEITO":
        if (userType === "cliente") {
          Alert.alert("Viagem Aceita", "Um motorista aceitou sua viagem!");
        }
        break;

      case "ANDAMENTO":
        const route =
          userType === "motorista" || userType === "cliente"
            ? "/MapRide"
            : "/MapRideClient";

        router.push({
          pathname: route,
          params: {
            viagemId: data.viagemId.toString(),
            origem:
              typeof data.origem === "string"
                ? data.origem
                : JSON.stringify(data.origem),
            destino:
              typeof data.destino === "string"
                ? data.destino
                : JSON.stringify(data.destino),
          },
        });
        break;

      case "RECUSADO":
        if (userType === "cliente") {
          Alert.alert("Viagem Recusada", "Um motorista recusou sua viagem!");
        }
        break;

      case "CONCLUIDO":
        Alert.alert("Viagem Concluída", "A viagem foi concluída com sucesso!");
        break;
    }
  };

  // Solicitar viagem
  const requestRideClient = async (
    origin,
    destination,
    paymentMethod,
    driverMethod,
    clienteId,
    price
  ) => {
    if (
      !origin ||
      !destination ||
      !paymentMethod ||
      !driverMethod ||
      !clienteId
    ) {
      Alert.alert(
        "Erro",
        "Preencha todos os campos antes de solicitar a viagem."
      );
      return;
    }

    const origem = `${origin.latitude},${origin.longitude}`;
    const destino = `${destination.latitude},${destination.longitude}`;

    try {
      const url = `/api/viagem/cliente/${clienteId}/cartao/${paymentMethod}/motorista/${driverMethod}?clienteId=${clienteId}&cartaoClienteId=${paymentMethod}&motoristaId=${driverMethod}`;

      const response = await axiosInstance.post(url, {
        origem,
        destino,
        valor: price,
      });

      if (response.status === 201 && response.data?.id) {
        console.log(
          "🚀 Viagem criada com sucesso! ID da viagem:",
          response.data.id
        );

        const viagemId = response.data.id; // Pega o ID diretamente da resposta da API

        console.log("📡 Enviando para WebSocket:", viagemId);

        const mensagemWebSocket = {
          viagemId,
          origem,
          destino,
          clienteId: Number(clienteId),
          mensagem: "Nova solicitação de viagem",
        };
        console.log(
          "📦 Dados sendo enviados via WebSocket:",
          mensagemWebSocket
        );

        clientRef.current?.publish({
          destination: `/app/nova-viagem/${driverMethod}`,
          body: JSON.stringify({
            viagemId,
            origem,
            destino,
          }),
        });
      } else {
        throw new Error("Falha ao criar viagem ou ID não encontrado.");
      }
    } catch (error) {
      console.error(
        "❌ Erro ao solicitar viagem:",
        error.response?.data || error.message
      );
      Alert.alert("Erro", "Não foi possível solicitar a viagem.");
    }
  };

  // Funções de aceitar corrida
  // const acceptRide = async (viagemId: number, motoristaId: string, contaBancariaId: number) => {
  //     try {
  //         const requestData = { statusViagem: "ACEITO" };
  //         const url = `/api/viagem/${viagemId}/motorista/${motoristaId}/contaBancariaMotorista/${contaBancariaId}/status`;

  //         console.log("🚀 Enviando requisição para aceitar viagem:");
  //         console.log("URL:", url);
  //         console.log("Dados enviados:", requestData);

  //         // Envia requisição para aceitar a viagem
  //         const response = await axiosInstance.put(url, requestData, {
  //             headers: { "Content-Type": "application/json" },
  //         });

  //         console.log("✅ Resposta recebida:", response.data);

  //         if (response.status === 200) {
  //             Alert.alert("Sucesso", "Viagem aceita!");
  //             setRideRequest(null); // Limpa a solicitação de viagem
  //             router.push({
  //                 pathname: "/MapRide",
  //                 params: {
  //                     viagemId: viagemId,
  //                     origem: typeof rideRequest?.origem === 'string' ? rideRequest.origem : JSON.stringify(rideRequest?.origem),
  //                     destino: typeof rideRequest?.destino === 'string' ? rideRequest.destino : JSON.stringify(rideRequest?.destino),
  //                 },
  //             });
  //         }
  //     } catch (error) {
  //         console.error("❌ Erro ao aceitar viagem:", error);
  //         Alert.alert("Erro", "Falha ao aceitar a viagem.");
  //     }
  // };

  // Funções de aceitar corrida
  const acceptRide = async (
    viagemId: number,
    motoristaId: string,
    contaBancariaId: number
  ) => {
    try {
      const requestData = { statusViagem: "ACEITO" };
      const url = `/api/viagem/${viagemId}/motorista/${motoristaId}/contaBancariaMotorista/${contaBancariaId}/status`;

      // Requisição POST para verificar o pagamento da viagem
      const pagamentoUrl = `/api/viagem/${viagemId}/conta/${contaBancariaId}/pagamento`;

      try {
        // Enviando um corpo vazio na requisição POST
        await axiosInstance.post(pagamentoUrl, {
          headers: { "Content-Type": "application/json" },
        });

        console.log("✅ Pagamento verificado com sucesso!");
      } catch (pagamentoError) {
        Alert.alert("Erro", "Falha ao verificar o pagamento da viagem.");
        console.log(pagamentoError);
      }

      console.log("🚀 Enviando requisição para aceitar viagem:");
      console.log("URL:", url);
      console.log("Dados enviados:", requestData);

      // Envia requisição para aceitar a viagem
      const response = await axiosInstance.put(url, requestData, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("✅ Resposta recebida:", response.data);

      if (response.status === 200) {
        Alert.alert("Sucesso", "Viagem aceita!");
        setRideRequest(null); // Limpa a solicitação de viagem
        router.push({
          pathname: "/MapRide",
          params: {
            viagemId: viagemId,
            origem:
              typeof rideRequest?.origem === "string"
                ? rideRequest.origem
                : JSON.stringify(rideRequest?.origem),
            destino:
              typeof rideRequest?.destino === "string"
                ? rideRequest.destino
                : JSON.stringify(rideRequest?.destino),
          },
        });
      }
    } catch (error) {
      console.error("❌ Erro ao aceitar viagem:", error);
      Alert.alert("Erro", "Falha ao aceitar a viagem.");
    }
  };

  const rejectRide = async (
    viagemId: number,
    motoristaId: string,
    contaBancariaId: number
  ) => {
    try {
      const requestData = { statusViagem: "RECUSADO" };
      const url = `/api/viagem/${viagemId}/motorista/${motoristaId}/contaBancariaMotorista/${contaBancariaId}/status`;

      console.log("🚀 Enviando requisição para recusar viagem:");
      console.log("URL:", url);
      console.log("Dados enviados:", requestData);

      const response = await axiosInstance.put(url, requestData, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("✅ Resposta recebida:", response.data);

      if (response.status === 200) {
        Alert.alert("Sucesso", "Viagem rejeitada com sucesso!");
        setRideRequest(null);
        router.push({
          pathname: "/TravelHistory",
        });
      }
    } catch (error) {
      console.error("❌ Erro ao recusar viagem:", error);
      Alert.alert("Erro", "Falha ao recusar a viagem.");
    }
  };

  //CONCLUIR CORRIDA
  const concludeRide = async (
    viagemId: number,
    motoristaId: string,
    contaBancariaId: number
  ) => {
    try {
      const requestData = { statusViagem: "CONCLUIDO" };
      const url = `/api/viagem/${viagemId}/motorista/${motoristaId}/contaBancariaMotorista/${contaBancariaId}/status`;

      console.log("🚀 Enviando requisição para concluir viagem:");
      console.log("URL:", url);
      console.log("Dados enviados:", requestData);

      const response = await axiosInstance.put(url, requestData, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("✅ Resposta recebida:", response.data);

      if (response.status === 200) {
        Alert.alert("Sucesso", "Viagem concluída com sucesso!");
        setRideRequest(null);
        router.push({
          pathname: "/Home",
        });
      }
    } catch (error) {
      console.error("❌ Erro ao concluir viagem:", error);
      Alert.alert("Erro", "Falha ao concluir a viagem.");
    }
  };

  const closeRide = async () => {
    setRideRequest(null);
  };

  return {
    rideRequest,
    acceptRide,
    rejectRide,
    concludeRide,
    requestRideClient,
    closeRide,
    client: clientRef.current,
  };
};
