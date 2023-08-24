import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {ROUNDED_RADIUS, styleColors} from '../utils/consts';
import {Paragraph} from './Paragraph';
import {useState} from 'react';
import Plus from '../assets/icons/plus.svg';
import Minus from '../assets/icons/minus.svg';

export const Counter = ({count, setCount}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setCount(count > 1 ? count - 1 : count)} hitSlop={24}>
        <Minus />
      </TouchableOpacity>
      <Paragraph numberOfLines={1} weight="bold">
        {count}
      </Paragraph>
      <TouchableOpacity onPress={() => setCount(prev => prev + 1)} hitSlop={24}>
        <Plus />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: ROUNDED_RADIUS,
    gap: 24,
    borderColor: styleColors.lightGray,
    borderWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
});
