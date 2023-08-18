import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from '@reduxjs/toolkit';

import {persistReducer} from 'redux-persist';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

import AsyncStorage from '@react-native-async-storage/async-storage';

import foodMenu from '@/reducers/food-menu.reducer';

export function makeStore() {
  const reducers = combineReducers({
    foodMenu,
  });

  const persistConfig = {
    key: 'root',
    version: 1,
    storage: AsyncStorage,
  };

  const persistedReducer = persistReducer(persistConfig, reducers);

  return configureStore({
    reducer: persistedReducer,
    middleware: [],
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export default store;
