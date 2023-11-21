import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {NavigationProps} from '../navigation/types';
import {useGetPage} from '../services/api';
import {styleColors} from '../utils/consts';
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context';
import {Screen} from '../components/Screen';
import {Paragraph} from '../components/Paragraph';
import {LanguageContext} from '../providers/LanguageContext';
import ContentNotVisible from './ContentNotVisible';
import RefreshScreen from '../components/RefreshScreen';

export const EmptyContent = ({
  insets,
  onRefresh,
}: {
  insets: EdgeInsets;
  onRefresh: () => void;
}) => {
  return (
    <RefreshScreen
      refresh={onRefresh}
      style={{backgroundColor: styleColors.white}}
      contentContainerStyle={{paddingBottom: insets.bottom ?? 8}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Paragraph size={24}>Content not visible</Paragraph>
      </View>
    </RefreshScreen>
  );
};
export const Blog: React.FC<NavigationProps> = ({route}) => {
  const [attributes, setAttributes] = useState<any>();
  const insets = useSafeAreaInsets();
  const {activeLanguage} = useContext(LanguageContext);
  const {pageInfo, loading, refresh} = useGetPage({
    pageUrl: route.params.pageUrl,
  });

  const onRefresh = () => {
    refresh(true);
  };

  useEffect(() => {
    if (pageInfo) {
      console.log(pageInfo);
      setAttributes(pageInfo.attributeValues[activeLanguage]);
    }
  }, [pageInfo]);

  if (!pageInfo?.attributeValues[activeLanguage]?.title && !loading) {
    return <EmptyContent insets={insets} onRefresh={onRefresh} />;
  }

  if (!pageInfo?.isVisible) {
    return <EmptyContent insets={insets} onRefresh={onRefresh} />;
  }
  return (
    <RefreshScreen
      refresh={onRefresh}
      style={{backgroundColor: styleColors.white}}
      contentContainerStyle={{paddingBottom: insets.bottom ?? 8}}>
      <Screen
        white
        edges={['top', 'horizontal']}
        isFlex
        style={styles.container}>
        <Paragraph size={22} weight={'bold'}>
          {attributes?.title?.value}
        </Paragraph>
        <Image
          source={{uri: attributes?.image?.value[0]?.downloadLink}}
          style={{width: '100%', height: 200}}
        />
        <Paragraph size={14}>
          {attributes?.content?.value[0]?.plainValue}
        </Paragraph>
      </Screen>
    </RefreshScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 24,
  },
});
