import React, {memo} from 'react';
import Menu from '../../assets/icons/menu.svg';
import Search from '../../assets/icons/search-icon.svg';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {DrawerActions, useNavigation, useRoute} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {layoutPadding, layoutWidth, styleColors} from '../../utils/consts';
interface Props {
  isSearch: boolean;
}

const TopBarV2: React.FC<Props> = ({isSearch}) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const route = useRoute();

  const handlePressToMenu = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };
  const additionalStyles: StyleProp<ViewStyle> = {
    paddingTop: insets.top,
  };
  return (
    <View style={[styles.container]}>
      <View style={styles.insideContainer}>
        <View
          style={{
            flexDirection: 'row',
            gap: 12,
            alignItems: 'center',
            justifyContent: 'flex-end',
            position: 'absolute',
            top: insets.top,
            width: '100%',
          }}>
          {isSearch && (
            <TouchableOpacity>
              <Search width={24} />
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={handlePressToMenu}>
            <Menu width={24} color={'black'} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default TopBarV2;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: layoutPadding,
    width: '100%',
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
