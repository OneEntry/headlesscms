'use client';

import Link from 'next/link';
import type { IMenusPages } from 'oneentry/dist/menus/menusInterfaces';
import type { FC } from 'react';

import CatalogIcon from '@/components/icons/catalog';

/**
 * Catalog navItem menu element
 * @param item Represents a menu element object.
 * @param lang current language shortcode
 *
 * @returns NavItem
 */
const NavItemCatalog: FC<{ item: IMenusPages; lang: string }> = ({
  item: { pageUrl, localizeInfos },
  lang,
}) => {
  return (
    <Link
      href={'/' + lang + '/' + pageUrl}
      title={localizeInfos.menuTitle}
      className="group relative box-border flex size-6 shrink-0 flex-col"
    >
      <CatalogIcon />
    </Link>
  );
};

export default NavItemCatalog;
