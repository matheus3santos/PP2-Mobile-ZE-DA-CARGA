import React from 'react';
import { Container, StyledMapView } from './MapScreen.styles';
import { useMapScreen } from './useMapScreen';
import { RoundButton } from '../../components/RoundButton/RoundButton';
import { MapSearchBar } from '../../components/MapSearchBar/MapSearchBar';

export const MapScreen = () => {
  const { models, operations } = useMapScreen();

  return (

    <Container>
      <StyledMapView
        ref={models.mapRef}
        showsUserLocation
        onUserLocationChange={operations.handleUserLocationChange}
        showsMyLocationButton={false}
        showsCompass={false}
      />
      <MapSearchBar onPress={operations.handleMapSearchBarPress} />
      <RoundButton icon="reorder-three-outline" onPress={() => console.log('Menu pressionado')} />

    </Container>

  )


};