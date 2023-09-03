import {useEffect, useState} from 'react';
import { request } from "./request";
import { projectUrl } from "../utils/consts";

type UseGetPageProps = {
  pageUrl: string;
};
export const useGetPage = ({pageUrl}: UseGetPageProps) => {
  const [page, setPage] = useState<Page>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const result = await request(
        `${projectUrl}/api/content/pages/url/${pageUrl}`,
      );
      setPage(result);
      setLoading(false);
    })();
  }, [pageUrl]);
  return {
    pageInfo: page,
    loading,
  };
};
