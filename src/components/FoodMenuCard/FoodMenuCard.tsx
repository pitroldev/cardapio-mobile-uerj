import React from 'react';
import moment from 'moment';

import {FoodMenuDay} from '@/types/food-menu.types';

import {
  CardContainer,
  Column,
  DateText,
  FoodItemView,
  Row,
  CategoryText,
  FoodText,
  AllergenText,
} from './FoodMenuCard.styles';

type Props = {
  data: FoodMenuDay;
  isSelected: boolean;
};

const FoodMenuCard = ({data, isSelected}: Props) => {
  const {date, menu} = data;

  const formattedDate = moment(date).format('dddd, DD [de] MMMM');

  return (
    <CardContainer importantForAccessibility={'no'} accessible={false}>
      <Row
        accessible={isSelected}
        importantForAccessibility={isSelected ? 'yes' : 'no'}
        accessibilityLabel={formattedDate}>
        <DateText importantForAccessibility={'no'} accessible={false}>
          {formattedDate}
        </DateText>
      </Row>
      <Column importantForAccessibility={'no'} accessible={false}>
        {menu.map((food, i) => {
          const hasAllergens = food.allergens.length > 0;

          const formattedAllergens = hasAllergens
            ? `Contém: ${food.allergens.join(', ')}.`
            : '';
          const accessibilityFormattedFood = `${food.category}, ${food.name}. ${formattedAllergens}`;

          const key = `${i}-${food.category}-${food.name}`;

          return (
            <FoodItemView
              key={key}
              isOdd={i % 2 === 0}
              accessible={isSelected}
              importantForAccessibility={isSelected ? 'yes' : 'no'}
              accessibilityLabel={accessibilityFormattedFood}>
              <Row>
                <CategoryText
                  importantForAccessibility={'no'}
                  accessible={false}>
                  {food.category}
                </CategoryText>
                <FoodText importantForAccessibility={'no'} accessible={false}>
                  {food.name}
                </FoodText>
              </Row>
              {hasAllergens && (
                <AllergenText
                  importantForAccessibility={'no'}
                  accessible={false}>
                  {formattedAllergens}
                </AllergenText>
              )}
            </FoodItemView>
          );
        })}
      </Column>
    </CardContainer>
  );
};

export default FoodMenuCard;
