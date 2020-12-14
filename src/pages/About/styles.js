import styled from 'styled-components/native';
import Modal from 'react-native-modal';
import EntypoIcon from 'react-native-vector-icons/Entypo';

import Responsive from '../../utils/responsive';

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

export const Icon = styled(EntypoIcon)`
  margin: ${props => (props.margin ? props.margin : 0)}%;
  align-self: center;
`;

export const Button = styled.TouchableOpacity`
  margin: 5%;
`;

export const DarkText = styled.Text`
  font-size: ${Responsive(14)}px;
  font-weight: bold;
  text-align: center;
  align-self: center;
  color: #333;
  margin-top: 2%;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;
