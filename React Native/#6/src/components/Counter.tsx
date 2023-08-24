import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {ROUNDED_RADIUS, styleColors} from '../utils/consts';
import {Paragraph} from './Paragraph';
import {Dispatch, useState} from 'react';
import Plus from '../assets/icons/plus.svg';
import Minus from '../assets/icons/minus.svg';

type Props = {
  count: number;
  setCount: Dispatch<number>;
};
export const Counter = ({count, setCount}: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setCount(count > 1 ? count - 1 : count)}
        hitSlop={24}>
        <Minus />
      </TouchableOpacity>
      <Paragraph numberOfLines={1} weight="bold">
        {count}
      </Paragraph>
      <TouchableOpacity onPress={() => setCount(count + 1)} hitSlop={24}>
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
