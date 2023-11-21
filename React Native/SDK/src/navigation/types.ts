import {NavigatorScreenParams, useNavigation} from '@react-navigation/native';
import {
  DrawerNavigationProp,
  DrawerScreenProps,
} from '@react-navigation/drawer';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

export type DrawerStack = {
  [key: string]: {
    pageUrl: string;
    title: string;
  };
};

export type StackType = {
  DrawerStack: NavigatorScreenParams<DrawerStack>;
  Product: {
    id: number;
  };
  Error: {
    errorTitle: string;
    errorDescription: string;
  };
};

export const useAppNavigation = () =>
  useNavigation<DrawerNavigationProp<StackType>>();

export type NavigationProps = DrawerScreenProps<DrawerStack>;
export type StackNavigationProps = NativeStackScreenProps<StackType>;
