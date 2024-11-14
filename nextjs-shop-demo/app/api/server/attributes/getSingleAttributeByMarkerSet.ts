import type { IAttributesSetsEntity } from 'oneentry/dist/attribute-sets/attributeSetsInterfaces';
import type { IError } from 'oneentry/dist/base/utils';

import { api } from '@/app/api';
import { LanguageEnum } from '@/app/types/enum';
import { typeError } from '@/components/utils';

/**
 * Get a single attribute with data from the attribute sets.
 *
 * @param {string} attributeMarker  - Text identifier (marker) of the attribute in the set.
 * @param {string} setMarker  - Text identifier (marker) of the attribute set.
 * @param {string} lang - Language code.
 *
 * @returns a AttributeInSet object Promise.
 */
interface HandleProps {
  attributeMarker: string;
  setMarker: string;
  lang: string;
}

export const getSingleAttributeByMarkerSet = async ({
  attributeMarker,
  setMarker,
  lang,
}: HandleProps): Promise<{
  isError: boolean;
  error?: IError;
  attribute?: IAttributesSetsEntity;
}> => {
  const langCode = LanguageEnum[lang as keyof typeof LanguageEnum];

  try {
    const attribute = await api.AttributesSets.getSingleAttributeByMarkerSet(
      attributeMarker,
      setMarker,
      langCode,
    );

    if (typeError(attribute)) {
      return { isError: true, error: attribute as IError };
    } else {
      return { isError: false, attribute: attribute };
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return { isError: true, error: e };
  }
};
