import {FlatList, RefreshControl, View} from 'react-native';
import React, {useState} from 'react';
import {NavigationProps} from '../navigation/types';
import {FeaturedObjectItem} from '../components/FeaturedObjectItem';
import {Screen} from '../components/Screen';
import {Filters} from '../components/Filters';
import {filters} from '../utils/filters';
import {Paragraph} from '../components/Paragraph';
import { useGetConfig, useGetProducts } from "../services/api";

type SearchResultType = {
  id: number;
  pageId: number;
  title: string;
};

export function debounce(func: () => void, wait: number) {
  let timeout: any;

  return function executedFunction() {
    const later = () => {
      timeout = null;

      func();
    };
    clearTimeout(timeout);

    timeout = setTimeout(later, wait);
  };
}
export const Shop: React.FC<NavigationProps> = ({route}) => {
  const [currentOffset, setCurrentOffset] = useState<number>(0);
  // const [searchValue, setSearchValue] = useState<string | null>(null);
  const [activeBadge, setActiveBadge] = useState<{value: number}>({value: 0});
  const [refreshing, setRefreshing] = React.useState(false);
  const {limit, config} = useGetConfig({pageUrl: route.params.pageUrl});
  const {products, loading} = useGetProducts({
    pageUrl: route.params.pageUrl,
    offset: currentOffset,
    limit,
    filter: activeBadge ? filters[activeBadge.value - 1] : undefined,
  });

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const onChange = (index: number) => {
    setCurrentOffset(0);
    // setSearchValue(null);
    setActiveBadge({value: index});
  };

  // useEffect(() => {
  //   (async () => {
  //     if (searchValue !== null && searchValue !== '' && !loading) {
  //       setLoading(true);
  //       const res: SearchResultType[] = await request(
  //         `${projectUrl}/api/content/products/quick/search?lang=en_US&name=${searchValue}`,
  //       );
  //       if (res.length) {
  //         const productsInSearch: Product[] = [];
  //         await Promise.all(
  //           res.map(async item => {
  //             await getProduct(item.id, activeLanguage).then(result => {
  //               if (result.hasOwnProperty('attributeValues')) {
  //                 result = result as Product;
  //                 productsInSearch.push(result);
  //               }
  //             });
  //           }),
  //         );
  //         setProducts(productsInSearch);
  //         setLoading(false);
  //       } else {
  //         setProducts([]);
  //         setLoading(false);
  //       }
  //     }
  //     if (searchValue === '') {
  //       onChange(0);
  //     }
  //   })();
  // }, [searchValue]);

  if (!loading && !products.length && !limit) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Paragraph size={24}>Content not found yet</Paragraph>
      </View>
    );
  }
  return (
    <View style={{flex: 1}}>
      <Screen>
        <View style={{height: 140}} />
      </Screen>
      <Screen white style={{height: '100%'}}>
        <Screen edges={['horizontal']}>
          <Filters onChange={onChange} activeBadge={activeBadge.value} />
        </Screen>
        <Screen edges={['horizontal']}>
          {config?.rowsPerPage && (
            <FlatList
              key={config.rowsPerPage}
              data={products}
              renderItem={({item, index}) => (
                <FeaturedObjectItem
                  product={item}
                  key={index}
                  perRow={config?.rowsPerPage}
                />
              )}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              contentContainerStyle={{gap: 32, paddingBottom: 12}}
              numColumns={config.rowsPerPage}
              ListHeaderComponent={<View style={{marginTop: 10}} />}
              ListFooterComponent={<View style={{paddingBottom: 300}} />}
              onEndReached={() => {
                if (limit) {
                  setCurrentOffset(currentOffset + limit);
                }
              }}
            />
          )}
        </Screen>
      </Screen>
    </View>
  );
};
