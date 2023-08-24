import {useEffect, useState} from 'react';
import { projectUrl } from '../utils/consts';
import {request} from './request';

type UseGetProductsProps = {
  limit: number;
  offset: number;
};

type UseGetPageProps = {
  pageUrl: string;
};

export const useGetProducts = ({limit, offset}: UseGetProductsProps) => {
  const [result, setResult] = useState();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const result = await request(
        `${projectUrl}/api/content/products/page/url/shop?limit=${limit}&offset=${offset}`,
      );

      setResult(result);
      setLoading(false);
    })();
  }, [limit, offset]);

  return {
    result,
    isLoading,
  };
};

export const useGetPage = ({pageUrl}: UseGetPageProps) => {
  const [result, setResult] = useState<Page>();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const result = await request(
        `${projectUrl}/api/content/pages/url/${pageUrl}`,
      );

      setResult(result);
      setLoading(false);
    })();
  }, [pageUrl]);

  return {
    result,
    isLoading,
  };
};
