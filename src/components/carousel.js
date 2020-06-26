import React, { useState } from 'react';
import Carousel from 'react-native-snap-carousel';
import {
  Container,
  Text,
  DateTitle,
  Row,
  Column,
  ItemRow,
  Next,
  Previous,
} from './styles_carousel';
import Responsive from '../utils/responsive';
import parseName from '../utils/parseName';

const CarouselView = props => {
  const { info, days, today } = props.data;

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
              color={key % 2 === 0 ? '#0080c6' : '#00AFDF'}
              accessible={ActivePage === day.index ? true : false}
              importantForAccessibility={
                ActivePage === day.index ? 'yes' : 'no'
              }
              accessibilityLabel={
                day.item[key + 4] === '-'
                  ? item + ',' + 'Nenhum'
                  : item + ',' + parseName(day.item[key + 4], item)
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
                {parseName(day.item[key + 4], item)}
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
        layout={'stack'}
        layoutCardOffset={18}
        swipeThreshold={15}
        ref={c => setRef(c)}
        data={days}
        firstItem={today}
        renderItem={renderItem}
        sliderWidth={Responsive(425)}
        itemWidth={Responsive(400)}
      />
    </>
  );
};

export default CarouselView;
