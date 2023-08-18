import styled from 'styled-components/native';
import EntypoIcon from 'react-native-vector-icons/Entypo';

export const AboutView = styled.View`
  background-color: rgba(256, 256, 256, 0.96);
  width: 100%;
  height: 100%;
  padding: 16px;
`;

export const LogoView = styled.View`
  background-color: #0080c6;
  width: 100px;
  height: 100px;
  border-radius: 50px;
  align-self: center;
  padding: 12px;

  elevation: 6;

  margin-bottom: 12px;
`;

export const CloseBtn = styled.TouchableOpacity`
  position: absolute;
  right: 0;
  top: 0;
  padding: 12px;
`;

export const AboutTitle = styled.Text`
  font-size: 18px;
  font-weight: 500;
  color: #333;
  align-self: center;
`;

export const Icon = styled(EntypoIcon)`
  align-self: center;
`;

export const Button = styled.TouchableOpacity``;

export const DarkText = styled.Text`
  font-size: 14px;
  font-weight: 500;
  text-align: center;

  color: #333;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;

  margin-top: auto;
`;
