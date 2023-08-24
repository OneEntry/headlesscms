import React, { useEffect, useState } from 'react';
import {Dimensions, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Paragraph } from '../components/Paragraph';
import { Screen } from '../components/Screen';
import {NavigationProps} from '../navigation/types';
import { useGetPage } from '../services/api';
import { styleColors } from '../utils/consts';

const Home: React.FC<NavigationProps> = ({navigation, route}) => {
  const [pageContent, setPageContent] = useState<Page>();
  const insets = useSafeAreaInsets();
  const {result: pageInfo} = useGetPage({
    pageUrl: route.params.pageUrl,
  });
  useEffect(() => {
    setPageContent(pageInfo);
  }, [pageInfo]);

  return (
    <ScrollView
      style={{backgroundColor: styleColors.white}}
      contentContainerStyle={{paddingBottom: insets.bottom ?? 8}}>
      <Screen
        white
        edges={['top', 'horizontal']}
        isFlex
        style={styles.container}>
        {pageInfo?.attributeValues.map(item => {
          if (item.image) {
            return <Image source={{uri: item.image[0].downloadLink}} style={{width: '100%', height: 200}} />
          }
        })}
      </Screen>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 24,
  },
});

export default Home;
