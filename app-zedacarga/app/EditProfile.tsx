import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet,TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

const EditProfile = () => {
    const [name, setName] = useState('');
    const [numeroTelefone, setNumeroTelefone] = useState('');
    const [cep, setCep] = useState('');
    const [numero, setNumero] = useState('');

    const handleSave = () => {
        // Save profile logic here
        console.log('Profile saved', { name, numeroTelefone, cep, numero });
    };

    return (
        <View style={styles.container}>
                  <Text style={styles.title}>Editar Seu perfil</Text>
            
            <Text style={styles.label}>Nome</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Digite seu nome"
            />
            <Text style={styles.label}>Número de Telefone</Text>
            <TextInput
                style={styles.input}
                value={numeroTelefone}
                onChangeText={setNumeroTelefone}
                placeholder="Digite seu número de telefone"
                keyboardType="phone-pad"
            />
            <Text style={styles.label}>CEP</Text>
            <TextInput
                style={styles.input}
                value={cep}
                onChangeText={setCep}
                placeholder="Digite seu CEP"
                keyboardType="numeric"
            />
            <Text style={styles.label}>Número</Text>
            <TextInput
                style={styles.input}
                value={numero}
                onChangeText={setNumero}
                placeholder="Digite seu número de residência"
                keyboardType="numeric"
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton}  onPress={() => router.push('/(logged-driver)/Profile')}>
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
        flex: 1,
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
        marginTop: 25

      },

      cancelButton: {
        backgroundColor: '#dc3545',
        padding: 15,
        borderRadius: 4,
        alignItems: 'center',
        marginTop: 8

      },
      buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        marginTop: 5
      },
     
});

export default EditProfile;