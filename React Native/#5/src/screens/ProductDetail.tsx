import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {ROUNDED_RADIUS, layoutPadding, styleColors, projectUrl} from '../utils/consts';
import {Screen} from '../components/Screen';
import {Paragraph} from '../components/Paragraph';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider';
import {Counter} from '../components/Counter';
import {Spacer} from '../components/Spacer';
import {Button} from '../components/Button';
import { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { request } from '../services/request';
import { LanguageEnum } from '../types/enum';
import { NavigationProps, NavigationStackProps } from '../navigation/types';

const ninja = require('../assets/ninja.png');

export const ProductDetail: React.FC<NavigationStackProps> = ({navigation, route}) => {
  const insets = useSafeAreaInsets();
  const [count, setCount] = useState<number>(1);
  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await request(`${projectUrl}/api/content/products/${route?.params?.id}`)
      console.log(res);
      console.log(res?.attributeValues[3].pic[0].downloadLink)
      setProduct(res);
      setLoading(false);
    })()
  }, [])
  return (
    <>
      {loading ? <View /> : <View style={styles.overlay}>
        <Image source={{uri: product?.attributeValues[3].pic[0].downloadLink}} style={styles.image} />
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
            {product?.attributeValues[0].description[0].value}
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
              <Paragraph
                size={30}
                weight="bold">
                $ {(parseInt(product?.attributeValues[1].price) * count).toFixed(2)}
              </Paragraph>
              <Paragraph
                size={18}
                weight="bold"
                color="lightGray"
                style={{textDecorationLine: 'line-through'}}>
                $ 0.58
              </Paragraph>
            </View>
            <Counter count={count} setCount={setCount} />
          </View>
          <Spacer />
          <Button
            rounded
            style={{backgroundColor: styleColors.background}}
            paragraphProps={{style: {color: '#fff'}, weight: 'bold', size: 16}}
            onPress={() => navigation.goBack()}
          >
            PLACE ORDER
          </Button>
        </View>
      </View>}
    </>
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
    objectFit: "contain"
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
