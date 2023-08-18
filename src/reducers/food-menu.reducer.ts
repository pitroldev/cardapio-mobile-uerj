import moment from 'moment';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {FoodMenuDay} from '@/types/food-menu.types';

import {AppState} from '@/store';

type FoodMenuReducerData = {
  data: FoodMenuDay[];
  lastUpdatedAt: Date;
};

const initialState = {
  data: [],
  lastUpdatedAt: new Date(),
} as FoodMenuReducerData;

const slice = createSlice({
  name: 'foodMenu',
  initialState,
  reducers: {
    insert: (state, action: PayloadAction<FoodMenuDay>) => {
      const newData = state.data.filter(FoodMenuDay =>
        moment(FoodMenuDay.date).isSame(moment(action.payload.date), 'day'),
      );

      newData.push(action.payload);

      Object.assign(state, {
        data: newData,
        lastUpdate: new Date(),
      });

      return state;
    },
    insertMany: (state, action: PayloadAction<FoodMenuDay[]>) => {
      const newData = state.data.filter(
        FoodMenuDay =>
          !action.payload.some(newFoodMenuDay =>
            moment(FoodMenuDay.date).isSame(moment(newFoodMenuDay.date), 'day'),
          ),
      );

      newData.push(...action.payload);

      Object.assign(state, {
        data: newData,
        lastUpdate: new Date(),
      });

      return state;
    },
    clear: state => {
      Object.assign(state, initialState);
    },
  },
});

export const {insert, insertMany, clear} = slice.actions;
export const selectAll = (state: AppState) => state.foodMenu;

export default slice.reducer;
