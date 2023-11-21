import React, {memo} from 'react';
import {NativeModules, RefreshControl, ScrollView, View} from 'react-native';
import {Paragraph} from '../components/Paragraph';

interface Props {}

const ContentNotVisible: React.FC<Props> = ({}) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    NativeModules.DevSettings.reload();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Paragraph size={24}>Content not visible</Paragraph>
      </View>
    </ScrollView>
  );
};

export default memo(ContentNotVisible);
