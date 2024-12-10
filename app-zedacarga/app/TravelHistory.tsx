import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';

const travelHistory = [
  { id: '1', address: 'Rua Santo Elias', date: '6 de out.', time: '19:31', price: 'R$24,25' },
  { id: '2', address: 'R. Ratapolis, 32', date: '8 de jul.', time: '22:29', price: 'R$35,70' },
  { id: '3', address: 'Cavaleiro Express', date: '20 de mai.', time: '20:56', price: 'R$49,00' },
  { id: '4', address: 'Rua da Moeda', date: '27 de abr.', time: '20:53', price: 'R$100,10' },
];

const TravelHistoryScreen = () => {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer}  onPress={() => { router.push('/InfoTravel') }}>
                   
      <Image
        source={{ uri: 'https://img.icons8.com/ios/50/delivery-truck.png' }} // Ícone de caminhão
        style={styles.icon}
      />
      <View style={styles.textContainer}>
        <Text style={styles.address}>{item.address}</Text>
        <Text style={styles.details}>
          {item.date}, {item.time} - {item.price}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico de viagens</Text>
      <FlatList
        data={travelHistory}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  list: {
    paddingBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  address: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 14,
    color: '#555',
  },
});

export default TravelHistoryScreen;
