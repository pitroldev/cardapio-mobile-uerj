import React, { useEffect } from 'react';
import { Animated } from 'react-native';
import Responsive from '../utils/responsive';
import styled from 'styled-components/native';
import EntypoIcon from 'react-native-vector-icons/Entypo';

import { ParseErrorHeader } from './Errors';

export const Loading = styled.ActivityIndicator`
  align-self: center;
  padding: 20%;
  margin: 10%;
`;

const HeaderV = styled.View`
  background-color: #0080c6;
  height: 210%;
  top: -200%;
  width: 100%;
  position: absolute;
  align-items: center;
  justify-content: flex-end;
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
  z-index: 1;
  elevation: 12;
`;

const RowAbsolute = styled.View`
  background-color: rgba(255, 255, 255, 0.25);
  flex-direction: row;
  position: absolute;
  align-self: center;
  justify-content: center;
  padding: 1%;
  bottom: 12%;
  border-radius: 40px;
  elevation: 12;
`;

const Icon = styled(EntypoIcon)`
  margin: ${props => (props.margin ? props.margin : 0)}%;
  align-self: center;
`;

const Title = styled.Text`
  font-size: ${Responsive(24)}px;
  font-weight: bold;
  color: #fff;
  align-self: center;
  padding: 5%;
`;

const Text = styled.Text`
  font-size: ${Responsive(16)}px;
  font-weight: bold;
  text-align: center;
  color: #fff;
  align-self: center;
`;

const Header = props => {
  const HeaderView = Animated.createAnimatedComponent(HeaderV);

  useEffect(() => {}, [props.offline, props.parseError]);

  return (
    <>
      <HeaderView
        style={[
          {
            translateY: props.height,
          },
        ]}>
        {props.loading && <Loading size={Responsive(60)} color="#fff" />}
        {props.parseError ? (
          <ParseErrorHeader />
        ) : (
          <Title
            accessible={true}
            importantForAccessibility={'yes'}
            accessibilityLabel="Cardápio do restaurante universitário da uerj">
            Cardápio Mobile UERJ
          </Title>
        )}
      </HeaderView>
      {props.offline && (
        <RowAbsolute>
          <Icon
            name={'warning'}
            size={Responsive(25)}
            color={'#ff0'}
            margin={2}
            accessible={false}
            importantForAccessibility={'no'}
          />
          <Text>Você está offline</Text>
        </RowAbsolute>
      )}
    </>
  );
};

export default Header;
