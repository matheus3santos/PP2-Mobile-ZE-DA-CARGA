import { Avatar, H3, H4, H5, H6, Button, Text } from "tamagui";
import { Plus, LogOut, User, Car, CreditCard, History } from '@tamagui/lucide-icons'

import { Image, TouchableOpacity, ScrollView, View, ActivityIndicator, StyleSheet } from "react-native";
import { router } from "expo-router";
import BottomBar from "components/BottomBar";
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from "react";
import axiosInstance from "app/config/axiosUrlConfig";

interface Motorista {
    nome: string;
    email: string;
    telefone: string;
    cpf: string;
    rendaMensal: number;
    veiculo?: { placa: string; modelo: string; renavam: string; cor: string; ano: string; } | null;
}

export default function Profile() {

    const [motorista, setMotorista] = useState<Motorista | null>(null);
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
                const response = await axiosInstance.get('/api/motorista');
                const motoristaData = response.data.find((motorista: Motorista) => motorista.email === email);
                setMotorista(motoristaData || null);
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
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#3498db" />
            </View>
        );
    }

    if (!motorista) {
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
                                {motorista.nome.charAt(0).toUpperCase()}
                            </Text>
                        </Avatar>
                    </View>
                    <H3 style={styles.userName}>{motorista.nome}</H3>
                    <Text style={styles.userEmail}>{motorista.email}</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <Button
                        onPress={() => router.push('/EditProfile')}
                        style={styles.button}
                        icon={User}
                        pressStyle={styles.buttonPress}
                    >
                        <Text style={styles.buttonText}>Editar Perfil</Text>
                    </Button>

                    <Button
                        onPress={() => router.push('/InfoCar')}
                        style={styles.button}
                        icon={Car}
                        pressStyle={styles.buttonPress}
                    >
                        <Text style={styles.buttonText}>Informações do Veículo</Text>
                    </Button>

                    <Button
                        onPress={() => router.push('/InfoConta')}
                        style={styles.button}
                        icon={CreditCard}
                        pressStyle={styles.buttonPress}
                    >
                        <Text style={styles.buttonText}>Conta Bancária</Text>
                    </Button>

                    <Button
                        onPress={() => router.push('/TravelHistory')}
                        style={styles.button}
                        icon={History}
                        pressStyle={styles.buttonPress}
                    >
                        <Text style={styles.buttonText}>Histórico de Entregas</Text>
                    </Button>

                    <Button
                        onPress={handleLogout}
                        style={styles.logoutButton}
                        icon={LogOut}
                        pressStyle={styles.buttonPress}
                    >
                        <Text style={styles.buttonText}>Sair</Text>
                    </Button>
                </View>
            </ScrollView>
            <BottomBar screen="Profile" />
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