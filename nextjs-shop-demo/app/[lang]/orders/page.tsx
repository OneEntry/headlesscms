import type { FC } from 'react';
import { Suspense } from 'react';

import WithSidebar from '@/app/[lang]/[page]/WithSidebar';
import { getBlockByMarker } from '@/app/api';
import { useServerProvider } from '@/app/store/providers/ServerProvider';
import type { PageProps } from '@/app/types/global';
import OrdersPage from '@/components/layout/orders';
import Loader from '@/components/shared/Loader';
import type { Locale } from '@/i18n-config';

import { getDictionary } from '../dictionaries';

/**
 * Orders page layout
 * @param params
 *
 * @returns page layout
 */
const OrdersPageLayout: FC<PageProps> = async ({ params: { lang } }) => {
  // Get dictionary and set to server provider
  const [dict] = useServerProvider('dict', await getDictionary(lang as Locale));

  // Get block by marker.
  const { block } = await getBlockByMarker('orders_settings', lang);

  if (!block) {
    return;
  }

  return (
    <section className="relative mx-auto box-border flex min-h-80 w-full max-w-screen-xl shrink-0 grow flex-col self-stretch">
      <div className="flex w-full flex-col items-center gap-5 bg-white">
        <WithSidebar lang={lang}>
          <Suspense fallback={<Loader />}>
            <OrdersPage
              lang={lang}
              dict={dict}
              settings={block.attributeValues}
            />
          </Suspense>
        </WithSidebar>
      </div>
    </section>
  );
};

export default OrdersPageLayout;
