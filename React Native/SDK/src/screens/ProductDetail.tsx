import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {ROUNDED_RADIUS, styleColors} from '../utils/consts';
import {Paragraph} from '../components/Paragraph';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Spacer} from '../components/Spacer';
import {Button} from '../components/Button';
import React, {useContext, useEffect, useState} from 'react';
import {getProduct} from '../services/request';
import {
  StackType,
} from '../navigation/types';
import ErrorScreen from './ErrorScreen';
import {LanguageContext} from '../providers/LanguageContext';
import GoBackButton from '../components/GoBackButton';
import FeaturedObjects from '../components/FeaturedObjects';
import ProductStatus from '../components/ProductStatus';
import {RouteProp, useRoute} from '@react-navigation/native';
type Props = {};
export const Product: React.FC<Props> = ({}) => {
  const route = useRoute<RouteProp<StackType, 'Product'>>();
  const insets = useSafeAreaInsets();
  const [product, setProduct] = useState<Product>();
  const {activeLanguage} = useContext(LanguageContext);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorPage, setErrorPage] = useState<Page>();
  const [inStock, setInStock] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      let res = await getProduct(route?.params?.id, activeLanguage);
      if ((res as Product)?.attributeValues) {
        res = res as Product;
        setProduct(res);
      } else {
        res = res as ErrorPage;
        setIsError(true);
        setErrorPage(res.pageData);
      }
    })();
  }, []);

  const onPress = () => {};

  if (isError && errorPage) {
    let title = '';
    let description = '';

    return (
      <ErrorScreen
        errorTitle={title || 'Error'}
        errorDescription={description || 'Error'}
      />
    );
  }

  return (
    <View style={{flex: 1}}>
      <View style={styles.goBackContainer}>
        <GoBackButton />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.overlay}>
        <Image
          source={{
            uri: product?.attributeValues[activeLanguage]?.pic.value[0]
              .downloadLink,
          }}
          style={styles.image}
        />
        <View style={[styles.container, {paddingBottom: insets.bottom}]}>
          <View style={styles.mark}>
            <Paragraph size={24} weight="bold" color="black">
              4.5
            </Paragraph>
          </View>
          <Paragraph size={24} weight="bold" style={styles.title}>
            {product?.localizeInfos[activeLanguage]?.title}
          </Paragraph>
          {product?.statusId && (
            <ProductStatus
              inStock={inStock}
              price={product?.price}
              setInStock={setInStock}
              statusId={product.statusId}
            />
          )}

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 15,
            }}>
            <View
              style={{
                ...styles.productColor,
                backgroundColor:
                  product?.attributeValues[activeLanguage]?.color_code.value ||
                  'white',
              }}
            />
            <Paragraph size={12} color="lightGray">
              {product?.attributeValues[activeLanguage]?.color.value}
            </Paragraph>
          </View>

          <Paragraph size={12} color="lightGray">
            {
              product?.attributeValues[activeLanguage]?.description.value[0]
                .plainValue
            }
          </Paragraph>
          {inStock && (
            <Button
              rounded
              style={{backgroundColor: styleColors.background, marginTop: 20}}
              paragraphProps={{
                style: {color: '#fff'},
                weight: 'bold',
                size: 16,
              }}
              onPress={onPress}>
              ADD TO CART
            </Button>
          )}
          {product?.relatedIds && (
            <FeaturedObjects relatedIds={product.relatedIds} />
          )}
          <Spacer />
        </View>
      </ScrollView>
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
  productColor: {
    borderRadius: 1000,
    height: 24,
    width: 24,
    marginRight: 10,
  },
  goBackContainer: {
    position: 'absolute',
    zIndex: 10,
    left: 30,
    top: 50,
  },
  image: {
    marginVertical: 58,
    alignSelf: 'center',
    width: 180,
    height: 180,
    objectFit: 'contain',
  },
  title: {
    marginBottom: 8,
  },
  overlay: {
    backgroundColor: styleColors.gray_v2,
    flex: 1,
  },
  container: {
    marginTop: -20,
    backgroundColor: styleColors.white,
    paddingHorizontal: 30,
    paddingTop: 40,
    flex: 1,
  },
  slider: {width: '100%', height: 40, marginVertical: 32},
});
