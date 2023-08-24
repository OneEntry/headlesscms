import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ROUNDED_RADIUS, styleColors} from '../utils/consts';
import StarIcon from '../assets/icons/star.svg';
import {Paragraph} from './Paragraph';
import React from 'react';
import { LanguageEnum } from "../types/enum";
import { useNavigation } from '@react-navigation/native';
import { useAppNavigation } from '../navigation/types';

type FeaturedObjectType = {
  product: Product;
};

const currentLanguage = LanguageEnum.EN;

export const FeaturedObjectItem = ({product}: FeaturedObjectType) => {
  const navigation = useAppNavigation();
  return (
    <TouchableOpacity style={styles.flatlistItem} 
                      onPress={() => navigation.navigate("Product", {id: product.id})}>
      <View style={styles.cardContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: product?.attributeValues?.[3].pic[0]?.downloadLink}}
            style={styles.flatlistImage}
          />
        </View>
        <View style={styles.info}>
          <StarIcon />
          <Paragraph size={12} weight="bold" color="white">
            5.0
          </Paragraph>
        </View>
      </View>
      <View style={styles.textContainer}>
        <Paragraph weight="bold">{product?.localizeInfos?.[currentLanguage].title}</Paragraph>
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
