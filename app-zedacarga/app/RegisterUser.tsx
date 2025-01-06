import React, { useState, useEffect } from 'react';
import { H2, H6, Input, Button } from 'tamagui';
import { Image, View } from 'react-native';
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
        <View className='h-full bg-white flex justify-center'>
            {<View className='flex justify-center items-center'>
                <Image
                    source={require('./public/images/logo.png')}
                    style={{ width: 100, height: 100 }}
                    className="w-32 h-32"></Image>
            </View>}
            <H2 className="text-center text-orange-500">Registrar</H2>
            <View className="flex items-center mt-4">
                <View>
                    <H6 className="text-black">Nome</H6>
                    <Input
                        className="w-80 bg-white text-black"
                        placeholder="Digite seu nome"
                        value={nome}
                        onChangeText={setNome}
                    />
                </View>

                {/* Data Nascimento com Máscara */}
                <View>
                    <H6 className="text-black">DD/MM/YYYY</H6>
                    <TextInputMask
                        style={{
                            width: '80%',
                            backgroundColor: 'white',
                            color: 'black',
                            padding: 10,
                            borderRadius: 5,
                        }}
                        type={'datetime'}
                        options={{
                            format: 'DD/MM/YYYY'
                        }}
                        value={dataNascimento}
                        onChangeText={setDataNascimento}
                    />
                </View>

                <View className="mt-4">
                    <H6 className="text-black">Email</H6>
                    <Input
                        className="w-80 bg-white text-black"
                        placeholder="Digite seu e-mail"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>

                <View className="mt-4">
                    <H6 className="text-black">999.999.999-99</H6>
                    <TextInputMask
                        style={{
                            width: '80%',
                            backgroundColor: 'white',
                            color: 'black',
                            padding: 10,
                            borderRadius: 5,
                        }}
                        type={'custom'}
                        options={{
                            mask: '999.999.999-99'
                        }}
                        value={cpf}
                        onChangeText={setCpf}
                    />
                </View>

                <View className="mt-4">
                    <H6 className="text-black">Telefone</H6>
                    <TextInputMask
                        style={{
                            width: '80%',
                            backgroundColor: 'white',
                            color: 'black',
                            padding: 10,
                            borderRadius: 5,
                        }}
                        type={'custom'}
                        options={{
                            mask: '(99) 99999-9999'
                        }}
                        value={telefone}
                        onChangeText={setTelefone}
                    />
                </View>

                <View className="mt-4">
                    <H6 className="text-black">Rua</H6>
                    <Input
                        className="w-80 bg-white text-black"
                        placeholder="Digite sua rua"
                        value={rua}
                        onChangeText={setLogradouro}
                    />

                </View>

                <View className="mt-4">
                    <H6 className="text-black">Número</H6>
                    <Input
                        className="w-80 bg-white text-black"
                        placeholder="Digite o número"
                        value={numero}
                        onChangeText={setNumero}
                    />
                </View>

                <View className="mt-4">
                    <H6 className="text-black">CEP</H6>
                    <Input
                        className="w-80 bg-white text-black"
                        placeholder="Digite o CEP"
                        value={cep}
                        onChangeText={setCep}
                    />
                </View>
                <View className="mt-4">
                    <H6 className="text-black">Senha</H6>
                    <Input
                        className="w-80 bg-white text-black"
                        placeholder="Digite sua senha"
                    // secureTextEntry
                    // value={password}
                    // onChangeText={setPassword}
                    />
                </View>
                <View className="mt-4">
                    <H6 className="text-black">Confirmar senha</H6>
                    <Input
                        className="w-80 bg-white text-black"
                        placeholder="Confirme sua senha"
                    // secureTextEntry
                    // value={confirmPassword}
                    // onChangeText={setConfirmPassword}
                    />
                </View>
                {/* {errorMessage ? (
                    <View className="mt-4">
                        <H6 className="text-red-500">{errorMessage}</H6>
                    </View>
                ) : null} */}
                <Button
                    // Comentário em JSX deve estar dentro de {}
                    onPress={() => { apiRegisterUser() }}
                    className="w-60 bg-orange-500 rounded-3xl mt-8 text-white"
                >
                    Enviar
                </Button>


            </View>
        </View>
    );
}

function setErro(arg0: boolean) {
    throw new Error('Function not implemented.');
}
