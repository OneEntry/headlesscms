'use client';

import type { IAttributeValues } from 'oneentry/dist/base/utils';
import type { ReactNode } from 'react';
import { createContext, useEffect } from 'react';

import { useAppDispatch } from '@/app/store/hooks';
import { addContent } from '@/app/store/reducers/SystemContentSlice';

const ContentContext = createContext({});

type Props = {
  children: ReactNode;
  dict: IAttributeValues;
};

/**
 * Dictionary content provider for 'next' client components
 * @param children children ReactNode
 * @param dict dictionary from server api
 * @returns ContentContext Provider
 */
export const ContentContextProvider = ({ children, dict }: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (dict) {
      dispatch(addContent(dict));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dict]);

  return <ContentContext.Provider value>{children}</ContentContext.Provider>;
};
