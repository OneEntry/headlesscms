import {FlatList, View} from 'react-native';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {NavigationProps} from '../navigation/types';
import {
  getConfig,
  getProduct,
  getProducts,
  getProductsByFilter,
  request,
} from '../services/request';
import {projectUrl} from '../utils/consts';
import {FeaturedObjectItem} from '../components/FeaturedObjectItem';
import {Screen} from '../components/Screen';
import {SearchBar} from '../components/SearchBar';
import {Filters} from '../components/Filters';
import {filters} from '../utils/filters';
import {LanguageContext} from '../providers/LanguageContext';

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
  const [activeBadge, setActiveBadge] = useState<number>(0);
  const [limit, setLimit] = useState<number | null>(null);
  const {activeLanguage} = useContext(LanguageContext);

  useEffect(() => {
    (async () => {
      const config = await getConfig(route.params.pageUrl);
      setLimit(config.productsPerRow * config.rowsPerPage);
    })();
  }, []);
  const onChange = (index: number) => {
    setCurrentOffset(0);
    setProducts([]);
    setTotal(0);
    setActiveBadge(index);
  };

  const findProducts = async (offset: number) => {
    let res;
    if (activeBadge === 0) {
      res = await getProducts(
        route?.params?.pageUrl,
        1,
        offset,
        activeLanguage,
      );

      // console.log(res.items[0].attributeValues);
    } else {
      res = await getProductsByFilter(
        [filters[activeBadge - 1]],
        offset,
        limit,
      );
      console.log(res);
    }
    console.log(offset);
    setTotal(res.total);
    setProducts(prevState => {
      return [...prevState, ...res.items];
    });
  };

  useEffect(() => {
    if (limit) {
      findProducts(currentOffset);
    }
  }, [currentOffset, limit, activeBadge]);

  useEffect(() => {
    onChange(0);
    if (limit) {
      findProducts(currentOffset);
    }
  }, [activeLanguage]);

  useMemo(async () => {
    const res: SearchResultType[] = await request(
      `${projectUrl}/api/content/products/quick/search?lang=en_US&name=${searchValue}`,
    );
    if (res.length) {
      const productsInSearch = [];
      await Promise.all(
        res.map(async item => {
          await getProduct(item.id).then(result => {
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
        <Screen edges={['top', 'horizontal']}>
          <Filters onChange={onChange} activeBadge={activeBadge} />
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
              if (total > currentOffset && total > limit) {
                if (limit) {
                  setCurrentOffset(currentOffset + limit);
                }
              }
            }}
          />
        </Screen>
      </Screen>
    </View>
  );
};
