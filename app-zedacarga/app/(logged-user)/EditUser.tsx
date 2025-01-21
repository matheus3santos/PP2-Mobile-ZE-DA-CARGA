import { H6, Input, Button } from 'tamagui';
import { View, StyleSheet, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';
import axiosInstance from '../config/axiosUrlConfig';
import { TextInputMask } from 'react-native-masked-text';


export default function EditProfileUser() {
    // Definindo os estados
    const [userId, setUserId] = useState<string | null>(null);
    const [nome, setNome] = useState<string>('');
    const [telefone, setTelefone] = useState<string>('');
    const [cpf, setCpf] = useState<string>('');
    const [cep, setCep] = useState<string>('');
    const [residenciaNumero, setResidenciaNumero] = useState<string>('');
    const [foto, setFoto] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [dataNascimento, setDataNascimento] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    // Carregar dados do perfil
    useEffect(() => {
        const fetchProfileData = async () => {
            const token = await SecureStore.getItemAsync('token');
            const email = await SecureStore.getItemAsync('email');
            // Converte uma data no formato YYYY-MM-DD para DD/MM/YYYY
            const formatDate = (date: string): string => {
                if (!date) return '';
                const [year, month, day] = date.split('-');
                return `${day}/${month}/${year}`;
            };


            if (!token || !email) {
                router.push('/'); // Redireciona se não estiver logado
                return;
            }

            try {
                const response = await axiosInstance.get('/api/cliente');
                const clienteData = response.data.find((cliente: any) => cliente.email === email);

                if (clienteData) {
                    setUserId(clienteData.id);
                    setNome(clienteData.nome);
                    setTelefone(clienteData.telefone);
                    setCpf(clienteData.cpf);
                    setCep(clienteData.cep);
                    setResidenciaNumero(clienteData.residenciaNumero);
                    setFoto(clienteData.foto);
                    setDataNascimento(formatDate(clienteData.dataNascimento));
                    setEmail(clienteData.email);
                }
            } catch (error) {
                console.error('Erro ao buscar dados do perfil:', error);
                Alert.alert('Erro', 'Não foi possível carregar os dados do perfil.');
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, []);

    // Atualizar os dados do perfil
    const handleSave = async () => {
        if (!userId) {
            Alert.alert('Erro', 'Usuário não identificado.');
            return;
        }

        try {
            const token = await SecureStore.getItemAsync('token');
            if (!token) {
                Alert.alert('Erro', 'Token não encontrado.');
                return;
            }

            // O payload já considera a data no formato DD/MM/YYYY
            const payload = {
                nome: nome.trim(),
                telefone: telefone.trim(),
                cpf: cpf.trim(),
                cep: cep.trim(),
                residenciaNumero: residenciaNumero.trim(),
                foto: foto || '',
                dataNascimento: dataNascimento, // No formato DD/MM/YYYY
                email: email,
            };

            console.log('Payload enviado:', payload);

            const response = await axiosInstance.put(`/api/cliente/${userId}`, payload, {
                headers: { Authorization: `Bearer ${token}` }
            });

            console.log('Resposta da API:', response.data);

            Alert.alert('Sucesso', 'Dados atualizados com sucesso!');
            router.push('/(logged-user)/ProfileUser');
        } catch (error: any) {
            console.error('Erro ao atualizar os dados:', error);

            if (error.response) {
                console.error('Detalhes do erro:', error.response.data);
                Alert.alert('Erro', `Não foi possível salvar os dados: ${error.response.data.message || 'Erro desconhecido.'}`);
            } else {
                Alert.alert('Erro', 'Ocorreu um erro inesperado.');
            }
        }
    };


    if (loading) {
        return <H6>Carregando...</H6>;
    }

    return (
        <View style={styles.container}>
            <H6 style={styles.title}>Editar Perfil</H6>
            <Input placeholder="Nome" value={nome} onChangeText={setNome} style={styles.input} />
            <Input
                placeholder="Número de Telefone"
                value={telefone}
                onChangeText={setTelefone}
                keyboardType="phone-pad"
                style={styles.input}
            />
            <Input placeholder="CPF" value={cpf} onChangeText={setCpf} keyboardType="numeric" style={styles.input} />
            <Input placeholder="CEP" value={cep} onChangeText={setCep} keyboardType="numeric" style={styles.input} />
            <Input
                placeholder="Número da Residência"
                value={residenciaNumero}
                onChangeText={setResidenciaNumero}
                keyboardType="numeric"
                style={styles.input}
            />

            <Input
                placeholder="Data de Nascimento"
                value={dataNascimento} // A data já estará no formato DD/MM/YYYY
                onChangeText={setDataNascimento} // Atualiza diretamente no formato DD/MM/YYYY
                keyboardType="numeric"
                style={styles.input}
            />

            <Input
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
            />
            <Button theme="blue" onPress={handleSave} style={styles.saveButton}>
                Salvar
            </Button>
            <Button theme="blue" onPress={() => router.push('/(logged-user)/ProfileUser')} style={styles.saveButton}>
                Cancelar
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 16,
    },
    title: {
        textAlign: 'center',
        marginBottom: 16,
        fontSize: 18,
        fontWeight: 'bold',
    },
    input: {
        marginBottom: 16,
        backgroundColor: '#f9f9f9',
    },
    saveButton: {
        marginTop: 24,
    },
    disabledInput: {
        backgroundColor: '#e0e0e0', // Cinza claro para indicar que é não editável
    },
});
