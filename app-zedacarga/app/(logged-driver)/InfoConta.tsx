import { Avatar, H3, H4, H5, H6, Button, Text, Input } from "tamagui";
import { Plus, Landmark } from '@tamagui/lucide-icons';
import { View, ScrollView, ActivityIndicator, StyleSheet, Alert, Modal } from "react-native";
import { router } from "expo-router";
import BottomBar from "components/BottomBar";
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from "react";
import axiosInstance from "app/config/axiosUrlConfig";
import { styles } from '../../styles/InfoContaDriver.style';


interface ContaBancaria {
    id: string;
    nomeBanco: string;
    numeroConta: string;
    digitoConta: string;
    agencia: string;
}

interface Motorista {
    id?: number;
    email: string;
    contas?: ContaBancaria[];
    pagamento?: PagamentoForm[];

}

export interface PagamentoForm {
    id: string;
}

export default function InfoConta() {
    const [motorista, setMotorista] = useState<Motorista | null>(null);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [contaForm, setContaForm] = useState<ContaBancaria>({
        id: '',
        nomeBanco: '',
        numeroConta: '',
        digitoConta: '',
        agencia: ''
    });

    const [pagamentoForm, setPagamentoForm] = useState<PagamentoForm>({
        id: ''
    });

    useEffect(() => {
        fetchProfileData();
    }, []);

    const fetchProfileData = async () => {
        try {
            const token = await SecureStore.getItemAsync('token');
            const email = await SecureStore.getItemAsync('email');

            if (!token || !email) {
                router.push('/');
                return;
            }

            const response = await axiosInstance.get('/api/motorista');
            const motoristaData = response.data.find((m: Motorista) => m.email === email);

            if (motoristaData) {
                motoristaData.contas = motoristaData.contas || [];
            }



            setMotorista(motoristaData || null);
        } catch (e) {
            console.error('Erro ao buscar dados do perfil:', e);
            setMotorista(null);
        } finally {
            setLoading(false);
        }
    };

    const handleCadastrarConta = async () => {
        if (!motorista?.id) {
            Alert.alert('Erro', 'Motorista não identificado');
            return;
        }

        try {
            const response = await axiosInstance.post(`/api/motorista/conta/${motorista.id}`, contaForm);

            // Atualiza a lista de contas após o cadastro
            await fetchProfileData();

            // Limpa o formulário
            setContaForm({
                id: '',
                nomeBanco: '',
                numeroConta: '',
                digitoConta: '',
                agencia: ''
            });

            setModalVisible(false);
            Alert.alert('Sucesso', 'Conta cadastrada com sucesso');
        } catch (error) {
            console.error('Erro ao cadastrar conta:', error);
            Alert.alert('Erro', 'Não foi possível cadastrar a conta');
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" color="orange" />;
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Contas Bancárias</Text>
                    <Button
                        onPress={() => setModalVisible(true)}
                        icon={<Plus />}
                        style={styles.addButton}
                    >
                        Nova Conta
                    </Button>

                </View>

                <View style={styles.cardContainer}>
                    {motorista?.contas?.length ? (
                        motorista.contas.map((conta, index) => (
                            <View key={index} style={styles.accountCard}>
                                <Landmark size={50} color="black" style={styles.icon} />
                                <H4 style={styles.infoText}>Conta Bancária: {conta.id}</H4>
                                <H5 style={styles.infoText}>Banco: {conta.nomeBanco}</H5>
                                <H6 style={styles.infoText}>Conta: {conta.numeroConta}</H6>
                                <H6 style={styles.infoText}>Digito: {conta.digitoConta}</H6>
                                <H6 style={styles.infoText}>Agência: {conta.agencia}</H6>
                            </View>
                        ))
                    ) : (
                        <View style={styles.noAccountContainer}>
                            <Text style={styles.noAccountText}>Nenhuma conta cadastrada</Text>
                        </View>
                    )}
                </View>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Cadastrar Nova Conta</Text>
                            <Input
                                placeholder="Nome do Banco"
                                value={contaForm.nomeBanco}
                                onChangeText={(text) => setContaForm(prev => ({ ...prev, nomeBanco: text }))}
                                style={styles.input}
                            />
                            <Input
                                placeholder="Número da Conta"
                                value={contaForm.numeroConta}
                                onChangeText={(text) => setContaForm(prev => ({ ...prev, numeroConta: text }))}
                                style={styles.input}
                                keyboardType="numeric"
                            />
                            <Input
                                placeholder="Dígito"
                                value={contaForm.digitoConta}
                                onChangeText={(text) => setContaForm(prev => ({ ...prev, digitoConta: text }))}
                                style={styles.input}
                                keyboardType="numeric"
                            />
                            <Input
                                placeholder="Agência"
                                value={contaForm.agencia}
                                onChangeText={(text) => setContaForm(prev => ({ ...prev, agencia: text }))}
                                style={styles.input}
                                keyboardType="numeric"
                            />

                            <View style={styles.modalButtonContainer}>
                                <Button
                                    onPress={() => setModalVisible(false)}
                                    style={styles.cancelButton}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    onPress={handleCadastrarConta}
                                    style={styles.confirmButton}
                                >
                                    Cadastrar
                                </Button>
                            </View>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
            <BottomBar screen="Profile" />
        </View>
    );
}

