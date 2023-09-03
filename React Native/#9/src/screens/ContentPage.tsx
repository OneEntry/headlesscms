import {View} from 'react-native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {DrawerStack} from '../../App';
import React from 'react';
import {NavigationProps} from '../navigation/types';

export const ContentPage: React.FC<NavigationProps> = ({navigation, route}) => {
  console.log(route);
  return <View />;
};
