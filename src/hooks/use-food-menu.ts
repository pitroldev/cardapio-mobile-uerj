import {UseQueryOptions, useQuery} from '@tanstack/react-query';

import {useAppSelector, useAppDispatch} from '@/store/index';
import * as foodMenuReducer from '@/reducers/food-menu.reducer';

import {parseFoodMenu} from '@/core/parse-food-menu';

type FetchFoodMenuOptions = UseQueryOptions<string, unknown, string, string[]>;

const UERJ_RU_URL = 'http://www.restauranteuniversitario.uerj.br/';

export const useFoodMenu = (options?: FetchFoodMenuOptions) => {
  const dispatch = useAppDispatch();
  const {data, lastUpdatedAt} = useAppSelector(foodMenuReducer.selectAll);

  const queryResult = useQuery({
    ...options,
    queryKey: ['food-menu'],
    queryFn: async ({signal}) => {
      const res = await fetch(UERJ_RU_URL, {
        method: 'GET',
        headers: {'Cache-Control': 'no-cache'},
        signal,
      });

      const html = await res.text();

      return html;
    },
    onSuccess: html => {
      const FoodMenuDays = parseFoodMenu(html);

      dispatch(foodMenuReducer.insertMany(FoodMenuDays));
    },
    onError: options?.onError,
  });

  return {
    ...queryResult,
    data,
    lastUpdatedAt,
  };
};
