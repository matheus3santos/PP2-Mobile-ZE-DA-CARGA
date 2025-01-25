import { Avatar, H3, H4, H5, H6, Button, Text } from "tamagui";
import { Plus, LogOut } from '@tamagui/lucide-icons'

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
        return <ActivityIndicator size="large" color="orange" />;
    }

    if (!motorista) {
        return (
            <View style={styles.container}>
                <Text>Erro ao carregar perfil. Tente novamente.</Text>
            </View>
        );
    }


    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
                <View style={{ alignItems: 'center', marginVertical: 20 }}>
                    <H3 style={{ color: 'black' }}>{motorista.nome}</H3>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Button
                        onPress={() => {
                            router.push('/EditProfile')
                        }}
                        style={{ backgroundColor: 'black', color: 'white', width: 240, marginBottom: 10 }}
                        icon={Plus}
                    >
                        Editar Perfil
                    </Button>
                    <Button
                        onPress={() => {
                            router.push('/InfoCar')
                        }}
                        style={{ backgroundColor: 'black', color: 'white', width: 240, marginBottom: 10 }}
                        icon={Plus}
                    >
                        Informações do Veiculo
                    </Button>
                    <Button
                        onPress={() => {
                            router.push('/EditCar')
                        }}
                        style={{ backgroundColor: 'black', color: 'white', width: 240, marginBottom: 10 }}
                        icon={Plus}
                    >
                        Editar Veiculo
                    </Button>
                    <Button
                        onPress={() => {
                            router.push('/TravelHistory')
                        }}
                        style={{ backgroundColor: 'black', color: 'white', width: 240, marginBottom: 10 }}
                        icon={Plus}
                    >
                        Historico de entregas
                    </Button>
                    <Button
                        onPress={(handleLogout)}
                        style={{ backgroundColor: 'red', color: 'white', width: 240, marginBottom: 10 }}
                        icon={LogOut}
                    >
                        Sair
                    </Button>
                </View>
            </ScrollView>
            <BottomBar screen="Profile" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    }
});