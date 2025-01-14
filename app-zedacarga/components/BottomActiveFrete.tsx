import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, SafeAreaView } from 'react-native';
import NearbyFrete from './NearbyFrete';


export default function BottomActiveFrete(){

    const [isEnabled, setIsEnabled] = useState(false); // Estado do botão Switch

    // Função para alternar o estado
    const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
    
    return(
        <SafeAreaView style={styles.container}>
        {/* Título */}
        <Text style={styles.title}>{isEnabled ? 'Ficar offline' : 'Ficar online'}</Text>  
        {/* Switch */}
        <Switch
           
           trackColor={{ false: '#767577', true: '#32CD32' }} // Cinza desligado, Verde ligado
           thumbColor={isEnabled ? '#FFFFFF' : '#f4f3f4'} // Cor da bolinha
           onValueChange={toggleSwitch}
           value={isEnabled}
        />
  
        {/* Componente Condicional */}
        {isEnabled && <NearbyFrete />}
      </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 20,
      marginBottom: 10,
      fontWeight: 'bold',
    },
  });