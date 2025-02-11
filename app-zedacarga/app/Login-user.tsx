import React, { useState } from 'react';
import { Image, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { H4, H6, Button, Input } from 'tamagui';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import axiosInstance from './config/axiosUrlConfig';

export default function Login() {
  const [email, setEmail] = useState('');
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
      const response = await axiosInstance.get('/api/cliente');
      const cliente = response.data.find((cliente: any) => cliente.email === email);

      if (cliente) {
        // Armazena os dados e o token no SecureStore
        await SecureStore.setItemAsync('token', `secure_token_${cliente.id}`);
        await SecureStore.setItemAsync('email', cliente.email);

        router.push('/(logged-user)/Home'); // Redireciona para o perfil
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
          style={[styles.image, { resizeMode: 'contain' }]}
          source={require('../public/images/logo.png')}
        />
      </View>
      <View style={styles.textContainer}>
        <H4>USUARIO</H4>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <H6>Email</H6>
          <Input
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            placeholder="Digite seu e-mail"
          />
        </View>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <Button
          onPress={handleGoogleLogin}
          icon={
            <Image
              source={require('../public/images/google-icon.png')}
              style={styles.googleIcon}
            />
          }
          style={styles.googleButton}
        >
          Logar com o Google
        </Button>



        <TouchableOpacity>
          <H6
            style={styles.forgotPasswordText}
            onPress={() => {
              router.push('/RegisterUser');
            }}
          >
            Criar nova conta
          </H6>
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
    paddingHorizontal: 20,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
  },
  textContainer: {
    marginBottom: 20,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  inputGroup: {
    width: '100%',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    backgroundColor: 'white',
    color: 'black',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
    textAlign: 'center',
  },
  googleButton: {
    backgroundColor: '#f4f4f4',
    color: 'black',
    marginTop: 10,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  forgotPasswordText: {
    color: '#007AFF',
    textDecorationLine: 'underline',
    marginTop: 15,
  },
});
