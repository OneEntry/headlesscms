import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import {ROUNDED_RADIUS, styleColors} from '../utils/consts';
import {PropsWithChildren} from 'react';
import {Paragraph, ParagraphProps} from './Paragraph';

type ButtonProps = PropsWithChildren<
  TouchableOpacityProps & {
    style?: StyleProp<ViewStyle>;
    rounded?: boolean;
    paragraphProps?: ParagraphProps;
  }
>;

export const Button = (props: ButtonProps) => {
  const {children, style, rounded, paragraphProps, ...rest} = props;

  const additionalStyles = {
    borderRadius: rounded ? ROUNDED_RADIUS : undefined,
  };

  return (
    <TouchableOpacity
      style={[styles.container, additionalStyles, style]}
      {...rest}>
      <Paragraph
        {...paragraphProps}
        style={[styles.text, paragraphProps?.style]}>
        {children}
      </Paragraph>
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
