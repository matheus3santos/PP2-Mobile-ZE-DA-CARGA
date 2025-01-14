import { H6, Text, Button } from 'tamagui';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import BottomBarUser from 'components/BottomBarUser';

export default function HistoricTravelUser() {
  const mockTravelData = [
    { id: 1, destination: 'Aeroporto Internacional', date: '10/12/2024', status: 'Concluída' },
    { id: 2, destination: 'Shopping Center', date: '08/12/2024', status: 'Cancelada' },
    { id: 3, destination: 'Centro da Cidade', date: '05/12/2024', status: 'Concluída' },
  ];

  return (
    <View style={styles.container}>
      <H6 style={styles.title}>Histórico de Viagens</H6>

      <ScrollView contentContainerStyle={styles.listContainer}>
        {mockTravelData.map((travel, index) => (
          <TouchableOpacity
            key={travel.id}
            activeOpacity={0.7}
            onPress={() => {
              if (index === 0) {
                // Apenas redireciona ao clicar no primeiro item
                router.push('/(logged-user)/TravelInformationUser');
              }
            }}
          >
            <View style={styles.travelItem}>
              <Text style={styles.destination}>{travel.destination}</Text>
              <Text style={styles.date}>{travel.date}</Text>
              <Text style={[styles.status, travel.status === 'Concluída' ? styles.completed : styles.canceled]}>
                {travel.status}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <BottomBarUser screen="HistoricTravelUser" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    textAlign: 'center',
    marginVertical: 16,
    fontSize: 18,
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 16,
  },
  travelItem: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  destination: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  date: {
    fontSize: 14,
    color: '#555',
    marginVertical: 4,
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  completed: {
    color: 'green',
  },
  canceled: {
    color: 'red',
  },
});
