import { Avatar, H3, H4, H5, H6, Button, Text } from "tamagui";
import { Plus, LogOut } from '@tamagui/lucide-icons'

import { Image, TouchableOpacity, ScrollView, View } from "react-native";
import { router } from "expo-router";
import BottomBarUser from "components/BottomBarUser";
// import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from "react";
// import axiosInstance from "app/config/axiosUrlConfig";

export default function ProfileUser() {

    const [userName, setUserName] = useState('Usuário Exemplo'); // Nome do usuário mockado
    const [profileImage, setProfileImage] = useState<string | null>(
        "https://via.placeholder.com/100" // URL de imagem mockada
    );

    // const[token, setToken] = useState('');
    // const[username, setUsername] = useState('');
    // const[idUser, setIdUser] = useState('');

    // const getUsername = async () => {

    //     const tokenStorage = await SecureStore.getItemAsync('token') || '';
    //     const usernameStorage = await SecureStore.getItemAsync('username') || '';
    //     const idUserStorage = await SecureStore.getItemAsync('idUser') || '';

    //     const tokenParse = JSON.parse(tokenStorage);
    //     const usernameParse = JSON.parse(usernameStorage);
    //     const idUserParse = JSON.parse(idUserStorage);

    //     setUsername(usernameParse)
    // }

    // useEffect(()=>{
    //     getUsername();
    // },[])

    // const logoutAccount = async () => {
    //     await SecureStore.deleteItemAsync('token');
    //     await SecureStore.deleteItemAsync('username');
    //     await SecureStore.deleteItemAsync('idUser');
    //     router.push('/')
    // }



    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
                {/* Área de Foto e Nome */}
                <View style={{ alignItems: 'center', marginVertical: 20 }}>
                    {profileImage ? (
                        <Image
                            source={{ uri: profileImage }}
                            style={{
                                width: 100,
                                height: 100,
                                borderRadius: 50,
                                marginBottom: 10,
                                backgroundColor: '#f0f0f0',
                            }}
                        />
                    ) : (
                        <Avatar
                            circular
                            size="$10"
                            style={{
                                marginBottom: 10,
                                backgroundColor: '#e0e0e0',
                            }}
                        />
                    )}
                    <H3 style={{ color: 'black' }}>{userName}</H3>
                </View>

                <View style={{ alignItems: 'center' }}>
                    <Button
                        onPress={() => {
                            router.push('/(logged-user)/EditUser')
                        }}
                        style={{ backgroundColor: 'black', color: 'white', width: 240, marginBottom: 10 }}
                        icon={Plus}
                    >
                        Editar Perfil
                    </Button>
                    <Button
                        onPress={() => {
                            router.push('/(logged-user)/RegisterCardUser')
                        }}
                        style={{ backgroundColor: 'black', color: 'white', width: 240, marginBottom: 10 }}
                        icon={Plus}
                    >
                        Formas de pagamento
                    </Button>

                    <Button
                        onPress={() => {
                            router.push('/(logged-user)/HistoricTravelUser')
                        }}
                        style={{ backgroundColor: 'black', color: 'white', width: 240, marginBottom: 10 }}
                        icon={Plus}
                    >
                        Historico de viagens
                    </Button>


                    <Button
                        onPress={() => {
                            router.push('/')
                        }}
                        style={{ backgroundColor: 'red', color: 'white', width: 240, marginBottom: 10 }}
                        icon={LogOut}
                    >
                        Sair
                    </Button>

                    
                </View>
            </ScrollView>
            <BottomBarUser screen="ProfileUser" />
        </View>
    )
}