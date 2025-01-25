import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import BottomBar from 'components/BottomBar';
import BottomActiveFrete from 'components/BottomActiveFrete';
import * as SecureStore from 'expo-secure-store';

export default function Index() {
  const [motoristaId, setMotoristaId] = useState<string | null>(null);

  useEffect(() => {
    const getMotoristaId = async () => {
      try {
        const id = await SecureStore.getItemAsync('token');
        if (id) {
          // Remove o prefixo "secure_token_" antes de salvar o ID
          const idSemPrefixo = id.replace('secure_token_', '');
          setMotoristaId(idSemPrefixo);
        }
      } catch (error) {
        console.error('Erro ao recuperar o ID do motorista:', error);
      }
    };

    getMotoristaId();
  }, []);


  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Text style={styles.title}>Bem-vindo, Motorista!</Text>
        {motoristaId ? <Text>ID do Motorista: {motoristaId}</Text> : <Text>Carregando...</Text>}
      </View>

      <View style={styles.buttonContainer}></View>
      <BottomActiveFrete />

      <BottomBar screen="Home" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingBottom: 60, // Adicionado para evitar sobreposição
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
  },
});
