import React, {memo} from 'react';
import {RefreshControl, ScrollView} from 'react-native';

interface Props {
  refresh: () => void;
  children: React.ReactNode;
}

const RefreshScreen: React.FC<Props> = props => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    props.refresh();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      showsVerticalScrollIndicator={false}
      {...props}>
      {props.children}
    </ScrollView>
  );
};
export default memo(RefreshScreen);
