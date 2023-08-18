import React from 'react';
import {Linking, Modal} from 'react-native';

import AppLogo from '@/resources/App_Logo.svg';

import {version} from '../../../package.json';

import {
  AboutTitle,
  AboutView,
  LogoView,
  Icon,
  DarkText,
  Row,
  Button,
  CloseBtn,
} from './AboutModal.styles';

type Props = {
  visible: boolean;
  onHide: () => void;
};

const AboutModal = ({visible, onHide}: Props) => (
  <Modal
    visible={visible}
    animationType="fade"
    onRequestClose={onHide}
    hardwareAccelerated
    transparent>
    <AboutView>
      <CloseBtn onPress={onHide}>
        <Icon name={'cross'} color={'#f33'} size={20} />
      </CloseBtn>
      <LogoView>
        <AppLogo />
      </LogoView>
      <DarkText>Versão {version}</DarkText>
      <AboutTitle>Desenvolvido por Petro Cardoso</AboutTitle>
      <Row>
        <Button
          onPress={() => {
            const url = 'https://github.com/pitroldev/cardapio-mobile-uerj';
            Linking.canOpenURL(url).then(supported => {
              supported && Linking.openURL(url);
            });
          }}>
          <Icon name={'github-with-circle'} color={'#333'} size={45} />
          <DarkText>Github</DarkText>
        </Button>
        <Button
          onPress={() => {
            const url = 'https://www.linkedin.com/in/petrocardoso/';
            Linking.canOpenURL(url).then(supported => {
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
            Linking.canOpenURL(url).then(supported => {
              supported && Linking.openURL(url);
            });
          }}>
          <Icon name={'mail-with-circle'} color={'#333'} size={45} />
          <DarkText>Email</DarkText>
        </Button>
      </Row>
    </AboutView>
  </Modal>
);

export default AboutModal;
