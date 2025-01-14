import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { Button, ListItem, Stack, Text, YStack } from 'tamagui';
import BottomBarUser from '../../components/BottomBarUser';
import { View } from 'react-native';
import axiosInstance from '../config/axiosUrlConfig';  // Aqui você importará a configuração do Axios

// Defina a interface do cartão
interface Card {
    id: number;
    tipoCartao: string;
    numeroCartao: string;
}

const CardManagementScreen = () => {
    const router = useRouter();
    const [cards, setCards] = useState<Card[]>([]);  // Use o tipo Card aqui
    const clienteId = "1";  // ID fixo do cliente para fins de teste

    // Função para buscar os cartões cadastrados na API
    const fetchCards = async () => {
        try {
            const response = await axiosInstance.get(`/api/cliente/cartoes/${clienteId}`);
            console.log('Response:', response);  // Adicionei o log para verificar a resposta

            // Verifique se a resposta é um array
            if (Array.isArray(response.data)) {
                setCards(response.data);  // Atualiza o estado com os cartões recebidos
            } else {
                console.warn("Os dados recebidos não são um array", response.data);
                setCards([]);  // Garante que o estado seja um array vazio caso a resposta não seja um array
            }
        } catch (error) {
            console.error("Erro ao buscar os cartões: ", error);
        }
    };

    useEffect(() => {
        fetchCards();  // Chama a função quando a tela for carregada
    }, []);

    const handleDeleteCard = async (id: number) => {
        try {
            // Deleta o cartão passando o ID do cliente e o ID do cartão
            await axiosInstance.delete(`/api/cliente/cartao/${clienteId}/${id}`);
            setCards((prev) => prev.filter((card) => card.id !== id));  // Atualiza o estado após excluir o cartão
        } catch (error) {
            console.error("Erro ao excluir o cartão: ", error);
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

                    {/* <Button
                        size="$4"
                        onPress={() => router.push('/addDebitUser')}
                        theme="green"
                    >
                        Adicionar Cartão de Débito
                    </Button> */}

                </Stack>

                <YStack mt="$6" space="$4">
                    <Text fontSize="$4" fontWeight="600">
                        Cartões Cadastrados
                    </Text>

                    {cards.length > 0 ? (
                        cards.map((card) => (
                            <ListItem
                                key={card.id}
                                bg="$backgroundSoft"
                                borderRadius="$3"
                                space="$4"
                                onPress={() => console.log(`Visualizando cartão ${card.id}`)}
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
