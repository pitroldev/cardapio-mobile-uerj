import styled from 'styled-components/native';
import Responsive from '../utils/responsive';

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
  width: 85%;
  align-self: center;
  margin-top: 30%;
  margin-bottom: 10%;
  padding: 3%;
  elevation: 4;
`;

export const ItemRow = styled.View`
  flex: 1;
  background-color: ${props => (props.color ? props.color : '#0080c6')};
  flex-direction: row;
  align-items: center;
  margin: 1%;
  padding-top: 2.5%;
  padding-bottom: 2.5%;
  padding-right: 4%;
  padding-left: 4%;
  elevation: 4;
`;

export const Row = styled.View`
  flex-direction: row;
  align-content: center;
  justify-content: center;
  margin: 1%;
`;

export const Column = styled.View`
  flex: 1;
`;

export const DateTitle = styled.Text`
  font-size: ${Responsive(20)}px;
  font-weight: bold;
  color: #333;
  align-self: center;
  margin-bottom: 2%;
  padding-bottom: 2%;
  padding-left: 2%;
  padding-right: 2%;
`;

export const Text = styled.Text`
  flex: 1;
  width: 50%;
  font-size: ${Responsive(16)}px;
  font-weight: bold;
  text-align: ${props => (props.textAlign ? props.textAlign : 'center')};
  color: #fff;
`;

export const Next = styled.TouchableOpacity`
  width: 20%;
  height: 100%;
  align-self: center;
  position: absolute;
  left: 80%;
`;

export const Previous = styled.TouchableOpacity`
  width: 20%;
  height: 100%;
  align-self: center;
  position: absolute;
  left: 0%;
`;
