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

        const socket = new SockJS("https://eac7-200-238-97-165.ngrok-free.app/ws");
        const client = new Client({
            webSocketFactory: () => socket,
            onConnect: () => {
                console.log(`${userType} conectado ao WebSocket`);
                // Inscreve no tópico específico do usuário
                client.subscribe(`/topic/${userType}/${userId}`, (message) => {
                    const data = JSON.parse(message.body);
                    setRideRequest(data);
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
                const route = userType === 'motorista' ? '/MapRide' : '/MapRideClient';
                router.push({
                    pathname: route,
                    params: {
                        viagemId: data.viagemId.toString(),
                        origem: typeof data.origem === 'string' ? data.origem : JSON.stringify(data.origem),
                        destino: typeof data.destino === 'string' ? data.destino : JSON.stringify(data.destino),
                    },
                });
                break;
        }
    };

    // Funções de ação
    const acceptRide = async (viagemId: number, motoristaId: string, contaBancariaId: number) => {
        try {
            const response = await axiosInstance.put(
                `/api/viagem/${viagemId}/motorista/${motoristaId}/contaBancariaMotorista/${contaBancariaId}/status`,
                { statusViagem: "ACEITO" },
                { headers: { "Content-Type": "application/json" } }
            );

            if (response.status === 200) {
                Alert.alert("Sucesso", "Viagem aceita!");
                router.push({
                    pathname: "/MapRide",
                    params: {
                        viagemId: viagemId.toString(),
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
            Alert.alert("Erro", "Falha ao aceitar a viagem.");
            console.error("Erro ao aceitar viagem:", error);
        }
    };

    const rejectRide = (clienteId: number, motoristaId: string) => {
        if (!clientRef.current) return;

        clientRef.current.publish({
            destination: `/app/recusar-viagem/${clienteId}`,
            body: JSON.stringify({ motoristaId, status: "RECUSADO" }),
        });

        setRideRequest(null);
        Alert.alert("Rejeição", "Viagem recusada.");
    };

    return {
        rideRequest,
        acceptRide,
        rejectRide,
        client: clientRef.current,
    };
};