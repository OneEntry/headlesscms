import {FlatList, View} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {NavigationProps} from '../navigation/types';
import {getProduct, request} from '../services/request';
import {projectUrl} from '../utils/consts';
import {FeaturedObjectItem} from '../components/FeaturedObjectItem';
import {Screen} from '../components/Screen';
import {SearchBar} from '../components/SearchBar';

const limit = 1;

type SearchResultType = {
  id: number;
  pageId: number;
  title: string;
};
export const Shop: React.FC<NavigationProps> = ({navigation, route}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentOffset, setCurrentOffset] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>('');
  const findProducts = async (offset: number) => {
    const res = await request(
      `${projectUrl}/api/content/products/page/url/${route.params.pageUrl}?limit=${limit}&offset=${offset}&sortOrder=DESC&sortKey=id`,
    );
    setTotal(res.total);
    setProducts([...products, ...res.items]);
  };

  useEffect(() => {
    findProducts(currentOffset);
  }, [currentOffset]);

  useMemo(async () => {
    const res: SearchResultType[] = await request(
      `${projectUrl}/api/content/products/quick/search?lang=en_US&name=${searchValue}`,
    );
    if (res.length) {
      const productsInSearch = [];
      await Promise.all(
        res.map(async (item)=> {
          await getProduct(item.id).then((result) => {
            productsInSearch.push(result);
          });
        }),
      );
      setProducts(productsInSearch);
    }
  }, [searchValue]);
  return (
    <View style={{flex: 1}}>
      <Screen white style={{height: '100%'}}>
        <Screen edges={['top', 'horizontal']}>
          <SearchBar value={searchValue} setValue={setSearchValue} />
        </Screen>
        <Screen edges={['horizontal']}>
          <FlatList
            data={products}
            renderItem={({item, index}) => (
              <FeaturedObjectItem product={item} key={index} />
            )}
            contentContainerStyle={{gap: 32, paddingBottom: 12}}
            ListHeaderComponent={<View style={{marginTop: 10}} />}
            ListFooterComponent={<View style={{paddingBottom: 100}} />}
            onEndReached={() => {
              if (total > currentOffset) {
                setCurrentOffset(currentOffset + limit);
              }
            }}
          />
        </Screen>
      </Screen>
    </View>
  );
};
