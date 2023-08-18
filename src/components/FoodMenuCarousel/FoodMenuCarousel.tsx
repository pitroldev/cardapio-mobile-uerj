import React, {useState, useRef, useEffect} from 'react';
import {AccessibilityInfo, Dimensions, ListRenderItemInfo} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import moment from 'moment';

import {FoodMenuDay} from '@/types/food-menu.types';

import FoodMenuCard from '@/components/FoodMenuCard';

import {Next, Previous, CarouselView} from './FoodMenuCarousel.styles';

type Props = {
  data: FoodMenuDay[];
};

const FoodMenuCarousel = ({data}: Props) => {
  const [isScreenReaderEnabled, setIsScreenReaderEnabled] = useState(false);

  const now = moment();
  const [closestMenuDay] = [...data].sort((a, b) => {
    const aDayDiff = now.diff(moment(a.date), 'days');
    const bDayDiff = now.diff(moment(b.date), 'days');

    return aDayDiff - bDayDiff;
  });

  const closedMenuIndex = data.findIndex(item =>
    moment(item.date).isSameOrAfter(closestMenuDay?.date ?? now, 'day'),
  );

  const [currentIndex, setCurrentIndex] = useState(closedMenuIndex);

  const ref = useRef<Carousel<FoodMenuDay>>(null);

  useEffect(() => {
    AccessibilityInfo.isScreenReaderEnabled().then(res => {
      setIsScreenReaderEnabled(res);
    });
  }, []);

  function handleRenderItem({item, index}: ListRenderItemInfo<FoodMenuDay>) {
    const isSelected = currentIndex === index;

    return <FoodMenuCard {...{data: item, isSelected}} />;
  }

  const handleNextPress = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex(c => c + 1);
      ref.current?.snapToNext();
    }
  };

  const handlePreviousPress = () => {
    if (currentIndex > 1) {
      setCurrentIndex(c => c - 1);
      ref.current?.snapToPrev();
    }
  };

  const screenWidth = Dimensions.get('window').width;
  const sliderWidth = screenWidth;
  const itemWidth = sliderWidth;

  return (
    <CarouselView accessible={false} importantForAccessibility={'no'}>
      <Previous
        accessible={true}
        disabled={!isScreenReaderEnabled}
        importantForAccessibility={'yes'}
        accessibilityLabel={'Voltar para o dia anterior.'}
        onPress={handlePreviousPress}
      />
      <Next
        accessible={true}
        disabled={!isScreenReaderEnabled}
        importantForAccessibility={'yes'}
        accessibilityLabel={'Avançar para o próximo dia.'}
        onPress={handleNextPress}
      />
      <Carousel
        accessible={false}
        importantForAccessibility={'no'}
        layout={'stack'}
        layoutCardOffset={18}
        swipeThreshold={15}
        ref={ref}
        data={data}
        firstItem={closedMenuIndex}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
        renderItem={handleRenderItem}
      />
    </CarouselView>
  );
};

export default FoodMenuCarousel;
