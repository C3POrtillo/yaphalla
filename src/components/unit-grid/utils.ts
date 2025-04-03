import type { UnitDivData } from '@/components/unit-grid/types';

import { ArtifactUnits, BaseUnits, DevUnits, OtherUnits, SortedUnits } from '@/utils/types';

const getRowCount = ({ isXlScreen, isMdScreen }: Record<string, boolean>) => {
  if (isXlScreen) {
    return 8;
  }
  if (isMdScreen) {
    return 8;
  }

  return 7;
};

export const getFormattedUnits = (mediaQueries: Record<string, boolean>, variant = 0) => {
  const data = (() => {
    switch (variant) {
      case 3:
        return [...BaseUnits, ...DevUnits];
      case 2:
        return ArtifactUnits;
      case 1:
        return OtherUnits;
      default:
        return SortedUnits;
    }
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
