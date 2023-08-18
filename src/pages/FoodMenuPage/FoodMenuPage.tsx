import React, {useEffect, useState} from 'react';
import {AccessibilityInfo} from 'react-native';

import {useFoodMenu} from '@/hooks/use-food-menu';

import Footer from '@/components/Footer';
import {WebView} from 'react-native-webview';
import FoodMenuCarousel from '@/components/FoodMenuCarousel';
import AboutModal from '@/components/AboutModal';

import {Loading, View} from './FoodMenuPage.styles';

const FoodMenuPage = () => {
  const [isScreenReaderEnabled, setIsScreenReaderEnabled] = useState(false);

  const [isAboutModalVisible, setIsAboutModalVisible] = useState(false);

  useEffect(() => {
    AccessibilityInfo.isScreenReaderEnabled().then(res => {
      setIsScreenReaderEnabled(res);
    });
  }, []);

  const {data, error, isFetching} = useFoodMenu();

  const handleAboutPress = () => {
    if (isScreenReaderEnabled) return;
    setIsAboutModalVisible(c => !c);
  };

  const hasError = error && !isFetching;
  const showFoodMenu = data.length > 0;
  const showLoading = isFetching && !hasError && !showFoodMenu;

  return (
    <View
      accessible={isFetching}
      importantForAccessibility={isFetching ? 'yes' : 'no'}
      accessibilityLabel="Carregando o cardápio do restaurante universitário da UERJ">
      <AboutModal
        visible={isAboutModalVisible}
        onHide={() => setIsAboutModalVisible(false)}
      />
      {showLoading && <Loading size={60} color="#fff" />}
      {showFoodMenu && <FoodMenuCarousel {...{data}} />}
      {hasError && (
        <WebView
          source={{
            uri: 'http://www.restauranteuniversitario.uerj.br/#cardapio',
          }}
          style={{height: '100%'}}
        />
      )}
      <Footer onAboutPress={handleAboutPress} />
    </View>
  );
};

export default FoodMenuPage;
