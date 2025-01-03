import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FadeInDown } from 'react-native-reanimated';
import React from 'react';
import { CustomText } from '../common/CustomText/CustomText';
import { Container, Square, StyledPressable } from './MapSearchBar.styles';

interface MapSearchBarProps {
  onPress: () => void;
}

export const MapSearchBar = ({ onPress }: MapSearchBarProps) => {
  const insets = useSafeAreaInsets();
  return (
    <Container entering={FadeInDown} insets={insets}>
      <StyledPressable onPress={onPress}>
        <Square />
        <CustomText variant="body">Para onde vamos ?</CustomText>
      </StyledPressable>
    </Container>
  );
};