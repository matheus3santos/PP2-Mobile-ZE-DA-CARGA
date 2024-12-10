import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { router } from 'expo-router';


export default function RegisterDriverCNH(){


    const [cnh, setCnh] = useState('');
    const [renavam, setRenavam] = useState('');
    const [placa, setPlaca] = useState('');
    const [documentacao, setDocumentacao] = useState('');
    const [ano, setAno] = useState('');
    const [modelo, setModelo] = useState('');
    const [cor, setCor] = useState('');
   

    return(

        <View style={styles.container}>
      <Text style={styles.label}>CNH</Text>
      <TextInput
        mode="outlined"
        placeholder="Digite o CNH"
        value={cnh}
        onChangeText={setCnh}
        style={styles.input}
      />

      <Text style={styles.label}>Renavam</Text>
      <TextInput
        mode="outlined"
        placeholder="Digite a rua"
        value={renavam}
        onChangeText={setRenavam}
        style={styles.input}
      />

      <Text style={styles.label}>Placa</Text>
      <TextInput
        mode="outlined"
        placeholder="Digite a cidade"
        value={placa}
        onChangeText={setPlaca}
        style={styles.input}
      />

      <Text style={styles.label}>Documentação</Text>
      <TextInput
        mode="outlined"
        placeholder="Digite o estado"
        value={documentacao}
        onChangeText={setDocumentacao}
        style={styles.input}
      />

      <View style={styles.row}>
        <View style={styles.halfInput}>
          <Text style={styles.label}>Ano</Text>
          <TextInput
            mode="outlined"
            placeholder="Digite o número"
            value={ano}
            onChangeText={setAno}
            style={styles.input}
          />
        </View>
        <View style={styles.halfInput}>
          <Text style={styles.label}>Modelo</Text>
          <TextInput
            mode="outlined"
            placeholder="Digite o CEP"
            value={modelo}
            onChangeText={setModelo}
            style={styles.input}
          />
        </View>
      </View>

      <Text style={styles.label}>Cor do veiculo</Text>
      <TextInput
        mode="outlined"
        placeholder="Digite o complemento"
        value={cor}
        onChangeText={setCor}
        style={styles.input}
      />

      

     

      <View style={styles.buttonContainer}>
        <Button mode="outlined" onPress={() => console.log('Voltar')}>
          Voltar
        </Button>
        <Button mode="contained" onPress={() => console.log('Próximo')}>
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


    
    
  
    
     
      







  


