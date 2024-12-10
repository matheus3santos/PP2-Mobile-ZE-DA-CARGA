import { Image, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";

export default function BottomBarUser({ screen }: { screen: string }) {
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
        onPress={() => screen !== 'HomeUser' && router.push('/HomeUser')}
      >
        <Image
          style={{ width: 40, height: 40 }}
          source={require("../public/icons/home.png")}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => screen !== 'ProfileUser' && router.push('/ProfileUser')}
      >
        <Image
          style={{ width: 40, height: 40 }}
          source={require("../public/icons/perfil.png")}
        />
      </TouchableOpacity>
    </View>
  );
}
