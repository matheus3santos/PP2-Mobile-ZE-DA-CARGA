import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, ActivityIndicator, ScrollView } from 'react-native';
import { H3, H4, H6, Button, Avatar } from 'tamagui';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';
import axiosInstance from '../config/axiosUrlConfig';
import { Plus, LogOut, User, Car, CreditCard, History } from '@tamagui/lucide-icons'
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
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Erro ao carregar perfil. Tente novamente.</Text>
            </View>
        );
    }

    return (
        <View style={styles.mainContainer}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.headerContainer}>
                    <View style={styles.avatarContainer}>
                        <Avatar circular size="$12" backgroundColor="#3498db">
                            <Text style={styles.avatarText}>
                                {cliente.nome.charAt(0).toUpperCase()}
                            </Text>
                        </Avatar>
                        <H3 style={styles.userName}>
                            {cliente.nome}
                        </H3>

                        <H3 style={styles.userEmail}>
                            {cliente.email}
                        </H3>

                    </View>
                </View>


                <View style={styles.buttonContainer}>

                        <Button
                            onPress={() => {
                                router.push('/(logged-user)/EditUser')
                            }}
                            style={styles.button}
                            icon={Plus}
                        >
                            <Text style={styles.buttonText}>Editar Perfil</Text>
                        </Button>
                        <Button
                            onPress={() => {
                                router.push('/(logged-user)/RegisterCardUser')
                            }}
                            style={styles.button}
                            icon={Plus}
                        >
                            <Text style={styles.buttonText}>Formas de Pagamento</Text>
                        </Button>

                        <Button
                            onPress={() => {
                                router.push('/(logged-user)/HistoricTravelUser')
                            }}
                            style={styles.button}
                            icon={Plus}
                        >
                            <Text style={styles.buttonText}>Historico de Viagens</Text>
                        </Button>

                        <Button style={styles.logoutButton} icon={LogOut}
                            onPress={handleLogout}>
                            <Text style={styles.buttonText}>Sair</Text>
                        </Button>
                </View>
            </ScrollView>
            <BottomBarUser screen="HomeUser" />
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#f5f6fa',
    },
    scrollContent: {
        paddingBottom: 80,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f6fa',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f6fa',
        padding: 20,
    },
    errorText: {
        color: '#e74c3c',
        fontSize: 16,
        textAlign: 'center',
    },
    headerContainer: {
        alignItems: 'center',
        marginVertical: 32,
        backgroundColor: '#ffffff',
        paddingVertical: 24,
        marginHorizontal: 16,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    avatarContainer: {
        marginBottom: 16,
    },
    avatarText: {
        fontSize: 24,
        color: '#ffffff',
        fontWeight: 'bold',
    },
    userName: {
        color: '#2c3e50',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    userEmail: {
        color: '#7f8c8d',
        fontSize: 16,
    },
    buttonContainer: {
        paddingHorizontal: 16,
        gap: 12,
    },
    button: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        height: 56,
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.08,
        shadowRadius: 2,
        elevation: 2,
    },
    buttonPress: {
        backgroundColor: '#f8f9fa',
        // scale: 0.98,
    },
    buttonText: {
        color: '#2c3e50',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 12,
    },
    logoutButton: {
        backgroundColor: '#fff0f0',
        borderRadius: 12,
        height: 56,
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
        marginTop: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.08,
        shadowRadius: 2,
        elevation: 2,
    },
});
