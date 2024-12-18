
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function NearbyFrete(){
    return(
        <View style={styles.container}>
        {/* Título */}
        <Text style={styles.title}>Procurando por Fretes próximos</Text>
  
        {/* Ícone do Caminhão */}
        <View style={styles.iconContainer}>
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1531/1531228.png' }} // Exemplo de ícone de caminhão
            style={styles.truckIcon}
          />
        </View>
  
        {/* Localização */}
        <View style={styles.section}>
          <Icon name="location-pin" size={24} color="#EA4335" />
          <View>
            <Text style={styles.label}>Minha localização</Text>
            <Text style={styles.locationText}>Cavaleiro Express</Text>
          </View>
        </View>
  
        {/* Pagamento */}
        <View style={styles.section}>
          <Icon name="credit-card" size={24} color="#666" />
          <View>
            <Text style={styles.label}>Payment</Text>
            <Text style={styles.cardText}>
              Card: <Text style={styles.hiddenCard}>●●●● ●●●● ●●●●</Text> 7846
            </Text>
          </View>
        </View>
  
        {/* Valor (esverdeado e cortado) */}
        <Text style={styles.price}>₦2400</Text>
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      borderRadius: 20,
      padding: 20,
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 2, height: 2,},
      shadowOpacity: 0.3,
      shadowRadius: 5,
      margin: 10,

    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 10,
    },
    iconContainer: {
      alignItems: 'center',
      marginBottom: 20,
    },
    truckIcon: {
      width: 60,
      height: 60,
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
    },
    label: {
      fontSize: 14,
      color: '#666',
    },
    locationText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#333',
    },
    cardText: {
      fontSize: 16,
      color: '#333',
    },
    hiddenCard: {
      letterSpacing: 2,
    },
    price: {
      fontSize: 18,
      color: '#40A578',
      textDecorationLine: 'line-through',
      textAlign: 'right',
      marginTop: 10,
    },
  });
