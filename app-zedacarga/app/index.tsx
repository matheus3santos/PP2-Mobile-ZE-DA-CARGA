import { H4, H6, Button } from 'tamagui';
import { Image, View, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={[styles.image, { resizeMode: "stretch" }]}
          source={require('./public/images/whitebox.png')}
        />
      </View>
      <H6 style={styles.textDescription}>
      </H6>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => {
            router.push('/Login-driver');
          }}
          style={styles.button}
        >
          Fretador
        </Button>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => {
            router.push('/Register-driver');
          }}
          style={styles.button}
        >
          Cliente 
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 320,
    height: 320,
    borderRadius: 24,
  },
  textTitle: {
    textAlign: 'center',
    color: 'black',
    marginTop: 32,
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
  button: {
    width: 240,
    backgroundColor: 'blue',
    borderRadius: 24,
    color: 'white',
    textAlign: 'center',
  },
});
