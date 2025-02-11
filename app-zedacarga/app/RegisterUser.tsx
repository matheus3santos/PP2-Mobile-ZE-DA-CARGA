import React, { useState, useEffect } from 'react';
import { H2, H6, Input, Button } from 'tamagui';
import { Image, View, ScrollView } from 'react-native';
import { router } from 'expo-router';
import axiosInstance from './config/axiosUrlConfig';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { TextInputMask } from 'react-native-masked-text';
import { styles } from '../styles/RegisterUser.style';


export default function RegisterUser() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [confirmPassword, setConfirmPassword] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cpf, setCpf] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [rua, setLogradouro] = useState('');
    const [numero, setNumero] = useState('');
    const [cep, setCep] = useState('');
    const [error, setError] = useState('');


    // Função para verificar o CEP
    const verificarCEP = async () => {
        if (cep.length === 8) {
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                const data = await response.json();

                // Se o CEP for válido, preenche o logradouro, caso contrário, mostra erro
                if (data.erro) {
                    setErro(true);
                    setLogradouro('');
                } else {
                    setErro(false);
                    setLogradouro(data.logradouro);
                }
            } catch (error) {
                setErro(true);
                setLogradouro('');
                console.error('Erro ao buscar o CEP:', error);
            }
        } else {
            setErro(true);
            setLogradouro('');
        }
    };

    // Chama a validação sempre que o CEP mudar
    useEffect(() => {
        verificarCEP();
    }, [cep]);

    // const validateEmail = (email) => {
    //     const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //     const isValid = re.test(String(email).toLowerCase());
    //     console.log(`Validating email: ${email} - Valid: ${isValid}`);
    //     return isValid;
    // };

    // const validatePassword = (password) => {
    //     const isValid = password.length >= 6;
    //     console.log(`Validating password: ${password} - Valid: ${isValid}`);
    //     return isValid;
    // };

    // const validatePhone = (phone) => {
    //     const re = /^\d{10,11}$/;
    //     const isValid = re.test(phone);
    //     console.log(`Validating phone: ${phone} - Valid: ${isValid}`);
    //     return isValid;
    // };

    // const handleSubmit = () => {
    //     console.log('Submitting form');
    //     console.log(`Name: ${name}`);
    //     console.log(`Email: ${email}`);
    //     console.log(`Password: ${password}`);
    //     console.log(`Confirm Password: ${confirmPassword}`);
    //     console.log(`Phone: ${phone}`);

    //     if (!name) {
    //         setErrorMessage('Nome é obrigatório');
    //         console.log('Nome é obrigatório');
    //         return;
    //     }
    //     if (!validateEmail(email)) {
    //         setErrorMessage('Email inválido');
    //         console.log('Email inválido');
    //         return;
    //     }
    //     if (!validatePassword(password)) {
    //         setErrorMessage('A senha deve ter pelo menos 6 caracteres');
    //         console.log('A senha deve ter pelo menos 6 caracteres');
    //         return;
    //     }
    //     if (password !== confirmPassword) {
    //         setErrorMessage('As senhas não coincidem');
    //         console.log('As senhas não coincidem');
    //         return;
    //     }
    //     if (!validatePhone(phone)) {
    //         setErrorMessage('Número de telefone inválido');
    //         console.log('Número de telefone inválido');
    //         return;
    //     }
    //     setErrorMessage('');
    //     console.log('Form is valid, navigating to ConfirmEmailCode');
    //     router.push('/ConfirmEmailCode');
    // };

    const apiRegisterUser = async () => {
        const registerRequestData = {
            nome: nome,
            telefone: telefone,
            cpf: cpf,
            email: email,
            dataNascimento: dataNascimento,
            rua: rua,
            numero: numero,
            cep: cep,
            // password: password
        }
        console.log(registerRequestData)
        try {
            await axiosInstance.post("/api/cliente", registerRequestData).then((response) => {
                console.log(response)
            })
        }
        catch (e) {
            alert(e)
        }
    }

    return (
        <ScrollView className='h-full bg-white'>
            <View className='flex justify-center items-center mt-8'>
                <Image
                    source={require('../public/images/logo.png')}
                    style={{
                        marginTop:30,
                        width: 100,
                        height: 100,
                        justifyContent: 'center',
                        alignSelf: 'center',
                    }}
                    className="w-32 h-32"
                />
            </View>
            <View className="flex items-center mt-4">
                <View style={styles.container}>
                    <H6 style={styles.label}>Nome</H6>
                    <Input
                        style={styles.input}
                        placeholder="Digite seu nome"
                        value={nome}
                        onChangeText={setNome}
                    />
                </View>

                <View style={styles.container}>
                    <H6 style={styles.label}>Data de Nascimento</H6>
                    <TextInputMask
                        style={styles.input}
                        type={'datetime'}
                        placeholder='DD/MM/YYYY'
                        options={{
                            format: 'DD/MM/YYYY'
                        }}
                        value={dataNascimento}
                        onChangeText={setDataNascimento}
                    />
                </View>

                <View style={styles.container}>
                    <H6 style={styles.label}>Email</H6>
                    <Input
                        style={styles.input}
                        placeholder="Digite seu e-mail"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>

                <View style={styles.container}>
                    <H6 style={styles.label}>CPF</H6>
                    <TextInputMask
                        style={styles.input}
                        type={'custom'}
                        placeholder='999.999.999-99'
                        options={{
                            mask: '999.999.999-99'
                        }}
                        value={cpf}
                        onChangeText={setCpf}
                    />
                </View>

                <View style={styles.container}>
                    <H6 style={styles.label}>Telefone</H6>
                    <TextInputMask
                        style={styles.input}
                        type={'custom'}
                        placeholder="(99) 99999-9999"
                        options={{
                            mask: '(99) 99999-9999',
                        }}
                        value={telefone}
                        onChangeText={setTelefone}
                    />
                </View>

                {/* <View style={styles.container}>
                    <H6 style={styles.label}>Rua</H6>
                    <Input
                        style={styles.input}
                        placeholder="Digite sua rua"
                        value={rua}
                        onChangeText={setLogradouro}
                    />
                </View>

                <View style={styles.container}>
                    <H6 style={styles.label}>Número</H6>
                    <Input
                        style={styles.input}
                        placeholder="Digite o número"
                        value={numero}
                        onChangeText={setNumero}
                    />
                </View> */}

                <View style={styles.container}>
                    <H6 style={styles.label}>CEP</H6>
                    <TextInputMask
                        style={styles.input}
                        placeholder="Digite o CEP"
                        type={'custom'}
                        options={{
                            mask: '99999-999',
                        }}
                        value={cep}
                        onChangeText={setCep}
                    />
                </View> 

                {/* <View style={styles.container}>
                    <H6 style={styles.label}>Senha</H6>
                    <Input
                        style={styles.input}
                        placeholder="Digite sua senha"
                    />
                </View>

                <View style={styles.container}>
                    <H6 style={styles.label}>Confirmar senha</H6>
                    <Input
                        style={styles.input}
                        placeholder="Confirme sua senha"
                    />
                </View> */}

                <Button
                    onPress={() => { apiRegisterUser(); router.push('/Login-user') }}
                    style={{
                        width: '60%',
                        backgroundColor: 'green',
                        color: 'black',
                        padding: 10,
                        borderRadius: 5,
                        justifyContent: 'center',
                        alignSelf: 'center',
                        marginBottom: 10,
                        marginTop: 20,
                    }}
                >
                    Cadastrar
                </Button>

                <Button
                    onPress={() => { router.push('/') }}
                    style={{
                        width: '60%',
                        backgroundColor: 'red',
                        color: 'white',
                        padding: 10,
                        borderRadius: 5,
                        justifyContent: 'center',
                        alignSelf: 'center',
                    }}
                >
                    Cancelar
                </Button>
            </View>
        </ScrollView>
    );
}

function setErro(arg0: boolean) {
    throw new Error('Function not implemented.');
}
