import type { UnitDivData } from '@/components/hero-grid/types';
import type { Phantimal } from '@/utils/types';

import {
  ArtifactHeroes,
  CurrentSeason,
  DevHeroes,
  HexHeroes,
  OtherHeroes,
  Phantimals,
  SortedHeroes,
} from '@/utils/types';
import { compareStrings } from '@/utils/utils';

const getRowCount = ({ isXxxlScreen, isXxlScreen, isXlScreen, isMdScreen }: Record<string, boolean>) => {
  if (isXxxlScreen) {
    return 16;
  }
  if (isXxlScreen) {
    return 10;
  }
  if (isXlScreen) {
    return 8;
  }
  if (isMdScreen) {
    return 8;
  }

  return 7;
};

export const SeasonalPhantimals = (() =>
  Object.entries(Phantimals[CurrentSeason]).map(
    ([faction, phantimal]) =>
      ({
        ...phantimal,
        faction,
      }) as Phantimal,
  ))();

export const getFormattedUnits = (mediaQueries: Record<string, boolean>, variant = 0) => {
  const data = (() => {
    switch (variant) {
      case 3:
        return [...HexHeroes, ...DevHeroes];
      case 2:
        return ArtifactHeroes;
      case 1:
        return [...OtherHeroes, ...SeasonalPhantimals];
      default:
        return [...SortedHeroes, ...SeasonalPhantimals];
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

export const hasUnit = (currentUnit: string | Set<string>, unit: string) => {
  switch (typeof currentUnit) {
    case 'string':
      return !compareStrings(currentUnit, unit);
    default:
      return currentUnit.has(unit);
  }
};
