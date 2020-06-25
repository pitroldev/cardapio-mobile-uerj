import React, { Component } from 'react';
import { RefreshControl, StatusBar, Animated } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
const cheerio = require('react-native-cheerio');
import { RUapi } from '../../services/axios';

import Responsive from '../../utils/responsive';

import CarouselView from '../../components/carousel';
import Footer from '../../components/Footer';
import About from '../../components/About';
import { ParseErrorView, NetworkErrorView } from '../../components/Errors';
import Header from '../../components/Header';

import { Refresh, Loading, Background } from './styles';

const CardapioView = Animated.createAnimatedComponent(Refresh);

export default class Main extends Component {
  state = {
    loading: true,
    htmlString: '',
    data: {},
    networkError: false,
    parseError: false,
    offline: false,
    about: false,
    headerHeight: new Animated.Value(Responsive(800)),
    menuHeight: new Animated.Value(Responsive(200)),
    footerHeight: new Animated.Value(Responsive(600)),
  };

  componentDidMount() {
    this.getCardapio();
  }

  initAnimation = () => {
    const options = {
      toValue: 0,
      friction: 7.5,
      tension: 50,
      duration: 500,
      useNativeDriver: true,
    };
    Animated.spring(this.state.headerHeight, options).start();
    Animated.spring(this.state.menuHeight, options).start();
    Animated.spring(this.state.footerHeight, options).start();
  };

  offlineCardapio = async () => {
    try {
      const htmlString = await AsyncStorage.getItem('@cardapio');

      if (htmlString !== null) {
        this.setState({ htmlString, offline: true });
        this.initAnimation();
        return this.parseData();
      }
      throw new Error('Bad Storage');
    } catch (err) {
      this.initAnimation();
      await AsyncStorage.removeItem('@cardapio');
      return this.setState({
        networkError: true,
        loading: false,
        offline: false,
      });
    }
  };

  getCardapio = async () => {
    try {
      this.setState({ loading: true, networkError: false, offline: false });

      const response = await RUapi.get('/cardapio.html');

      const htmlString = response.data;

      await AsyncStorage.setItem('@cardapio', htmlString);

      this.setState({ htmlString });

      return this.parseData();
    } catch (err) {
      return this.offlineCardapio();
    }
  };

  parseData = () => {
    try {
      this.setState({ loading: true, parseError: false });
      const { htmlString } = this.state;
      const $ = cheerio.load(htmlString);

      const data = {
        weeks: 1,
        info: [],
        days: [],
        today: undefined,
      };

      $('td.info').text((index, text) => {
        if (index < 8) {
          data.info.push(text);
        }
      });

      $('h1').text((index, text) => {
        data.weeks = index + 1;

        const split = text.split('');
        const Year = split[38] + split[39] + split[40] + split[41];
        const NumberDay = split[18] + split[19];
        let MonthName = '';
        let i = 25;
        while (i < split.length - 7) {
          MonthName += split[i];
          i = i + 1;
        }
        Object.defineProperty(data, `${index}_segunda`, {
          value: [parseInt(NumberDay, 10), MonthName, Year, 'Segunda-Feira'],
          writable: true,
          enumerable: true,
          configurable: true,
        });
        Object.defineProperty(data, `${index}_terca`, {
          value: [parseInt(NumberDay, 10) + 1, MonthName, Year, 'Terça-Feira'],
          writable: true,
          enumerable: true,
          configurable: true,
        });
        Object.defineProperty(data, `${index}_quarta`, {
          value: [parseInt(NumberDay, 10) + 2, MonthName, Year, 'Quarta-Feira'],
          writable: true,
          enumerable: true,
          configurable: true,
        });
        Object.defineProperty(data, `${index}_quinta`, {
          value: [parseInt(NumberDay, 10) + 3, MonthName, Year, 'Quinta-Feira'],
          writable: true,
          enumerable: true,
          configurable: true,
        });
        Object.defineProperty(data, `${index}_sexta`, {
          value: [parseInt(NumberDay, 10) + 4, MonthName, Year, 'Sexta-Feira'],
          writable: true,
          enumerable: true,
          configurable: true,
        });
      });

      function handleIndex(i) {
        if (i > 1) {
          return (i - 1) * 8 + 1;
        } else {
          return (i - 1) * 8;
        }
      }

      let i = 1;
      while (i <= data.weeks) {
        $('td.segunda').text((index, text) => {
          if (index >= handleIndex(i) && index <= i * 8) {
            data[`${i - 1}_segunda`].push(text);
          }
        });
        $('td.terca').text((index, text) => {
          if (index >= handleIndex(i) && index <= i * 8) {
            data[`${i - 1}_terca`].push(text);
          }
        });
        $('td.quarta').text((index, text) => {
          if (index >= handleIndex(i) && index <= i * 8) {
            data[`${i - 1}_quarta`].push(text);
          }
        });
        $('td.quinta').text((index, text) => {
          if (index >= handleIndex(i) && index <= i * 8) {
            data[`${i - 1}_quinta`].push(text);
          }
        });
        $('td.sexta').text((index, text) => {
          if (index >= handleIndex(i) && index <= i * 8) {
            data[`${i - 1}_sexta`].push(text);
          }
        });
        i = i + 1;
      }

      if (data.info.length !== 8) {
        throw new Error('ParseData Error');
      }

      let j = data.weeks;
      while (j > 0) {
        data.days.push(data[`${j - 1}_segunda`]);
        data.days.push(data[`${j - 1}_terca`]);
        data.days.push(data[`${j - 1}_quarta`]);
        data.days.push(data[`${j - 1}_quinta`]);
        data.days.push(data[`${j - 1}_sexta`]);
        j = j - 1;
      }

      const { days } = data;

      let inWeek = false;
      let counter = 0;

      days.forEach(day => {
        const now = new Date();
        if (now.getDate() === day[0]) {
          data.today = counter;
          inWeek = true;
        } else {
          counter = counter + 1;
          if (!inWeek) {
            data.today = days.length - 5;
          }
        }
      });

      this.initAnimation();
      return this.setState({
        data,
        loading: false,
      });
    } catch (err) {
      console.log('erro', err);
      this.initAnimation();
      return this.setState({ loading: false, parseError: true });
    }
  };

  render() {
    return (
      <Background>
        <StatusBar backgroundColor={this.state.about ? '#eaeaea' : '#0080c6'} />
        <Header
          parseError={this.state.parseError}
          offline={this.state.offline}
          getCardapio={this.getCardapio}
          loading={this.state.loading}
          height={this.state.headerHeight}
        />
        <About
          visible={this.state.about}
          setState={state => this.setState(state)}
        />
        <CardapioView
          accessible={false}
          importantForAccessibility={'no'}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={() => this.getCardapio()}
            />
          }
          style={[
            {
              translateY: this.state.menuHeight,
            },
          ]}>
          {this.state.networkError && !this.state.offine ? (
            <NetworkErrorView />
          ) : this.state.parseError ? (
            <ParseErrorView />
          ) : this.state.loading ? (
            <Loading size={Responsive(60)} color="#fff" />
          ) : (
            <CarouselView data={this.state.data} />
          )}
        </CardapioView>
        <Footer
          setState={state => this.setState(state)}
          height={this.state.footerHeight}
        />
      </Background>
    );
  }
}
