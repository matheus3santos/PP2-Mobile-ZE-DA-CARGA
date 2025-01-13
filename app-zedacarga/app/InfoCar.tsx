import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, Alert,ActivityIndicator } from 'react-native';
import { router } from 'expo-router';

const InfoCar = () => {
  const [modalVisible, setModalVisible] = useState(true); // Modal visível por padrão
  interface CarDetails {
    modelo: string;
    ano: string;
    placa: string;
    renavam: string;
    cor: string;
  }

  const [carDetails, setCarDetails] = useState<CarDetails | null>(null); // Estado para os detalhes do carro
  const [loading, setLoading] = useState(true); // Estado para o carregamento



  useEffect(() => {
    // Função para buscar dados da API
    const fetchCarDetails = async () => {
      try {
        const response = await fetch('https://d8ab-200-238-97-165.ngrok-free.app/api/motorista');
        const data = await response.json();

        console.log('Dados da API:', data); // Verifica o que está sendo retornado

        // Acessa o objeto "veiculo" retornado pela API
        if (data && data.veiculo) {
          setCarDetails(data.veiculo);
        } else {
          console.error('Objeto "veiculo" não encontrado na resposta da API.');
        }
      } catch (error) {
        console.error('Erro ao buscar detalhes do carro:', error);
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };

    fetchCarDetails();
  }, []);


  

  const handleClose = () => {
    setModalVisible(false); // Fecha o modal
    router.push('/(logged-driver)/Profile') // Redireciona para outra página
  };

  const handleCloseEdit = () => {
    setModalVisible(false); // Fecha o modal
    router.push('/EditCar') // Redireciona para outra página
  };

  return (
    <View style={styles.container}>
      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Detalhes do Carro</Text>

           

            <Text style={styles.modalText}><Text style={styles.bold}>Modelo:</Text> Caminhão</Text>
            <Text style={styles.modalText}><Text style={styles.bold}>Ano:</Text> 1975</Text>
            <Text style={styles.modalText}><Text style={styles.bold}>Cor:</Text> Azul</Text>
            <Text style={styles.modalText}><Text style={styles.bold}>Placa:</Text> HXT-2456</Text>
            <Text style={styles.modalText}><Text style={styles.bold}>Renavam:</Text> 54897961</Text>
            
            {loading ? (
              <ActivityIndicator size="large" color="#007bff" /> // Indicador de carregamento
            ) : carDetails ? (
              <>
                <Text style={styles.modalText}>
                  <Text style={styles.bold}>Modelo:</Text> {carDetails.modelo || 'N/A'}
                </Text>
                <Text style={styles.modalText}>
                  <Text style={styles.bold}>Ano:</Text> {carDetails.ano || 'N/A'}
                </Text>
                <Text style={styles.modalText}>
                  <Text style={styles.bold}>Placa:</Text> {carDetails.placa || 'N/A'}
                </Text>
                <Text style={styles.modalText}>
                  <Text style={styles.bold}>Renavam:</Text> {carDetails.renavam || 'N/A'}
                </Text>
                <Text style={styles.modalText}>
                  <Text style={styles.bold}>Cor:</Text> {carDetails.cor || 'N/A'}
                </Text>
              </>
            ) : (
              <Text style={styles.errorText}>Erro ao carregar dados.</Text>
            )}


            {/* Botão de edição */}
            <TouchableOpacity style={[styles.button, styles.editButton]}  onPress={handleCloseEdit}>
              <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>

            {/* Botão de fechar */}
            <TouchableOpacity
              style={[styles.button, styles.closeButton]}
              onPress={handleClose} // Chama a função handleClose
            >
              <Text style={styles.buttonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f9',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginVertical: 5,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    width: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginVertical: 5,
  },
  bold: {
    fontWeight: 'bold',
  },
  button: {
    padding: 10,
    borderRadius: 4,
    marginTop: 10,
    width: '80%',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#007bff',
  },
  closeButton: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default InfoCar;
