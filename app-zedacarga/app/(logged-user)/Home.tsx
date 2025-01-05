import { Button, Input } from 'tamagui';
import { View, StyleSheet, Modal, Text, TouchableOpacity, Dimensions } from 'react-native';
import BottomBarUser from 'app/components/BottomBarUser';
import MapView, { Marker } from 'react-native-maps';
import { useState } from 'react';
import { MapScreen } from './MapScreen';
import { LocationPermissionsService } from 'app/services/LocationPermissionService';
import { ThemeProvider } from 'app/theme/ThemeProvider';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { UserLocationStateContextProvider } from 'app/context/UserLocationStateContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


const { height } = Dimensions.get('window');

export default function Home() {
  const [isLocationModalVisible, setLocationModalVisible] = useState(false);
  const [isRideModalVisible, setRideModalVisible] = useState(false);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');

  const handleConfirmLocation = () => {
    setLocationModalVisible(false);
    setRideModalVisible(true); // Abre o modal de modalidade da corrida
  };

  return (
    <View style={styles.container}>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <ThemeProvider>
            <UserLocationStateContextProvider>
              <MapScreen />
              <LocationPermissionsService />
            </UserLocationStateContextProvider>
          </ThemeProvider>
          </GestureHandlerRootView>
      </SafeAreaProvider>

      <BottomBarUser screen="HomeUser" />


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center',
  },
  button: {
    width: '90%',
    marginVertical: 8,
  },

});
