import type { TileDivData, UnitFormationData } from '@/components/formation/types';
import type { BaseHexes, Talents } from '@/utils/types';

import { TalentLocations, TalentRequiredUnits, TileIndexToPosition, TileLayout } from '@/components/formation/types';
import { Artifacts, CurrentSeason, HeroPairs, PairSet, UnitsByFaction } from '@/utils/types';
import { compareStrings, generateCookie, sortData } from '@/utils/utils';

export const getRelativeTileLabels = (tiles: number[]) => {
  const player = [] as number[];
  const enemy = [] as number[];

  tiles.forEach((state, index) => {
    const position = TileIndexToPosition[index];

    if (state === 1 || state === 2) {
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

export const getIsTopRight = (tileData: number[]) =>
  [28, 38, 39, 43].some(i => tileData[i] !== 1) && [1, 5, 6, 16].some(i => tileData[i] === 1);

export const getDrawImage = (str: string, baseHex: boolean) => {
  const label = str.toLowerCase();
  const isUnit = !compareStrings(label, 'unit');
  const path = isUnit ? ('unit' as const) : ('base' as const);
  const isPlayer = !compareStrings(label, 'player');
  const isEnemy = !compareStrings(label, 'enemy');
  const isDark = label.endsWith('swap');

  if (isDark) {
    return { src: 'Grid-Hex', path };
  }

  if (isPlayer) {
    return { src: `Generic-${baseHex ? 'Hex' : 'Outline'}`, path };
  }
  if (isEnemy) {
    return { src: `${str}-${baseHex ? 'Hex' : 'Outline'}`, path };
  }
  if (!isUnit) {
    return { src: `${str}-Hex`, path };
  }

  return { src: 'Hammie', path };
};

const updateFactionCount = (
  factionCount: Record<Talents, number>,
  faction: Talents,
  count: number,
  setCurrentFaction: (string?: Talents) => void,
) => {
  factionCount[faction] ??= 0;
  factionCount[faction] += count;

  if (factionCount[faction] >= TalentRequiredUnits) {
    setCurrentFaction(faction);
  }
};

export const countUnits = (
  count: Record<Talents, number>,
  units: UnitFormationData,
  validType: number,
  setCurrentFaction: (string?: Talents) => void,
) => {
  const unitCount = {} as Record<string, number>;

  Object.entries(units).forEach(([_, { unit, type }]) => {
    if (type !== validType || !UnitsByFaction[unit] || !UnitsByFaction[unit].length) {
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

  HeroPairs.forEach(pairs => {
    const pairCounts = Math.min(...pairs.map(unit => unitCount[unit] || 0));
    const maxPairs = pairs.length === 1 ? pairCounts / 2 : pairCounts;
    if (!maxPairs) {
      return;
    }

    updateFactionCount(count, UnitsByFaction[pairs[0]], maxPairs, setCurrentFaction);
  });
};

export const getTalentTiles = (tiles: number[], faction: Talents, type: number) => {
  const talentTiles = type === -1 ? tiles.toReversed() : tiles;

  return new Set<number>(TalentLocations[faction] ? talentTiles.slice(-3, -1) : talentTiles.slice(0, 2));
};

export const processTileData = (
  tileData: number[],
  isPreview = false,
  setFirstPlayerRow?: React.Dispatch<React.SetStateAction<number | undefined>>,
  setLastPlayerRow?: React.Dispatch<React.SetStateAction<number | undefined>>,
): TileDivData[] => {
  let firstRow: number | undefined = undefined;
  let lastRow: number | undefined = undefined;
  let rowIndex = 0;

  const result: TileDivData[] = [];
  let index = 0;

  while (index < tileData.length) {
    for (const { length, offset, reverse, preview } of TileLayout) {
      if (index >= tileData.length) {
        break;
      }

      const tileSlice = tileData.slice(index, index + length);
      const hasPlayer = tileSlice.includes(1);
      const tiles = tileSlice.map((tile, i) => ({ state: tile, index: index + i }));

      result.push({ offset: isPreview ? preview : offset, tiles, reverse });

      if (hasPlayer) {
        if (firstRow === undefined) {
          firstRow = rowIndex;
        }
        lastRow = rowIndex;
      }

      index += length;
      rowIndex++;
    }
  }

  if (setFirstPlayerRow && setLastPlayerRow) {
    setFirstPlayerRow(firstRow);
    setLastPlayerRow(lastRow);
  }

  return result;
};

export const determineFaction = (count: Record<Talents, number>, string?: Talents): Talents | undefined => {
  if (string && count[string] >= TalentRequiredUnits) {
    return string;
  }

  return Object.keys(count).find(key => count[key as Talents] >= TalentRequiredUnits) as Talents | undefined;
};

export const isCustom = (target?: BaseHexes) => target && !/^Generic-/.test(target);

const row1 = 6;
const row2 = row1 + 5;
const rowDefault = row2 + 1;

export const getGroupIndex = (i: number) => {
  if (i <= row1) {
    return 0;
  }

  if (i <= row2) {
    return 1;
  }

  return Math.floor((i - rowDefault) / 8) + 2;
};

export const getArtifacts = (i: number) => {
  switch (i) {
    case 2:
      return Artifacts['Honor Duel'];
    case 1:
      return Artifacts['Pre-Season'];
    default:
      return Artifacts[CurrentSeason];
  }
};

const parseValue = (value: boolean | string | undefined) => {
  switch (typeof value) {
    case 'undefined':
      return 'undefined'
    case 'boolean':
      return value ? '1' : '0';
    default:
      return value;
  }
};

export const generateCookies = (data: Record<string, boolean | string | BaseHexes | undefined>, id: number) =>
  Object.entries(data).map(([key, value]) => generateCookie(`${id}-${key}`, parseValue(value)));
