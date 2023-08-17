/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CarouselView from '../../components/carousel';
import Footer from '../../components/Footer';
import {ParseErrorView, NetworkErrorView} from '../../components/Errors';
import Header from '../../components/Header';

import parseData from './parser';

import {Loading, Background, View} from './styles';

const Main = (props) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({
    networkError: false,
    parseError: false,
    offline: false,
  });

  async function getStoredData() {
    try {
      const storedData = await AsyncStorage.getItem('@cardapio');

      if (storedData) {
        const parsedData = await JSON.parse(storedData);
        return parsedData;
      }
      throw new Error('Storage Error');
    } catch (err) {
      await AsyncStorage.removeItem('@cardapio');
      return {storageError: true};
    }
  }

  async function getOnlineData() {
    try {
      setLoading(true);
      setErrors((c) => ({...c, networkError: false, offline: false}));

      const response = await fetch(
        'http://www.restauranteuniversitario.uerj.br/cardapio.html',
        {method: 'GET', headers: {'Cache-Control': 'no-cache'}},
      );

      const html = await response.text();

      const parsedData = parseData(html);

      if (parsedData.error) {
        setErrors((c) => ({...c, parseError: true}));
        throw new Error('Parse data Error');
      }

      await AsyncStorage.setItem('@cardapio', JSON.stringify(parsedData));

      setData(parsedData);
      setLoading(false);
    } catch (err) {
      const storedData = await getStoredData();

      if (storedData.storageError) {
        setErrors((c) => ({...c, networkError: true, offline: false}));
      } else {
        setErrors((c) => ({...c, offline: true}));
        setData(storedData);
      }

      setLoading(false);
    }
  }

  useEffect(() => {
    getOnlineData();
  }, []);

  return (
    <Background>
      <Header parseError={errors.parseError} offline={errors.offline} />
      <View accessible={false} importantForAccessibility={'no'}>
        {!errors.parseError && errors.networkError && !errors.offine && (
          <NetworkErrorView getCardapio={getOnlineData} />
        )}
        {errors.parseError && <ParseErrorView />}
        {loading && <Loading size={60} color="#fff" />}
        {!loading && !errors.parseError && !errors.networkError && (
          <CarouselView data={data} getCardapio={getOnlineData} />
        )}
      </View>
      <Footer showAbout={props.showAbout} />
    </Background>
  );
};

export default Main;
