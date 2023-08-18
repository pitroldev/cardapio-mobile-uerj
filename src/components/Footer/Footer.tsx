import React from 'react';
import {Linking, TouchableOpacity} from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';

import RULogo from '@/resources/RU_Logo';
import UERJLogo from '@/resources/UERJ_Logo';

import {FooterView} from './Footer.styles';

type Props = {
  onAboutPress: () => void;
};

const Footer = ({onAboutPress}: Props) => {
  const handleRUIconPress = () => {
    const RU_UERJ_URL = 'http://www.restauranteuniversitario.uerj.br/';
    Linking.canOpenURL(RU_UERJ_URL).then(supported => {
      supported && Linking.openURL(RU_UERJ_URL);
    });
  };

  const handleUERJIconPress = () => {
    const UERJ_URL = 'https://www.uerj.br/';
    Linking.canOpenURL(UERJ_URL).then(supported => {
      supported && Linking.openURL(UERJ_URL);
    });
  };

  const handleAboutIconPress = () => {
    onAboutPress();
  };

  return (
    <FooterView>
      <TouchableOpacity
        accessibilityLabel="Acessar o site oficial do restaurante universitario da uerj."
        onPress={handleRUIconPress}>
        <RULogo height={40} width={40} />
      </TouchableOpacity>
      <TouchableOpacity
        accessibilityLabel="Acessar o site oficial da uerj."
        onPress={handleUERJIconPress}>
        <UERJLogo height={40} width={40} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleAboutIconPress}
        accessibilityLabel="Aplicativo desenvolvido por Petro Cardoso.">
        <EntypoIcon name={'info-with-circle'} color={'#fff'} size={32} />
      </TouchableOpacity>
    </FooterView>
  );
};

export default Footer;
