import React, { useState } from 'react';
import { router } from 'expo-router';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

const EditCar = ({ carDetails, onSave, }) => {
  // Estados para armazenar os valores editáveis
  const [modelo, setModelo] = useState(carDetails?.modelo || '');
  const [ano, setAno] = useState(carDetails?.ano || '');
  const [placa, setPlaca] = useState(carDetails?.placa || '');
  const [renavam, setRenavam] = useState(carDetails?.renavam || '');
  const [cor, setCor] = useState(carDetails?.cor || '');
  const [fotoVeiculo, setFotoVeiculo] = useState(carDetails?.fotoVeiculo || '');

  // Função para salvar os dados editados
  const handleSave = () => {
    const updatedCarDetails = {
      modelo,
      ano,
      placa,
      renavam,
      cor,
      fotoVeiculo,
    };

    // Validação simples para garantir que os campos não estejam vazios
    if (!modelo || !ano || !placa || !renavam || !cor || !fotoVeiculo) {
      Alert.alert('Erro', 'Todos os campos devem ser preenchidos.');
      return;
    }

    // Chama a função de callback passada via props
    onSave(updatedCarDetails);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Detalhes do Carro</Text>

      <Text style={styles.label}>Modelo:</Text>
      <TextInput
        style={styles.input}
        value={modelo}
        onChangeText={setModelo}
        placeholder="Digite o modelo"
      />

      <Text style={styles.label}>Ano:</Text>
      <TextInput
        style={styles.input}
        value={ano}
        onChangeText={setAno}
        placeholder="Digite o ano"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Placa:</Text>
      <TextInput
        style={styles.input}
        value={placa}
        onChangeText={setPlaca}
        placeholder="Digite a placa"
      />

      <Text style={styles.label}>Renavam:</Text>
      <TextInput
        style={styles.input}
        value={renavam}
        onChangeText={setRenavam}
        placeholder="Digite o renavam"
      />

      <Text style={styles.label}>Cor:</Text>
      <TextInput
        style={styles.input}
        value={cor}
        onChangeText={setCor}
        placeholder="Digite a cor"
      />



      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelButton} onPress={() => router.push('/(logged-driver)/Profile')}>
        <Text style={styles.buttonText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f4f4f9',
    borderRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  saveButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: '#dc3545',
    padding: 15,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default EditCar;