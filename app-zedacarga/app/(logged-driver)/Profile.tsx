import { Avatar, H3, H4, H5, H6, Button, Text } from "tamagui";
import { Plus, LogOut } from '@tamagui/lucide-icons'

import { Image, TouchableOpacity, ScrollView, View } from "react-native";
import { router } from "expo-router";
import BottomBar from "components/BottomBar";
// import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from "react";
// import axiosInstance from "app/config/axiosUrlConfig";

export default function Profile() {

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
                <View style={{ alignItems: 'center', marginVertical: 20 }}>
                    <H3 style={{ color: 'black' }}>Nome do usuário</H3>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Button
                        onPress={() => {
                            // router.push('MyAddress')
                        }}
                        style={{ backgroundColor: 'black', color: 'white', width: 240, marginBottom: 10 }}
                        icon={Plus}
                    >
                        Editar Perfil
                    </Button>
                    <Button
                        onPress={() => {
                            // router.push('PaymentScreen')
                        }}
                        style={{ backgroundColor: 'black', color: 'white', width: 240, marginBottom: 10 }}
                        icon={Plus}
                    >
                        Informações do Veiculo
                    </Button>
                    <Button
                        onPress={() => {
                            // router.push('NotificationScreen')
                        }}
                        style={{ backgroundColor: 'black', color: 'white', width: 240, marginBottom: 10 }}
                        icon={Plus}
                    >
                        Carteira Digital
                    </Button>
                    <Button
                        onPress={() => {
                             router.push('/TravelHistory')
                        }}
                        style={{ backgroundColor: 'black', color: 'white', width: 240, marginBottom: 10 }}
                        icon={Plus}
                    >
                        Historico de entregas
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
            <BottomBar screen="Profile" />
        </View>
    )
}