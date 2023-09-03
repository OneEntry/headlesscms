import {View, ViewProps, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {layoutPadding, styleColors} from '../utils/consts';

export type Edge = 'top' | 'bottom' | 'horizontal';

type ScreenProps = ViewProps & {
  edges?: Edge[];
  white?: boolean;
  isFlex?: boolean;
};

export const Screen = (props: ScreenProps) => {
  const {children, edges, style, white, isFlex, ...rest} = props;
  const {bottom, top} = useSafeAreaInsets();

  const styles: ViewStyle = {
    paddingBottom: edges?.includes('bottom') ? bottom : undefined,
    paddingTop: edges?.includes('top') ? top : undefined,
    paddingLeft: edges?.includes('horizontal') ? layoutPadding : undefined,
    paddingRight: edges?.includes('horizontal') ? layoutPadding : undefined,
    flex: isFlex ? 1 : undefined,
    backgroundColor: white ? styleColors.white : undefined,
  };

  return (
    <View>
      <View style={[styles, style]} {...rest}>
        {children}
      </View>
    </View>
  );
};
