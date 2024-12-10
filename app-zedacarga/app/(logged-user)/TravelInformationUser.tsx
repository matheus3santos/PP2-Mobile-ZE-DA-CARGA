import { H4, H5, H6, Button, Text } from "tamagui";
import { View, ScrollView, StyleSheet } from "react-native";
import BottomBarUser from "app/components/BottomBarUser";
import { router } from 'expo-router';


export default function TravelInformationUser() {
  // Mock de dados da viagem
  const travelDetails = {
    partida: "Av. Paulista, 1000 - São Paulo, SP",
    chegada: "Rua das Flores, 500 - Campinas, SP",
    preco: 200.0,
    taxaIntermediacao: 20.0,
    subtotal: 180.0,
    custoFixo: 10.0,
    formaPagamento: "Cartão de Crédito - **** 1234",
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <H4 style={styles.title}>Detalhes da Viagem</H4>
        </View>

        {/* Informações do histórico */}
        <View style={styles.infoContainer}>
          <H5 style={styles.infoLabel}>Local de Partida:</H5>
          <Text style={styles.infoValue}>{travelDetails.partida}</Text>

          <H5 style={styles.infoLabel}>Local de Chegada:</H5>
          <Text style={styles.infoValue}>{travelDetails.chegada}</Text>

          <H5 style={styles.infoLabel}>Preço da Viagem:</H5>
          <Text style={styles.infoValue}>
            R$ {travelDetails.preco.toFixed(2)}
          </Text>

          <H5 style={styles.infoLabel}>Taxa de Intermediação:</H5>
          <Text style={styles.infoValue}>
            R$ {travelDetails.taxaIntermediacao.toFixed(2)}
          </Text>

          <H5 style={styles.infoLabel}>Sub-total:</H5>
          <Text style={styles.infoValue}>
            R$ {travelDetails.subtotal.toFixed(2)}
          </Text>

          <H5 style={styles.infoLabel}>Custo Fixo:</H5>
          <Text style={styles.infoValue}>
            R$ {travelDetails.custoFixo.toFixed(2)}
          </Text>

          <H5 style={styles.infoLabel}>Forma de Pagamento:</H5>
          <Text style={styles.infoValue}>{travelDetails.formaPagamento}</Text>
        </View>

        {/* Botão para voltar */}
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => {
              router.push("/(logged-user)/HistoricTravelUser");
            }}
            style={styles.backButton}
          >
            Voltar
          </Button>
        </View>
      </ScrollView>
      <BottomBarUser screen="HistoricDetailTravelUser" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContainer: {
    paddingBottom: 60,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: "center",
    marginVertical: 20,
  },
  title: {
    color: "black",
    fontWeight: "bold",
  },
  infoContainer: {
    marginVertical: 10,
  },
  infoLabel: {
    color: "black",
    fontWeight: "bold",
    marginBottom: 5,
  },
  infoValue: {
    color: "#333",
    marginBottom: 15,
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  backButton: {
    backgroundColor: "black",
    color: "white",
    width: 200,
  },
});
