import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const TravelDetailsScreen = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Informações da viagem</Text>
      <Text style={styles.date}>6 de outubro de 2024</Text>
      <Text style={styles.thankYou}>Obrigado pelo Frete,</Text>
      <Text style={styles.name}>Ágatha R. Alves</Text>

      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>R$24,25</Text>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.detailText}>Preço da viagem</Text>
        <Text style={styles.detailValue}>R$21,07</Text>

        <Text style={styles.detailText}>Taxa de intermediação</Text>
        <Text style={styles.detailValue}>R$1,20</Text>

        <View style={styles.separator} />

        <Text style={styles.detailText}>Subtotal</Text>
        <Text style={styles.detailValue}>R$22,27</Text>

        <Text style={styles.detailText}>Custo fixo</Text>
        <Text style={styles.detailValue}>R$1,55</Text>

        <Text style={styles.detailText}>Tempo de espera</Text>
        <Text style={styles.detailValue}>R$0,43</Text>
      </View>

      <View style={styles.paymentContainer}>
        <Text style={styles.paymentText}>💳 Crédito - Nubank</Text>
      </View>

      <TouchableOpacity style={styles.pdfButton}>
        <Text style={styles.pdfButtonText}>Salvar PDF</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
  },
  backButton: {
    marginBottom: 10,
  },
  backText: {
    fontSize: 20,
    color: '#555',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  date: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  thankYou: {
    fontSize: 16,
    color: '#555',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 20,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  detailsContainer: {
    marginBottom: 20,
  },
  detailText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  detailValue: {
    fontSize: 14,
    color: '#000',
    textAlign: 'right',
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
    marginVertical: 10,
  },
  paymentContainer: {
    marginBottom: 20,
  },
  paymentText: {
    fontSize: 16,
    color: '#007BFF',
    fontWeight: 'bold',
  },
  pdfButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  pdfButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TravelDetailsScreen;
