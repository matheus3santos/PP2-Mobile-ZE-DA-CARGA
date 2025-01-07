import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { router } from 'expo-router';
import axios from 'axios';


export default function RegisterDriverCNH(){


    const [renavam, setRenavam] = useState('');
    const [placa, setPlaca] = useState('');
    const [ano, setAno] = useState('');
    const [modelo, setModelo] = useState('');
    const [cor, setCor] = useState('');
   

   const apiRegisterUser = async () => {
        const registerRequestData = {
            renavam: renavam,
            placa: placa,
            ano: ano,
            modelo: modelo,
            cor : cor
        }
        console.log(registerRequestData)
        try{
            await axios.post("https://2856-200-238-97-165.ngrok-free.app/api/motorista", registerRequestData).then((response)=>{
                console.log(response)
                alert("Informações salvas com sucesso")
            })
        }
        catch (e) {
            alert(e)
        }
    }

    return(

        <View style={styles.container}>
      

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
        <Button mode="outlined" onPress={() => router.push('/RegisterDriverAddress')}>
          Voltar
        </Button>
        <Button mode="contained" onPress={apiRegisterUser}>
          Confirmar Dados
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


    
    
  
    
     
      







  


