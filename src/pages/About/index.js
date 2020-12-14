import React from 'react';
import {Linking} from 'react-native';

import AppLogo from '../../resources/App_Logo.svg';
import {version} from '../../../package.json';
import {
  AboutModal,
  AboutTitle,
  AboutView,
  Logo,
  Icon,
  DarkText,
  Row,
  Button,
} from './styles';

const About = (props) => (
  <AboutModal
    isVisible={props.isVisible}
    useNativeDriver={true}
    animationIn="slideInDown"
    animationOut="slideOutUp"
    animationInTiming={300}
    animationOutTiming={300}
    onBackdropPress={props.hide}
    onBackButtonPress={props.hide}>
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
            Linking.canOpenURL(url).then((supported) => {
              supported && Linking.openURL(url);
            });
          }}>
          <Icon name={'github-with-circle'} color={'#333'} size={45} />
          <DarkText>Github</DarkText>
        </Button>
        <Button
          onPress={() => {
            const url = 'https://www.linkedin.com/in/petrocardoso/';
            Linking.canOpenURL(url).then((supported) => {
              supported && Linking.openURL(url);
            });
          }}>
          <Icon name={'linkedin-with-circle'} color={'#333'} size={45} />
          <DarkText>Linkedin</DarkText>
        </Button>
        <Button
          onPress={() => {
            const url =
              'mailto: petrolcds@gmail.com?subject=Cardapio Mobile Uerj';
            Linking.canOpenURL(url).then((supported) => {
              supported && Linking.openURL(url);
            });
          }}>
          <Icon name={'mail-with-circle'} color={'#333'} size={45} />
          <DarkText>Email</DarkText>
        </Button>
      </Row>
    </AboutView>
  </AboutModal>
);

export default About;
