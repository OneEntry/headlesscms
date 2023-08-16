import {View, ViewProps, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {layoutPadding} from '../utils/consts';

export type Edge = 'top' | 'bottom' | 'horizontal';

type ScreenProps = ViewProps & {
  edges?: Edge[];
};

export const Screen = (props: ScreenProps) => {
  const {children, edges, style, ...rest} = props;

  const {bottom, top} = useSafeAreaInsets();

  const styles: ViewStyle = {
    marginBottom: edges?.includes('bottom') ? bottom : undefined,
    paddingTop: edges?.includes('top') ? top : undefined,
    marginLeft: edges?.includes('horizontal') ? layoutPadding : undefined,
    marginRight: edges?.includes('horizontal') ? layoutPadding : undefined,
    flex: 1,
  };

  return (
    <View style={[styles, style]} {...rest}>
      {children}
    </View>
  );
};
