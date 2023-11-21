import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Paragraph} from './Paragraph';
import {ROUNDED_RADIUS, styleColors} from '../utils/consts';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

type BadgeProps = TBadge & {
  onChange: (value: number) => void;
  isActive?: boolean;
  index: number;
};

type BadgeListProps = {
  options: TBadge[];
  onChange: (value: number) => void;
  activeValue?: number | string;
};
const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

export const Badge = (props: BadgeProps) => {
  const {label, value, isActive, onChange, index} = props;

  const isActiveValue = useDerivedValue(() => withTiming(isActive ? 1 : 0));

  const animatedStyles = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      isActiveValue.value,
      [0, 1],
      [styleColors.white, '#F6F7F9'],
    ),
    borderColor: interpolateColor(
      isActiveValue.value,
      [0, 1],
      [styleColors.border_color, '#F6F7F9'],
    ),
  }));

  const animatedParagraphStyles = useAnimatedStyle(() => ({
    color: interpolateColor(
      isActiveValue.value,
      [0, 1],
      [styleColors.border_color, '#4C4D56'],
    ),
  }));
  // const animatedBorderSyles = useAnimatedStyle(() => ({
  //   bor,
  // }));

  return (
    <AnimatedTouchableOpacity
      onPress={() => onChange(index)}
      style={[animatedStyles, styles.item]}>
      <Paragraph style={animatedParagraphStyles} size={16} weight="500">
        {label}
      </Paragraph>
    </AnimatedTouchableOpacity>
  );
};

export const BadgeList = (props: BadgeListProps) => {
  const {options, activeValue, onChange} = props;
  return (
    <View style={styles.container}>
      {options.map((option, index) => (
        <Badge
          key={option.value}
          onChange={onChange}
          {...option}
          index={index}
          isActive={activeValue === index}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    paddingTop: 20,
  },
  item: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    // borderColor: styleColors.border_color,
    borderWidth: 2,
    borderRadius: ROUNDED_RADIUS,
  },
});
