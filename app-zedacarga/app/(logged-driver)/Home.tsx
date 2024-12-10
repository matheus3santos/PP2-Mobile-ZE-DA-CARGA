import { H6 } from 'tamagui';
import { View, StyleSheet } from 'react-native';
import BottomBar from 'app/components/BottomBar';

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}></View>
      <H6 style={styles.textDescription}>
        Incluir mapa, etc...
      </H6>
      <View style={styles.buttonContainer}></View>
      <BottomBar screen="Home" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingBottom: 60, // Adicionado para evitar sobreposição
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textDescription: {
    textAlign: 'center',
    color: 'black',
    fontSize: 12,
    padding: 16,
    marginTop: 32,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
  },
});