import {useNavigation} from '@react-navigation/native';
import { DrawerNavigationProp, DrawerScreenProps } from "@react-navigation/drawer";

export type DrawerStack = {
  [key: string]: {
    pageUrl: string;
    title: string;
  };
};

export const useAppNavigation = () =>
  useNavigation<DrawerNavigationProp<DrawerStack>>();

export type NavigationProps = DrawerScreenProps<DrawerStack>;


