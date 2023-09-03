import {View} from 'react-native';
import {BadgeList} from './Badges';
import {parsedFilters} from '../utils/filters';

type Props = {
  activeBadge: number;
  onChange: (index: number) => void;
};
export const Filters = ({activeBadge, onChange}: Props) => {
  return (
    <BadgeList
      activeValue={activeBadge}
      options={parsedFilters}
      onChange={onChange}
    />
  );
};
