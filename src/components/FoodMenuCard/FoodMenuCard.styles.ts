import styled from 'styled-components/native';

export const CardContainer = styled.View`
  flex: 1;
  width: 85%;
  margin: auto;

  elevation: 4;
`;

export const FoodItemView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;

  padding: 12px;
  background-color: ${(props: any) => (props.isOdd ? '#fff' : '#eee')};
`;

export const Row = styled.View`
  flex-direction: row;
  justify-content: center;
`;

export const Column = styled.View`
  flex: 1;
`;

export const DateText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  padding: 12px;
  width: 100%;
  text-align: center;
  background-color: #cc5200;
`;

export const Text = styled.Text`
  flex: 1;
  width: 50%;
  font-size: 14px;
  font-weight: 500;

  margin: auto;
`;

export const CategoryText = styled(Text)`
  text-align: left;
`;

export const FoodText = styled(Text)`
  text-align: right;
`;

export const AllergenText = styled.Text`
  position: absolute;
  bottom: 4px;
  font-size: 11px;
  color: #f33324;

  width: 100%;
`;
