import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { router } from 'expo-router';


export default function RegisterDriver(){
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [cpf, setCpf] = useState('');

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
        value={phone}
        onChangeText={setPhone}
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
        <Button mode="outlined" onPress={() => console.log('Back')}>
          Voltar
        </Button>
        <Button mode="contained" onPress={() => router.push('/RegisterDriverAddress')}>
          Next
        </Button>
      </View>
    </View>
  );
};

//<Button
//onPress={() => {
  //  router.push('/Register-driver');
 // }}
 // style={styles.button}
//>



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


  


