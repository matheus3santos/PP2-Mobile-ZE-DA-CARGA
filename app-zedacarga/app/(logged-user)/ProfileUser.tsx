import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, ActivityIndicator, ScrollView } from 'react-native';
import { H4, H6, Button } from 'tamagui';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';
import axiosInstance from '../config/axiosUrlConfig';
import { Plus, LogOut } from '@tamagui/lucide-icons'
import BottomBarUser from 'components/BottomBarUser';



// Definindo o tipo esperado para o cliente
interface Cliente {
    nome: string;
    email: string;
    telefone: string;
    cpf: string;
    foto?: string; // Opcional, pois pode não estar presente
}

export default function Profile() {
    const [cliente, setCliente] = useState<Cliente | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfileData = async () => {
            const token = await SecureStore.getItemAsync('token');
            const email = await SecureStore.getItemAsync('email');

            if (!token || !email) {
                router.push('/'); // Redireciona se não estiver logado
                return;
            }

            try {
                const response = await axiosInstance.get('/api/cliente');
                const clienteData = response.data.find((cliente: Cliente) => cliente.email === email);
                setCliente(clienteData || null);
            } catch (e) {
                console.error('Erro ao buscar dados do perfil:', e);
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, []);

    const handleLogout = async () => {
        await SecureStore.deleteItemAsync('token');
        await SecureStore.deleteItemAsync('email');
        router.push('/'); // Redireciona para login
    };

    if (loading) {
        return <ActivityIndicator size="large" color="orange" />;
    }

    if (!cliente) {
        return (
            <View style={styles.container}>
                <Text>Erro ao carregar perfil. Tente novamente.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{ uri: cliente.foto || 'https://via.placeholder.com/150' }} />
            <H4>{cliente.nome}</H4>
            <H6>{cliente.email}</H6>
            <H6>Telefone: {cliente.telefone}</H6>
            <H6>CPF: {cliente.cpf}</H6>


            <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
                {/* Área de Foto e Nome */}
                <View style={{ alignItems: 'center', marginVertical: 20 }}>

                    {/* <H3 style={{ color: 'black' }}>{cliente.nome}</H3> */}
                </View>

                <View style={{ alignItems: 'center' }}>
                    <Button
                        onPress={() => {
                            router.push('/(logged-user)/EditUser')
                        }}
                        style={styles.Button}
                        icon={Plus}
                    >
                        Editar Perfil
                    </Button>
                    <Button
                        onPress={() => {
                            router.push('/(logged-user)/RegisterCardUser')
                        }}
                        style={styles.Button}
                        icon={Plus}
                    >
                        Formas de pagamento
                    </Button>

                    <Button
                        onPress={() => {
                            router.push('/(logged-user)/HistoricTravelUser')
                        }}
                        style={styles.Button}
                        icon={Plus}
                    >
                        Historico de viagens
                    </Button>

                    <Button style={styles.cancelButton}
                        onPress={handleLogout}>
                        Sair
                    </Button>

                </View>

            </ScrollView>
            <BottomBarUser screen="HomeUser" />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 16,
    },
    Button: {
        backgroundColor: 'black',
        color: 'white',
        width: 400,
        height: 50,
        marginBottom: 10,
        fontSize: 18
    },
    cancelButton: {
        backgroundColor: 'red',
        color: 'white',
        width: 400,
        height: 50,
        marginBottom: 10,
        fontSize: 18,
    },
});
