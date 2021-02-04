import React, {useState} from 'react';
import Carousel from 'react-native-snap-carousel';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  width: 85%;
  align-self: center;
  margin-top: 30%;
  margin-bottom: 10%;
  padding: 3%;
  elevation: 4;
`;

const ItemRow = styled.View`
  flex: 1;
  background-color: ${(props) => (props.color ? props.color : '#0080c6')};
  flex-direction: row;
  align-items: center;
  margin: 1%;
  padding-top: 2.5%;
  padding-bottom: 2.5%;
  padding-right: 4%;
  padding-left: 4%;
  elevation: 4;
`;

const Row = styled.View`
  flex-direction: row;
  align-content: center;
  justify-content: center;
  margin: 1%;
`;

const Column = styled.View`
  flex: 1;
`;

const DateTitle = styled.Text`
  font-size: ${20}px;
  font-weight: bold;
  color: #333;
  align-self: center;
  margin-bottom: 2%;
  padding-bottom: 2%;
  padding-left: 2%;
  padding-right: 2%;
`;

const Text = styled.Text`
  flex: 1;
  width: 50%;
  font-size: ${16}px;
  font-weight: bold;
  text-align: ${(props) => (props.textAlign ? props.textAlign : 'center')};
  color: #fff;
`;

const Next = styled.TouchableOpacity`
  width: 20%;
  height: 100%;
  align-self: center;
  position: absolute;
  left: 80%;
`;

const Previous = styled(Next)`
  left: 0%;
`;

const CarouselView = (props) => {
  const {info, days, today} = props.data;

  const [Ref, setRef] = useState({});
  const [ActivePage, setActivePage] = useState(today);

  function renderItem(day) {
    const month = day.item[1].split(' ')[2];
    const capitalizeMonth = month.charAt(0).toUpperCase() + month.slice(1);
    return (
      <Container importantForAccessibility={'no'} accessible={false}>
        <Row
          accessible={ActivePage === day.index ? true : false}
          importantForAccessibility={ActivePage === day.index ? 'yes' : 'no'}
          accessibilityLabel={day.item[3] + ', ' + day.item[0] + day.item[1]}>
          <DateTitle importantForAccessibility={'no'} accessible={false}>
            {`${day.item[3]}, ${day.item[0]} de ${capitalizeMonth}`}
          </DateTitle>
        </Row>
        <Column importantForAccessibility={'no'} accessible={false}>
          {info.map((item, key) => (
            <ItemRow
              key={key}
              color={key % 2 === 0 ? '#016BA5' : '#00AFDF'}
              accessible={ActivePage === day.index ? true : false}
              importantForAccessibility={
                ActivePage === day.index ? 'yes' : 'no'
              }
              accessibilityLabel={
                day.item[key + 4] === '-'
                  ? item + ',' + 'Nenhum'
                  : item + ',' + day.item[key + 4]
              }>
              <Text
                importantForAccessibility={'no'}
                accessible={false}
                textAlign={'left'}>
                {item}
              </Text>
              <Text
                importantForAccessibility={'no'}
                accessible={false}
                textAlign={'right'}>
                {day.item[key + 4]}
              </Text>
            </ItemRow>
          ))}
        </Column>
      </Container>
    );
  }

  return (
    <>
      <Next
        accessible={true}
        importantForAccessibility={'yes'}
        accessibilityLabel={'Avançar para o próximo dia.'}
        onPress={() => {
          if (ActivePage < days.length - 1) {
            setActivePage(ActivePage + 1);
            Ref.snapToNext();
          }
        }}
      />
      <Previous
        accessible={true}
        importantForAccessibility={'yes'}
        accessibilityLabel={'Voltar para o dia anterior.'}
        onPress={() => {
          if (ActivePage > 1) {
            setActivePage(ActivePage - 1);
            Ref.snapToPrev();
          }
        }}
      />
      <Carousel
        importantForAccessibility={'no'}
        accessible={false}
        layout={'stack'}
        layoutCardOffset={18}
        swipeThreshold={15}
        ref={(c) => setRef(c)}
        data={days}
        firstItem={today}
        renderItem={renderItem}
        sliderWidth={425}
        itemWidth={400}
      />
    </>
  );
};

export default CarouselView;
