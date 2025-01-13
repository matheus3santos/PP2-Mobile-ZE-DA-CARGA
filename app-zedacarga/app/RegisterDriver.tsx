import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { router } from 'expo-router';
import axios from 'axios';


export default function RegisterDriver(){
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [numeroTelefone, setNumeroTelefone] = useState('');
    const [cpf, setCpf] = useState('');
    const [numeroCnh, setNumeroCnh] = useState('');


    const apiRegisterUser = async () => {
      const registerRequestData = {
          name: name,
          numeroTelefone: numeroTelefone,
          cpf: cpf,
          email: email,
          numeroCnh : numeroCnh
      }
      console.log(registerRequestData)
      try{
        const response = await axios.post('https://d8ab-200-238-97-165.ngrok-free.app/api/motorista', registerRequestData);

        if (response.status === 200 || response.status === 201) {
          console.log('Sucesso:', response.data);
          alert('Dados enviados com sucesso!');
        } else {
          console.error('Erro na resposta:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Erro na requisição:', error.response || error.message);
        alert('Houve um erro ao enviar os dados.');
          //await axiosInstance.post("/api/motorista", registerRequestData).then((response)=>{
              //console.log(response)
              //alert("Informações salvas com sucesso")
          //})
      }
      //catch (e) {
         // alert(e)
      //}
  }


  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome</Text>
      <TextInput
        mode="outlined"
        placeholder="Digite seu nome"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        mode="outlined"
        placeholder="Digite seu email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      <Text style={styles.label}>Telefone</Text>
      <TextInput
        mode="outlined"
        placeholder="(00) 9 9999-9999"
        keyboardType="phone-pad"
        value={numeroTelefone}
        onChangeText={setNumeroTelefone}
        style={styles.input}
      />

      <Text style={styles.label}>CNH</Text>
      <TextInput
        mode="outlined"
        placeholder="Digite o CNH"
        value={numeroCnh}
        onChangeText={setNumeroCnh}
        style={styles.input}
      />

      <Text style={styles.label}>CPF</Text>
      <TextInput
        mode="outlined"
        placeholder="000.000.000-00"
        keyboardType="numeric"
        value={cpf}
        onChangeText={setCpf}
        style={styles.input}
      />

      <View style={styles.buttonContainer}>
        <Button mode="outlined" onPress={() => router.push('/Login-driver')}>
          Voltar
        </Button>
        <Button mode="outlined" onPress={apiRegisterUser}>
          Salvar informações 
        </Button>
        <Button mode="contained" onPress={() => router.push('/RegisterDriverAddress')}>
          Next
        </Button>
      </View>
    </View>
  );
}




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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },

});


  