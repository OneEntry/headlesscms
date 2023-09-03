import {Image, StyleSheet, View} from 'react-native';
import {ROUNDED_RADIUS, styleColors, projectUrl} from '../utils/consts';
import {Paragraph} from '../components/Paragraph';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider';
import {Counter} from '../components/Counter';
import {Spacer} from '../components/Spacer';
import {Button} from '../components/Button';
import React, {useEffect, useState} from 'react';
import { getProduct, request } from "../services/request";
import {LanguageEnum} from '../types/enum';
import {NavigationProps} from '../navigation/types';

type DescriptionAttribute = {
  value: string;
};
type PicAttribute = {
  downloadLink: string;
};
type MorePicAttribute = {
  downloadLink: string;
};

type ObjectAttributes = {
  description: DescriptionAttribute[];
  price: string;
  color: string;
  pic: PicAttribute[];
  more_pic: MorePicAttribute[];
};
export const Product: React.FC<NavigationProps> = ({navigation, route}) => {
  const insets = useSafeAreaInsets();
  const [count, setCount] = useState<number>(1);
  const [product, setProduct] = useState<Product>();
  const [attributes, setAttributes] = useState<ObjectAttributes>({
    description: [],
    price: '',
    color: '',
    pic: [],
    more_pic: [],
  });
  useEffect(() => {
    (async () => {
      const res = await getProduct(route?.params?.id);
      console.log(res);
      const attributeToObject = res.attributeValues.reduce(
        (attribute, index) => {
          const key = Object.keys(index)[0];
          const value = index[key];
          attribute[key] = value;
          return attribute;
        },
      );
      console.log(res.attributeValues[3]);
      setAttributes(attributeToObject);
      setProduct(res);
    })();
  }, []);
  return (
    <View style={styles.overlay}>
      <Image
        source={{uri: attributes?.pic[0]?.downloadLink}}
        style={styles.image}
      />
      <View style={[styles.container, {paddingBottom: insets.bottom}]}>
        <View style={styles.mark}>
          <Paragraph size={24} weight="bold" color="black">
            4.5
          </Paragraph>
        </View>
        <Paragraph size={24} weight="bold" style={styles.title}>
          {product?.localizeInfos[LanguageEnum.EN].title}
        </Paragraph>
        <Paragraph size={12} color="lightGray">
          {attributes?.description[0]?.value}
        </Paragraph>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor={styleColors.background}
          maximumTrackTintColor={styleColors.gray300}
        />
        <View style={styles.priceInfo}>
          <View style={styles.price}>
            <Paragraph size={30} weight="bold">
              $ {(parseInt(attributes.price) * count).toFixed(2)}
            </Paragraph>
            {/*<Paragraph*/}
            {/*  size={18}*/}
            {/*  weight="bold"*/}
            {/*  color="lightGray"*/}
            {/*  style={{textDecorationLine: 'line-through'}}>*/}
            {/*  $ 0.58*/}
            {/*</Paragraph>*/}
          </View>
          <Counter count={count} setCount={setCount} />
        </View>
        <Spacer />
        <Button
          rounded
          style={{backgroundColor: styleColors.background}}
          paragraphProps={{style: {color: '#fff'}, weight: 'bold', size: 16}}
          onPress={() => navigation.goBack()}>
          PLACE ORDER
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mark: {
    position: 'absolute',
    right: 40,
    top: -30,
    width: 60,
    height: 60,
    borderRadius: ROUNDED_RADIUS,
    backgroundColor: styleColors.yellow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    marginVertical: 44,
    alignSelf: 'center',
    width: 200,
    height: 200,
    objectFit: 'contain',
  },
  priceInfo: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  title: {
    marginBottom: 8,
  },
  overlay: {
    backgroundColor: styleColors.background,
    flex: 1,
  },
  container: {
    borderRadius: 20,
    marginTop: -20,
    backgroundColor: styleColors.white,
    paddingHorizontal: 40,
    paddingTop: 40,
    flex: 1,
  },
  price: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 15,
  },
  slider: {width: '100%', height: 40, marginVertical: 32},
});
