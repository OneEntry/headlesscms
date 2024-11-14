import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { FC } from 'react';
import { Suspense } from 'react';

import { getPageByUrl } from '@/app/api';
import { useServerProvider } from '@/app/store/providers/ServerProvider';
import type { MetadataParams, PageProps } from '@/app/types/global';
import ProductsGridLayout from '@/components/layout/products-grid';
import ProductsGridLoader from '@/components/layout/products-grid/components/ProductsGridLoader';
import type { Locale } from '@/i18n-config';

import { getDictionary } from '../dictionaries';

export async function generateMetadata({
  params: { lang },
}: MetadataParams): Promise<Metadata> {
  const { isError, page } = await getPageByUrl('shop', lang);

  if (isError || !page) {
    return notFound();
  }

  const { localizeInfos, isVisible, attributeValues } = page;

  const {
    url,
    width,
    height,
    altText: alt,
  } = {
    url: attributeValues?.icon?.downloadLink,
    width: 300,
    height: 300,
    altText: localizeInfos.title,
  };

  return {
    title: localizeInfos.title,
    description: localizeInfos.plainContent,
    robots: {
      index: isVisible,
      follow: isVisible,
      googleBot: {
        index: isVisible,
        follow: isVisible,
      },
    },
    openGraph: url
      ? {
          images: [
            {
              url,
              width,
              height,
              alt,
            },
          ],
        }
      : null,
  };
}

/**
 * Shop page layout
 * @param params
 * @param searchParams
 *
 * @returns Shop page layout
 */
const ShopPageLayout: FC<PageProps> = async ({ params, searchParams }) => {
  // Get dictionary and set to server provider
  const [dict] = useServerProvider(
    'dict',
    await getDictionary(params.lang as Locale),
  );

  // Get current Page ByUrl
  const { page } = await getPageByUrl('shop', params.lang);

  // !!! Set pages limit
  const pagesLimit = 10;

  if (!page) {
    return notFound();
  }

  return (
    <section className="relative mx-auto box-border flex w-full max-w-screen-xl shrink-0 grow flex-col self-stretch">
      <div className="flex w-full flex-col items-center gap-5">
        <Suspense fallback={<ProductsGridLoader />}>
          <ProductsGridLayout
            searchParams={searchParams}
            pagesLimit={pagesLimit}
            dict={dict}
            params={params}
          />
        </Suspense>
      </div>
    </section>
  );
};

export default ShopPageLayout;
