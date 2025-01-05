import React from 'react';
import {scale} from 'react-native-size-matters';

import {CustomText} from '../../../common/CustomText';
import {Spacer} from '../../../common/Spacer';
import {Divider} from '../../../common/Divider';

import {Container} from './Header.styles';

export const Header = () => {
  return (
    <Container>
      <CustomText variant="header">Choose your ride</CustomText>
      <Spacer height={scale(15)} />
      <Divider />
    </Container>
  );
};