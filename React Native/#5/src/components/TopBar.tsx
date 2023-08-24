import React, {FC, ReactNode} from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {DrawerActions, useNavigation, useRoute} from '@react-navigation/native';
import {Paragraph} from './Paragraph';
import {
  StyleColors,
  layoutPadding,
  layoutWidth,
  styleColors,
} from '../utils/consts';
import Back from '../assets/icons/back.svg';
import Menu from '../assets/icons/menu.svg';
import Dots from '../assets/icons/dots.svg';
import Cart from '../assets/icons/cart.svg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export interface ITopBar {
  isBack?: boolean;
  title?: string;
  children?: ReactNode;
  background?: StyleColors;
  color: StyleColors;
  RightIcon?: () => JSX.Element;
  onBackClick?: () => void;
}

export const TopBar = ({
  title,
  background,
  color,
  RightIcon,
  onBackClick,
}: ITopBar) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const route = useRoute();

  const additionalStyles: StyleProp<ViewStyle> = {
    paddingTop: insets.top,
    backgroundColor: styleColors[background ?? 'white'],
  };

  const handlePressToMenu = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  const handlePressToCart = () => {
    // navigation.navigate('Home');
  };

  return (
    <View style={[additionalStyles, styles.container]}>
      <View style={styles.insideContainer}>
        {!route.name ? (
          <TouchableOpacity
            onPress={onBackClick ?? (() => navigation.goBack())}>
            <Back width={24} fill={styleColors[color ?? 'gray']} />
          </TouchableOpacity>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              gap: 12,
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={handlePressToMenu}>
              <Menu width={24} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePressToCart}>
              <Cart width={24} />
            </TouchableOpacity>
          </View>
        )}
        {!!title && (
          <View style={styles.titleContainer} pointerEvents="none">
            <Paragraph size={18} numberOfLines={1} color={color}>
              {title}
            </Paragraph>
          </View>
        )}
        {RightIcon ? <RightIcon /> : <Dots width={24} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: layoutPadding,
    width: '100%',
    paddingBottom: 12,
  },
  insideContainer: {
    width: layoutWidth,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  titleContainer: {
    width: '100%',
    position: 'absolute',
    alignItems: 'center',
  },
});
