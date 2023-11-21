import {useContext, useEffect, useState} from 'react';
import {LanguageContext} from '../providers/LanguageContext';
import {defineOneEntry} from 'oneentry';
import {IPageConfig, IPagesEntity} from 'oneentry/dist/pages/pagesInterfaces';
import {
  IFilterParams,
  IProductsEntity,
} from 'oneentry/dist/products/productsInterfaces';
import {IMenusEntity} from 'oneentry/dist/menus/menusInterfaces';
import {ILocalEntity} from 'oneentry/dist/locales/localesInterfaces';

export const api = defineOneEntry('https://react-native-course.oneentry.cloud');
type UseGetPageProps = {
  pageUrl: string;
};

export const useGetPage = ({pageUrl}: UseGetPageProps) => {
  const [page, setPage] = useState<IPagesEntity>();
  const [loading, setLoading] = useState<boolean>(false);
  const [refresh, setRefresh] = useState(false);
  const {activeLanguage} = useContext(LanguageContext);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const result = await api.Page.getPageByUrl(pageUrl, activeLanguage);
      setPage(result);
      setLoading(false);
      setRefresh(false);
    })();
  }, [pageUrl, refresh, activeLanguage]);
  return {
    pageInfo: page,
    loading,
    refresh: setRefresh,
  };
};

type UseGetProductsProps = {
  pageUrl: string;
  offset: number;
  limit: number | null;
  filter?: IFilterParams;
};

export const useGetProducts = ({
  pageUrl,
  offset,
  limit,
  filter,
}: UseGetProductsProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<IProductsEntity[]>([]);
  const {activeLanguage} = useContext(LanguageContext);
  useEffect(() => {
    setLoading(true);
    limit &&
      (async () => {
        try {
          let result: IProductsEntity[];

          if (filter) {
            result = await api.Product.filterProduct([filter], {
              offset,
              limit,
              langCode: activeLanguage,
            });
          } else {
            result = await api.Product.getProductsPageByUrl(pageUrl, {
              offset,
              limit,
              langCode: activeLanguage,
            });
          }
          result &&
            setProducts((prevState: IProductsEntity[]) => {
              if (offset > 0) {
                return [...prevState, ...result];
              } else {
                return result;
              }
            });
        } catch (e) {
          console.log(e);
        }
      })();
    setLoading(false);
  }, [limit, offset, activeLanguage, filter]);
  return {
    loading,
    products,
  };
};

type UseGetConfigProps = {
  pageUrl: string;
};

export const useGetConfig = ({pageUrl}: UseGetConfigProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [config, setConfig] = useState<IPageConfig | null>(null);
  const [limit, setLimit] = useState<number | null>(null);
  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const result = await api.Page.getConfigPageByUrl(pageUrl);
        setLimit(result.rowsPerPage * result.productsPerRow);
        setConfig(result);
      } catch (e) {}
    })();
    setLoading(false);
  }, []);
  return {
    loading,
    config,
    limit,
  };
};

type UseGetMenuProps = {
  marker: string;
};

export const useGetMenu = ({marker}: UseGetMenuProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [menu, setMenu] = useState<IMenusEntity>();

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const result = await api.Menus.getMenusByMarker(marker);
        setMenu(result);
      } catch (e) {}
    })();
    setLoading(false);
  }, []);
  return {
    loading,
    menu,
  };
};

type useGetPagesProps = {};

export const useGetPages = ({}: useGetPagesProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [pages, setPages] = useState<IPagesEntity[]>();
  const {activeLanguage} = useContext(LanguageContext);
  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const result = await api.Page.getPages(activeLanguage);
        setPages(result);
      } catch (e) {}
    })();
    setLoading(false);
  }, [activeLanguage]);
  return {
    loading,
    pages,
  };
};

export const useGetLocales = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [locales, setLocales] = useState<ILocalEntity[]>([]);
  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const result = await api.Locales.getLocales();
        setLocales(result);
      } catch (e) {
        console.log(e);
      }
    })();
    setLoading(false);
  }, []);
  return {
    loading,
    locales,
  };
};
