import { Image, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";

export default function BottomBar({ screen }: { screen: string }) {
  return (
    <View
      style={{
        width: '100%',
        height: 60,
        backgroundColor: '#6bc5e8',
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}
    >
      <TouchableOpacity
        onPress={() => screen !== 'Home' && router.push('/Home')}
      >
        <Image
          style={{ width: 40, height: 40 }}
          source={require("../public/icons/home.png")}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => screen !== 'Profile' && router.push('/Profile')}
      >
        <Image
          style={{ width: 40, height: 40 }}
          source={require("../public/icons/perfil.png")}
        />
      </TouchableOpacity>
    </View>
  );
}
