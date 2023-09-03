import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationProps} from '../navigation/types';
import {useGetPage} from '../services/api';
import {styleColors} from '../utils/consts';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Screen} from '../components/Screen';
import {Paragraph} from '../components/Paragraph';

export const Blog: React.FC<NavigationProps> = ({navigation, route}) => {
  const [page, setPage] = useState<Page>();
  const insets = useSafeAreaInsets();
  const {pageInfo} = useGetPage({
    pageUrl: route.params.pageUrl,
  });

  useEffect(() => {
    setPage(pageInfo);
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
        {pageInfo?.attributeValues?.map((atribute: any) => {
          if (atribute?.title) {
            return (
              <Paragraph
                key={atribute.title[0].value}
                size={22}
                weight={'bold'}>
                {atribute.title[0].value}
              </Paragraph>
            );
          }
          if (atribute?.image) {
            return (
              <Image
                key={atribute?.image}
                source={{uri: atribute.image[0].downloadLink}}
                style={{width: '100%', height: 200}}
              />
            );
          }
          if (atribute?.content) {
            return (
              <Paragraph key={atribute.content[0].value} size={14}>
                {atribute.content[0].value}
              </Paragraph>
            );
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
