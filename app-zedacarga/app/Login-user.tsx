import React, { useState } from 'react';
import { Image, View, TouchableOpacity, Text } from 'react-native';
import { H4, H6, Button, Input } from 'tamagui';

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
    <View className="flex-1 bg-white justify-center items-center">
      <View className="justify-center items-center mb-6">
        <Image
          
          source={require('./public/images/logo.png')}
        />
      </View>
      <View className="mb-4">
        <H4>ENTRAR</H4>
      </View>

      <View className="w-3/5 items-center mb-4">
        <View>
          <H6>Email</H6>
          <Input
            value={email}
            onChangeText={setEmail}
            className="w-full bg-white text-black rounded shadow border border-gray-300"
            placeholder="Digite seu e-mail"
          />
        </View>
        <View>
          <H6>Senha</H6>
          <Input
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
            className="w-full bg-white text-black rounded shadow border border-gray-300"
            placeholder="Digite sua senha"
          />
        </View>
        {error && <Text className="text-red-500 mt-2 text-center">{error}</Text>}

        <Button onPress={handleLogin} className="w-48 bg-orange-500 rounded-full mt-6 text-white">
          Entrar
        </Button>
        <H6 className="my-4">Ou</H6>
        <Button
          onPress={handleGoogleLogin}
          icon={
            <Image
              source={require('./public/images/google-icon.png')}
              className="w-6 h-6 mr-2"
            />
          }
          className="bg-orange-500 text-white"
        >
          Logar com o Google
        </Button>

        <TouchableOpacity>
          <H6 className="text-blue-400 underline mt-4">Esqueceu a senha?</H6>
        </TouchableOpacity>
      </View>
    </View>
  );
}
