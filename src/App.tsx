import React from 'react';
import {StatusBar} from 'react-native';

import moment from 'moment';
import 'moment/locale/pt-br';

import {Provider} from 'react-redux';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';

import {QueryClientProvider} from '@tanstack/react-query';

import store from '@/store';
import queryClient from '@/services/query-client';

import FoodMenuPage from '@/pages/FoodMenuPage';

const App = () => {
  moment.locale('id');

  const persistor = persistStore(store);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <PersistGate loading={null} persistor={persistor}>
          <StatusBar backgroundColor={'#0080c6'} />
          <FoodMenuPage />
        </PersistGate>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
