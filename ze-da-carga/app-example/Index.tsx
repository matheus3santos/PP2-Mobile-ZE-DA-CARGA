import { H4, H6, Button } from 'tamagui';
import { Image, View } from 'react-native';
import { router } from 'expo-router';

export default function Index() {
  return (
    <View style={{ height: '100%', backgroundColor: 'white', justifyContent: 'center' }}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        {/* 
        <Image
          style={{ width: 320, height: 320, borderRadius: 24, resizeMode: 'stretch' }}
          source={require('./public/images/PizzaBox.png')}
        /> 
        */}
      </View>
      <H4 style={{ textAlign: 'center', color: 'black', marginTop: 32 }}>
        Mate sua fome com um clique.
      </H4>
      <H6 style={{ textAlign: 'center', color: 'black', fontSize: 12, padding: 16, marginTop: 32 }}>
        Nos dias agitados e corridos, encontre uma solução rápida e conveniente!
      </H6>
      <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 32 }}>
        <Button
          onPress={() => {
            router.push('/Login');
          }}
          style={{
            width: 240,
            backgroundColor: '#FB923C',
            borderRadius: 24,
            color: 'white',
            textAlign: 'center',
          }}
        >
          Entrar
        </Button>
      </View>

    </View>
  );
}
