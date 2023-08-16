import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import {ROUNDED_RADIUS, styleColors} from '../utils/consts';
import {PropsWithChildren} from 'react';

type ButtonProps = PropsWithChildren<
  TouchableOpacityProps & {style?: StyleProp<ViewStyle>; rounded?: boolean}
>;

export const Button = (props: ButtonProps) => {
  const {children, style, rounded, ...rest} = props;

  const additionalStyles = {
    borderRadius: rounded ? ROUNDED_RADIUS : undefined,
  };

  return (
    <TouchableOpacity
      style={[styles.container, additionalStyles, style]}
      {...rest}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 18,
    paddingHorizontal: 32,
    width: '100%',
    backgroundColor: styleColors.white50,
  },
  text: {
    textAlign: 'center',
  },
});
