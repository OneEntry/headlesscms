'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { IMenusPages } from 'oneentry/dist/menus/menusInterfaces';
import type { FC } from 'react';

import * as icons from '../../../icons';

interface SidebarMenuItemProps {
  menuItem: IMenusPages & { isActive: boolean };
  lang: string;
}

/**
 * SidebarMenu Item
 * @param menuItem
 * @param lang current language shortcode
 *
 * @returns SidebarMenu Item
 */
const SidebarMenuItem: FC<SidebarMenuItemProps> = ({ menuItem, lang }) => {
  const paths = usePathname();
  const pathNames = paths.split('/').filter((path: unknown) => path);

  if (!menuItem) {
    return;
  }
  const { pageUrl, localizeInfos } = menuItem;
  const Icon = icons[pageUrl as keyof typeof icons];
  const isActive = menuItem.pageUrl === pathNames[1];

  return (
    <li>
      <Link
        prefetch={true}
        className={`sidebar-menu-item ${clsx(isActive && 'text-orange-500')} group`}
        href={'/' + lang + '/' + pageUrl}
        aria-checked={isActive}
      >
        <div className="my-auto aspect-square size-4 shrink-0">
          <Icon active={isActive} />
        </div>
        <div>{localizeInfos.menuTitle}</div>
      </Link>
    </li>
  );
};

export default SidebarMenuItem;
