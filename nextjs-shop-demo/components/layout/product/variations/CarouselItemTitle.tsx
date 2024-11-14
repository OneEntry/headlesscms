import Link from 'next/link';
import type { IProductsEntity } from 'oneentry/dist/products/productsInterfaces';
import type { FC } from 'react';

interface CarouselItemTitleProps {
  lang: string;
  item: IProductsEntity;
}

const CarouselItemTitle: FC<CarouselItemTitleProps> = ({ item, lang }) => {
  const title = item.localizeInfos.title;
  const colors = item.attributeValues?.color?.value;

  return (
    <Link href={'/' + lang + '/shop/product/' + item.id} title={title}>
      {colors.map((color: { title: string }, i: number) => {
        return color.title + (i < colors.length - 1 ? ' + ' : '');
      })}
    </Link>
  );
};

export default CarouselItemTitle;
