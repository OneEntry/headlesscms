import {useNavigation} from '@react-navigation/native';
import { DrawerNavigationProp, DrawerScreenProps } from "@react-navigation/drawer";

export type DrawerStack = {
  [key: string]: {
    pageUrl: string;
    title: string;
  };
};

export type StackType = {
  DrawerStack: undefined;
  Product: {id: string};
}
export const useAppNavigation = () =>
  useNavigation<DrawerNavigationProp<DrawerStack | StackType>>();

export type NavigationProps = DrawerScreenProps<StackType>;
export type NavigationStackProps = DrawerScreenProps<StackType>;


