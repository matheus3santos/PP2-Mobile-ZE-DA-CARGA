

import { Avatar, H3, H4, H5, H6, Button, Text } from "tamagui";
import { Plus, LogOut } from '@tamagui/lucide-icons'
import { router } from "expo-router";

import { Image, TouchableOpacity, ScrollView, View, StyleSheet, ActivityIndicator } from "react-native";



<ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
    {/* Área de Foto e Nome */}
    <View style={{ alignItems: 'center', marginVertical: 20 }}>

        {/* <H3 style={{ color: 'black' }}>{cliente.nome}</H3> */}
    </View>

    <View style={{ alignItems: 'center' }}>
        <Button
            onPress={() => {
                router.push('/(logged-user)/EditUser')
            }}
            style={styles.Button}
            icon={Plus}
        >
            Editar Perfil
        </Button>
        <Button
            onPress={() => {
                router.push('/(logged-user)/RegisterCardUser')
            }}
            style={styles.Button}
            icon={Plus}
        >
            Formas de pagamento
        </Button>

        <Button
            onPress={() => {
                router.push('/(logged-user)/HistoricTravelUser')
            }}
            style={styles.Button}
            icon={Plus}
        >
            Historico de viagens
        </Button>


        <Button
            onPress={handleLogout}>
            style={styles.cancelButton}
            icon={LogOut}
            Sair
        </Button>

    </View>
</ScrollView>

const styles = StyleSheet.create({
    cancelButton: {
        backgroundColor: 'red',
        color: 'white',
        width: 400,
        height: 50,
        marginBottom: 10,
        fontSize: 18,
    },
    Button: {
        backgroundColor: 'black',
        color: 'white',
        width: 400,
        height: 50,
        marginBottom: 10,
        fontSize: 18
    },
    Image: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginBottom: 10,
        backgroundColor: '#f0f0f0',

    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 16,
    },

});