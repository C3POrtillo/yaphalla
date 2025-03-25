import type { UnitDivData } from 'components/unit-grid/types';

import { DevUnits, OtherUnits, SortedUnits } from '@/utils/types';
import { compareStrings } from '@/utils/utils';

const getRowCount = ({ isXlScreen, isMdScreen }: Record<string, boolean>) => {
  if (isXlScreen) {
    return 8;
  }
  if (isMdScreen) {
    return 8;
  }

  return 7;
};

export const getFormattedUnits = (
  mediaQueries: Record<string, boolean>,
  variant: 'unit' | 'class' = 'unit',
  isDev?: boolean,
) => {
  const isUnit = compareStrings(variant, 'unit') === 0;
  const data = (() => {
    if (isDev && !isUnit) {
      return [...OtherUnits, ...DevUnits];
    }

    return isUnit ? SortedUnits : OtherUnits;
  })();

  const result: UnitDivData[] = [];
  const length = getRowCount(mediaQueries);
  let index = 0;
  let rowParity = 1;

  while (index < data.length) {
    if (index >= data.length) {
      break;
    }
    const tiles = data.slice(index, index + length);
    result.push({ offset: rowParity > 0 ? '' : 'pl-8', tiles });
    rowParity *= -1;
    index += length;
  }

  return result;
};
