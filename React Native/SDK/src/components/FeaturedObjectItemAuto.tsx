import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {ROUNDED_RADIUS, styleColors} from '../utils/consts';
// import StarIcon from '../assets/icons/star.svg';
import {Paragraph} from './Paragraph';
import React, {useContext, useEffect, useState} from 'react';
import {useAppNavigation} from '../navigation/types';
import {LanguageContext} from '../providers/LanguageContext';
import { getProduct } from "../services/request";

type FeaturedObjectType = {
  objectId: number | string;
};

export const FeaturedObjectItemAuto = ({objectId}: FeaturedObjectType) => {
  const {activeLanguage} = useContext(LanguageContext);
  const [product, setProduct] = useState<Product>();
  const [attributes, setAttributes] = useState();
  const navigation = useAppNavigation();

  const navigate = () => {
    // navigation.push('Product');
    navigation.push('Product', {id: product?.id});
  };
  useEffect(() => {
    (async () => {
      let res = await getProduct(objectId, activeLanguage);
      res = res as Product;
      setProduct(res);
      setAttributes(res.attributeValues[activeLanguage]);
    })();
  }, []);
  return (
    <TouchableOpacity
      style={styles.flatlistItem}
      onPress={navigate}>
      <View style={styles.cardContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: attributes?.pic?.value[0].downloadLink}}
            style={styles.flatlistImage}
            key={'pic'}
          />
        </View>
        <View style={styles.info}>
          {/*<StarIcon />*/}
          <Paragraph size={12} weight="bold" color="white">
            5.0
          </Paragraph>
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
  cardContainer: {
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    padding: 10,
    height: '100%',
    width: 108,
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
