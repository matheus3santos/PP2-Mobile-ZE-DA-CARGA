import { H6, Input, Button } from 'tamagui';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import BottomBarUser from 'app/components/BottomBarUser';

export default function HomeUser() {
  return (
    <View style={styles.container}>
      {/* Área do mapa mockado */}
      <View style={styles.mapContainer}>
        <Image
          style={styles.mapMock}
          source={{ uri: 'https://via.placeholder.com/400x200?text=Map+Mockup' }}
          resizeMode="cover"
        />
      </View>

      {/* Campo de entrada e botões de ação */}
      <ScrollView contentContainerStyle={styles.content}>
        <Input
          placeholder="Para onde?"
          style={styles.inputDestination}
        />
        <Button theme="blue" style={styles.button}>
          Definir destino
        </Button>
        <Button theme="gray" style={styles.button}>
          Minha localização
        </Button>
      </ScrollView>

      {/* BottomBar */}
      <BottomBarUser screen="HomeUser" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  mapContainer: {
    height: '40%',
    backgroundColor: '#e0e0e0',
  },
  mapMock: {
    width: '100%',
    height: '100%',
  },
  content: {
    padding: 16,
    alignItems: 'center',
  },
  inputDestination: {
    width: '90%',
    marginBottom: 16,
  },
  button: {
    width: '90%',
    marginVertical: 8,
  },
});
