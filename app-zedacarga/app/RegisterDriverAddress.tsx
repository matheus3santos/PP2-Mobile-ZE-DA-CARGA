import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { router } from 'expo-router';


export default function RegisterDriverAddress(){


    const [endereco, setEndereco] = useState('');
    const [rua, setRua] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [numero, setNumero] = useState('');
    const [cep, setCep] = useState('');
    const [complemento, setComplemento] = useState('');
    const [cidade2, setCidade2] = useState('');
    const [estado2, setEstado2] = useState('');


    return(

        <View style={styles.container}>
      <Text style={styles.label}>Endereço</Text>
      <TextInput
        mode="outlined"
        placeholder="Digite o endereço"
        value={endereco}
        onChangeText={setEndereco}
        style={styles.input}
      />

      <Text style={styles.label}>Rua</Text>
      <TextInput
        mode="outlined"
        placeholder="Digite a rua"
        value={rua}
        onChangeText={setRua}
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

      <Text style={styles.label}>Cidade</Text>
      <TextInput
        mode="outlined"
        placeholder="Digite a cidade"
        value={cidade2}
        onChangeText={setCidade2}
        style={styles.input}
      />

     

      <View style={styles.buttonContainer}>
        <Button mode="outlined" onPress={() => router.push('/RegisterDriver')}>
          Voltar
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


    
    
  
    
     
      







  


