import {View} from 'react-native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import React from 'react';
import { DrawerStack, NavigationProps } from "../navigation/types";

export const ContentPage: React.FC<NavigationProps> = ({navigation, route}) => {
  console.log(route);
  return <View />;
};
