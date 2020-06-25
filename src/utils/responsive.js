import { Dimensions, Platform, PixelRatio } from 'react-native';

export default function responsive(size) {
  const { height: SCREEN_HEIGHT } = Dimensions.get('window');

  const scale = SCREEN_HEIGHT / 775; // Redmi Note 7 HEIGHT

  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}
