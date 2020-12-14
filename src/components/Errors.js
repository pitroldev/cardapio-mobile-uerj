import React from 'react';
import {WebView} from 'react-native-webview';
import styled from 'styled-components/native';
import EntypoIcon from 'react-native-vector-icons/Entypo';

const Icon = styled(EntypoIcon)`
  margin: ${(props) => (props.margin ? props.margin : 0)}%;
  align-self: center;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  align-self: center;
`;

const Column = styled.View`
  flex: 1;
  padding: 2%;
  align-self: center;
  justify-content: flex-end;
`;

const Refresh = styled.TouchableOpacity`
  flex: 1;
  background-color: #016ba5;
  margin-top: 50%;
`;

const Text = styled.Text`
  font-size: 14px;
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
    style={{height: 800}}
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

export const NetworkErrorView = (props) => (
  <Refresh onPress={() => props.getCardapio()}>
    <Icon name={'warning'} size={60} color={'#fff'} margin={10} />
    <Title>Ops... Ocorreu um erro :(</Title>
    <Title>{'\n'}Sem conexão disponível.</Title>
  </Refresh>
);
