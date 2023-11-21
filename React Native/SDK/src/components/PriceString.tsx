import React, {memo} from 'react';
import {Paragraph} from './Paragraph';
import {Sizes} from '../types/enum';

interface Props {
  price: string | number;
  size: 'sm' | 'md' | 'lg';
}

const textSizes = {
  sm: 18,
  md: 20,
  lg: 30,
};

const PriceString: React.FC<Props> = ({price, size}) => {
  return (
    <Paragraph size={textSizes[size]} weight="bold">
      $ {price}
    </Paragraph>
  );
};

export default memo(PriceString);
