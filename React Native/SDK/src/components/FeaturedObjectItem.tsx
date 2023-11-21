import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {ROUNDED_RADIUS, styleColors} from '../utils/consts';
// import StarIcon from '../assets/icons/star.svg';
import {Paragraph} from './Paragraph';
import React, {useContext, useEffect, useState} from 'react';
import {useAppNavigation} from '../navigation/types';
import {LanguageContext} from '../providers/LanguageContext';
import { IProductsEntity } from "oneentry/dist/products/productsInterfaces";

type FeaturedObjectType = {
  product: IProductsEntity;
  perRow?: number;
};

export const FeaturedObjectItem = ({product, perRow}: FeaturedObjectType) => {
  const {activeLanguage} = useContext(LanguageContext);
  const [attributes, setAttributes] = useState(
    product.attributeValues[activeLanguage],
  );
  const navigation = useAppNavigation();
  useEffect(() => {
    setAttributes(product.attributeValues[activeLanguage]);
  }, [product]);
  return (
    <TouchableOpacity
      style={
        perRow
          ? perRow > 1
            ? styles.flatlistItemRow
            : styles.flatlistItem
          : styles.flatlistItem
      }
      onPress={() => navigation.navigate('Product', {id: product.id})}>
      <View style={styles.cardContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: attributes?.pic?.value[0].downloadLink}}
            style={styles.flatlistImage}
            key={'pic'}
          />
        </View>
      </View>
      <View style={styles.textContainer}>
        <Paragraph weight="bold">
          {product?.localizeInfos?.[activeLanguage]?.title}
        </Paragraph>
        <Paragraph weight="bold">$ {product?.price}</Paragraph>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    backgroundColor: styleColors.background,
    borderRadius: ROUNDED_RADIUS,
    paddingVertical: 4,
    paddingHorizontal: 12,
    position: 'absolute',
    bottom: -8,
  },
  textContainer: {
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  flatlistItem: {
    width: '100%',
    flex: 1,
    height: 128,
    flexDirection: 'row',
    backgroundColor: '#F6F7F9',
    borderRadius: 10,
    gap: 22,
  },
  flatlistItemRow: {
    flexDirection: 'column',
    width: '45%',
    backgroundColor: '#F6F7F9',
    borderRadius: 10,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    gap: 22,
  },
  cardContainer: {
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    padding: 10,
    width: 108,
    height: 108,
    borderRadius: 15,
    backgroundColor: '#F8F8F8',
  },
  flatlistImage: {
    height: '100%',
    width: '100%',
    borderRadius: 15,
    objectFit: 'contain',
    backgroundColor: '#F8F8F8',
  },
});
