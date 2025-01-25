import { Avatar, H3, H4, H5, H6, Button, Text, Input } from "tamagui";
import { Plus, LogOut, Car } from '@tamagui/lucide-icons'
import { Image, TouchableOpacity, ScrollView, View, ActivityIndicator, StyleSheet, Alert, Modal } from "react-native";
import { router } from "expo-router";
import BottomBar from "components/BottomBar";
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from "react";
import axiosInstance from "app/config/axiosUrlConfig";

interface Motorista {
    id?: number;
    email: string;
    veiculo?: {
        placa: string;
        modelo: string;
        renavam: string;
        cor: string;
        ano: string;
    };
}

interface VeiculoFormData {
    placa: string;
    modelo: string;
    renavam: string;
    cor: string;
    ano: string;
}

export default function InfoCar() {
    const [motorista, setMotorista] = useState<Motorista | null>(null);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [veiculoForm, setVeiculoForm] = useState<VeiculoFormData>({
        placa: '',
        modelo: '',
        renavam: '',
        cor: '',
        ano: ''
    });

    useEffect(() => {
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
                    motoristaData.veiculo = motoristaData.veiculo || null;
                }

                setMotorista(motoristaData || null);
            } catch (e) {
                console.error('Erro ao buscar dados do perfil:', e);
                setMotorista(null);
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, []);

    const handleCadastrarVeiculo = async () => {
        if (!motorista?.id) {
            Alert.alert('Erro', 'Motorista não identificado');
            return;
        }

        try {
            const response = await axiosInstance.post(`/api/motorista/veiculo/motorista/${motorista.id}`, veiculoForm);

            // Atualiza o motorista com o novo veículo
            setMotorista(prev => prev ? { ...prev, veiculo: response.data } : null);

            setModalVisible(false);
            Alert.alert('Sucesso', 'Veículo cadastrado com sucesso');
        } catch (error) {
            console.error('Erro ao cadastrar veículo:', error);
            Alert.alert('Erro', 'Não foi possível cadastrar o veículo');
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" color="orange" />;
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
                <View style={styles.cardContainer}>
                    {motorista?.veiculo ? (
                        <>
                            <Car size={50} color="black" style={styles.icon} />
                            <View style={styles.vehicleInfo}>
                                <H5 style={styles.infoText}>Modelo: {motorista.veiculo.modelo || 'N/A'}</H5>
                                <H6 style={styles.infoText}>Placa: {motorista.veiculo.placa || 'N/A'}</H6>
                                <H6 style={styles.infoText}>Cor: {motorista.veiculo.cor || 'N/A'}</H6>
                                <H6 style={styles.infoText}>Ano: {motorista.veiculo.ano || 'N/A'}</H6>
                                <H6 style={styles.infoText}>RENAVAM: {motorista.veiculo.renavam || 'N/A'}</H6>
                            </View>
                            <Button
                                onPress={() => {
                                    router.push('/Profile')
                                }}
                                style={styles.backButton}
                            >
                                Voltar
                            </Button>

                        </>
                    ) : (
                        <View style={styles.noVehicleContainer}>
                            <Text style={styles.noVehicleText}>Não existe veículo cadastrado</Text>
                            <Button
                                onPress={() => setModalVisible(true)}
                                icon={<Plus />}
                                style={styles.cadastrarButton}
                            >
                                Cadastrar Veículo
                            </Button>
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
                            <Text style={styles.modalTitle}>Cadastrar Veículo</Text>

                            <Input
                                placeholder="Placa"
                                value={veiculoForm.placa}
                                onChangeText={(text) => setVeiculoForm(prev => ({ ...prev, placa: text }))}
                                style={styles.input}
                            />
                            <Input
                                placeholder="Modelo"
                                value={veiculoForm.modelo}
                                onChangeText={(text) => setVeiculoForm(prev => ({ ...prev, modelo: text }))}
                                style={styles.input}
                            />
                            <Input
                                placeholder="RENAVAM"
                                value={veiculoForm.renavam}
                                onChangeText={(text) => setVeiculoForm(prev => ({ ...prev, renavam: text }))}
                                style={styles.input}
                            />
                            <Input
                                placeholder="Cor"
                                value={veiculoForm.cor}
                                onChangeText={(text) => setVeiculoForm(prev => ({ ...prev, cor: text }))}
                                style={styles.input}
                            />
                            <Input
                                placeholder="Ano"
                                value={veiculoForm.ano}
                                onChangeText={(text) => setVeiculoForm(prev => ({ ...prev, ano: text }))}
                                style={styles.input}
                            />

                            <View style={styles.modalButtonContainer}>
                                <Button
                                    onPress={() => setModalVisible(false)}
                                    style={styles.cancelButton}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    onPress={handleCadastrarVeiculo}
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
    )
}


const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        padding: 20,
        margin: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3
    },
    icon: {
        marginBottom: 15
    },
    vehicleInfo: {
        alignItems: 'center'
    },
    infoText: {
        color: 'black',
        marginVertical: 5
    },
    noVehicleContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    noVehicleText: {
        color: 'black',
        fontSize: 16,
        marginBottom: 15
    },
    cadastrarButton: {
        backgroundColor: 'orange',
        color: 'white'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalContent: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center'
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15
    },
    input: {
        width: '100%',
        marginVertical: 10
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 15
    },
    cancelButton: {
        backgroundColor: 'gray',
        color: 'white',
        flex: 1,
        marginRight: 10
    },
    confirmButton: {
        backgroundColor: 'orange',
        color: 'white',
        flex: 1
    }
    ,
    backButton: {
        backgroundColor: 'orange',
        color: 'white',
        padding: 10,
        width: 100,
        alignItems: 'center',
        marginTop: 20,

    }
});