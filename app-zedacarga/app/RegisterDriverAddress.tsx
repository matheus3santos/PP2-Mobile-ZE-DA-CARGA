import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { router } from 'expo-router';
import axios from 'axios';
import axiosInstance from './config/axiosUrlConfig';





export default function RegisterDriverAddress() {


  const [bairro, setBairro] = useState('');
  const [rua, setRua] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [numero, setNumero] = useState('');
  const [cep, setCep] = useState('');
  const [complemento, setComplemento] = useState('');


  const apiRegisterUser = async () => {
    const registerRequestData = {
      bairro: bairro,
      rua: rua,
      cidade: cidade,
      estado: estado,
      numero: numero,
      cep: cep,
      complemento: complemento,
    }
    console.log(registerRequestData)
    try {
      const response = await axiosInstance.post("/api/motorista", registerRequestData);

      if (response.status === 200 || response.status === 201) {
        console.log('Sucesso:', response.data);
        alert('Dados enviados com sucesso!');
      } else {
        console.error('Erro na resposta:', response.status, response.statusText);
      }
    }
    catch (error) {
      console.error('Erro na requisição:', error.response || error.message);
      alert('Houve um erro ao enviar os dados.');
      //await axiosInstance.post("/api/motorista", registerRequestData).then((response)=>{
      //console.log(response)
      //alert("Informações salvas com sucesso")
      //})
    }
  }

  return (

    <View style={styles.container}>

      <Text style={styles.label}>Rua</Text>
      <TextInput
        mode="outlined"
        placeholder="Digite a rua"
        value={rua}
        onChangeText={setRua}
        style={styles.input}
      />

      <Text style={styles.label}>Bairro</Text>
      <TextInput
        mode="outlined"
        placeholder="Digite a rua"
        value={bairro}
        onChangeText={setBairro}
        style={styles.input}
      />

      <Text style={styles.label}>Cidade</Text>
      <TextInput
        mode="outlined"
        placeholder="Digite a cidade"
        value={cidade}
        onChangeText={setCidade}
        style={styles.input}
      />

      <Text style={styles.label}>Estado</Text>
      <TextInput
        mode="outlined"
        placeholder="Digite o estado"
        value={estado}
        onChangeText={setEstado}
        style={styles.input}
      />

      <View style={styles.row}>
        <View style={styles.halfInput}>
          <Text style={styles.label}>Número</Text>
          <TextInput
            mode="outlined"
            placeholder="Digite o número"
            value={numero}
            onChangeText={setNumero}
            style={styles.input}
          />
        </View>
        <View style={styles.halfInput}>
          <Text style={styles.label}>CEP</Text>
          <TextInput
            mode="outlined"
            placeholder="Digite o CEP"
            value={cep}
            onChangeText={setCep}
            style={styles.input}
          />
        </View>
      </View>

      <Text style={styles.label}>Complemento</Text>
      <TextInput
        mode="outlined"
        placeholder="Digite o complemento"
        value={complemento}
        onChangeText={setComplemento}
        style={styles.input}
      />






      <View style={styles.buttonContainer}>
        <Button mode="outlined" onPress={() => router.push('/RegisterDriver')}>
          Voltar
        </Button>
        <Button mode="outlined" onPress={apiRegisterUser}>
          Salvar informações
        </Button>
        <Button mode="contained" onPress={() => router.push('/RegisterDriverCNH')}>
          Next
        </Button>
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});


















