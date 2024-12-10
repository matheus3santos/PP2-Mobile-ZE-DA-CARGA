import { H6, Input, Button } from 'tamagui';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { router } from "expo-router";


export default function EditProfileUser() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [cpf, setCpf] = useState('');
    const [profileImage, setProfileImage] = useState<string | null>(null);

    const handleImagePick = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setProfileImage(result.assets[0].uri);
        }
    };

    const handleSave = () => {
        alert('Dados salvos com sucesso!');
    };

    return (
        <View style={styles.container}>
            <H6 style={styles.title}>Editar Perfil</H6>

            {/* Área da Foto de Perfil */}
            <View style={styles.profileImageContainer}>
                <TouchableOpacity onPress={handleImagePick}>
                    {profileImage ? (
                        <Image source={{ uri: profileImage }} style={styles.profileImage} />
                    ) : (
                        <View style={styles.placeholder}>
                            <H6 style={styles.placeholderText}>Adicionar Foto</H6>
                        </View>
                    )}
                </TouchableOpacity>
            </View>

            {/* Campos para editar informações */}
            <Input
                placeholder="Nome"
                value={name}
                onChangeText={setName}
                style={styles.input}
            />
            <Input
                placeholder="Número de Telefone"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                style={styles.input}
            />
            <Input
                placeholder="CPF"
                value={cpf}
                onChangeText={setCpf}
                keyboardType="numeric"
                style={styles.input}
            />

            {/* Botão de Salvar */}
            <Button theme="blue" onPress={handleSave} style={styles.saveButton}>
                Salvar
            </Button>

            {/* Botão de Cancelar */}
            <Button theme="blue" onPress={() => {
                router.push('/(logged-user)/ProfileUser')
            }} style={styles.saveButton}>
                Cancelar
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 16,
    },
    title: {
        textAlign: 'center',
        marginBottom: 16,
        fontSize: 18,
        fontWeight: 'bold',
    },
    profileImageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    placeholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#e0e0e0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        fontSize: 14,
        color: '#888',
    },
    input: {
        marginBottom: 16,
        backgroundColor: '#f9f9f9',
    },
    saveButton: {
        marginTop: 24,
    },
});
