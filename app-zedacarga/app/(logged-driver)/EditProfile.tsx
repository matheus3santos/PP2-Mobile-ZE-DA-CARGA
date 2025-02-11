import { H6, Input, Button } from 'tamagui';
import {
    View,
    StyleSheet,
    Alert,
    Text,
    TextInput,
    ScrollView,
} from 'react-native';
import { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';
import axiosInstance from '../config/axiosUrlConfig';



export default function EditProfile() {
    // Definindo os estados
    const [userId, setUserId] = useState<string | null>(null);
    const [nome, setNome] = useState<string>('');
    const [cpf, setCpf] = useState<string>('');
    const [cep, setCep] = useState<string>('');
    const [foto, setFoto] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [dataNascimento, setDataNascimento] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [numeroCnh, setnumeroCnh] = useState<string>('');
    const [endereco, setEndereco] = useState<string>('');
    const [bairro, setBairro] = useState<string>('');
    const [cidade, setCidade] = useState<string>('');
    const [estado, setEstado] = useState<string>('');
    const [complemento, setComplemento] = useState<string>('');
    const [numero, setNumero] = useState<string>('');

    // Limites de caracteres
    const LIMITS = {
        nome: 100,
        cpf: 11,
        cep: 8,
        cnh: 11,
        endereco: 150,
        bairro: 50,
        cidade: 50,
        estado: 2,
        complemento: 100,
        numero: 10,
        email: 100,
        dataNascimento: 10,
    };


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
                const response = await axiosInstance.get('/api/motorista');
                const motoristaData = response.data.find((motorista: any) => motorista.email === email);

                if (motoristaData) {
                    setUserId(motoristaData.id);
                    setNome(motoristaData.nome);
                    setCpf(motoristaData.cpf);
                    setCep(motoristaData.cep);
                    setFoto(motoristaData.foto);
                    setDataNascimento(formatDate(motoristaData.dataNascimento));
                    setEmail(motoristaData.email);
                    setnumeroCnh(motoristaData.numeroCnh);
                    setEndereco(motoristaData.endereco);
                    setBairro(motoristaData.bairro);
                    setCidade(motoristaData.cidade);
                    setEstado(motoristaData.estado);
                    setComplemento(motoristaData.complemento);
                    setNumero(motoristaData.numero);
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
                cpf: cpf.trim(),
                cep: cep.trim(),
                foto: foto || '',
                dataNascimento: dataNascimento, // No formato DD/MM/YYYY
                email: email,
                numeroCnh: numeroCnh.trim(),
                endereco: endereco.trim(),
                bairro: bairro.trim(),
                cidade: cidade.trim(),
                estado: estado.trim(),
                complemento: complemento.trim(),
                numero: numero.trim(),

            };

            console.log('Payload enviado:', payload);

            const response = await axiosInstance.put(`/api/motorista/${userId}`, payload, {
                headers: { Authorization: `Bearer ${token}` }
            });

            console.log('Resposta da API:', response.data);

            Alert.alert('Sucesso', 'Dados atualizados com sucesso!');
            router.push('/(logged-driver)/Profile');
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
        <View style={{ flex: 1, alignItems: 'center' }}>
            <ScrollView style={styles.container}>
                <Text style={styles.title}>Editar Seu perfil</Text>

                <Text style={styles.label}>Nome</Text>
                <TextInput
                    style={styles.input}
                    value={nome}
                    onChangeText={setNome}
                    placeholder="Digite seu nome"
                />
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Digite seu email"
                />
                <Text style={styles.label}>Data Nascimento</Text>
                <Input
                    placeholder="Data de Nascimento"
                    value={dataNascimento} // A data já estará no formato DD/MM/YYYY
                    onChangeText={setDataNascimento} // Atualiza diretamente no formato DD/MM/YYYY
                    keyboardType="numeric"
                    style={styles.input}
                />
                <Text style={styles.label}>CPF</Text>
                <TextInput
                    style={styles.input}
                    value={cpf}
                    onChangeText={setCpf}
                    placeholder="Digite seu CPF"
                />
                <Text style={styles.label}>CNH</Text>
                <TextInput
                    style={styles.input}
                    value={numeroCnh}
                    onChangeText={setnumeroCnh}
                    placeholder="Digite sua CNH"
                />
                <Text style={styles.label}>Endereço</Text>
                <TextInput
                    style={styles.input}
                    value={endereco}
                    onChangeText={setEndereco}
                    placeholder="Digite seu endereço"
                />
                <Text style={styles.label}>Bairro</Text>
                <TextInput
                    style={styles.input}
                    value={bairro}
                    onChangeText={setBairro}
                    placeholder="Digite seu bairro"
                />
                <Text style={styles.label}>Cidade</Text>
                <TextInput
                    style={styles.input}
                    value={cidade}
                    onChangeText={setCidade}
                    placeholder="Digite sua cidade"
                />
                <Text style={styles.label}>Estado</Text>
                <TextInput
                    style={styles.input}
                    value={estado}
                    onChangeText={setEstado}
                    placeholder="Digite seu estado"
                />
                <Text style={styles.label}>Complemento</Text>
                <TextInput
                    style={styles.input}
                    value={complemento}
                    onChangeText={setComplemento}
                    placeholder="Digite seu complemento"
                />

                <Text style={styles.label}>CEP</Text>
                <TextInput
                    style={styles.input}
                    value={cep}
                    onChangeText={setCep}
                    placeholder="Digite seu CEP"
                    keyboardType="numeric"
                />

                <Input
                    placeholder="Número da Residência"
                    value={numero}
                    onChangeText={setNumero}
                    keyboardType="numeric"
                    style={styles.input}
                />

            </ScrollView>

            <View style={styles.buttonContainer}>
                <Button style={styles.cancelButton} onPress={() => router.push('/(logged-driver)/Profile')}>
                    <Text style={styles.buttonText}>Voltar</Text>
                </Button>
                <Button style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.buttonText}>Salvar</Text>
                </Button>
            </View>


        </View>

    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        paddingBottom: 32,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        paddingTop: 48,
        width: '100%',
        maxWidth: 600,
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 32,
        textAlign: 'center',
        color: '#1a1a1a',
        letterSpacing: 0.5,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
        color: '#4a4a4a',
        letterSpacing: 0.3,
    },
    input: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        padding: 12,
        marginBottom: 20,
        backgroundColor: '#fff',
        fontSize: 16,
        color: '#2d2d2d',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
        gap: 16,
    },
    saveButton: {
        backgroundColor: '#34C759',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        flex: 1,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cancelButton: {
        backgroundColor: '#FF3B30',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        flex: 1,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
        letterSpacing: 0.5,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    loadingText: {
        fontSize: 18,
        color: '#4a4a4a',
        marginTop: 12,
    },
    inputGroup: {
        marginBottom: 24,
    },
    errorText: {
        color: '#FF3B30',
        fontSize: 12,
        marginTop: 4,
        marginLeft: 4,
    },
});

