import React, { useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import { Button, YStack } from 'tamagui';
import axiosInstance from './config/axiosUrlConfig';
import { styles } from '../styles/EmailVerification.styles';
import { router } from 'expo-router';

export default function EmailVerification() {
    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSendMail = async () => {
        if (!email) {
            Alert.alert('Erro', 'Por favor, digite um email.');
            return;
        }

        if (!isValidEmail(email)) {
            Alert.alert('Erro', 'Por favor, digite um email válido.');
            return;
        }

        setIsLoading(true);
        try {
            console.log('Enviando requisição para envio de código:', {
                endpoint: 'api/auth/send-code',
                email: email
            });

            const response = await axiosInstance.post(`api/auth/send-code?email=${encodeURIComponent(email)}`);
            
            console.log('Resposta do envio de código:', {
                status: response.status,
                data: response.data
            });

            Alert.alert('Sucesso', 'Código de verificação enviado para o e-mail.');
        } catch (error) {
            console.error('Erro detalhado ao enviar código:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });

            const errorMessage = error.response?.data?.message || 'Falha ao enviar o código de verificação.';
            Alert.alert('Erro', errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyCode = async () => {
        if (!verificationCode) {
            Alert.alert('Erro', 'Por favor, digite o código de verificação.');
            return;
        }

        if (!email) {
            Alert.alert('Erro', 'Email não informado.');
            return;
        }

        setIsLoading(true);
        try {
            console.log('Enviando requisição para verificação de código:', {
                endpoint: 'api/auth/verify-code',
                email: email,
                code: verificationCode
            });

            const response = await axiosInstance.post(
                `api/auth/verify-code?email=${encodeURIComponent(email)}&code=${encodeURIComponent(verificationCode)}`
            );

            console.log('Resposta da verificação de código:', {
                status: response.status,
                data: response.data
            });

            if (response.status === 200) {
                Alert.alert('Sucesso', 'E-mail verificado com sucesso!');
                router.push('/Login-driver');
            } else {
                Alert.alert('Erro', 'Código inválido, tente novamente.');
            }
        } catch (error) {
            console.error('Erro detalhado ao verificar código:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });

            const errorMessage = error.response?.data?.message || 'Erro ao verificar código.';
            Alert.alert('Erro', errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <YStack space={4} padding={16}>
            <Text style={styles.label}>Digite seu e-mail:</Text>
            <TextInput
                style={styles.input}
                placeholder="E-mail"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!isLoading}
            />

            <Button 
                onPress={handleSendMail} 
                disabled={isLoading}
            >
                {isLoading ? 'Enviando...' : 'Enviar Código'}
            </Button>

            <Text style={styles.label}>Digite o código recebido:</Text>
            <TextInput
                style={styles.input}
                placeholder="Código de verificação"
                value={verificationCode}
                onChangeText={setVerificationCode}
                keyboardType="numeric"
                editable={!isLoading}
                maxLength={6}
            />

            <Button 
                onPress={handleVerifyCode} 
                style={{ backgroundColor: 'green' }}
                disabled={isLoading}
            >
                {isLoading ? 'Verificando...' : 'Verificar'}
            </Button>
        </YStack>
    );
}