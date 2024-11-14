import type { IAttributeValues } from 'oneentry/dist/base/utils';

import { getBlockByMarker } from '@/app/api';

const dict = async (langCode: string): Promise<IAttributeValues> => {
  try {
    const { block, isError } = await getBlockByMarker(
      'system_content',
      langCode,
    );

    if (isError) {
      return {};
    } else {
      return { ...block?.attributeValues };
    }
  } catch (e) {
    console.log(e);
    return {};
  }
};

export default dict;
