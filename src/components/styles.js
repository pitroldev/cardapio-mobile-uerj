import styled from 'styled-components/native';
import EntypoIcon from 'react-native-vector-icons/Entypo';

import Responsive from '../utils/responsive';

export const Icon = styled(EntypoIcon)`
  margin: ${props => (props.margin ? props.margin : 0)}%;
  align-self: center;
`;

export const Title = styled.Text`
  font-size: ${Responsive(20)}px;
  font-weight: bold;
  color: #fff;
  align-self: center;
`;

export const Button = styled.TouchableOpacity`
  margin: 5%;
`;

export const Text = styled.Text`
  font-size: ${Responsive(14)}px;
  font-weight: bold;
  text-align: center;
  color: #fff;
  align-self: center;
  margin-top: 4%;
`;

export const DarkText = styled(Text)`
  color: #333;
  margin-top: 2%;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const Column = styled.View`
  flex: 1;
  padding: 5%;
  margin-top: -5%;
  align-items: center;
  justify-content: center;
`;
