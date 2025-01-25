import React, { useState } from 'react';
import { Image, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { H4, H6, Button, Input } from 'tamagui';
import { router } from 'expo-router';
import axiosInstance from './config/axiosUrlConfig';
import * as SecureStore from 'expo-secure-store';



export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex para validar formato de email
    return regex.test(email);
  };

  const handleGoogleLogin = async () => {
    if (!validateEmail(email)) {
      setError('Por favor, insira um email válido.');
      return;
    }

    try {
      const response = await axiosInstance.get('/api/motorista');
      const motorista = response.data.find((motorista: any) => motorista.email === email);

      if (motorista) {
        // Armazena os dados e o token no SecureStore
        await SecureStore.setItemAsync('token', `secure_token_${motorista.id}`);
        await SecureStore.setItemAsync('email', motorista.email);

        router.push('/(logged-driver)/Home'); // Redireciona para o perfil
      } else {
        setError('E-mail não encontrado. Verifique ou crie uma conta.');
      }
    } catch (e) {
      console.error('Erro ao verificar e-mail:', e);
      setError('Ocorreu um erro ao verificar o e-mail. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={[styles.image, { resizeMode: 'stretch' }]}
          source={require('../public/images/logo.png')}
        />
      </View>
      <View style={styles.textContainer}>
        <H4>FRETEIRO</H4>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <H6>Email</H6>
          <Input
            value={email}
            onChangeText={setEmail}
            className="w-80 bg-white text-black rounded shadow hover:border-orange-600"
            placeholder="Digite seu e-mail"
          />
        </View>
        {/* <View style={[styles.inputGroup, { marginTop: 16, marginBottom: 18 }]}>
          <H6>Senha</H6>
          <Input
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
            className="w-80 bg-white text-black rounded shadow hover:border-orange-600"
            placeholder="Digite sua senha"
          />
        </View> */}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <Button onPress={handleGoogleLogin} className="marginTop-20 w-60 bg-orange-500 rounded-3xl mt-8 text-white">
          Entrar
        </Button>

        <TouchableOpacity>
          <H6
            style={styles.forgotPasswordText}
            onPress={() => { router.push('/RegisterDriver') }}>Criar nova conta</H6>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  image: {
    width: 320,
    height: 320,
  },
  textContainer: {
    marginBottom: 16,
  },
  formContainer: {
    width: '80%',
    alignItems: 'center',
  },
  inputGroup: {
    width: '100%',
    marginBottom: 18,
  },
  errorText: {
    color: 'red',
    marginTop: 8,
    textAlign: 'center',
  },
  forgotPasswordText: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 16,
  },
});
