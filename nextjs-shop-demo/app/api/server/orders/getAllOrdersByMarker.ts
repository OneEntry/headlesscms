import type { IError } from 'oneentry/dist/base/utils';
import type { IOrderByMarkerEntity } from 'oneentry/dist/orders/ordersInterfaces';

import { api } from '@/app/api';
import { LanguageEnum } from '@/app/types/enum';
import { typeError } from '@/components/utils';

/**
 * Getting all orders from the orders storage object created by the user
 *
 * @description This method requires user authorization. For more information about configuring the authorization module, see the documentation in the configuration settings section of the SDK.
 * @param {string} marker - The text identifier of the order storage object
 * @param {string} lang Optional language field
 * @param {number} limit Limit parameter. Default 30
 * @param {number} offset Offset parameter. Default 0
 *
 * @returns Promise
 */
interface HandleProps {
  marker: string;
  limit: number;
  offset: number;
  lang: string;
}

export const getAllOrdersByMarker = async ({
  marker,
  limit,
  offset,
  lang,
}: HandleProps): Promise<{
  isError: boolean;
  error?: IError;
  orders?: IOrderByMarkerEntity[];
  total: number;
}> => {
  const langCode = LanguageEnum[lang as keyof typeof LanguageEnum];
  try {
    const data = await api.Orders.getAllOrdersByMarker(
      marker,
      langCode,
      limit,
      offset,
    );

    if (typeError(data)) {
      return { isError: true, error: data, total: 0 };
    } else {
      return { isError: false, orders: data.items, total: data.total };
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return { isError: true, error: e, total: 0 };
  }
};
