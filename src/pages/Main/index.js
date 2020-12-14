/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react';
import { Animated } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Responsive from '../../utils/responsive';

import CarouselView from '../../components/carousel';
import Footer from '../../components/Footer';
import { ParseErrorView, NetworkErrorView } from '../../components/Errors';
import Header from '../../components/Header';

import parseData from './parser';

import { Loading, Background, View } from './styles';
const CardapioView = Animated.createAnimatedComponent(View);

const Main = props => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({
    networkError: false,
    parseError: false,
    offline: false,
  });

  const headerHeight = useRef(new Animated.Value(Responsive(800))).current;
  const menuHeight = useRef(new Animated.Value(Responsive(200))).current;
  const footerHeight = useRef(new Animated.Value(Responsive(600))).current;

  function initAnimation() {
    const options = {
      toValue: 0,
      friction: 7.5,
      tension: 50,
      duration: 500,
      useNativeDriver: true,
    };
    Animated.spring(headerHeight, options).start();
    Animated.spring(menuHeight, options).start();
    Animated.spring(footerHeight, options).start();
  }

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
      return { storageError: true };
    }
  }

  async function getOnlineData() {
    try {
      setLoading(true);
      setErrors(c => ({ ...c, networkError: false, offline: false }));

      const response = await fetch(
        'http://www.restauranteuniversitario.uerj.br/cardapio.html',
        { method: 'GET', headers: { 'Cache-Control': 'no-cache' } },
      );

      const html = await response.text();

      const parsedData = parseData(html);

      if (parsedData.error) {
        setErrors(c => ({ ...c, parseError: true }));
        throw new Error('Parse data Error');
      }

      await AsyncStorage.setItem('@cardapio', JSON.stringify(parsedData));

      setData(parsedData);
      setLoading(false);
    } catch (err) {
      const storedData = await getStoredData();

      if (storedData.storageError) {
        setErrors(c => ({ ...c, networkError: true, offline: false }));
      } else {
        setErrors(c => ({ ...c, offline: true }));
        setData(storedData);
      }

      setLoading(false);
    }
  }

  useEffect(() => {
    async function load() {
      await getOnlineData();
      initAnimation();
    }
    load();
  }, []);

  return (
    <Background>
      <Header
        parseError={errors.parseError}
        offline={errors.offline}
        height={headerHeight}
      />

      <CardapioView
        accessible={false}
        importantForAccessibility={'no'}
        style={[
          {
            translateY: menuHeight,
          },
        ]}>
        {!errors.parseError && errors.networkError && !errors.offine && (
          <NetworkErrorView
            getCardapio={getOnlineData}
            menuHeight={menuHeight}
          />
        )}
        {errors.parseError && <ParseErrorView />}
        {loading && <Loading size={Responsive(60)} color="#fff" />}
        {!loading && !errors.parseError && !errors.networkError && (
          <CarouselView
            data={data}
            getCardapio={getOnlineData}
            menuHeight={menuHeight}
          />
        )}
      </CardapioView>
      <Footer showAbout={props.showAbout} height={footerHeight} />
    </Background>
  );
};

export default React.memo(Main, (prev, next) => {
  if (JSON.stringify(prev) === JSON.stringify(next)) {
    return true;
  }
  return false;
});
