import React, {Dispatch, memo, useContext, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {getStatus} from '../services/request';
import PriceString from './PriceString';
import {Counter} from './Counter';
import {Paragraph} from './Paragraph';
import {LanguageContext} from '../providers/LanguageContext';

interface Props {
  statusId: string | number;
  inStock: boolean;
  setInStock: Dispatch<boolean>;
  price: number | string;
}

const statuses = {
  in_stock: true,
  out_of_stock: false,
};
const ProductStatus: React.FC<Props> = ({
  statusId,
  inStock,
  setInStock,
  price,
}) => {
  const [count, setCount] = useState<number>(1);
  const [status, setStatus] = useState<Status>();
  const {activeLanguage} = useContext(LanguageContext);
  useEffect(() => {
    (async () => {
      const res: Status = await getStatus(statusId);
      console.log(res);
      setInStock(statuses[res.identifier]);
      setStatus(res);
    })();
  }, []);
  useEffect(() => {});

  if (!inStock) {
    return (
      <>
        <Paragraph>{status?.localizeInfos[activeLanguage].title}</Paragraph>
      </>
    );
  }

  return (
    <View style={styles.priceInfo}>
      <View style={styles.price}>
        <PriceString price={parseInt(price) * count} size={'md'} />
      </View>
      <Counter count={count} setCount={setCount} />
    </View>
  );
};

export default memo(ProductStatus);

const styles = StyleSheet.create({
  priceInfo: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  price: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 15,
  },
});
