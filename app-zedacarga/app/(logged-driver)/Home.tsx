import { H6 } from 'tamagui';
import { View, StyleSheet } from 'react-native';
import BottomBar from 'app/components/BottomBar';
import NearbyFrete from 'app/components/NearbyFrete';
import BottomActiveFrete from 'app/components/BottomActiveFrete';


export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}></View>
    
      <View style={styles.buttonContainer}></View>
      <BottomActiveFrete/>

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