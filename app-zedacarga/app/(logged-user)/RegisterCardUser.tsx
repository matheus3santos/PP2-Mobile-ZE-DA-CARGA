import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { Button, ListItem, Stack, Text, YStack } from 'tamagui';
import BottomBarUser from '../../components/BottomBarUser';
import { View } from 'react-native';
import axiosInstance from '../config/axiosUrlConfig';
import * as SecureStore from 'expo-secure-store';

interface Card {
    id: number;
    tipoCartao: string;
    numeroCartao: string;
}

const CardManagementScreen = () => {
    const router = useRouter();
    const [cards, setCards] = useState<Card[]>([]);
    const [clienteId, setClienteId] = useState<string | null>(null);

    useEffect(() => {
        const fetchClientIdAndCards = async () => {
            const email = await SecureStore.getItemAsync('email');
            if (!email) {
                router.push('/'); // Redireciona se não estiver logado
                return;
            }
            try {
                const response = await axiosInstance.get('/api/cliente');
                const clienteData = response.data.find((cliente: any) => cliente.email === email);
                setClienteId(clienteData?.id || null);

                if (clienteData?.id) {
                    const cardsResponse = await axiosInstance.get(`/api/cliente/cartoes/${clienteData.id}`);
                    console.log("Cartões encontrados:", cardsResponse.data);

                    // Verifica se é um objeto ou array e adapta
                    if (Array.isArray(cardsResponse.data)) {
                        setCards(cardsResponse.data);
                    } else if (cardsResponse.data && typeof cardsResponse.data === 'object') {
                        setCards([cardsResponse.data]); // Transforma o objeto em array
                    } else {
                        setCards([]); // Caso de resposta inesperada
                    }
                }
            } catch (e) {
                console.error('Erro ao buscar dados do cliente e cartões:', e);
            }
        };

        fetchClientIdAndCards();
    }, []);



    const handleDeleteCard = async (id: number) => {
        if (!clienteId) {
            alert('Cliente não encontrado. Faça login novamente.');
            return;
        }

        try {
            await axiosInstance.delete(`/api/cliente/cartao/${id}`);
            setCards((prev) => prev.filter((card) => card.id !== id));
        } catch (e) {
            console.error('Erro ao excluir o cartão:', e);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ marginTop: 20, padding: 16 }}>
                <Text fontSize="$5" fontWeight="bold" textAlign="center">
                    Gerenciamento de Cartões
                </Text>

                <Stack space="$4">
                    <Button
                        size="$4"
                        onPress={() => router.push('/addCreditUser')}
                        theme="blue"
                    >
                        Adicionar Cartão de Crédito
                    </Button>
                </Stack>

                <YStack mt="$6" space="$6"> {/* Aumente o valor de 'space' para criar mais espaçamento */}
                    <Text fontSize="$4" fontWeight="600">
                        Cartões Cadastrados
                    </Text>

                    {cards.length > 0 ? (
                        cards.map((card) => (
                            <ListItem
                                key={card.id}
                                bg="$backgroundSoft"
                                borderRadius="$3"
                                padding="$4"
                                onPress={() => (`Visualizando cartão ${card.id}`)}
                            >
                                <Text>
                                    {card.tipoCartao} - Final {card.numeroCartao.slice(-4)}
                                </Text>
                                <Button
                                    size="$2"
                                    onPress={() => handleDeleteCard(card.id)}
                                    theme="red"
                                >
                                    Excluir
                                </Button>
                            </ListItem>
                        ))
                    ) : (
                        <Text>Nenhum cartão cadastrado.</Text>
                    )}
                </YStack>
            </View>
            <BottomBarUser screen="HomeUser" />
        </View>
    );
};

export default CardManagementScreen;
