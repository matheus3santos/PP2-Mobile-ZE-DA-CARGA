import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Button, ListItem, Stack, Text, YStack } from 'tamagui';
import BottomBarUser from '../components/BottomBarUser';
import { View } from 'react-native';
const CardManagementScreen = () => {
    const router = useRouter();
    const [cards, setCards] = useState([
        { id: 1, type: 'Crédito', lastDigits: '1234' },
        { id: 2, type: 'Débito', lastDigits: '5678' },
    ]);

    const handleDeleteCard = (id: number) => {
        setCards((prev) => prev.filter((card) => card.id !== id));
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

                    <Button
                        size="$4"
                        onPress={() => router.push('/addDebitUser')}
                        theme="green"
                    >
                        Adicionar Cartão de Débito
                    </Button>
                </Stack>

                <YStack mt="$6" space="$4">
                    <Text fontSize="$4" fontWeight="600">
                        Cartões Cadastrados
                    </Text>

                    {cards.length > 0 ? (
                        cards.map((card) => (
                            <ListItem
                                key={card.id}
                                // pressable
                                bg="$backgroundSoft"
                                borderRadius="$3"
                                space="$4"
                                onPress={() => console.log(`Visualizando cartão ${card.id}`)}
                            >
                                <Text>
                                    {card.type} - Final {card.lastDigits}
                                </Text>
                                <Button
                                    size="$2"
                                    onPress={() => handleDeleteCard(card.id)}
                                    theme="red"
                                >
                                    <Text>
                                        Excluir
                                    </Text>
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
