import React from 'react';
import { Linking } from 'react-native';
import styled from 'styled-components/native';
import Modal from 'react-native-modal';

import AppLogo from '../resources/App_Logo.svg';
import { version } from '../../package.json';
import Responsive from '../utils/responsive';
import { Icon, DarkText, Row, Button } from './styles';

export const AboutModal = styled(Modal)`
  flex: 1;
  margin: 0%;
  align-items: center;
  justify-content: flex-start;
`;

export const AboutView = styled.View`
  background-color: rgba(256, 256, 256, 0.9);
  width: 100%;
  align-content: space-between;
  justify-content: space-between;
  padding: 5%;
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
  elevation: 6;
`;

export const Logo = styled.View`
  background-color: #0080c6;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: ${props => props.size * 2}px;
  align-self: center;
  padding: 4%;
  margin: 2.5%;
  elevation: 6;
`;

export const AboutTitle = styled.Text`
  font-size: ${Responsive(18)}px;
  margin-bottom: 3%;
  font-weight: bold;
  color: #333;
  align-self: center;
`;

const About = props => (
  <AboutModal
    isVisible={props.visible}
    useNativeDriver={true}
    animationIn="slideInDown"
    animationOut="slideOutUp"
    animationInTiming={300}
    animationOutTiming={300}
    onBackdropPress={() => props.setState({ about: false })}
    onBackButtonPress={() => props.setState({ about: false })}>
    <AboutView>
      <Logo size={100}>
        <AppLogo />
      </Logo>
      <DarkText>Versão {version}</DarkText>
      <AboutTitle>Desenvolvido por Petro Cardoso.</AboutTitle>
      <Row>
        <Button
          onPress={() => {
            const url = 'https://github.com/pitroldev/cardapio-mobile-uerj';
            Linking.canOpenURL(url).then(supported => {
              supported && Linking.openURL(url);
            });
          }}>
          <Icon
            name={'github-with-circle'}
            color={'#333'}
            size={Responsive(45)}
          />
          <DarkText>Github</DarkText>
        </Button>
        <Button
          onPress={() => {
            const url = 'https://www.linkedin.com/in/petro-cardoso-74019219b/';
            Linking.canOpenURL(url).then(supported => {
              supported && Linking.openURL(url);
            });
          }}>
          <Icon
            name={'linkedin-with-circle'}
            color={'#333'}
            size={Responsive(45)}
          />
          <DarkText>Linkedin</DarkText>
        </Button>
        <Button
          onPress={() => {
            const url =
              'mailto: petrolcds@gmail.com?subject=Cardapio Mobile Uerj';
            Linking.canOpenURL(url).then(supported => {
              supported && Linking.openURL(url);
            });
          }}>
          <Icon
            name={'mail-with-circle'}
            color={'#333'}
            size={Responsive(45)}
          />
          <DarkText>Email</DarkText>
        </Button>
      </Row>
    </AboutView>
  </AboutModal>
);

export default About;
