import React from 'react';
import { Linking, AccessibilityInfo, Animated } from 'react-native';
import RULogo from '../resources/RU_Logo.svg';
import UERJLogo from '../resources/UERJ_Logo.svg';
import styled from 'styled-components/native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import Responsive from '../utils/responsive';

export const Icon = styled(EntypoIcon)`
  margin: ${props => (props.margin ? props.margin : 0)}%;
  align-self: center;
`;

export const Button = styled.TouchableOpacity``;

export const FooterV = styled.View`
  height: 10%;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  z-index: 1;
`;

let AccessibilityIsOn;
AccessibilityInfo.isScreenReaderEnabled().then(res => {
  AccessibilityIsOn = res;
});

const Footer = props => {
  const FooterView = Animated.createAnimatedComponent(FooterV);
  return (
    <FooterView
      style={[
        {
          translateY: props.height,
        },
      ]}>
      <Button
        accessibilityLabel="Acessar o site oficial do restaurante universitario da uerj."
        onPress={() => {
          const url = 'http://www.restauranteuniversitario.uerj.br/index.html';
          Linking.canOpenURL(url).then(supported => {
            supported && Linking.openURL(url);
          });
        }}>
        <RULogo height={Responsive(50)} width={Responsive(50)} />
      </Button>
      <Button
        accessibilityLabel="Acessar o site oficial da uerj."
        onPress={() => {
          const url = 'https://www.uerj.br/';
          Linking.canOpenURL(url).then(supported => {
            supported && Linking.openURL(url);
          });
        }}>
        <UERJLogo height={Responsive(50)} width={Responsive(50)} />
      </Button>
      <Button
        onPress={() => !AccessibilityIsOn && props.setState({ about: true })}
        accessibilityLabel="Aplicativo desenvolvido por Petro Cardoso.">
        <Icon name={'info-with-circle'} color={'#fff'} size={Responsive(45)} />
      </Button>
    </FooterView>
  );
};

export default Footer;
