import React, { useState, useEffect } from 'react';
import { H2, H6, Input, Button } from 'tamagui';
import { Image, View, ScrollView } from 'react-native';
import { router } from 'expo-router';
import axiosInstance from './config/axiosUrlConfig';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { TextInputMask } from 'react-native-masked-text';


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
                    source={require('./public/images/logo.png')}
                    style={{ width: 100, height: 100 }}
                    className="w-32 h-32"
                />
            </View>
            <H2 className="text-center text-orange-500">Registrar</H2>
            <View className="flex items-center mt-4">
                <View className="w-80 mt-4 border border-blue-500 rounded">
                    <H6 className="text-black">Nome</H6>
                    <Input
                        className="bg-white text-black"
                        placeholder="Digite seu nome"
                        value={nome}
                        onChangeText={setNome}
                    />
                </View>

                <View className="w-80 mt-4 border border-blue-500 rounded">
                    <H6 className="text-black">Data de Nascimento</H6>
                    <TextInputMask
                        style={{
                            width: '100%',
                            backgroundColor: 'white',
                            color: 'black',
                            padding: 10,
                            borderRadius: 5,
                            borderColor: 'blue',
                        }}
                        type={'datetime'}
                        placeholder='DD/MM/YYYY'
                        options={{
                            format: 'DD/MM/YYYY'
                        }}
                        value={dataNascimento}
                        onChangeText={setDataNascimento}
                    />
                </View>

                <View className="w-80 mt-4 border border-blue-500 rounded">
                    <H6 className="text-black">Email</H6>
                    <Input
                        className="bg-white text-black"
                        placeholder="Digite seu e-mail"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>

                <View className="w-80 mt-4 border border-blue-500 rounded">
                    <H6 className="text-black">CPF</H6>
                    <TextInputMask
                        style={{
                            width: '100%',
                            backgroundColor: 'white',
                            color: 'black',
                            padding: 10,
                            borderRadius: 5,
                        }}
                        type={'custom'}
                        placeholder='999.999.999-99'
                        options={{
                            mask: '999.999.999-99'
                        }}
                        value={cpf}
                        onChangeText={setCpf}
                    />
                </View>

                <View className="w-80 mt-4 border border-blue-500 rounded">
                    <H6 className="text-black">Telefone</H6>
                    <TextInputMask
                        style={{
                            width: '80%',
                            backgroundColor: 'white',
                            color: 'black',
                            padding: 10,
                            borderRadius: 5,
                            borderColor: 'brown',
                            marginLeft : 10,
                            borderWidth: 2
                        }}
                        type={'custom'}
                        placeholder='(99) 99999-9999'
                        options={{
                            mask: '(99) 99999-9999'
                        }}
                        value={telefone}
                        onChangeText={setTelefone}
                    />
                </View>

                <View className="w-80 mt-4 border border-blue-500 rounded">
                    <H6 className="text-black">Rua</H6>
                    <Input
                        className="bg-white text-black"
                        placeholder="Digite sua rua"
                        value={rua}
                        onChangeText={setLogradouro}
                    />
                </View>

                <View className="w-80 mt-4 border border-blue-500 rounded">
                    <H6 className="text-black">Número</H6>
                    <Input
                        className="bg-white text-black"
                        placeholder="Digite o número"
                        value={numero}
                        onChangeText={setNumero}
                    />
                </View>

                <View className="w-80 mt-4 border border-blue-500 rounded">
                    <H6 className="text-black">CEP</H6>
                    <Input
                        className="bg-white text-black"
                        placeholder="Digite o CEP"
                        value={cep}
                        onChangeText={setCep}
                    />
                </View>

                <View className="w-80 mt-4 border border-blue-500 rounded">
                    <H6 className="text-black">Senha</H6>
                    <Input
                        className="bg-white text-black"
                        placeholder="Digite sua senha"
                    />
                </View>

                <View className="w-80 mt-4 border border-blue-500 rounded">
                    <H6 className="text-black">Confirmar senha</H6>
                    <Input
                        className="bg-white text-black"
                        placeholder="Confirme sua senha"
                    />
                </View>

                <Button
                    onPress={() => { apiRegisterUser() }}
                    style={{
                        width: '60%',
                        backgroundColor: 'green',
                        color: 'black',
                        padding: 10,
                        borderRadius: 5,
                        justifyContent: 'center',
                        alignSelf: 'center',
                    }}
                >
                    Enviar
                </Button>
            </View>
        </ScrollView>
    );
}

function setErro(arg0: boolean) {
    throw new Error('Function not implemented.');
}
