// src/services/websocket/useRideWebSocket.ts
import { useEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { router } from 'expo-router';
import { RideRequest, RideStatus } from './types';
import axiosInstance from 'app/config/axiosUrlConfig';

export const useRideWebSocket = ({ userId, userType }: {
    userId: string | null;
    userType: 'motorista' | 'cliente'
}) => {
    const [rideRequest, setRideRequest] = useState<RideRequest | null>(null);
    const clientRef = useRef<Client | null>(null);


    // Conecta ao WebSocket
    useEffect(() => {
        if (!userId) return;


        const socket = new SockJS("http://3.136.103.206:8080/ws");
        //const socket = new SockJS("https://32c9-200-238-97-165.ngrok-free.app/ws");
        const client = new Client({
            webSocketFactory: () => socket,
            onConnect: () => {
                console.log(`${userType} conectado ao WebSocket`);
                // Inscreve no tópico específico do usuário
                client.subscribe(`/topic/${userType}/${userId}`, (message) => {
                    const data = JSON.parse(message.body);
                    console.log('WebSocket message received:', data); // Debug

                    if (data.origem) {
                        setRideRequest(data);
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
            client.deactivate(); // Limpa a conexão
        };
    }, [userId, userType]);

    // Lida com mudanças de status
    const handleRideStatusChange = (data: RideRequest) => {
        if (!data.status) return;

        switch (data.status) {
            case 'ACEITO':
                if (userType === 'cliente') {
                    Alert.alert('Viagem Aceita', 'Um motorista aceitou sua viagem!');
                }
                break;

            case 'ANDAMENTO':
                const route = userType === 'motorista' || userType === 'cliente' ? '/MapRide' : '/MapRideClient';
                router.push({
                    pathname: route,
                    params: {
                        viagemId: data.viagemId.toString(),
                        origem: typeof data.origem === 'string' ? data.origem : JSON.stringify(data.origem),
                        destino: typeof data.destino === 'string' ? data.destino : JSON.stringify(data.destino),
                    },
                });
                break;

            case 'RECUSADO':
                Alert.alert('Viagem Cancelada', 'A viagem foi cancelada pelo cliente.');
                break;

            case 'CONCLUIDO':
                Alert.alert('Viagem Concluída', 'A viagem foi concluída com sucesso!');
                break;
        }
    };

    // Solicitar viagem
    // Solicitar viagem
    const requestRideClient = async (origin, destination, paymentMethod, driverMethod, clienteId, price) => {
        if (!origin || !destination || !paymentMethod || !driverMethod || !clienteId) {
            Alert.alert("Erro", "Preencha todos os campos antes de solicitar a viagem.");
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
                
                console.log("🚀 Viagem criada com sucesso! ID da viagem:", response.data.id);

                const viagemId = response.data.id; // Pega o ID diretamente da resposta da API

                console.log("📡 Enviando para WebSocket:", viagemId);

                const mensagemWebSocket = {
                    viagemId,
                    origem,
                    destino,
                    clienteId: Number(clienteId),
                    mensagem: "Nova solicitação de viagem"
                };
                console.log("📦 Dados sendo enviados via WebSocket:", mensagemWebSocket);

                clientRef.current?.publish({
                    destination: `/app/nova-viagem/${driverMethod}`,
                    body: JSON.stringify({
                        viagemId,
                        origem,
                        destino,
                    }),
                });

                Alert.alert("Sucesso", "Viagem solicitada com sucesso!");
            } else {
                throw new Error("Falha ao criar viagem ou ID não encontrado.");
            }
        } catch (error) {
            console.error("❌ Erro ao solicitar viagem:", error.response?.data || error.message);
            Alert.alert("Erro", "Não foi possível solicitar a viagem.");
        }
    };




    // Funções de ação
    const acceptRide = async (viagemId: number, motoristaId: string, contaBancariaId: number) => {
        try {
            const requestData = { statusViagem: "ACEITO" };
            const url = `/api/viagem/${viagemId}/motorista/${motoristaId}/contaBancariaMotorista/${contaBancariaId}/status`;

            console.log("🚀 Enviando requisição para aceitar viagem:");
            console.log("URL:", url);
            console.log("Dados enviados:", requestData);

            const response = await axiosInstance.put(url, requestData, {
                headers: { "Content-Type": "application/json" },
            });

            console.log("✅ Resposta recebida:", response.data);

            if (response.status === 200) {
                Alert.alert("Sucesso", "Viagem aceita!");
                setRideRequest(null); // Fecha o modal após aceitar
                router.push({
                    pathname: "/MapRide",
                    params: {
                        viagemId: viagemId,
                        origem: typeof rideRequest?.origem === 'string'
                            ? rideRequest.origem
                            : JSON.stringify(rideRequest?.origem),
                        destino: typeof rideRequest?.destino === 'string'
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


    const rejectRide = async (viagemId: number, motoristaId: string, contaBancariaId: number) => {
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
                Alert.alert("Rejeição", "Viagem recusada com sucesso.");
                setRideRequest(null);
            }
        } catch (error) {
            console.error("❌ Erro ao recusar viagem:", error);
            Alert.alert("Erro", "Falha ao recusar a viagem.");
        }
    };

    const concludeRide = async (viagemId: number, motoristaId: string, contaBancariaId: number) => {
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





    return {
        rideRequest,
        acceptRide,
        rejectRide,
        concludeRide,
        requestRideClient,

        client: clientRef.current,
    };
};