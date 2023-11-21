import {
  Dimensions,
  Image,
  NativeModules,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {NavigationProps} from '../navigation/types';
import banner from '../assets/banner.png';
import logo from '../assets/logo.png';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {layoutPadding, styleColors} from '../utils/consts';
import { api, useGetPage } from "../services/api";
import {LanguageContext} from '../providers/LanguageContext';
import {Paragraph} from '../components/Paragraph';
import {IPagesEntity} from 'oneentry/dist/pages/pagesInterfaces';
import {Screen} from '../components/Screen';
import Offer from '../components/Offer';
import {IProductsEntity} from 'oneentry/dist/products/productsInterfaces';

const {width, height} = Dimensions.get('window');

export const Home: React.FC<NavigationProps> = ({ route}) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [page, setPage] = useState<IPagesEntity>({});
  const [offers, setOffers] = useState<IProductsEntity[]>([]);
  const {pageInfo} = useGetPage({pageUrl: route.params.pageUrl});
  const {activeLanguage} = useContext(LanguageContext);
  useEffect(() => {
    (async () => {
      const offers = await api.Product.getProductsPageByUrl('home_catalog');
      setPage(page);
      setOffers(offers);
    })();
  }, [activeLanguage]);
  const insets = useSafeAreaInsets();
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
      <Image source={banner} style={styles.banner} />

      <Screen style={styles.container}>
        <Image
          source={logo}
          style={[styles.logo, {paddingTop: insets.top * 1.7, gap: 12}]}
        />
        <View style={styles.text_container}>
          <Paragraph color={'white'} size={28} weight={'700'}>
            {pageInfo?.attributeValues?.[activeLanguage]?.home_title?.value || ''}
          </Paragraph>
          <Paragraph
            style={{textAlign: 'right', width: '50%'}}
            color={'black'}
            size={24}>
            {pageInfo?.attributeValues?.[activeLanguage]?.quote?.value || ''}
          </Paragraph>
        </View>
      </Screen>
      <Screen style={{height: '100%'}}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {offers.map(offer => {
            return (
              <Offer
                pic={
                  offer?.attributeValues[activeLanguage]?.pic1.value[0]
                    .downloadLink
                }
                text={offer?.attributeValues[
                  activeLanguage
                ]?.title1.value.toUpperCase()}
                productId={
                  offer?.attributeValues[activeLanguage]?.product_id?.value
                }
              />
            );
          })}
        </ScrollView>
      </Screen>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: layoutPadding,
    height: 262,
  },
  text_container: {
    position: 'absolute',
    height: 250,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    // width: '100%',
    paddingHorizontal: layoutPadding,
    right: 0,
    left: 0,
    // margin: 0,
  },
  banner: {
    position: 'absolute',
    width: '100%',
    // height: 100,
  },
  logo: {
    width: '35%',
    objectFit: 'contain',
  },
  carousel: {
    bottom: 0,
    left: 0,
    height: '100%',
    width: '100%',
    backgroundColor: styleColors.background,
  },
  carouselItem: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: styleColors.background,
  },
  button: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
});
