import {Dimensions} from 'react-native';

export const ROUNDED_RADIUS = 99999999;
export const layoutPadding = 20;
export const layoutWidth = Dimensions.get('window').width - layoutPadding * 2;
export const styleColors = {
  white: '#ffffff',
  white50: 'rgba(255,255,255,0.5)',
  background: '#EC722B',
  yellow: '#FFD129',
  gray: '#4C4D56',
  gray_v2: '#F6F7F9',
  border_color: '#A8A9B5',
  lightGray: '#B0BCCE',
  gray100: '#F5F5F5',
  gray200: '#EEEFF0',
  gray300: '#D7DBDF',
  gray400: '#C4C6CA',
  black: '#000000',
  facebook: '#4255FF',
};

export const projectUrl = 'https://react-native-course.oneentry.cloud';

export type StyleColors = keyof typeof styleColors;
