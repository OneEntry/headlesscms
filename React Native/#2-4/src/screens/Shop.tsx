import {FlatList, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {NavigationProps} from '../navigation/types';
import {request} from '../services/request';
import {projectUrl} from '../utils/consts';
import {FeaturedObjectItem} from '../components/FeaturedObjectItem';

const limit = 1;
export const Shop: React.FC<NavigationProps> = ({navigation, route}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentOffset, setCurrentOffset] = useState<number>(0);
  const [total, setTotal] = useState<number>();
  const findProducts = async (offset: number) => {
    const res = await request(
      `${projectUrl}/api/content/products/page/url/${route.params.pageUrl}?limit=${limit}&offset=${offset}&sortOrder=DESC&sortKey=id`,
    );
    setTotal(res.total);
    setProducts(res.items.concat(products));
  };

  useEffect(() => {
    findProducts(currentOffset);
  }, [currentOffset]);
  return (
    <View>
      <FlatList
        data={products}
        renderItem={({item, index}) => <FeaturedObjectItem product={item} />}
        contentContainerStyle={{gap: 32, paddingBottom: 12}}
        ListHeaderComponent={<View style={{marginTop: 10}} />}
        ListFooterComponent={<View style={{paddingBottom: 100}} />}
        onEndReached={() => {
          if (total > currentOffset) {
            setCurrentOffset(currentOffset + limit);
          }
        }}
      />
    </View>
  );
};
