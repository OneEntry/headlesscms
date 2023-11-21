import {StyleProp, TextProps, TextStyle} from 'react-native';
import {StyleColors, styleColors} from '../utils/consts';
import Animated from 'react-native-reanimated';

export type ParagraphProps = TextProps & {
  size?: number;
  weight?: TextStyle['fontWeight'];
  color?: StyleColors;
};
export const Paragraph = (props: ParagraphProps) => {
  const {size, weight, style, color, ...rest} = props;

  const additionalStyles: StyleProp<TextStyle> = {
    fontSize: size,
    fontWeight: weight,
    color: styleColors[color ?? 'gray'],
  };

  return <Animated.Text style={[additionalStyles, style]} {...rest} />;
};
