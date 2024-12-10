import React, { useState } from 'react';
import { Image, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { H4, H6, Button, Input } from 'tamagui';
import { router } from 'expo-router';


export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (email === 'teste@mock.com' && senha === '123456') {
      setError('');
      alert('Login realizado com sucesso!');
    } else {
      setError('E-mail ou senha inválidos.');
    }
  };

  const handleGoogleLogin = () => {
    alert('Login com Google mockado!');
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={[styles.image, { resizeMode: 'stretch' }]}
          source={require('./public/images/logo.png')}
        />
      </View>
      <View style={styles.textContainer}>
        <H4>ENTRAR</H4>
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
        <View style={[styles.inputGroup, { marginTop: 16 }]}>
          <H6>Senha</H6>
          <Input
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
            className="w-80 bg-white text-black rounded shadow hover:border-orange-600"
            placeholder="Digite sua senha"
          />
        </View>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <Button onPress={() => { router.push('/(logged-driver)/Home') }} className="marginTop-10 w-60 bg-orange-500 rounded-3xl mt-8 text-white">
          Entrar
        </Button>
        <H6 style={{ marginVertical: 16 }}>Ou</H6>
        <Button
          onPress={handleGoogleLogin}
          icon={
            <Image
              source={require('./public/images/google-icon.png')}
              style={{ width: 24, height: 24, marginRight: 8 }}
            />
          }
          className="bg-orange-500 text-white"
        >
          Logar com o Google
        </Button>

        <TouchableOpacity>
          <H6 style={styles.forgotPasswordText}>Esqueceu a senha?</H6>
        
        </TouchableOpacity>

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
    borderRadius: 24,
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
