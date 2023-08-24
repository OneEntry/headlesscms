import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Paragraph} from './Paragraph';
import {ROUNDED_RADIUS, styleColors} from '../utils/consts';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

type TBadge = {
  label: string;
  value: string;
};
type BadgeProps = TBadge & {
  onChange: (value: string) => void;
  isActive?: boolean;
};

type BadgeListProps = {
  options: TBadge[];
  onChange: (value: string) => void;
  activeValue?: string;
};
const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

export const Badge = (props: BadgeProps) => {
  const {label, value, isActive, onChange} = props;

  const isActiveValue = useDerivedValue(() => withTiming(isActive ? 1 : 0));

  const animatedStyles = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      isActiveValue.value,
      [0, 1],
      [styleColors.white, styleColors.background],
    ),
  }));

  const animatedParagraphStyles = useAnimatedStyle(() => ({
    color: interpolateColor(
      isActiveValue.value,
      [0, 1],
      [styleColors.background, styleColors.white],
    ),
  }));

  return (
    <AnimatedTouchableOpacity
      onPress={() => onChange(value)}
      style={[animatedStyles, styles.item]}>
      <Paragraph style={animatedParagraphStyles} size={16} weight="bold">
        {label}
      </Paragraph>
    </AnimatedTouchableOpacity>
  );
};

export const BadgeList = (props: BadgeListProps) => {
  const {options, activeValue, onChange} = props;
  return (
    <View style={styles.container}>
      {options.map(option => (
        <Badge
          key={option.value}
          onChange={onChange}
          {...option}
          isActive={activeValue === option.value}
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
    paddingBottom: 12,
  },
  item: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderColor: styleColors.background,
    borderWidth: 2,
    borderRadius: ROUNDED_RADIUS,
  },
});
