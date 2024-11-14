import type { IError } from 'oneentry/dist/base/utils';
import type {
  IBaseOrdersEntity,
  IOrderData,
} from 'oneentry/dist/orders/ordersInterfaces';

import { api } from '@/app/api';
import { LanguageEnum } from '@/app/types/enum';
import { typeError } from '@/components/utils';

/**
 * Getting all orders from the orders storage object created by the user
 *
 * @description This method requires user authorization. For more information about configuring the authorization module, see the documentation in the configuration settings section of the SDK.
 * @param {string} marker - The text identifier of the order storage object
 * @param {number} id ID of the order object
 * @param {number} data Object for updating an order
 * @param {string} lang Optional language field
 *
 * @returns Promise
 */
interface HandleProps {
  marker: string;
  id: number;
  data: IOrderData;
  lang?: string;
}

export const updateOrderByMarkerAndId = async ({
  marker,
  id,
  data,
  lang,
}: HandleProps): Promise<{
  isError: boolean;
  error?: IError;
  order?: IBaseOrdersEntity;
}> => {
  const langCode = LanguageEnum[lang as keyof typeof LanguageEnum];
  try {
    const orderData = await api.Orders.updateOrderByMarkerAndId(
      marker,
      id,
      data,
      langCode,
    );

    if (typeError(orderData)) {
      return { isError: true, error: orderData };
    } else {
      return { isError: false, order: orderData };
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return { isError: true, error: e };
  }
};
