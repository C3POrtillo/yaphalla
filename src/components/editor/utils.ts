import type { Talents, UnitDivData, UnitFormationData } from '@/components/editor/types';

import {
  DebugArtifacts,
  OtherUnits,
  PairSet,
  SortedUnits,
  TalentLocations,
  UnitPairs,
  UnitsByFaction,
  indexToPosition,
  requiredUnits,
} from '@/components/editor/types';
import { compareStrings, sortData } from '@/utils/utils';

export const validateSearch = (regExp: RegExp | undefined | false, ...fields: string[]) =>
  !regExp || regExp.test(fields.join(' '));

export const getRelativeTileLabels = (tiles: (-1 | 0 | 1)[]) => {
  const player = [] as number[];
  const enemy = [] as number[];

  tiles.forEach((state, index) => {
    const position = indexToPosition[index];

    if (state === 1) {
      player.push(position);
    }
    if (state === -1) {
      enemy.push(position);
    }
  });

  return {
    all: [...player, ...enemy].sort(sortData),
    player: player.sort(sortData),
    enemy: enemy.sort(sortData),
  };
};

export const getIsTopRight = (tileData: (-1 | 0 | 1)[]) =>
  [28, 38, 39, 43].some(i => tileData[i] !== 1) && [1, 5, 6, 16].some(i => tileData[i] === 1);

export const getSizeClass = (size: 'md' | 'sm' | 'xs' | '2xs') => {
  if (compareStrings(size, 'sm') === 0) {
    return 'min-w-16';
  }
  if (compareStrings(size, 'xs') === 0) {
    return 'min-w-12';
  }
  if (compareStrings(size, '2xs') === 0) {
    return 'min-w-8';
  }

  return 'min-w-20';
};

export const getDrawImage = (str: string) => {
  const label = str.toLowerCase();
  const path = compareStrings(label, 'unit') === 0 ? ('unit' as const) : ('base' as const);
  let src = 'Hammie';

  if (compareStrings(label, 'player') === 0) {
    src = 'Generic-Hex';
  }
  if (compareStrings(label, 'enemy') === 0) {
    src = 'Enemy-Hex';
  }

  return { src, path };
};

const updateFactionCount = (
  factionCount: Record<Talents, number>,
  faction: Talents,
  count: number,
  setCurrentFaction: (string?: Talents) => void,
) => {
  factionCount[faction] ??= 0;
  factionCount[faction] += count;

  if (factionCount[faction] >= requiredUnits) {
    setCurrentFaction(faction);
  }
};

export const countUnits = (
  count: Record<Talents, number>,
  units: UnitFormationData,
  setCurrentFaction: (faction?: Talents) => void,
) => {
  const unitCount = {} as Record<string, number>;

  Object.entries(units).forEach(([_, { unit, type }]) => {
    if (type !== 1) {
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (PairSet.has(unit as any)) {
      unitCount[unit] ??= 0;
      unitCount[unit]++;
    } else {
      updateFactionCount(count, UnitsByFaction[unit], 1, setCurrentFaction);
    }
  });

  UnitPairs.forEach(pairs => {
    const pairCounts = pairs.map(unit => unitCount[unit] || 0);
    const maxPairs = Math.min(...pairCounts);
    if (!maxPairs) {
      return;
    }

    updateFactionCount(count, UnitsByFaction[pairs[0]], maxPairs, setCurrentFaction);
  });
};

export const getTalentTiles = (tiles: number[], faction: Talents) =>
  new Set<number>(TalentLocations[faction] ? tiles.slice(-3, -1) : tiles.slice(0, 2));

export const testRegex = (str: string, regExp?: RegExp) => regExp === undefined || regExp?.test(str);
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
  const data = isUnit ? SortedUnits : OtherUnits;

  if (!isUnit && isDev) {
    data.concat(...DebugArtifacts);
  }

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
