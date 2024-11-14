import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { IPagesEntity } from 'oneentry/dist/pages/pagesInterfaces';
import type { FC } from 'react';

import { getPageByUrl } from '@/app/api';
import { getChildPagesByParentUrl } from '@/app/api';
import type { PageProps } from '@/app/types/global';
import CategoriesGrid from '@/components/layout/categories';

// Generate page metadata
export async function generateMetadata({
  params,
}: {
  params: { handle: string; lang: string };
}): Promise<Metadata> {
  const { isError, page } = await getPageByUrl('category', params.lang);

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
    url: attributeValues.icon?.downloadLink,
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
 * Category page layout
 * @param params
 *
 * @returns Category page layout
 */
const CategoryPage: FC<PageProps> = async ({ params: { lang } }) => {
  // Get child pages by parent url
  const { pages, isError } = await getChildPagesByParentUrl('category', lang);

  if (isError || !pages || !Array.isArray(pages)) {
    return notFound();
  }

  // extract categories data from pages
  const categories = pages.map((page: IPagesEntity) => {
    return {
      title: page.localizeInfos.title,
      link: '/' + lang + '/shop/category/' + page.pageUrl,
      imgSrc: page.attributeValues.opengraph_image?.value[0]?.downloadLink,
    };
  });

  return (
    <section className="relative mx-auto box-border flex w-full max-w-screen-xl shrink-0 grow flex-col self-stretch">
      <div className="flex w-full flex-col items-center gap-5 bg-white">
        <CategoriesGrid categories={categories} />
      </div>
    </section>
  );
};

export default CategoryPage;
