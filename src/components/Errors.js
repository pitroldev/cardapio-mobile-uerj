import React from 'react';
import { WebView } from 'react-native-webview';
import styled from 'styled-components/native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import Responsive from '../utils/responsive';

const Icon = styled(EntypoIcon)`
  margin: ${props => (props.margin ? props.margin : 0)}%;
  align-self: center;
`;

const Title = styled.Text`
  font-size: ${Responsive(18)}px;
  font-weight: bold;
  color: #fff;
  align-self: center;
`;

const Column = styled.View`
  flex: 1;
  padding: 2%;
  align-items: center;
  justify-content: flex-end;
`;

const Text = styled.Text`
  font-size: ${Responsive(14)}px;
  font-weight: bold;
  text-align: center;
  color: #fff;
  align-self: center;
  margin-top: 4%;
`;

export const ParseErrorView = () => (
  <WebView
    source={{
      uri: 'http://www.restauranteuniversitario.uerj.br/cardapio.html',
    }}
    style={{ height: Responsive(800) }}
  />
);

export const ParseErrorHeader = () => (
  <Column>
    <Title>Ops... Ocorreu um erro :(</Title>
    <Text>
      Mas não se preocupe! Redirecionaremos você direto para o site do
      Restaurante Universitário...
    </Text>
  </Column>
);

export const NetworkErrorView = () => (
  <>
    <Icon name={'warning'} size={Responsive(60)} color={'#fff'} margin={10} />
    <Title>Ops... Ocorreu um erro :(</Title>
    <Title>{'\n'}Sem conexão disponível.</Title>
  </>
);
