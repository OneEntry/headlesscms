import type { FC } from 'react';
import { Suspense } from 'react';

import { getPageByUrl } from '@/app/api';
import BlocksGrid from '@/components/layout/blocks-grid';
import BlocksGridLoader from '@/components/layout/blocks-grid/components/BlocksGridLoader';

// export const revalidate = 10;
// export const dynamicParams = true;
interface IndexPageLayoutProps {
  params: { lang: string };
}

/**
 * Home(index) page layout
 * @param params
 *
 * @returns page layout
 */
const IndexPageLayout: FC<IndexPageLayoutProps> = async ({
  params: { lang },
}) => {
  // Get home page by Url from api
  const { page, isError } = await getPageByUrl('home_web', lang);

  if (isError) {
    return;
  }

  if (!page || !page.blocks) {
    return <BlocksGridLoader />;
  }

  // extract blocks from page
  const { blocks } = page;

  return (
    <main className="flex flex-col items-center justify-between gap-16">
      <section className="relative mx-auto box-border flex w-full max-w-screen-xl shrink-0 grow flex-col self-stretch">
        <div className="flex w-full flex-col items-center gap-5 bg-white">
          <Suspense fallback={<BlocksGridLoader />}>
            <BlocksGrid blocks={blocks as Array<string>} lang={lang} />
          </Suspense>
        </div>
      </section>
    </main>
  );
};

export default IndexPageLayout;
