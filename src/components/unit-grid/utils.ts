import type { UnitDivData } from '@/components/unit-grid/types';

import { ArtifactSet, BaseSet, BaseUnits, DevUnits, OtherUnits, SortedUnits } from '@/utils/types';

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
  const isUnit = variant === 0;
  const isBase = variant === 2;
  const data = (() => {
    if (isBase) {
      return [...BaseUnits, ...DevUnits];
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

export const getPath = (unit: string) => {
  if (ArtifactSet.has(unit)) {
    return 'artifact' as const;
  }

  if (BaseSet.has(unit)) {
    return 'base' as const;
  }

  return 'unit' as const;
};
