import {ConditionMarkersEnum} from '../types/enum';

export const filters: Filter[] = [
  {
    attributeMarker: 'price',
    conditionMarker: ConditionMarkersEnum.MTH,
    conditionValue: 35,
  },
  {
    attributeMarker: 'color',
    conditionMarker: ConditionMarkersEnum.EQ,
    conditionValue: 'red',
  },
];

export const parsedFilters: TBadge[] = [
  {
    label: 'All',
    value: 0,
  },
  {
    label: 'More than 35$',
    value: 35,
  },
  {
    label: 'Color red',
    value: 'red',
  },
];
